import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSideBar from './AdminSideBar';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth';
import { FaSpider } from 'react-icons/fa';

function CreateProduct() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [shipping, setShipping] = useState(false);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const {auth, fetchData, loading} = useAuth()
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData(setProducts,'product/all');
    fetchData(setCategories,'category/all');
  }, []);
  console.log(products);

 

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/product/add', { 
        name, price , description, quantity, image,shipping}, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      if (res.status === 201) {
        toast.success('Product created successfully');
        setName('');
        setPrice('');
        setDescription('');
        fetchData(setProducts,'product/all');

      }
    } catch (error) {
      console.error('Error creating product:', error.response ? error.response.data : error.message);
      toast.error('Error creating product');
    }
  };

  const handleEditProduct = (product) => {
    setEditMode(true);
    setEditId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setDescription(product.description);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/product/update/${editId}`, { 
        name, price, image, description  }, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      if (res.status === 200) {
        toast.success('Product updated successfully');
        setName('');
        setPrice('');
        setEditMode(false);
        setEditId(null);
        fetchData(setProducts,'product/all');

      }
    } catch (error) {
      console.error('Error updating product:', error.response ? error.response.data : error.message);
      toast.error('Error updating product');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/product/delete/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      if (res.status === 200) {
        toast.success('Product deleted successfully');
        fetchData(setProducts,'product/all');

      }
    } catch (error) {
      console.error('Error deleting product:', error.response ? error.response.data : error.message);
      toast.error('Error deleting product');
    }
  };

  if (loading) return <div>Loading...</div>; // Show loading indicator while fetching


  return (
    <div className="flex flex-row  g">
      <div className="flex w-96">
        <AdminSideBar />
      </div>
      <div className=" text-base-100 pr-2 lg:flex  scroll-m-2  overflow-y-auto h-96">
        <form onSubmit={editMode ? handleUpdateProduct : handleCreateProduct}>
        <h1 className="text-center text-xl mb-2">{editMode ? 'Update Product' : 'Create Product'}</h1>
          <div className="mb-1">
            <label className="block mb-2">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input text-white input-bordered w-full"
              required
            />
          </div>
          <div className="mb-1">
            <label className="block mb-2">Product Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input text-white input-bordered w-full"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="input text-white input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input text-white input-bordered w-full"
            
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className=" m-2">Shipping</label> 
            <div>

            <input
              type="checkbox"
              checked={shipping}
              onChange={(e) => setShipping(e.target.checked)}
              className=" text-white bg-black defaultChecked checkbox "
              />
              </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Image Url</label>
            <input
              type="text"
              onChange={(e) => setImage(e.target.value)}
              className="input text-white input-bordered w-full"
          
            />
          </div>
          <div className="mb-3">
            <label className="block mb-2">Product Description</label>
            <textarea
              type="number"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input text-white input-bordered w-full"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            {editMode ? 'Update' : 'Create'}
          </button>
        </form>
        <div className="mt-8 lg:mt-0 lg:ml-4">
          <h2 className="text-center text-xl mb-4">Products</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading?(<FaSpider/>):( products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning mr-2"
                      onClick={() => handleEditProduct(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
