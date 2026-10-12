import React from 'react';
import { Star } from 'lucide-react';

const Rating = ({ value = 4.5, text = '', size = 16 }) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            fill={value >= star ? '#f59e0b' : value >= star - 0.5 ? '#fde68a' : 'none'}
            color={value >= star - 0.5 ? '#f59e0b' : '#cbd5e1'}
          />
        ))}
      </div>
      {text && (
        <span style={{ fontSize: '0.825rem', color: '#64748b', fontWeight: '500' }}>
          {text}
        </span>
      )}
    </div>
  );
};

export default Rating;
