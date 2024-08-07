import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModel from '../models/userModel.js';

dotenv.config();

const protect = async (req, res, next) => {
  let token;

  // Check for token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) 
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await userModel.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
 
};

const admin = async(req, res, next) => {
  try {
const user = await userModel.findById(req.user._id)
if (user.role === 'admin') {
  next()
    }
  } catch (error) {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }

};

export { protect, admin };
