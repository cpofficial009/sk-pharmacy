import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { LogIn, Lock, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Message from '../components/Message';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both email and password');
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      if (result.user.role === 'admin' && redirect === '/') {
        navigate('/admin');
      } else {
        navigate(redirect);
      }
    } else {
      setErrorMsg(result.message || 'Invalid email or password');
    }
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: '460px',
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
            <LogIn size={26} />
          </div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: '800', color: '#0f172a' }}>
            Welcome Back
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.35rem' }}>
            Sign in to your SK Pharmacy account
          </p>
        </div>

        {errorMsg && <Message variant="danger">{errorMsg}</Message>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
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
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                className="form-input"
                placeholder="Enter your password"
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

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.75rem', padding: '0.8rem' }}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
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
          Don't have an account?{' '}
          <Link
            to={redirect ? `/register?redirect=${encodeURIComponent(redirect)}` : '/register'}
            style={{ color: '#0d9488', fontWeight: '700' }}
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
