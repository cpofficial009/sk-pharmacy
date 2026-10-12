import React from 'react';
import { Pill, ShieldCheck, HeartPulse, Award, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div>
      {/* Hero (Light Theme) */}
      <section
        style={{
          background: 'linear-gradient(135deg, #f0fdf9 0%, #ecfdf5 45%, #eff6ff 100%)',
          color: '#0f172a',
          padding: '4rem 0',
          textAlign: 'center',
          borderBottom: '1.5px solid #d1fae5',
        }}
      >
        <div className="container">
          <span
            style={{
              backgroundColor: '#ffffff',
              color: '#0d9488',
              padding: '0.25rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              border: '1px solid #99f6e4',
              boxShadow: '0 2px 6px rgba(13, 148, 136, 0.08)',
            }}
          >
            About SK Pharmacy
          </span>
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#0f172a',
              margin: '1rem 0 0.5rem',
            }}
          >
            Delivering Trust, Health & Care
          </h1>
          <p
            style={{
              fontSize: '1.05rem',
              color: '#475569',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            A modern, technology-driven pharmaceutical dispensing platform built to make authentic
            healthcare accessible to everyone.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ padding: '4rem 1.25rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
            marginBottom: '4rem',
          }}
        >
          <div>
            <span className="section-tag">Our Mission</span>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', margin: '0.5rem 0 1rem' }}>
              Simplifying Healthcare with Digital Integrity
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1rem', fontSize: '0.95rem' }}>
              Founded as an innovative digital healthcare initiative, <strong>SK Pharmacy</strong> bridges
              the gap between patients and essential pharmaceuticals. Whether it is a midnight emergency,
              routine diabetic refills, or acute seasonal remedies, we ensure quick, verified, and safe doorstep delivery.
            </p>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Every batch in our warehouse is sourced strictly from certified pharmaceutical manufacturers,
              stored under rigorous temperature-controlled specifications, and audited by licensed pharmacists.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#0f172a', fontWeight: '600' }}>
                <CheckCircle size={18} color="#0d9488" /> 100% Genuine, batch-tested medications
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#0f172a', fontWeight: '600' }}>
                <CheckCircle size={18} color="#0d9488" /> Verified licensed pharmacist review for every Rx order
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#0f172a', fontWeight: '600' }}>
                <CheckCircle size={18} color="#0d9488" /> Modern MERN stack platform designed for speed & scale
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.5rem', color: '#0f172a' }}>
              Key Operational Metrics
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#0d9488' }}>10k+</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>Orders Dispatched</div>
              </div>
              <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#0284c7' }}>100%</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>Authentic Medicines</div>
              </div>
              <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#10b981' }}>24/7</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>Helpline Support</div>
              </div>
              <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#f59e0b' }}>4.8 ★</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>Customer Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* College Project Badge Note */}
        <div
          style={{
            backgroundColor: '#f0fdfa',
            border: '1.5px solid #99f6e4',
            borderRadius: '16px',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f766e', marginBottom: '0.5rem' }}>
            Academic Project Overview
          </h3>
          <p style={{ color: '#334155', maxWidth: '700px', margin: '0 auto 1.5rem', lineHeight: 1.6, fontSize: '0.925rem' }}>
            <strong>SK Pharmacy</strong> was developed as an end-to-end full-stack MERN engineering capstone project.
            It incorporates secure role-based JSON Web Tokens (JWT), robust inventory management, seamless order
            processing pipelines, and reactive client architecture.
          </p>
          <Link to="/medicines" className="btn btn-primary">
            Explore Medicine Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
