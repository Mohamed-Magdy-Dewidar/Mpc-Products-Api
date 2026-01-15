import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  price: z.coerce.number().positive('Price must be a positive number'),
  category: z.string().min(1, 'Category is required'),
  imageUrl: z.string(),
    inStock: z.coerce.boolean().optional().default(true),
  
  variants: z.array(z.string()).optional().default([]),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;