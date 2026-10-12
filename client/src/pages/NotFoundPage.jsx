import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home, Pill } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1rem',
        textAlign: 'center',
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: '500px',
          width: '100%',
          padding: '3rem 2rem',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08)',
        }}
      >
        <div
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            backgroundColor: '#fee2e2',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}
        >
          <AlertCircle size={36} />
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: '900', color: '#0f172a', lineHeight: 1 }}>
          404
        </h1>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#334155', margin: '0.5rem 0 1rem' }}>
          Page Not Found
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.5 }}>
          The page or medicine listing you are looking for might have been moved, renamed, or is temporarily unavailable.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary">
            <Home size={16} /> Return Home
          </Link>
          <Link to="/medicines" className="btn btn-outline">
            <Pill size={16} /> Browse Medicines
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
