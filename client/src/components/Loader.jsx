import React from 'react';

const Loader = ({ text = 'Loading medicines...' }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1rem',
      gap: '1rem',
    }}>
      <div style={{
        width: '44px',
        height: '44px',
        border: '4px solid #ccfbf1',
        borderTop: '4px solid #0d9488',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}></div>
      <p style={{
        color: '#475569',
        fontSize: '0.95rem',
        fontWeight: '500',
      }}>{text}</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
