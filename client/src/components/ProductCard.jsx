import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Rating from './Rating';

const ProductCard = ({ product, onToast }) => {
  const { addToCart } = useCart();

  const finalPrice =
    product.discount > 0
      ? Math.round(product.price * (1 - product.discount / 100))
      : product.price;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = addToCart(product, 1);
    if (onToast) {
      onToast(result.message, result.success ? 'success' : 'error');
    }
  };

  const isOutOfStock = product.stock <= 0;

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '18px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
      }}
      className="medicine-card"
    >
      {/* Top badges */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          zIndex: 2,
        }}
      >
        {product.discount > 0 && (
          <span
            style={{
              backgroundColor: '#ef4444',
              color: '#ffffff',
              fontSize: '0.725rem',
              fontWeight: '800',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              boxShadow: '0 2px 6px rgba(239, 68, 68, 0.3)',
            }}
          >
            {product.discount}% OFF
          </span>
        )}
        {product.requiresPrescription && (
          <span
            style={{
              backgroundColor: '#fff1f2',
              color: '#be123c',
              fontSize: '0.675rem',
              fontWeight: '700',
              padding: '0.2rem 0.55rem',
              borderRadius: '9999px',
              border: '1px solid #fecdd3',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            <FileText size={11} /> Rx Required
          </span>
        )}
      </div>

      {/* Image container */}
      <Link
        to={`/medicines/${product._id}`}
        style={{
          height: '190px',
          backgroundColor: '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          padding: '1rem',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            transition: 'transform 0.35s ease',
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60';
          }}
        />
      </Link>

      {/* Content */}
      <div
        style={{
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {/* Brand & Category */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.35rem',
          }}
        >
          <span
            style={{
              fontSize: '0.725rem',
              fontWeight: '800',
              color: '#0f766e',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {product.brand}
          </span>
          <span
            style={{
              fontSize: '0.725rem',
              color: '#64748b',
              backgroundColor: '#f1f5f9',
              padding: '0.15rem 0.5rem',
              borderRadius: '9999px',
              fontWeight: '600',
            }}
          >
            {product.category}
          </span>
        </div>

        {/* Medicine Name */}
        <Link to={`/medicines/${product._id}`}>
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: '800',
              color: '#0f172a',
              marginBottom: '0.35rem',
              lineHeight: 1.35,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.7rem',
              transition: 'color 0.15s',
            }}
            title={product.name}
          >
            {product.name}
          </h3>
        </Link>

        {/* Dosage Pill */}
        <div style={{ marginBottom: '0.65rem' }}>
          <span
            style={{
              fontSize: '0.75rem',
              color: '#334155',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '0.2rem 0.55rem',
              borderRadius: '6px',
              fontWeight: '600',
              display: 'inline-block',
            }}
          >
            💊 {product.dosage}
          </span>
        </div>

        {/* Rating */}
        <div style={{ marginBottom: '0.85rem' }}>
          <Rating value={product.rating || 4.5} text={`(${product.numReviews || 12})`} size={13} />
        </div>

        {/* Price & Action Row */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '0.85rem',
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <span
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '800',
                  color: '#0f172a',
                }}
              >
                ₹{finalPrice}
              </span>
              {product.discount > 0 && (
                <span
                  style={{
                    fontSize: '0.825rem',
                    color: '#94a3b8',
                    textDecoration: 'line-through',
                  }}
                >
                  ₹{product.price}
                </span>
              )}
            </div>

            <div style={{ fontSize: '0.725rem', marginTop: '2px' }}>
              {isOutOfStock ? (
                <span style={{ color: '#ef4444', fontWeight: '700' }}>● Out of Stock</span>
              ) : product.stock <= 10 ? (
                <span style={{ color: '#d97706', fontWeight: '700' }}>● Low: {product.stock} Left</span>
              ) : (
                <span style={{ color: '#16a34a', fontWeight: '700' }}>● In Stock</span>
              )}
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            title={isOutOfStock ? 'Currently out of stock' : 'Add to cart'}
            style={{
              padding: '0.5rem 0.95rem',
              borderRadius: '10px',
              fontSize: '0.85rem',
            }}
          >
            <ShoppingBag size={15} /> Add
          </button>
        </div>
      </div>

      <style>{`
        .medicine-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px -6px rgba(15, 118, 110, 0.16);
          border-color: #99f6e4;
        }
        .medicine-card:hover img {
          transform: scale(1.06);
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
