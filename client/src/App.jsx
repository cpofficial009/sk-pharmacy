import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout wrappers
import CustomerLayout from './components/CustomerLayout';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// User Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import MyOrdersPage from './pages/MyOrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import AccountPage from './pages/AccountPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminProductAddPage from './pages/admin/AdminProductAddPage';
import AdminProductEditPage from './pages/admin/AdminProductEditPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminOrderDetailPage from './pages/admin/AdminOrderDetailPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';

function App() {
  return (
    <Routes>
      {/* Protected Admin Suite with AdminLayout (Sidebar + Management TopHeader) */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="products/add" element={<AdminProductAddPage />} />
        <Route path="products/edit/:id" element={<AdminProductEditPage />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="orders/:id" element={<AdminOrderDetailPage />} />
        <Route path="categories" element={<AdminCategoriesPage />} />
        <Route path="users" element={<AdminUsersPage />} />
      </Route>

      {/* Customer Storefront with CustomerLayout (Sidebar + Classy TopHeader + Footer) */}
      <Route element={<CustomerLayout />}>
        {/* Public Storefront Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/medicines" element={<ProductsPage />} />
        <Route path="/medicines/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Protected Customer Account & Orders */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />
        {/* Legacy /profile alias redirects to /account */}
        <Route path="/profile" element={<Navigate to="/account" replace />} />

        {/* 404 Catch-All */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
