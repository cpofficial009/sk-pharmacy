import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

const Message = ({ variant = 'info', children }) => {
  const styles = {
    danger: {
      bg: '#fee2e2',
      border: '#fca5a5',
      text: '#991b1b',
      icon: <AlertCircle size={20} color="#b91c1c" />,
    },
    success: {
      bg: '#dcfce7',
      border: '#86efac',
      text: '#166534',
      icon: <CheckCircle size={20} color="#15803d" />,
    },
    warning: {
      bg: '#fef3c7',
      border: '#fde047',
      text: '#854d0e',
      icon: <AlertTriangle size={20} color="#b45309" />,
    },
    info: {
      bg: '#e0f2fe',
      border: '#7dd3fc',
      text: '#075985',
      icon: <Info size={20} color="#0284c7" />,
    },
  };

  const current = styles[variant] || styles.info;

  return (
    <div
      style={{
        backgroundColor: current.bg,
        border: `1px solid ${current.border}`,
        color: current.text,
        padding: '0.85rem 1.15rem',
        borderRadius: '10px',
        margin: '1rem 0',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '0.925rem',
        fontWeight: '500',
        lineHeight: '1.4',
      }}
    >
      <div>{current.icon}</div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
};

export default Message;
