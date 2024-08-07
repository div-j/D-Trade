import express from 'express';
import { getAdminData } from '../controllers/adminController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/admin-data', protect, admin, getAdminData);

export default router;
