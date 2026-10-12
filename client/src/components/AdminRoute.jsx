import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

const AdminRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader text="Checking administrative permissions..." />;
  }

  if (!user) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
