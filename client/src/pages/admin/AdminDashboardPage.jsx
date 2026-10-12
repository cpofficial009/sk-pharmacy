import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Package,
  Pill,
  Users,
  AlertTriangle,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import api from '../../services/api';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/users/dashboard/stats');
        setStats(data.stats);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to retrieve administrative metrics');
        setLoading(false);
      }
    };

    fetchStats();
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
    return <Loader text="Loading administrative dashboard..." />;
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <span className="section-tag">Executive Overview</span>
        <h1 style={{ fontSize: '2.1rem', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.025em' }}>
          Operations Dashboard
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
          Live monitoring of sales revenue, inventory levels, order dispatch, and customer accounts
        </p>
      </div>

      {error && <Message variant="danger">{error}</Message>}

      {stats && (
        <>
          {/* 4 Metric Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2rem',
            }}
          >
            {/* Total Revenue */}
            <div className="card" style={{ padding: '1.75rem', borderLeft: '4px solid #10b981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '0.785rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Total Sales / Revenue
                  </span>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: '#0f172a', margin: '0.35rem 0' }}>
                    ₹{stats.totalRevenue.toLocaleString('en-IN')}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: '700' }}>
                    ● Non-cancelled orders
                  </span>
                </div>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    backgroundColor: '#dcfce7',
                    color: '#15803d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TrendingUp size={24} />
                </div>
              </div>
            </div>

            {/* Total Orders */}
            <div className="card" style={{ padding: '1.75rem', borderLeft: '4px solid #0284c7' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '0.785rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Total Orders Placed
                  </span>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: '#0f172a', margin: '0.35rem 0' }}>
                    {stats.totalOrders}
                  </div>
                  <Link to="/admin/orders" style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: '700' }}>
                    Manage orders →
                  </Link>
                </div>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    backgroundColor: '#e0f2fe',
                    color: '#0284c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Package size={24} />
                </div>
              </div>
            </div>

            {/* Total Products */}
            <div className="card" style={{ padding: '1.75rem', borderLeft: '4px solid #0f766e' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '0.785rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Medicines In Catalog
                  </span>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: '#0f172a', margin: '0.35rem 0' }}>
                    {stats.totalProducts}
                  </div>
                  <Link to="/admin/products" style={{ fontSize: '0.75rem', color: '#0f766e', fontWeight: '700' }}>
                    View inventory →
                  </Link>
                </div>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    backgroundColor: '#ccfbf1',
                    color: '#0f766e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Pill size={24} />
                </div>
              </div>
            </div>

            {/* Total Users */}
            <div className="card" style={{ padding: '1.75rem', borderLeft: '4px solid #8b5cf6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '0.785rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Registered Users
                  </span>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: '#0f172a', margin: '0.35rem 0' }}>
                    {stats.totalUsers}
                  </div>
                  <Link to="/admin/users" style={{ fontSize: '0.75rem', color: '#8b5cf6', fontWeight: '700' }}>
                    View accounts →
                  </Link>
                </div>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    backgroundColor: '#f3e8ff',
                    color: '#7c3aed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Users size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Status Breakdown Pills */}
          <div
            className="card"
            style={{
              padding: '1.75rem',
              marginBottom: '2rem',
            }}
          >
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.25rem' }}>
              Orders Status Distribution
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '0.85rem',
              }}
            >
              <div style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #fde68a' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#92400e', textTransform: 'uppercase' }}>Pending</span>
                <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#78350f', marginTop: '4px' }}>
                  {stats.statusCounts.Pending}
                </div>
              </div>
              <div style={{ backgroundColor: '#e0f2fe', padding: '1rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #bae6fd' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#0369a1', textTransform: 'uppercase' }}>Confirmed</span>
                <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#075985', marginTop: '4px' }}>
                  {stats.statusCounts.Confirmed}
                </div>
              </div>
              <div style={{ backgroundColor: '#f3e8ff', padding: '1rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #e9d5ff' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#6b21a8', textTransform: 'uppercase' }}>Processing</span>
                <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#581c87', marginTop: '4px' }}>
                  {stats.statusCounts.Processing}
                </div>
              </div>
              <div style={{ backgroundColor: '#e0e7ff', padding: '1rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #c7d2fe' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#4338ca', textTransform: 'uppercase' }}>Shipped</span>
                <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#3730a3', marginTop: '4px' }}>
                  {stats.statusCounts.Shipped}
                </div>
              </div>
              <div style={{ backgroundColor: '#dcfce7', padding: '1rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #bbf7d0' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#15803d', textTransform: 'uppercase' }}>Delivered</span>
                <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#166534', marginTop: '4px' }}>
                  {stats.statusCounts.Delivered}
                </div>
              </div>
              <div style={{ backgroundColor: '#fee2e2', padding: '1rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #fecaca' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#b91c1c', textTransform: 'uppercase' }}>Cancelled</span>
                <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#991b1b', marginTop: '4px' }}>
                  {stats.statusCounts.Cancelled}
                </div>
              </div>
            </div>
          </div>

          {/* Low Stock Alerts & Recent Orders */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '2rem',
            }}
          >
            {/* Low Stock Alerts Table */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertTriangle size={20} color="#d97706" />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a' }}>
                    Low Stock Alerts
                  </h3>
                </div>
                <Link to="/admin/products" style={{ fontSize: '0.8rem', color: '#0f766e', fontWeight: '700' }}>
                  View Catalog
                </Link>
              </div>

              {stats.lowStockProducts.length === 0 ? (
                <div style={{ color: '#16a34a', fontSize: '0.9rem', padding: '1.25rem', textAlign: 'center', backgroundColor: '#f0fdf4', borderRadius: '12px' }}>
                  ✓ All medicine formulations are currently well-stocked.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {stats.lowStockProducts.map((prod) => (
                    <div
                      key={prod._id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.85rem',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img
                          src={prod.image}
                          alt={prod.name}
                          style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '8px' }}
                        />
                        <div>
                          <strong style={{ fontSize: '0.9rem', color: '#0f172a', display: 'block' }}>
                            {prod.name}
                          </strong>
                          <span style={{ fontSize: '0.775rem', color: '#64748b' }}>
                            {prod.brand} • ₹{prod.price}
                          </span>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span
                          className={`badge ${prod.stock === 0 ? 'badge-outofstock' : 'badge-lowstock'}`}
                        >
                          {prod.stock === 0 ? 'OUT OF STOCK' : `${prod.stock} LEFT`}
                        </span>
                        <Link
                          to={`/admin/products/edit/${prod._id}`}
                          style={{ display: 'block', fontSize: '0.75rem', color: '#0284c7', marginTop: '3px', fontWeight: '700' }}
                        >
                          Restock →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Orders Table */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a' }}>
                  Recent Orders
                </h3>
                <Link to="/admin/orders" style={{ fontSize: '0.8rem', color: '#0f766e', fontWeight: '700' }}>
                  View All Orders
                </Link>
              </div>

              {stats.recentOrders.length === 0 ? (
                <div style={{ color: '#64748b', fontSize: '0.9rem', textAlign: 'center', padding: '1.25rem' }}>
                  No customer orders received yet.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {stats.recentOrders.map((ord) => (
                    <div
                      key={ord._id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.85rem',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>
                          #{ord._id.substring(ord._id.length - 6).toUpperCase()}
                        </strong>
                        <span style={{ fontSize: '0.775rem', color: '#64748b', display: 'block' }}>
                          {ord.user ? ord.user.name : 'Customer'} • ₹{ord.totalPrice}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {getStatusBadge(ord.orderStatus)}
                        <Link
                          to={`/admin/orders/${ord._id}`}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '0.3rem 0.6rem' }}
                        >
                          <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboardPage;
