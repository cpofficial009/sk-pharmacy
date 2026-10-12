import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Package,
  Calendar,
  MapPin,
  CreditCard,
  CheckCircle2,
  Clock,
  Truck,
  ArrowLeft,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Toast from '../components/Toast';

const OrderDetailPage = () => {
  const { id } = useParams();
  const { isAdmin } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updateStatus, setUpdateStatus] = useState('');
  const [updating, setUpdating] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data.order);
        setUpdateStatus(data.order.orderStatus);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to retrieve order details');
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const { data } = await api.put(`/orders/${id}/status`, {
        orderStatus: updateStatus,
      });
      setOrder(data.order);
      setUpdating(false);
      setToast({
        show: true,
        message: `Order status updated to ${data.order.orderStatus}`,
        type: 'success',
      });
    } catch (err) {
      setUpdating(false);
      setToast({
        show: true,
        message: err.message || 'Failed to update order status',
        type: 'error',
      });
    }
  };

  const getStatusBadge = (status) => {
    const classes = {
      Pending: 'badge-pending',
      Confirmed: 'badge-confirmed',
      Processing: 'badge-processing',
      Shipped: 'badge-shipped',
      Delivered: 'badge-delivered',
      Cancelled: 'badge-cancelled',
    };
    return <span className={`badge ${classes[status] || 'badge-pending'}`}>{status}</span>;
  };

  if (loading) {
    return <Loader text="Loading order information..." />;
  }

  if (error || !order) {
    return (
      <div className="container" style={{ padding: '3rem 1.25rem' }}>
        <Message variant="danger">{error || 'Order not found'}</Message>
        <Link to="/orders" className="btn btn-outline" style={{ marginTop: '1rem' }}>
          Back to My Orders
        </Link>
      </div>
    );
  }

  const steps = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered'];
  const currentStepIdx = steps.indexOf(order.orderStatus);
  const isCancelled = order.orderStatus === 'Cancelled';

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem' }}>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: 'success' })}
        />
      )}

      {/* Header back button */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Link
          to={isAdmin ? '/admin/orders' : '/orders'}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0d9488', fontSize: '0.875rem', fontWeight: '600' }}
        >
          <ArrowLeft size={16} /> Back to {isAdmin ? 'All Orders (Admin)' : 'My Orders'}
        </Link>
      </div>

      {/* Order Top Bar */}
      <div
        className="card"
        style={{
          padding: '1.75rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>
              Order #{order._id.substring(order._id.length - 8).toUpperCase()}
            </h1>
            {getStatusBadge(order.orderStatus)}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <span>Placed on: <strong>{formattedDate}</strong></span>
            <span>•</span>
            <span>Customer: <strong>{order.shippingAddress.fullName}</strong></span>
          </div>
        </div>

        {/* Admin Quick Status Control */}
        {isAdmin && (
          <form onSubmit={handleStatusUpdate} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <select
              className="form-select"
              value={updateStatus}
              onChange={(e) => setUpdateStatus(e.target.value)}
              style={{ width: 'auto', padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={updating || updateStatus === order.orderStatus}
            >
              {updating ? 'Updating...' : 'Update Status'}
            </button>
          </form>
        )}
      </div>

      {/* Visual Order Timeline Tracker */}
      <div
        className="card"
        style={{
          padding: '2rem',
          marginBottom: '2rem',
        }}
      >
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.5rem' }}>
          Order Progress Tracker
        </h3>

        {isCancelled ? (
          <div
            style={{
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              padding: '1rem 1.25rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <AlertTriangle size={22} color="#ef4444" />
            <div>
              <strong>Order Cancelled:</strong> This order has been cancelled and returned to inventory.
            </div>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
              gap: '0.5rem',
              position: 'relative',
            }}
            className="tracker-steps"
          >
            {steps.map((step, idx) => {
              const isCompleted = currentStepIdx >= idx;
              const isCurrent = currentStepIdx === idx;

              return (
                <div
                  key={step}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: isCompleted ? '#0d9488' : '#e2e8f0',
                      color: isCompleted ? '#ffffff' : '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: '0.875rem',
                      marginBottom: '0.5rem',
                      boxShadow: isCurrent ? '0 0 0 4px #ccfbf1' : 'none',
                      transition: 'all 0.3s',
                    }}
                  >
                    {isCompleted ? <CheckCircle2 size={20} /> : idx + 1}
                  </div>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: isCompleted ? '700' : '500',
                      color: isCompleted ? '#0f172a' : '#94a3b8',
                    }}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Order Info & Items Breakdown */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: '2rem',
          alignItems: 'flex-start',
        }}
        className="order-detail-grid"
      >
        {/* Left: Ordered Medicines Items */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.25rem' }}>
            Prescription & Medicines Ordered
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {order.orderItems.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #f1f5f9',
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '64px',
                    height: '64px',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc',
                    padding: '4px',
                    border: '1px solid #e2e8f0',
                  }}
                />
                <div style={{ flex: 1 }}>
                  <Link to={`/medicines/${item.product}`}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>
                      {item.name}
                    </h4>
                  </Link>
                  <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Unit Price: ₹{item.price}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    Qty: {item.quantity}
                  </span>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a' }}>
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery & Payment Info Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
              marginTop: '1.5rem',
            }}
          >
            <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>
                <MapPin size={16} color="#0d9488" /> Delivery Address
              </div>
              <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                <strong>{order.shippingAddress.fullName}</strong><br />
                {order.shippingAddress.address}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}<br />
                Phone: {order.shippingAddress.phone}
              </p>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>
                <CreditCard size={16} color="#0284c7" /> Payment Details
              </div>
              <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                Method: <strong>{order.paymentMethod}</strong><br />
                Status:{' '}
                <span style={{ fontWeight: '700', color: order.isPaid ? '#15803d' : '#b45309' }}>
                  {order.isPaid ? 'PAID' : 'PENDING'}
                </span>
                {order.paidAt && (
                  <>
                    <br />
                    Paid on: {new Date(order.paidAt).toLocaleDateString('en-IN')}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Price Summary */}
        <div
          className="card"
          style={{
            padding: '1.75rem',
            position: 'sticky',
            top: '90px',
          }}
        >
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.25rem' }}>
            Amount Breakdown
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
              <span>Items Subtotal</span>
              <span style={{ fontWeight: '600', color: '#0f172a' }}>₹{order.itemsPrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
              <span>GST & Tax (5%)</span>
              <span style={{ fontWeight: '600', color: '#0f172a' }}>₹{order.taxPrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
              <span>Delivery Fee</span>
              {order.shippingPrice === 0 ? (
                <span style={{ fontWeight: '700', color: '#16a34a' }}>FREE</span>
              ) : (
                <span style={{ fontWeight: '600', color: '#0f172a' }}>₹{order.shippingPrice}</span>
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
              <span style={{ color: '#0d9488' }}>₹{order.totalPrice}</span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#f0fdfa',
              border: '1px solid #99f6e4',
              borderRadius: '10px',
              padding: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.775rem',
              color: '#0f766e',
            }}
          >
            <ShieldCheck size={18} />
            <span>Official digital invoice issued by SK Pharmacy Retail Ltd.</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .order-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderDetailPage;
