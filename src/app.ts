import express, { Express } from 'express';
import cors from 'cors';
import path from 'path'; // <--- Import path
import productRoutes from './modules/product/product.routes';
import { errorMiddleware } from './middlewares/error.middleware';

export function createApp(): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/images', express.static(path.join(process.cwd(), 'public/images')));

  app.use('/products', productRoutes);

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.use(errorMiddleware);

  return app;
}