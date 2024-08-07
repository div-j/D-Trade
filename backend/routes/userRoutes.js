import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route for getting the logged-in user's profile
router.get('/profile', protect, getUserProfile);

// Route for updating the logged-in user's profile
router.put('/profile/update', protect, updateUserProfile);

export default router;
