import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const PublicRoute = () => {
  const { auth } = useAuth();

  if (auth.user) {
    // If user is authenticated, redirect to home page or dashboard
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
