// routes/categoryRoutes.js
import express from 'express';
import { createCategory, getCategories, getCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, admin, createCategory);
router.get('/all', getCategories);
router.get('/:slug', getCategory);
router.put('/update/:slug', protect, admin, updateCategory);
router.delete('/delete/:slug', protect, admin,deleteCategory);

export default router;
