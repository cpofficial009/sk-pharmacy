import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  CreditCard,
  CheckCircle2,
  Truck,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Message from '../components/Message';
import Loader from '../components/Loader';

const CheckoutPage = () => {
  const { user } = useAuth();
  const {
    cartItems,
    shippingAddress,
    setShippingAddress,
    paymentMethod,
    setPaymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(
    shippingAddress.fullName || user?.name || ''
  );
  const [phone, setPhone] = useState(
    shippingAddress.phone || user?.phone || ''
  );
  const [address, setAddress] = useState(
    shippingAddress.address || user?.address?.street || ''
  );
  const [city, setCity] = useState(
    shippingAddress.city || user?.address?.city || ''
  );
  const [state, setState] = useState(
    shippingAddress.state || user?.address?.state || ''
  );
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || user?.address?.postalCode || ''
  );
  const [selectedPayment, setSelectedPayment] = useState(
    paymentMethod || 'Cash on Delivery'
  );

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // If cart is empty, redirect back to cart
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName || !phone || !address || !city || !state || !postalCode) {
      setErrorMsg('Please complete all shipping address fields');
      return;
    }

    const shippingInfo = {
      fullName,
      phone,
      address,
      city,
      state,
      postalCode,
      country: 'India',
    };

    setShippingAddress(shippingInfo);
    setPaymentMethod(selectedPayment);

    const orderPayload = {
      orderItems: cartItems.map((item) => ({
        product: item.product,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
      shippingAddress: shippingInfo,
      paymentMethod: selectedPayment,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    };

    try {
      setLoading(true);
      const { data } = await api.post('/orders', orderPayload);
      clearCart();
      setLoading(false);
      navigate(`/orders/${data.order._id}`);
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || 'Failed to place order');
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem' }}>
      {/* Checkout Progress Steps */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2.5rem',
          fontSize: '0.875rem',
          fontWeight: '600',
        }}
      >
        <span style={{ color: '#0d9488', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <CheckCircle2 size={18} /> Cart
        </span>
        <ChevronRight size={16} color="#94a3b8" />
        <span
          style={{
            backgroundColor: '#0d9488',
            color: '#ffffff',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
          }}
        >
          Checkout & Shipping
        </span>
        <ChevronRight size={16} color="#94a3b8" />
        <span style={{ color: '#94a3b8' }}>Order Confirmation</span>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0d9488', fontSize: '0.875rem', fontWeight: '600' }}>
          <ArrowLeft size={16} /> Return to Cart
        </Link>
      </div>

      {errorMsg && <Message variant="danger">{errorMsg}</Message>}

      <form onSubmit={handleSubmitOrder}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: '2.5rem',
            alignItems: 'flex-start',
          }}
          className="checkout-grid"
        >
          {/* Left Form: Shipping & Payment */}
          <div>
            {/* Delivery Address Card */}
            <div
              className="card"
              style={{
                padding: '2rem',
                marginBottom: '2rem',
                borderRadius: '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  marginBottom: '1.5rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid #f1f5f9',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: '#ccfbf1',
                    color: '#0d9488',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a' }}>
                    1. Shipping & Delivery Address
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Where should we deliver your medicine order?
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Recipient's name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Contact Phone Number *</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Street Address / House No. / Building *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Flat 302, Sunrise Towers, MG Road"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Mumbai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">State *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Maharashtra"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Postal Code (PIN) *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 400001"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div
              className="card"
              style={{
                padding: '2rem',
                borderRadius: '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  marginBottom: '1.5rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid #f1f5f9',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: '#e0f2fe',
                    color: '#0284c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CreditCard size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a' }}>
                    2. Payment Method
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Select your preferred payment mode
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.85rem',
                    padding: '1rem',
                    border: `1.5px solid ${selectedPayment === 'Cash on Delivery' ? '#0d9488' : '#e2e8f0'}`,
                    borderRadius: '12px',
                    backgroundColor: selectedPayment === 'Cash on Delivery' ? '#f0fdfa' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Delivery"
                    checked={selectedPayment === 'Cash on Delivery'}
                    onChange={() => setSelectedPayment('Cash on Delivery')}
                    style={{ marginTop: '3px' }}
                  />
                  <div>
                    <div style={{ fontWeight: '700', color: '#0f172a' }}>
                      Cash on Delivery (COD)
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                      Pay via cash or UPI to the delivery executive upon arrival at your doorstep.
                    </div>
                  </div>
                </label>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.85rem',
                    padding: '1rem',
                    border: `1.5px solid ${selectedPayment === 'UPI / Online Transfer' ? '#0d9488' : '#e2e8f0'}`,
                    borderRadius: '12px',
                    backgroundColor: selectedPayment === 'UPI / Online Transfer' ? '#f0fdfa' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI / Online Transfer"
                    checked={selectedPayment === 'UPI / Online Transfer'}
                    onChange={() => setSelectedPayment('UPI / Online Transfer')}
                    style={{ marginTop: '3px' }}
                  />
                  <div>
                    <div style={{ fontWeight: '700', color: '#0f172a' }}>
                      UPI / Instant Online Payment (Google Pay, PhonePe, Paytm)
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                      Fast and zero contact digital payment with instantaneous confirmation.
                    </div>
                  </div>
                </label>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.85rem',
                    padding: '1rem',
                    border: `1.5px solid ${selectedPayment === 'Credit / Debit Card' ? '#0d9488' : '#e2e8f0'}`,
                    borderRadius: '12px',
                    backgroundColor: selectedPayment === 'Credit / Debit Card' ? '#f0fdfa' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Credit / Debit Card"
                    checked={selectedPayment === 'Credit / Debit Card'}
                    onChange={() => setSelectedPayment('Credit / Debit Card')}
                    style={{ marginTop: '3px' }}
                  />
                  <div>
                    <div style={{ fontWeight: '700', color: '#0f172a' }}>
                      Credit or Debit Card
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                      Visa, MasterCard, RuPay, and American Express accepted.
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary Card */}
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
              Order Review ({cartItems.length} items)
            </h3>

            {/* Items mini list */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                maxHeight: '220px',
                overflowY: 'auto',
                marginBottom: '1.25rem',
                paddingRight: '4px',
              }}
            >
              {cartItems.map((item) => (
                <div
                  key={item.product}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.85rem',
                    paddingBottom: '0.5rem',
                    borderBottom: '1px dashed #f1f5f9',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '32px', height: '32px', objectFit: 'contain', borderRadius: '4px' }}
                    />
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <strong style={{ color: '#0f172a' }}>{item.name}</strong>
                      <div style={{ color: '#64748b', fontSize: '0.75rem' }}>
                        Qty: {item.quantity} × ₹{item.price}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontWeight: '700', color: '#0f172a' }}>
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>Items Subtotal</span>
                <span style={{ fontWeight: '600', color: '#0f172a' }}>₹{itemsPrice}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>GST (5%)</span>
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
                  paddingTop: '0.75rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.2rem',
                  fontWeight: '800',
                  color: '#0f172a',
                }}
              >
                <span>Total Amount</span>
                <span style={{ color: '#0d9488' }}>₹{totalPrice}</span>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', borderRadius: '12px' }}
              disabled={loading}
            >
              {loading ? 'Processing Order...' : `Place Order (₹${totalPrice})`}
            </button>

            <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.75rem', color: '#64748b' }}>
              By confirming, you agree to SK Pharmacy's terms of dispense & healthcare policies.
            </div>
          </div>
        </div>
      </form>

      <style>{`
        @media (max-width: 860px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;
