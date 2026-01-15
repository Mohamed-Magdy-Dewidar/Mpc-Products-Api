import { prisma } from "./client";
import fs from "fs";
import path from "path";
import { Readable } from "stream";
import { finished } from "stream/promises";

const sampleProducts = [
  {
    name: "Classic White T-Shirt",
    price: 19.99,
    category: "Apparel",
    // We define the filename we want on disk
    filename: "tshirt.jpg", 
    // Real high-quality image from Unsplash
    remoteUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    variants: ["Small", "Medium", "Large", "X-Large"],
  },
  {
    name: "Wireless Headphones",
    price: 79.99,
    category: "Electronics",
    filename: "headphones.jpg",
    remoteUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    variants: ["Black", "White", "Blue"],
  },
  {
    name: "Running Shoes",
    price: 129.99,
    category: "Footwear",
    filename: "shoes.jpg",
    remoteUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    inStock: false,
    variants: ["Size 8", "Size 9", "Size 10", "Size 11"],
  },
  {
    name: "Coffee Maker",
    price: 89.99,
    category: "Home & Kitchen",
    filename: "coffee.jpg",
    remoteUrl: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    variants: ["Black", "Silver"],
  },
];

// Helper to download image from web to local disk
async function downloadImage(url: string, filepath: string) {
  if (fs.existsSync(filepath)) return; // Skip if already downloaded

  console.log(`⬇️  Downloading ${path.basename(filepath)}...`);
  const res = await fetch(url);
  
  if (!res.ok || !res.body) throw new Error(`Failed to fetch ${url}`);

  const fileStream = fs.createWriteStream(filepath);
  // @ts-ignore
  await finished(Readable.fromWeb(res.body).pipe(fileStream));
}

export async function seedIfEmpty(): Promise<void> {
  try {
    const publicDir = path.join(process.cwd(), "public", "images");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const productCount = await prisma.product.count();
    if (productCount > 0) {
      console.log("📦 Database is already seeded.");
      return;
    }

    console.log("🌱 Database is empty. Seeding...");

    const productsToInsert = [];

    for (const p of sampleProducts) {
      const localPath = path.join(publicDir, p.filename);
      
      await downloadImage(p.remoteUrl, localPath);

      productsToInsert.push({
        name: p.name,
        price: p.price,
        category: p.category,
        imageUrl: `/images/${p.filename}`, // <--- The path the frontend needs
        inStock: p.inStock,
        variants: p.variants,
      });
    }

    await prisma.product.createMany({
      data: productsToInsert,
    });

    console.log(`✅ Successfully seeded ${productsToInsert.length} products with local images.`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
}