import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('userInfo');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  // Sync user state to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('userInfo', JSON.stringify(user));
    } else {
      localStorage.removeItem('userInfo');
    }
  }, [user]);

  // Login handler
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setUser(data);
      setLoading(false);
      return { success: true, user: data };
    } catch (error) {
      setLoading(false);
      return { success: false, message: error.message };
    }
  };

  // Register handler
  const register = async (userData) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', userData);
      setUser(data);
      setLoading(false);
      return { success: true, user: data };
    } catch (error) {
      setLoading(false);
      return { success: false, message: error.message };
    }
  };

  // Update profile handler
  const updateProfile = async (profileData) => {
    setLoading(true);
    try {
      const { data } = await api.put('/auth/profile', profileData);
      setUser(data);
      setLoading(false);
      return { success: true, user: data, message: data.message };
    } catch (error) {
      setLoading(false);
      return { success: false, message: error.message };
    }
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading,
        login,
        register,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
