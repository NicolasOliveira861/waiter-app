import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';
import { createCategory } from './app/use_cases/categories/createCategory';
import { listCategories } from './app/use_cases/categories/listCategories';
import { createProduct } from './app/use_cases/products/createProduct';
import { listProducts } from './app/use_cases/products/listProducts';
import { listProductsByCategory } from './app/use_cases/categories/listProductsByCategory';
import { listOrders } from './app/use_cases/orders/listOrders';
import { createOrder } from './app/use_cases/orders/createOrder';
import { changeOrderStatus } from './app/use_cases/orders/changeOrderStatus';
import { cancelOrder } from './app/use_cases/orders/cancelOrder';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// List categories
router.get('/categories', listCategories);

// Create category
router.post('/categories', createCategory);

// List products
router.get('/products', listProducts);

// Create product
router.post('/products', upload.single('image'), createProduct);

// Get products by category
router.get('/categories/:categoryId/products', listProductsByCategory);

// List orders
router.get('/orders', listOrders);

// Create order
router.post('/orders', createOrder);

// Change order status
router.patch('/orders/:orderId', changeOrderStatus);

// Delete/cancel order
router.delete('/orders/:orderId', cancelOrder);
