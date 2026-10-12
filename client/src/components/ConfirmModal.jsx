import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmModal = ({
  isOpen,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  isDanger = true,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1rem',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          maxWidth: '440px',
          width: '100%',
          padding: '1.75rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          animation: 'fadeIn 0.2s ease-out',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: isDanger ? '#fee2e2' : '#e0f2fe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AlertTriangle size={22} color={isDanger ? '#ef4444' : '#0284c7'} />
          </div>
          <button
            onClick={onCancel}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>
          {title}
        </h3>
        <p style={{ fontSize: '0.925rem', color: '#475569', lineHeight: 1.5, marginBottom: '1.5rem' }}>
          {message}
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`btn ${isDanger ? 'btn-danger' : 'btn-primary'} btn-sm`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ConfirmModal;
