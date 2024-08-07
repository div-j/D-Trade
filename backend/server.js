import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import bodyParser from "body-parser";
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import admin from './routes/adminRoutes.js';
import category from './routes/categoryRoutes.js';
import product from './routes/productRoutes.js';
import cors from "cors";

dotenv.config();

// Initialize Express app
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', admin);
app.use('/api/category', category);
app.use('/api/product', product);
app.post('/api/category/me', (req, res) => {
  // Mock response
  res.json({ success: true, message: 'Category created successfully' });
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the d-trade API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

// Port
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
connectDB();
  console.log(`Server running on port ${PORT}`);
});
