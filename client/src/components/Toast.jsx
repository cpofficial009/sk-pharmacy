import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3500 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const isSuccess = type === 'success';
  const isError = type === 'error';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        backgroundColor: '#ffffff',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        borderLeft: `5px solid ${isSuccess ? '#10b981' : isError ? '#ef4444' : '#0284c7'}`,
        borderRadius: '8px',
        padding: '0.9rem 1.2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        zIndex: 9999,
        maxWidth: '420px',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div>
        {isSuccess ? (
          <CheckCircle2 size={22} color="#10b981" />
        ) : isError ? (
          <AlertCircle size={22} color="#ef4444" />
        ) : (
          <Info size={22} color="#0284c7" />
        )}
      </div>
      <div style={{ flex: 1, fontSize: '0.925rem', color: '#0f172a', fontWeight: '500' }}>
        {message}
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#94a3b8',
          padding: '2px',
          display: 'flex',
        }}
      >
        <X size={18} />
      </button>
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;
