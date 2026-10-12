import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  User,
  ShieldCheck,
  Truck,
  Phone,
  LayoutDashboard,
  Pill,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const TopHeader = ({ onOpenSidebar }) => {
  const { user, isAdmin } = useAuth();
  const { itemsCount } = useCart();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2ece9',
        boxShadow: '0 2px 14px rgba(6, 78, 59, 0.04)',
      }}
    >
      {/* Top Micro Announcement Bar (Light Theme) */}
      <div
        style={{
          background: 'linear-gradient(90deg, #f0fdf9 0%, #ecfdf5 50%, #eff6ff 100%)',
          color: '#064e3b',
          fontSize: '0.75rem',
          padding: '0.35rem 1.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          borderBottom: '1px solid #ccfbf1',
          fontWeight: '600',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={13} color="#0d9488" /> 100% Genuine Certified Medications
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hide-mobile">
            <Truck size={13} color="#0d9488" /> Free Express Delivery Above ₹500
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Phone size={12} color="#d97706" /> 24/7 Pharmacist Helpline: <strong style={{ color: '#d97706' }}>+91 73838 82621</strong>
        </div>
      </div>

      {/* Main Header Bar */}
      <div
        style={{
          padding: '0.75rem 1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem',
        }}
      >
        {/* Left: Three-Line Menu Icon Button (Only Icon, No Text) + Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            type="button"
            onClick={onOpenSidebar}
            className="three-line-menu-btn"
            title="Open Navigation Menu"
            aria-label="Open Navigation Menu"
          >
            <div className="three-line-icon">
              <span className="line" />
              <span className="line" />
              <span className="line" />
            </div>
          </button>

          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #064e3b 0%, #10b981 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.35)',
              }}
            >
              <Pill size={20} />
            </div>
            <div>
              <div
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '900',
                  color: '#064e3b',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                }}
              >
                SK Pharmacy
              </div>
              <div
                style={{
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  color: '#0d9488',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Clinical Care
              </div>
            </div>
          </Link>
        </div>

        {/* Right: Quick Action Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Admin Suite shortcut if admin */}
          {isAdmin && (
            <Link
              to="/admin"
              className="btn btn-sm hide-mobile"
              style={{
                backgroundColor: '#052e26',
                color: '#2dd4bf',
                borderRadius: '9999px',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <LayoutDashboard size={14} /> Admin Panel
            </Link>
          )}

          {/* Quick Cart Button - Icon only with counter badge (No pricing) */}
          <Link
            to="/cart"
            style={{
              position: 'relative',
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: '#f0fdf9',
              border: '1.5px solid #99f6e4',
              color: '#0d9488',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              transition: 'all 0.2s',
              boxShadow: '0 2px 6px rgba(13, 148, 136, 0.08)',
            }}
            title="View Shopping Cart"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ccfbf1';
              e.currentTarget.style.borderColor = '#0d9488';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f0fdf9';
              e.currentTarget.style.borderColor = '#99f6e4';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <ShoppingBag size={20} />
            {itemsCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  fontSize: '0.68rem',
                  fontWeight: '800',
                  minWidth: '19px',
                  height: '19px',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px',
                  boxShadow: '0 2px 6px rgba(239, 68, 68, 0.4)',
                  border: '2px solid #ffffff',
                }}
              >
                {itemsCount}
              </span>
            )}
          </Link>

          {/* Account Pill */}
          <Link
            to={user ? '/account' : '/login'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.45rem 0.95rem',
              borderRadius: '9999px',
              border: '1.5px solid #e2ece9',
              backgroundColor: '#ffffff',
              color: '#091e1b',
              fontWeight: '700',
              fontSize: '0.85rem',
              textDecoration: 'none',
              transition: 'all 0.2s',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
            }}
            title={user ? 'Account' : 'Sign In'}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#0d9488';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e2ece9';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: user ? (isAdmin ? '#fef3c7' : '#ccfbf1') : '#f1f5f9',
                color: user ? (isAdmin ? '#b45309' : '#0d9488') : '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: '800',
              }}
            >
              {user ? user.name.charAt(0).toUpperCase() : <User size={14} />}
            </div>
            <span className="hide-mobile">
              {user ? 'Account' : 'Sign In'}
            </span>
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

export default TopHeader;
