// components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { FaSpinner } from 'react-icons/fa';
import Spinner from '../Spinner';

const ProtectedRoute = () => {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth.loading) {
    return <Spinner/>; // Show loading spinner while checking auth status
  }

  return auth.user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
