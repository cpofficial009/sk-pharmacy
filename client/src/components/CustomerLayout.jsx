import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import Footer from './Footer';

const CustomerLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="app-wrapper">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-viewport">
        <TopHeader onOpenSidebar={() => setSidebarOpen(true)} />
        <main className={`page-container ${isHome ? 'is-home' : ''}`}>
          {children || <Outlet />}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default CustomerLayout;

