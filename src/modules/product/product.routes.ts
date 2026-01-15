import { Router } from 'express';
import { ProductController } from './product.controller';
import { upload } from '../../middlewares/upload.middleware'; // Import upload

const router = Router();

const productController = new ProductController();
router.post('/', upload.single('image'), productController.createProduct);

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);


export default router;