import React from 'react';
import { Link } from 'react-router-dom';
import { Pill, Phone, Mail, MapPin, ShieldCheck, HeartPulse, Clock, Award } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#ffffff',
        color: '#475569',
        paddingTop: '3.5rem',
        marginTop: '4rem',
        borderTop: '3px solid #0d9488',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.02)',
      }}
    >
      <div className="container">
        {/* Value Highlights (Clean Light Cards) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid #e2ece9',
            marginBottom: '2.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: '#f0fdf9',
                color: '#0d9488',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '1px solid #ccfbf1',
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>100% Genuine</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Direct from certified pharma brands</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: '#f0fdf9',
                color: '#0d9488',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '1px solid #ccfbf1',
              }}
            >
              <Clock size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>Fast Delivery</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Express doorstep dispatch</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: '#f0fdf9',
                color: '#0d9488',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '1px solid #ccfbf1',
              }}
            >
              <Award size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>Licensed Pharmacists</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Verified prescriptions & doses</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: '#fef3c7',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '1px solid #fde68a',
              }}
            >
              <HeartPulse size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>Healthcare Support</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>24/7 dedicated customer care</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            paddingBottom: '3rem',
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#0d9488',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <Pill size={20} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>
                SK <span style={{ color: '#0d9488' }}>Pharmacy</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1rem' }}>
              Your trusted neighborhood digital pharmacy. Delivering authentic pharmaceuticals,
              chronic care medicines, wellness products, and healthcare essentials right to your doorstep.
            </p>
            <div style={{ fontSize: '0.8rem', color: '#0d9488', fontWeight: '600' }}>
              Drug License No: <strong>DL-MH-2024-99882X</strong>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.25rem' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: 0 }}>
              <li>
                <Link to="/" style={{ color: '#475569', fontSize: '0.875rem', transition: 'color 0.2s' }}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/medicines" style={{ color: '#475569', fontSize: '0.875rem' }}>
                  All Medicines
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: '#475569', fontSize: '0.875rem' }}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: '#475569', fontSize: '0.875rem' }}>
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link to="/cart" style={{ color: '#475569', fontSize: '0.875rem' }}>
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.25rem' }}>
              Popular Categories
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: 0 }}>
              <li>
                <Link to="/medicines?category=Pain%20Relief" style={{ color: '#475569', fontSize: '0.875rem' }}>
                  Pain Relief
                </Link>
              </li>
              <li>
                <Link to="/medicines?category=Antibiotics" style={{ color: '#475569', fontSize: '0.875rem' }}>
                  Antibiotics
                </Link>
              </li>
              <li>
                <Link to="/medicines?category=Cold%20%26%20Cough" style={{ color: '#475569', fontSize: '0.875rem' }}>
                  Cold & Cough
                </Link>
              </li>
              <li>
                <Link to="/medicines?category=Diabetes%20Care" style={{ color: '#475569', fontSize: '0.875rem' }}>
                  Diabetes Care
                </Link>
              </li>
              <li>
                <Link to="/medicines?category=Vitamins%20%26%20Supplements" style={{ color: '#475569', fontSize: '0.875rem' }}>
                  Vitamins & Supplements
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.25rem' }}>
              Store Location & Help
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.875rem', color: '#475569' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <MapPin size={18} color="#0d9488" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>12 Medical Central Plaza, MG Road, Mumbai - 400001</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone size={18} color="#0d9488" style={{ flexShrink: 0 }} />
                <span>+91 73838 82621 / 1800-123-SKPHARM</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail size={18} color="#0d9488" style={{ flexShrink: 0 }} />
                <span>care@skpharmacy.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid #e2ece9',
            padding: '1.5rem 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.825rem',
            color: '#64748b',
          }}
        >
          <div>
            © {new Date().getFullYear()} <strong>SK Pharmacy</strong>. All Rights Reserved. Built with MERN Stack.
          </div>
          <div>
            College Capstone Project • Online Medicine E-Commerce Application
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
