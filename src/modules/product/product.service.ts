import { prisma } from '../../prisma/client';
import { CreateProductInput } from './product.validation';
import { ProductResponse } from './product.dto';
import { env } from '../../config/env';

export class ProductService {
  
  // Helper: Appends the domain to the image URL
  private formatProduct(product: any): ProductResponse {
    return {
      ...product,
      // Result: "http://localhost:3000" + "/images/tshirt.jpg"
      imageUrl: `${env.BASE_URL}${product.imageUrl}`,
    };
  }

  async getAllProducts(category?: string): Promise<ProductResponse[]> {
    const where = category ? { category } : {};
    
    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    // Map over all products to fix the URL
    return products.map(p => this.formatProduct(p));
  }

  async getProductById(id: string): Promise<ProductResponse | null> {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) return null;

    return this.formatProduct(product);
  }

  async createProduct(data: CreateProductInput): Promise<ProductResponse> {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        category: data.category,
        imageUrl: data.imageUrl, // Stored as relative path: "/images/..."
        inStock: data.inStock ?? true,
        variants: data.variants ?? [],
      },
    });

    return this.formatProduct(product);
  }
}