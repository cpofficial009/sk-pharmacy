import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Home,
  Pill,
  ShoppingBag,
  Package,
  User,
  Info,
  PhoneCall,
  LayoutDashboard,
  LogOut,
  X,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Headphones,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, isAdmin, logout } = useAuth();
  const { itemsCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
    navigate('/login');
  };

  const navLinks = [
    { label: 'Home', path: '/', icon: <Home size={19} /> },
    { label: 'Medicines', path: '/medicines', icon: <Pill size={19} />, badge: 'Catalog' },
    { label: 'Shopping Cart', path: '/cart', icon: <ShoppingBag size={19} />, count: itemsCount },
    { label: 'My Orders', path: '/orders', icon: <Package size={19} />, authRequired: true },
    { label: 'My Account', path: '/account', icon: <User size={19} /> },
    { label: 'About Us', path: '/about', icon: <Info size={19} /> },
    { label: 'Contact & Support', path: '/contact', icon: <PhoneCall size={19} /> },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      {/* Main Drawer Sidebar (Clean Light Theme) */}
      <aside
        className={`app-sidebar ${isOpen ? 'open' : ''}`}
        style={{
          backgroundColor: '#ffffff',
          color: '#0f172a',
          borderRight: '1px solid #e2ece9',
        }}
      >
        {/* Brand Header */}
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
          <Link
            to="/"
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #064e3b 0%, #10b981 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              }}
            >
              <Pill size={22} />
            </div>
            <div>
              <div
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '800',
                  color: '#064e3b',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.1,
                }}
              >
                SK Pharmacy
              </div>
              <div
                style={{
                  fontSize: '0.675rem',
                  color: '#0d9488',
                  fontWeight: '700',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                Clinical Dispensary
              </div>
            </div>
          </Link>

          {/* Close X Button */}
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
            title="Close Menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Admin Shortcut Pill if Admin */}
        {isAdmin && (
          <div style={{ padding: '0.85rem 1.25rem 0.25rem' }}>
            <Link
              to="/admin"
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 1rem',
                borderRadius: '12px',
                background: '#fef3c7',
                border: '1.5px solid #fde68a',
                color: '#92400e',
                fontSize: '0.825rem',
                fontWeight: '700',
                textDecoration: 'none',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <LayoutDashboard size={16} color="#d97706" /> Admin Control Suite
              </span>
              <ChevronRight size={14} color="#d97706" />
            </Link>
          </div>
        )}

        {/* Navigation Links */}
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
            Store Navigation
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {navLinks.map((item) => {
              if (item.authRequired && !user) return null;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    color: isActive ? '#064e3b' : '#334155',
                    backgroundColor: isActive ? '#f0fdf9' : 'transparent',
                    border: isActive
                      ? '1.5px solid #99f6e4'
                      : '1.5px solid transparent',
                    fontWeight: isActive ? '700' : '600',
                    fontSize: '0.925rem',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  })}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <span style={{ color: '#0d9488' }}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>

                  {item.count !== undefined && item.count > 0 && (
                    <span
                      style={{
                        backgroundColor: '#ef4444',
                        color: '#ffffff',
                        fontSize: '0.7rem',
                        fontWeight: '800',
                        padding: '0.15rem 0.55rem',
                        borderRadius: '9999px',
                      }}
                    >
                      {item.count}
                    </span>
                  )}

                  {item.badge && !item.count && (
                    <span
                      style={{
                        backgroundColor: '#f0fdf9',
                        color: '#0d9488',
                        fontSize: '0.675rem',
                        fontWeight: '700',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '6px',
                        border: '1px solid #99f6e4',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* 24/7 Hotline Support Card (Light) */}
          <div
            style={{
              marginTop: '1.75rem',
              padding: '1.15rem',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #f0fdf9 0%, #ecfdf5 100%)',
              border: '1.5px solid #a7f3d0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <Headphones size={18} color="#0d9488" />
              <strong style={{ fontSize: '0.85rem', color: '#064e3b' }}>24/7 Pharmacist Hotline</strong>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#475569', lineHeight: 1.4, marginBottom: '0.75rem' }}>
              Need urgent dosage or prescription consultation?
            </p>
            <a
              href="tel:+917383882621"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.875rem',
                fontWeight: '800',
                color: '#d97706',
                textDecoration: 'none',
              }}
            >
              📞 +91 73838 82621
            </a>
          </div>
        </div>

        {/* Bottom User Account Widget */}
        <div
          style={{
            padding: '1rem 1.25rem',
            borderTop: '1px solid #e2ece9',
            backgroundColor: '#f8fafc',
          }}
        >
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link
                to="/account"
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  textDecoration: 'none',
                  minWidth: 0,
                  flex: 1,
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: isAdmin ? '#f59e0b' : '#0d9488',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '0.9rem',
                    flexShrink: 0,
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: '700',
                      color: '#0f172a',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {user.name}
                  </div>
                  <div
                    style={{
                      fontSize: '0.725rem',
                      color: '#0d9488',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontWeight: '600',
                    }}
                  >
                    <ShieldCheck size={12} /> {isAdmin ? 'Admin' : 'Verified Patient'}
                  </div>
                </div>
              </Link>

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
                  marginLeft: '0.5rem',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link
                to="/login"
                onClick={onClose}
                className="btn btn-primary btn-sm"
                style={{ flex: 1, fontSize: '0.825rem' }}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={onClose}
                className="btn btn-outline btn-sm"
                style={{
                  flex: 1,
                  fontSize: '0.825rem',
                  color: '#0f172a',
                }}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
