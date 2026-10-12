import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Clock, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../services/api';
import Loader from '../components/Loader';
import Message from '../components/Message';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/orders/myorders');
        setOrders(data.orders || []);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch your orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
    return <Loader text="Retrieving your orders..." />;
  }

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a' }}>
          My Order History
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.925rem' }}>
          Track and view details of your previous medicine orders
        </p>
      </div>

      {error && <Message variant="danger">{error}</Message>}

      {orders.length === 0 ? (
        <div
          className="card"
          style={{
            textAlign: 'center',
            padding: '4rem 1.5rem',
            maxWidth: '520px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#ccfbf1',
              color: '#0d9488',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
            }}
          >
            <Package size={30} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: '#0f172a' }}>
            No Orders Placed Yet
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
            You haven't placed any medicine orders with SK Pharmacy so far.
          </p>
          <Link to="/medicines" className="btn btn-primary">
            Explore Medicine Catalog
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {orders.map((order) => {
            const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={order._id}
                className="card"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                }}
              >
                {/* Left: Info & Items Preview */}
                <div style={{ flex: '1 1 300px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.65rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span style={{ fontWeight: '800', color: '#0f172a', fontSize: '1.05rem' }}>
                      Order #{order._id.substring(order._id.length - 8).toUpperCase()}
                    </span>
                    {getStatusBadge(order.orderStatus)}
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: order.isPaid ? '#15803d' : '#b45309',
                        backgroundColor: order.isPaid ? '#dcfce7' : '#fef3c7',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '9999px',
                      }}
                    >
                      {order.isPaid ? 'PAID' : 'PAYMENT PENDING'}
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      fontSize: '0.825rem',
                      color: '#64748b',
                      marginBottom: '1rem',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={14} /> {formattedDate}
                    </span>
                    <span>•</span>
                    <span>Payment: {order.paymentMethod}</span>
                  </div>

                  {/* Thumbnail Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {order.orderItems.map((item, idx) => (
                      <div
                        key={idx}
                        title={`${item.name} (${item.quantity}x)`}
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          backgroundColor: '#f8fafc',
                          padding: '2px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        />
                        {item.quantity > 1 && (
                          <span
                            style={{
                              position: 'absolute',
                              bottom: '-4px',
                              right: '-4px',
                              backgroundColor: '#0d9488',
                              color: '#ffffff',
                              fontSize: '0.65rem',
                              fontWeight: '700',
                              borderRadius: '50%',
                              width: '16px',
                              height: '16px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {item.quantity}
                          </span>
                        )}
                      </div>
                    ))}
                    <span style={{ fontSize: '0.825rem', color: '#64748b', marginLeft: '0.35rem' }}>
                      ({order.orderItems.reduce((acc, i) => acc + i.quantity, 0)} total medicines)
                    </span>
                  </div>
                </div>

                {/* Right: Total Amount & Action */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    textAlign: 'right',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>Total Paid</span>
                    <strong style={{ fontSize: '1.35rem', color: '#0f172a' }}>₹{order.totalPrice}</strong>
                  </div>

                  <Link
                    to={`/orders/${order._id}`}
                    className="btn btn-outline btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    View Details <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
