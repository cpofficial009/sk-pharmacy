import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import Toast from '../components/Toast';

const CartPage = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = useCart();
  const navigate = useNavigate();

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const handleQtyUpdate = (productId, newQty) => {
    const res = updateQuantity(productId, newQty);
    if (!res.success) {
      setToast({ show: true, message: res.message, type: 'error' });
    }
  };

  const handleProceed = () => {
    navigate('/checkout');
  };

  const freeDeliveryThreshold = 500;
  const amountNeededForFree = Math.max(0, freeDeliveryThreshold - itemsPrice);
  const deliveryProgress = Math.min(100, (itemsPrice / freeDeliveryThreshold) * 100);

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '5rem 1.25rem', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '480px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            padding: '3rem 2rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
          }}
        >
          <div
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              backgroundColor: '#ccfbf1',
              color: '#0d9488',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}
          >
            <ShoppingBag size={34} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem', color: '#0f172a' }}>
            Your Cart is Empty
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem' }}>
            You haven't added any medicines or healthcare supplies yet. Explore our wide range of products!
          </p>
          <Link to="/medicines" className="btn btn-primary" style={{ padding: '0.8rem 1.75rem' }}>
            Browse Medicines <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem' }}>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: 'success' })}
        />
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a' }}>
            Shopping Cart
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.925rem' }}>
            You have {cartItems.length} items in your order bag
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="btn btn-outline btn-sm"
          style={{ color: '#ef4444', borderColor: '#fca5a5' }}
        >
          <Trash2 size={15} /> Clear Entire Cart
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: '2.5rem',
          alignItems: 'flex-start',
        }}
        className="cart-grid"
      >
        {/* Left: Cart Items List */}
        <div>
          {/* Free delivery tracker */}
          <div
            style={{
              backgroundColor: '#f0fdfa',
              border: '1px solid #99f6e4',
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Truck size={18} color="#0d9488" />
              <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#0f766e' }}>
                {amountNeededForFree > 0
                  ? `Add ₹${amountNeededForFree} more to enjoy FREE Delivery!`
                  : '🎉 Congratulations! You have unlocked FREE Delivery!'}
              </span>
            </div>
            <div
              style={{
                width: '100%',
                height: '6px',
                backgroundColor: '#ccfbf1',
                borderRadius: '9999px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${deliveryProgress}%`,
                  height: '100%',
                  backgroundColor: '#0d9488',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>

          {/* Items Table / Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cartItems.map((item) => (
              <div
                key={item.product}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                }}
                className="cart-item-card"
              >
                {/* Thumbnail */}
                <Link
                  to={`/medicines/${item.product}`}
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </Link>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#0d9488', textTransform: 'uppercase' }}>
                    {item.brand}
                  </span>
                  <Link to={`/medicines/${item.product}`}>
                    <h4
                      style={{
                        fontSize: '0.975rem',
                        fontWeight: '700',
                        color: '#0f172a',
                        margin: '0.2rem 0',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.name}
                    </h4>
                  </Link>
                  <div style={{ fontSize: '0.775rem', color: '#64748b' }}>
                    Dosage: {item.dosage}
                  </div>
                  <div style={{ fontSize: '0.875rem', fontWeight: '700', color: '#0f172a', marginTop: '0.25rem' }}>
                    ₹{item.price} each
                  </div>
                </div>

                {/* Quantity Controls */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    flexShrink: 0,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleQtyUpdate(item.product, item.quantity - 1)}
                    style={{
                      border: 'none',
                      background: 'none',
                      padding: '0.4rem 0.6rem',
                      cursor: 'pointer',
                      color: '#475569',
                    }}
                  >
                    <Minus size={14} />
                  </button>
                  <span
                    style={{
                      padding: '0.4rem 0.6rem',
                      fontSize: '0.875rem',
                      fontWeight: '700',
                      minWidth: '28px',
                      textAlign: 'center',
                    }}
                  >
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQtyUpdate(item.product, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                    style={{
                      border: 'none',
                      background: 'none',
                      padding: '0.4rem 0.6rem',
                      cursor: item.quantity >= item.stock ? 'not-allowed' : 'pointer',
                      color: '#475569',
                    }}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Subtotal */}
                <div style={{ textAlign: 'right', minWidth: '80px', flexShrink: 0 }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a' }}>
                    ₹{item.price * item.quantity}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      fontSize: '0.775rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px',
                      marginTop: '4px',
                    }}
                  >
                    <Trash2 size={13} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <Link to="/medicines" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} /> Add More Medicines
            </Link>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '1.75rem',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            position: 'sticky',
            top: '90px',
          }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.25rem' }}>
            Order Summary
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem', fontSize: '0.925rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
              <span>Items Total</span>
              <span style={{ fontWeight: '600', color: '#0f172a' }}>₹{itemsPrice}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
              <span>GST & Taxes (5%)</span>
              <span style={{ fontWeight: '600', color: '#0f172a' }}>₹{taxPrice}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
              <span>Delivery Charge</span>
              {shippingPrice === 0 ? (
                <span style={{ fontWeight: '700', color: '#16a34a' }}>FREE</span>
              ) : (
                <span style={{ fontWeight: '600', color: '#0f172a' }}>₹{shippingPrice}</span>
              )}
            </div>

            <div
              style={{
                borderTop: '1px solid #e2e8f0',
                paddingTop: '0.85rem',
                marginTop: '0.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.15rem',
                fontWeight: '800',
                color: '#0f172a',
              }}
            >
              <span>Total Payable</span>
              <span style={{ color: '#0d9488' }}>₹{totalPrice}</span>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleProceed}
            style={{ width: '100%', padding: '0.85rem', fontSize: '1rem' }}
          >
            Proceed to Checkout <ArrowRight size={18} />
          </button>

          <div
            style={{
              marginTop: '1.5rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid #f1f5f9',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              fontSize: '0.775rem',
              color: '#64748b',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={16} color="#0d9488" /> 100% Secure Checkout Guarantee
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <RotateCcw size={16} color="#0d9488" /> Easy 7-day cancellation / return
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .cart-grid {
            grid-template-columns: 1fr !important;
          }
          .cart-item-card {
            flex-wrap: wrap !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CartPage;
