import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout = ({ children, title = 'Pharmacy Management' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-wrapper">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-viewport">
        <AdminHeader onOpenSidebar={() => setSidebarOpen(true)} title={title} />
        <main className="page-container">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

