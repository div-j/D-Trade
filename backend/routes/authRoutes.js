import express from 'express';
import { registerUser, loginUser, requestPasswordReset, resetPassword,  } from '../controllers/authController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', requestPasswordReset);
router.put('/reset-password/:token', resetPassword);

//protected rooute for frontend
router.post('/auth-user',protect, (req, res)=>{
    res.status(200).send({ok:true})
});

export default router;
