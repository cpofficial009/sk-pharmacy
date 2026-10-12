import React, { useState } from 'react';
import { User, Phone, MapPin, Lock, Save, Package, ShieldCheck, Mail, KeyRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Message from '../components/Message';
import Toast from '../components/Toast';

const AccountPage = () => {
  const { user, updateProfile, loading } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState(user?.address?.street || '');
  const [city, setCity] = useState(user?.address?.city || '');
  const [state, setState] = useState(user?.address?.state || '');
  const [postalCode, setPostalCode] = useState(user?.address?.postalCode || '');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password && password !== confirmPassword) {
      setErrorMsg('New passwords do not match');
      return;
    }

    if (password && password.length < 6) {
      setErrorMsg('New password must be at least 6 characters long');
      return;
    }

    const payload = {
      name,
      phone,
      address: {
        street,
        city,
        state,
        postalCode,
      },
    };

    if (password) {
      payload.password = password;
    }

    const res = await updateProfile(payload);
    if (res.success) {
      setPassword('');
      setConfirmPassword('');
      setToast({
        show: true,
        message: 'Account details updated successfully!',
        type: 'success',
      });
    } else {
      setErrorMsg(res.message || 'Failed to update account');
    }
  };

  return (
    <div style={{ maxWidth: '920px', margin: '0 auto' }}>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: 'success' })}
        />
      )}

      {/* Account Page Header */}
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
          <span className="section-tag">Patient Profile</span>
          <h1 style={{ fontSize: '2.1rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.02em' }}>
            My Account
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Manage your personal medical profile, saved delivery addresses, and account credentials
          </p>
        </div>

        <Link
          to="/orders"
          className="btn btn-outline"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Package size={17} color="#0f766e" /> View My Orders
        </Link>
      </div>

      {errorMsg && <Message variant="danger">{errorMsg}</Message>}

      {/* Account Hero Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #042f2e 0%, #0f766e 50%, #0369a1 100%)',
          borderRadius: '20px',
          padding: '2rem',
          color: '#ffffff',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          boxShadow: '0 12px 30px -8px rgba(15, 118, 110, 0.35)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '18px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.85rem',
              fontWeight: '800',
            }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.2rem' }}>
              {user?.name}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: '#ccfbf1' }}>
              <span>{user?.email}</span>
              <span>•</span>
              <span>{user?.phone || 'No phone set'}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: '800',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              backgroundColor: user?.role === 'admin' ? '#fef3c7' : '#ccfbf1',
              color: user?.role === 'admin' ? '#92400e' : '#042f2e',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {user?.role === 'admin' ? '🛡️ Administrator Account' : '🌿 Verified Customer'}
          </span>
        </div>
      </div>

      {/* Main Settings Form Card */}
      <div className="card" style={{ padding: '2.5rem 2rem' }}>
        <form onSubmit={handleSubmit}>
          {/* Section 1: Contact info */}
          <div style={{ marginBottom: '2rem' }}>
            <h3
              style={{
                fontSize: '1.15rem',
                fontWeight: '800',
                color: '#0f172a',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <User size={19} color="#0f766e" /> Contact Information
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address (Registered)</label>
                <input
                  type="email"
                  className="form-input"
                  value={user?.email || ''}
                  disabled
                  style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Mobile Phone Number</label>
              <input
                type="tel"
                className="form-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          {/* Section 2: Delivery address */}
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.75rem', marginBottom: '2rem' }}>
            <h3
              style={{
                fontSize: '1.15rem',
                fontWeight: '800',
                color: '#0f172a',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <MapPin size={19} color="#0f766e" /> Default Medicine Delivery Address
            </h3>

            <div className="form-group">
              <label className="form-label">Street / Apartment / House Address</label>
              <input
                type="text"
                className="form-input"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="e.g. Flat 402, Green Valley Enclave, MG Road"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Mumbai"
                />
              </div>

              <div className="form-group">
                <label className="form-label">State</label>
                <input
                  type="text"
                  className="form-input"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="e.g. Maharashtra"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Postal Code (PIN)</label>
                <input
                  type="text"
                  className="form-input"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="e.g. 400001"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Password change */}
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.75rem', marginBottom: '2rem' }}>
            <h3
              style={{
                fontSize: '1.15rem',
                fontWeight: '800',
                color: '#0f172a',
                marginBottom: '0.35rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <KeyRound size={19} color="#0f766e" /> Change Password
            </h3>
            <p style={{ fontSize: '0.825rem', color: '#64748b', marginBottom: '1.25rem' }}>
              Leave these fields blank if you do not want to alter your password.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="New password (optional)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loading}
              style={{ padding: '0.85rem 2.25rem' }}
            >
              <Save size={18} /> {loading ? 'Saving Account...' : 'Save Account Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountPage;

