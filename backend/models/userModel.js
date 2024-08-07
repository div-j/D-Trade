// backend/models/User.js

import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Adjust roles as needed
    default: 'user',
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, { timestamps: true });

export default mongoose.model('User', userSchema);
