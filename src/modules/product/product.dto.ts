export interface CreateProductRequest {
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  inStock?: boolean;
  variants?: string[];
}

export interface ProductResponse {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  inStock: boolean;
  variants: string[];
  createdAt: Date;
}
