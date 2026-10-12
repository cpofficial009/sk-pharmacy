import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Search,
  Filter,
  ChevronRight,
  Calendar,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import api from '../../services/api';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Toast from '../../components/Toast';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/orders');
      setOrders(data.orders || []);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to retrieve orders');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { orderStatus: newStatus });
      setToast({
        show: true,
        message: `Order status updated to ${newStatus}`,
        type: 'success',
      });
      fetchOrders();
    } catch (err) {
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

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === 'All' || order.orderStatus === statusFilter;
    const customerName = order.user?.name || order.shippingAddress?.fullName || '';
    const customerEmail = order.user?.email || '';
    const matchesSearch =
      customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
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
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a' }}>
          Customer Orders Management
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.925rem' }}>
          Track fulfillment status, verify prescriptions, and dispatch medicines
        </p>
      </div>

      {error && <Message variant="danger">{error}</Message>}

      {/* Filter and Search Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: '260px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            padding: '0.65rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
          }}
        >
          <Search size={18} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search by customer name, email, or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              fontSize: '0.9rem',
              color: '#0f172a',
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>
            Status:
          </label>
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: 'auto', padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
          >
            <option value="All">All Orders ({orders.length})</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {loading ? (
        <Loader text="Loading customer orders..." />
      ) : (
        <div
          className="card"
          style={{
            padding: 0,
            overflow: 'hidden',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                fontSize: '0.875rem',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  <th style={{ padding: '0.85rem 1rem' }}>Order ID</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Customer</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Date Placed</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Total Amount</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Payment</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Update Status</th>
                  <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ padding: '2.5rem', textAlign: 'center', color: '#64748b' }}>
                      No orders matching current criteria.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    });

                    return (
                      <tr
                        key={order._id}
                        style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.15s' }}
                      >
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <strong style={{ color: '#0f172a' }}>
                            #{order._id.substring(order._id.length - 8).toUpperCase()}
                          </strong>
                          <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>
                            {order.orderItems.length} items
                          </span>
                        </td>

                        <td style={{ padding: '0.85rem 1rem' }}>
                          <div style={{ fontWeight: '600', color: '#0f172a' }}>
                            {order.user?.name || order.shippingAddress?.fullName || 'User'}
                          </div>
                          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                            {order.user?.email || order.shippingAddress?.phone}
                          </span>
                        </td>

                        <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>
                          {formattedDate}
                        </td>

                        <td style={{ padding: '0.85rem 1rem' }}>
                          <strong style={{ color: '#0f172a' }}>₹{order.totalPrice}</strong>
                        </td>

                        <td style={{ padding: '0.85rem 1rem' }}>
                          <span
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: '700',
                              color: order.isPaid ? '#15803d' : '#b45309',
                              backgroundColor: order.isPaid ? '#dcfce7' : '#fef3c7',
                              padding: '0.15rem 0.5rem',
                              borderRadius: '9999px',
                            }}
                          >
                            {order.isPaid ? 'PAID' : 'PENDING'}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginTop: '2px' }}>
                            {order.paymentMethod}
                          </span>
                        </td>

                        <td style={{ padding: '0.85rem 1rem' }}>
                          <select
                            className="form-select"
                            value={order.orderStatus}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            style={{
                              width: 'auto',
                              padding: '0.3rem 0.6rem',
                              fontSize: '0.8rem',
                              fontWeight: '600',
                            }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>

                        <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                          <Link
                            to={`/admin/orders/${order._id}`}
                            className="btn btn-outline btn-sm"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            Details <ChevronRight size={14} />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
