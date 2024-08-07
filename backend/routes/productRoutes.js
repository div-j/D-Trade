// routes/productRoutes.js
import express from 'express';
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct, createProducts, productPagination } from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, admin, createProduct);
router.post('/add/many', protect, admin, createProducts);
router.get('/all', getProducts);
router.get('/pagination?limit=${limit}&skip=${skip}', productPagination);
router.get('/:slug', getProduct);
router.put('/update/:id',  protect, admin, updateProduct);
router.delete('/delete/:id',  protect, admin, deleteProduct);

export default router;
