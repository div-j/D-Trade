import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSideBar from './AdminSideBar';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth';

function CreateCategories() {
  const { auth } = useAuth(); // Use authentication context
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true); // Set loading state to true before fetching
    try {
      const res = await axios.get('http://localhost:5000/api/category/all', {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      if(res.data.success){
        setCategories(res.data.data);
      }  
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false); // Set loading state to false after fetching
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/category/add', { name }, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
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

  const handleEditCategory = (category) => {
    setEditMode(true);
    setEditId(category._id);
    setName(category.name);
    setSlug(category.slug);
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/api/category/update/${slug}`, 
        { name },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      if (res.status === 200) {
        toast.success('Category updated successfully');
        setName('');
        setSlug('');
        setEditMode(false);
        fetchCategories();
      }
    } catch (error) {
      console.error('Error updating category:', error.response ? error.response.data : error.message);
      toast.error('Error updating category');
    }
  };
  const handleDeleteCategory = async (slug) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/category/delete/${slug}`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      if (res.status === 200) {
        toast.success('Category deleted successfully');
        fetchCategories();
      }
    } catch (error) {
      console.error('Error deleting category:', error.response ? error.response.data : error.message);
      toast.error('Error deleting category');
    }
  };

  if (loading) return <div>Loading...</div>; // Show loading indicator while fetching

  return (
    <div className="flex sm:flex-row flex-col gap-4">
      <div className="flex ">
        <AdminSideBar />
      </div>
      <div className="flex-1 text-base-100 p-4">
        <h1 className="text-center text-xl mb-4">{editMode ? 'Update Category' : 'Create Category'}</h1>
        <form onSubmit={editMode ? handleUpdateCategory : handleCreateCategory}>
          <div className="mb-4">
            <label className="block mb-2">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input text-white input-bordered w-full"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            {editMode ? 'Update' : 'Create'}
          </button>
        </form>
        <div className="mt-8">
          <h2 className="text-center text-xl mb-4">Categories</h2>
          <table className="table">
            <thead className='text-base-100'>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category.slug}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning m-2"
                      onClick={() => handleEditCategory(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error m-2"
                      onClick={() => handleDeleteCategory(category.slug)} // Pass _id instead of slug
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CreateCategories;
