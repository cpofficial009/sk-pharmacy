import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Package,
  Calendar,
  MapPin,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  User,
  Save,
} from 'lucide-react';
import api from '../../services/api';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Toast from '../../components/Toast';

const AdminOrderDetailPage = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data.order);
        setOrderStatus(data.order.orderStatus);
        setIsPaid(data.order.isPaid);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to retrieve order');
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const { data } = await api.put(`/orders/${id}/status`, {
        orderStatus,
        isPaid,
      });
      setOrder(data.order);
      setUpdating(false);
      setToast({
        show: true,
        message: 'Order status & payment records updated successfully',
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
    return <Loader text="Loading order details..." />;
  }

  if (error || !order) {
    return (
      <div className="container" style={{ padding: '3rem 1.25rem' }}>
        <Message variant="danger">{error || 'Order not found'}</Message>
        <Link to="/admin/orders" className="btn btn-outline" style={{ marginTop: '1rem' }}>
          Back to Orders
        </Link>
      </div>
    );
  }

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

      <div style={{ marginBottom: '1.5rem' }}>
        <Link
          to="/admin/orders"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0d9488', fontSize: '0.875rem', fontWeight: '600' }}
        >
          <ArrowLeft size={16} /> Back to All Orders
        </Link>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a' }}>
          Order Management: #{order._id.substring(order._id.length - 8).toUpperCase()}
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.925rem' }}>
          Inspect ordered items, review fulfillment stage, and update dispatch status
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: '2.5rem',
          alignItems: 'flex-start',
        }}
        className="admin-order-grid"
      >
        {/* Left: Items & Customer Details */}
        <div>
          {/* Order Meta Header */}
          <div
            className="card"
            style={{
              padding: '1.5rem',
              marginBottom: '1.75rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a' }}>
                  Current Status:
                </span>
                {getStatusBadge(order.orderStatus)}
              </div>
              <span style={{ fontSize: '0.825rem', color: '#64748b' }}>
                Placed: {formattedDate}
              </span>
            </div>

            <div>
              <span
                style={{
                  fontSize: '0.775rem',
                  fontWeight: '700',
                  color: order.isPaid ? '#15803d' : '#b45309',
                  backgroundColor: order.isPaid ? '#dcfce7' : '#fef3c7',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '9999px',
                }}
              >
                {order.isPaid ? 'PAYMENT RECEIVED' : 'PAYMENT PENDING'}
              </span>
            </div>
          </div>

          {/* Medicines ordered list */}
          <div className="card" style={{ padding: '1.75rem', marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.25rem' }}>
              Ordered Items ({order.orderItems.length})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {order.orderItems.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    paddingBottom: '0.85rem',
                    borderBottom: '1px solid #f1f5f9',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '54px',
                      height: '54px',
                      objectFit: 'contain',
                      borderRadius: '8px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <Link to={`/medicines/${item.product}`} target="_blank" rel="noreferrer">
                      <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>
                        {item.name}
                      </strong>
                    </Link>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      Unit Price: ₹{item.price}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      Qty: {item.quantity}
                    </div>
                    <strong style={{ fontSize: '1.05rem', color: '#0f172a' }}>
                      ₹{item.price * item.quantity}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer & Shipping information */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
            }}
          >
            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem' }}>
                <User size={18} color="#0d9488" /> Customer Information
              </div>
              <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
                <strong>{order.user?.name || order.shippingAddress.fullName}</strong><br />
                Email: {order.user?.email || 'N/A'}<br />
                Phone: {order.shippingAddress.phone}
              </p>
            </div>

            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem' }}>
                <MapPin size={18} color="#0284c7" /> Shipping Destination
              </div>
              <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
                {order.shippingAddress.address}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}<br />
                Country: {order.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Status Update Form & Financials */}
        <div>
          {/* Status update box */}
          <div
            className="card"
            style={{
              padding: '1.75rem',
              marginBottom: '1.75rem',
              backgroundColor: '#f8fafc',
            }}
          >
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.25rem' }}>
              Update Fulfillment Status
            </h3>

            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label className="form-label">Order Progress Status</label>
                <select
                  className="form-select"
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={isPaid}
                    onChange={(e) => setIsPaid(e.target.checked)}
                  />
                  Mark as Paid
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.5rem' }}
                disabled={updating}
              >
                <Save size={16} /> {updating ? 'Saving...' : 'Apply Status Update'}
              </button>
            </form>
          </div>

          {/* Pricing summary */}
          <div className="card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.25rem' }}>
              Order Financials
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: '600', color: '#0f172a' }}>₹{order.itemsPrice}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>GST (5%)</span>
                <span style={{ fontWeight: '600', color: '#0f172a' }}>₹{order.taxPrice}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>Shipping</span>
                <span style={{ fontWeight: '600', color: '#0f172a' }}>
                  {order.shippingPrice === 0 ? 'FREE' : `₹${order.shippingPrice}`}
                </span>
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
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .admin-order-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminOrderDetailPage;
