// controllers/productController.js
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';

export const createProduct = async (req, res) => {
  const { name, description, price, category, quantity, shipping, image } = req.body;
  try {
    const product = new Product({ name, description, price, category, quantity, shipping, image });
    await product.save();
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const createProducts = async (req, res) => {
  const products = req.body;
  try {
    const createdProducts = await Product.insertMany(products);
    res.status(201).json({ success: true, data: createdProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};


export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('category');
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate( id ).populate('category');
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


export const productPagination = async (req, res) => {
  try {
    const { limit = 10, skip = 0 } = req.query; // Default values
    const parsedLimit = parseInt(limit, 10);
    const parsedSkip = parseInt(skip, 10);

    const products = await Product.find()
      .skip(parsedSkip)
      .limit(parsedLimit)
      .populate('category');

    const total = await Product.countDocuments(); // Total product count

    res.status(200).json({
      success: true,
      products,
      total,
      limit: parsedLimit,
      skip: parsedSkip
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


