import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CategoryContext = createContext();

export const useCategory = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/category/all');
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const createCategory = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/category/add', { name });
      if (res.status === 201) {
        toast.success('Category created successfully');
        setName('');
        setSlug('');
        fetchCategories();
      }
    } catch (error) {
      console.error('Error creating category:', error.response ? error.response.data : error.message);
      toast.error('Error creating category');
    }
  };

  const editCategory = (category) => {
    setEditMode(true);
    setEditId(category._id);
    setName(category.name);
    setSlug(category.slug);
  };

  const updateCategory = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/category/update/${slug}`, { name });
      if (res.status === 200) {
        toast.success('Category updated successfully');
        setName('');
        setSlug('');
        setEditMode(false);
        setEditId(null);
        fetchCategories();
      }
    } catch (error) {
      console.error('Error updating category:', error.response ? error.response.data : error.message);
      toast.error('Error updating category');
    }
  };

  const deleteCategory = async (slug) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/category/delete/${slug}`);
      if (res.status === 200) {
        toast.success('Category deleted successfully');
        fetchCategories();
      }
    } catch (error) {
      console.error('Error deleting category:', error.response ? error.response.data : error.message);
      toast.error('Error deleting category');
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        name,
        setName,
        slug,
        setSlug,
        editMode,
        createCategory,
        editCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
