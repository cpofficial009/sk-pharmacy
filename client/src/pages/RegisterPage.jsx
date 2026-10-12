import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { UserPlus, User, Mail, Phone, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Message from '../components/Message';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long');
      return;
    }

    const result = await register({
      name,
      email,
      phone,
      password,
      role: 'user',
    });

    if (result.success) {
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(redirect);
      }
    } else {
      setErrorMsg(result.message || 'Registration failed');
    }
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 1rem',
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: '500px',
          width: '100%',
          padding: '2.5rem 2rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              backgroundColor: '#ccfbf1',
              color: '#0d9488',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
            }}
          >
            <UserPlus size={26} />
          </div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: '800', color: '#0f172a' }}>
            Create an Account
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.35rem' }}>
            Join SK Pharmacy for fast healthcare ordering
          </p>
        </div>

        {errorMsg && <Message variant="danger">{errorMsg}</Message>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Ramesh Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
                required
              />
              <User
                size={18}
                color="#94a3b8"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                className="form-input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
                required
              />
              <Mail
                size={18}
                color="#94a3b8"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <div style={{ position: 'relative' }}>
              <input
                type="tel"
                className="form-input"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
              <Phone
                size={18}
                color="#94a3b8"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Password *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                  required
                />
                <Lock
                  size={18}
                  color="#94a3b8"
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Re-type password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                  required
                />
                <Lock
                  size={18}
                  color="#94a3b8"
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.75rem', padding: '0.8rem' }}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Create Account'}
          </button>
        </form>

        <p
          style={{
            textAlign: 'center',
            fontSize: '0.875rem',
            color: '#64748b',
            marginTop: '1.5rem',
          }}
        >
          Already have an account?{' '}
          <Link
            to={redirect ? `/login?redirect=${encodeURIComponent(redirect)}` : '/login'}
            style={{ color: '#0d9488', fontWeight: '700' }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
