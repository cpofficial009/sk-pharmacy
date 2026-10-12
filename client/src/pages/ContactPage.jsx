import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, HelpCircle, ChevronDown } from 'lucide-react';
import Message from '../components/Message';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const faqs = [
    {
      q: 'Are all medications and health products genuine?',
      a: 'Yes, 100%. SK Pharmacy directly sources all items from certified pharmaceutical distributors and principal manufacturers with verifiable batch numbers.',
    },
    {
      q: 'Do I need a prescription to place an order?',
      a: 'OTC (Over-The-Counter) medications such as multivitamin tablets, mild pain relievers, and first-aid supplies do not require a prescription. Prescription medications (marked with "Rx Required") must be backed by a valid medical prescription.',
    },
    {
      q: 'How fast is the delivery service?',
      a: 'Orders within urban metropolitan zones are dispatched via express delivery within 2 to 4 hours. Other regions are delivered within 24 to 48 hours.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept Cash on Delivery (COD), UPI (Google Pay, PhonePe, Paytm), and major Credit/Debit cards.',
    },
  ];

  return (
    <div>
      {/* Header (Light Theme) */}
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
            24/7 Patient Care
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', margin: '1rem 0 0.5rem' }}>
            Contact SK Pharmacy
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#475569', maxWidth: '600px', margin: '0 auto' }}>
            Have a question regarding your order, prescription verification, or medication availability?
            Our pharmacists are here to assist.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '4rem 1.25rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 380px) 1fr',
            gap: '3rem',
            marginBottom: '4rem',
          }}
          className="contact-grid"
        >
          {/* Left Info Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: '#ccfbf1',
                    color: '#0d9488',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Phone size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>Helpline (24/7)</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Toll-Free & Urgent Orders</p>
                </div>
              </div>
              <p style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0d9488', marginLeft: '52px' }}>
                +91 73838 82621
              </p>
            </div>

            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: '#e0f2fe',
                    color: '#0284c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Mail size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>Email Support</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Response within 2 hours</p>
                </div>
              </div>
              <p style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0284c7', marginLeft: '52px' }}>
                care@skpharmacy.com
              </p>
            </div>

            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: '#fef3c7',
                    color: '#b45309',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>Retail & Warehouse</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Headquarters & Pharmacy</p>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginLeft: '52px', lineHeight: 1.5 }}>
                12 Medical Central Plaza, MG Road, Mumbai, Maharashtra - 400001
              </p>
            </div>

            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: '#dcfce7',
                    color: '#15803d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Clock size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>Operating Hours</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Open 365 Days a Year</p>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginLeft: '52px', lineHeight: 1.5 }}>
                24 Hours Continuous Service & Delivery
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="card" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>
              Send Us a Message
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
              Fill in your details below and an SK Pharmacy representative will get back to you promptly.
            </p>

            {submitted && (
              <Message variant="success">
                Thank you! Your message has been received. Our clinical pharmacist team will get back to you shortly.
              </Message>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ananya Patel"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="form-input"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Prescription Query / Order Status"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Your Message *</label>
                <textarea
                  name="message"
                  rows={4}
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we assist your medical needs?"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem 1.75rem' }}>
                <Send size={16} /> Submit Inquiry
              </button>
            </form>
          </div>
        </div>

        {/* FAQs */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="section-header">
            <span className="section-tag">Frequently Asked</span>
            <h2 className="section-title">Common Questions</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    style={{
                      width: '100%',
                      padding: '1.15rem 1.25rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '0.95rem',
                      fontWeight: '700',
                      color: '#0f172a',
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      color="#64748b"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s',
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        padding: '0 1.25rem 1.25rem',
                        fontSize: '0.9rem',
                        color: '#475569',
                        lineHeight: 1.6,
                        borderTop: '1px solid #f1f5f9',
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
