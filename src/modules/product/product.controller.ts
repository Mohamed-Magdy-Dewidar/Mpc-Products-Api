// src/modules/product/product.controller.ts
import { Request, Response, NextFunction } from "express";
import { ProductService } from "./product.service";
import { createProductSchema } from "./product.validation";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = req.query.category as string | undefined;
      const products = await this.productService.getAllProducts(category);
      res.json(products);
    } catch (error) {
      next(error);
    }
  };

  getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await this.productService.getProductById(id);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  };

  createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log("Content-Type Header:", req.headers["content-type"]);
      console.log("Request file:", req.file);
      if (!req.file) {
        res.status(400).json({ error: "Image file is required" });
        return;
      }
      const rawData = {
        ...req.body,
        imageUrl: `/images/${req.file.filename}`,
      };
      if (typeof rawData.variants === "string") {
        try {
          rawData.variants = JSON.parse(rawData.variants);
        } catch {
          rawData.variants = [rawData.variants];
        }
      }
      const validatedData = createProductSchema.parse(rawData);
      const product = await this.productService.createProduct(validatedData);

      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  };
}
