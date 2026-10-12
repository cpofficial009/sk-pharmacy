import React from 'react';
import { Link } from 'react-router-dom';
import { Store, ShieldCheck, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminHeader = ({ onOpenSidebar, title = 'Administrative Console' }) => {
  const { user } = useAuth();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2ece9',
        padding: '0.85rem 1.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          type="button"
          onClick={onOpenSidebar}
          className="three-line-menu-btn"
          title="Open Admin Navigation Menu"
          aria-label="Open Admin Navigation Menu"
        >
          <div className="three-line-icon">
            <span className="line" />
            <span className="line" />
            <span className="line" />
          </div>
        </button>

        <div>
          <span
            style={{
              fontSize: '0.725rem',
              fontWeight: '700',
              color: '#f59e0b',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Management Suite
          </span>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#091e1b', lineHeight: 1.2 }}>
            {title}
          </h2>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link
          to="/"
          className="btn btn-outline btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}
        >
          <Store size={15} /> Storefront
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#052e26',
              color: '#2dd4bf',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '0.85rem',
            }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="hide-mobile">
            <strong style={{ fontSize: '0.85rem', color: '#091e1b', display: 'block', lineHeight: 1.2 }}>
              {user?.name}
            </strong>
            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
