import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: '',
    role: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

 

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, { email, password });
      if (res.data.user.success) {
        localStorage.setItem('auth', JSON.stringify(res.data));
        setAuth({
          user: res.data.user,
          token: res.data.token,
          role: res.data.user.role // Ensure the role is set correctly
        });
        toast.success(res.data.message)
        navigate('/');
      } else {
        toast.error(res.data.message)
        setError(res.data.message);
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const data = localStorage.getItem('auth');
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({
        user: parsedData.user,
        token: parsedData.token,
        role: parsedData.user.role // Make sure the role is part of the user object
      });
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    setAuth({
      user: null,
      token: '',
      role: ''
    });
    localStorage.removeItem('auth');
    navigate('/login');
  };


  const createCategory = async (name) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/category/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${auth.token}` // if needed
        },
        body: JSON.stringify({ name })
      });
  
      const data = await response.json();
  
      if (data.success) {
        toast.success('Category created successfully');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.error('Error creating category');
      console.error('Error:', error);
      throw error; // Make sure to throw the error to be caught in the calling function
    }
  };
  
  const fetchData = async (setProducts,uri) => {
    setLoading(true); // Set loading state to true before fetching

    try {
      const res = await axios.get(`http://localhost:5000/api/${uri}`);
      if(res.data.success){
        setProducts(res.data.data);
      }  
    } catch (error) {
      console.error('Error fetching products:', error);
    }finally{
      setLoading(false);
    }
  };

//   if (loading) {
//     return <div>Auth Loading...</div>; // Show a loading indicator while auth state is being checked
//   }
  return (
    <AuthContext.Provider value={{ auth, setAuth, login, handleLogout, createCategory,fetchData, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
