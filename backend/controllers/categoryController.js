// controllers/categoryController.js
import Category from '../models/categoryModel.js';
import slugify from 'slugify';

export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = new Category({ name });
    await category.save();
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getCategory = async (req, res) => {
  const { slug } = req.params;
  try {
    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateCategory = async (req, res) => {
    const { slug } = req.params;
    const { name } = req.body;
    try {
      const updatedSlug = slugify(name, { lower: true, strict: true });
      const category = await Category.findOneAndUpdate(
        { slug },
        { name, slug: updatedSlug },
        { new: true }
      );
      if (!category) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }
      res.status(200).json({ success: true, data: category });
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  };
  

export const deleteCategory = async (req, res) => {
  const { slug } = req.params;
  try {
    const category = await Category.findOneAndDelete({ slug });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
