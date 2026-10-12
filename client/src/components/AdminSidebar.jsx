
import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Pill,
  PlusCircle,
  ShoppingBag,
  Tags,
  Users,
  Store,
  LogOut,
  ShieldAlert,
  X,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminSidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
    navigate('/login');
  };

  const adminLinks = [
    { label: 'Dashboard Overview', path: '/admin', icon: <LayoutDashboard size={19} /> },
    { label: 'Medicines Inventory', path: '/admin/products', icon: <Pill size={19} /> },
    { label: 'Add New Medicine', path: '/admin/products/add', icon: <PlusCircle size={19} /> },
    { label: 'Customer Orders', path: '/admin/orders', icon: <ShoppingBag size={19} /> },
    { label: 'Categories', path: '/admin/categories', icon: <Tags size={19} /> },
    { label: 'User Accounts', path: '/admin/users', icon: <Users size={19} /> },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      {/* Main Admin Drawer Sidebar (Light Theme) */}
      <aside
        className={`admin-sidebar ${isOpen ? 'open' : ''}`}
        style={{
          backgroundColor: '#ffffff',
          color: '#0f172a',
          borderRight: '1px solid #e2ece9',
        }}
      >
        {/* Admin Header */}
        <div
          style={{
            padding: '1.4rem 1.4rem 1.25rem',
            borderBottom: '1px solid #e2ece9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0d9488 0%, #d97706 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)',
              }}
            >
              <ShieldAlert size={22} />
            </div>
            <div>
              <div
                style={{
                  fontSize: '1.2rem',
                  fontWeight: '800',
                  color: '#0f172a',
                  letterSpacing: '-0.02em',
                }}
              >
                SK <span style={{ color: '#0d9488' }}>Admin</span>
              </div>
              <div
                style={{
                  display: 'inline-block',
                  fontSize: '0.65rem',
                  fontWeight: '800',
                  color: '#b45309',
                  backgroundColor: '#fef3c7',
                  padding: '1px 6px',
                  borderRadius: '4px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  border: '1px solid #fde68a',
                }}
              >
                Pharmacy Console
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              color: '#475569',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fee2e2';
              e.currentTarget.style.color = '#ef4444';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f1f5f9';
              e.currentTarget.style.color = '#475569';
            }}
            title="Close Admin Menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Switch back to Customer Storefront */}
        <div style={{ padding: '0.85rem 1.25rem 0.25rem' }}>
          <Link
            to="/"
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.65rem 1rem',
              borderRadius: '12px',
              backgroundColor: '#f0fdf9',
              border: '1.5px solid #99f6e4',
              color: '#0f766e',
              fontSize: '0.825rem',
              fontWeight: '700',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ccfbf1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f0fdf9';
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Store size={16} color="#0d9488" /> View Customer Storefront
            </span>
            <ChevronRight size={14} color="#0d9488" />
          </Link>
        </div>

        {/* Admin Navigation Links */}
        <div style={{ flex: 1, padding: '1rem 0.85rem', overflowY: 'auto' }}>
          <div
            style={{
              fontSize: '0.7rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#64748b',
              padding: '0.4rem 0.85rem 0.65rem',
            }}
          >
            Store Operations
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {adminLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                onClick={onClose}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  color: isActive ? '#064e3b' : '#334155',
                  backgroundColor: isActive ? '#f0fdf9' : 'transparent',
                  border: isActive
                    ? '1.5px solid #99f6e4'
                    : '1.5px solid transparent',
                  fontWeight: isActive ? '700' : '600',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                })}
              >
                <span style={{ color: '#0d9488' }}>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Admin User Footer Card */}
        <div
          style={{
            padding: '1rem 1.25rem',
            borderTop: '1px solid #e2ece9',
            backgroundColor: '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#d97706',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '0.9rem',
                flexShrink: 0,
              }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: '#0f172a',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {user?.name}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#d97706', fontWeight: '700' }}>Super Admin</div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
            title="Sign Out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
