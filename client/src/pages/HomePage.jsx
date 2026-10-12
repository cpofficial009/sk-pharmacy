import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Truck,
  HeartPulse,
  Clock,
  Sparkles,
  PhoneCall,
  Activity,
  Award,
  ChevronRight,
  ChevronLeft,
  Shield,
  Pill,
  CheckCircle2,
  SlidersHorizontal,
  Flame,
  Star,
  FileText,
  BadgeCheck,
  Stethoscope,
  Microscope,
  Zap,
} from 'lucide-react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Toast from '../components/Toast';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categoryFilterSearch, setCategoryFilterSearch] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const categoryTrackRef = useRef(null);
  const navigate = useNavigate();

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          api.get('/products?limit=50'),
          api.get('/categories'),
        ]);
        setProducts(prodRes.data.products || []);
        setCategories(catRes.data.categories || []);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to load pharmacy catalog');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Smooth scroll handler for the category slider
  const scrollCategory = (direction) => {
    if (categoryTrackRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      categoryTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/medicines?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // Helper icon for categories
  const getCategoryIcon = (catName) => {
    const name = (catName || '').toLowerCase();
    if (name.includes('pain') || name.includes('fever')) return '💊';
    if (name.includes('anti') || name.includes('infect')) return '🦠';
    if (name.includes('card') || name.includes('heart')) return '❤️';
    if (name.includes('diabet')) return '🩸';
    if (name.includes('vit') || name.includes('suppl')) return '🌿';
    if (name.includes('digest') || name.includes('stomach')) return '🥣';
    if (name.includes('skin') || name.includes('hair')) return '✨';
    if (name.includes('first') || name.includes('aid')) return '🧰';
    if (name.includes('respir') || name.includes('cold') || name.includes('cough')) return '🫁';
    return '🩺';
  };

  // Filter and sort products for the categorized section
  const filteredProducts = products.filter((prod) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      (prod.category && prod.category.toLowerCase() === selectedCategory.toLowerCase());

    const matchesSearch =
      !categoryFilterSearch.trim() ||
      prod.name.toLowerCase().includes(categoryFilterSearch.toLowerCase()) ||
      (prod.brand && prod.brand.toLowerCase().includes(categoryFilterSearch.toLowerCase())) ||
      (prod.usage && prod.usage.toLowerCase().includes(categoryFilterSearch.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    // featured: items with isFeatured first
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return 0;
  });

  return (
    <div>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: 'success' })}
        />
      )}

      {/* ========================================================
          1. AESTHETIC BOTANICAL & CLINICAL HERO BANNER
          ======================================================== */}
      {/* ========================================================
          1. HEALTHCARE CHOICES FOR BETTER LIVING HERO BANNER
             (INSPIRED BY CLINICAL MEDPLUS PRESENTATION DESIGN)
          ======================================================== */}
      {/* ========================================================
          1. FULL-BLEED HEALTHCARE CHOICES HERO BANNER
             (EDGE-TO-EDGE, NO BOX, NO NAVBAR, FULL-WIDTH)
          ======================================================== */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          minHeight: 'clamp(580px, 80vh, 760px)',
          backgroundColor: '#0a1d1a',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          marginBottom: '3.5rem',
          border: 'none',
          borderRadius: 0,
        }}
      >
        {/* Right Side Doctor Photo Container (Seamlessly blended, full head and face visible) */}
        <div
          className="hero-doctor-bg-container"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: 'clamp(440px, 48vw, 760px)',
            height: '100%',
            zIndex: 1,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <img
            src="/images/medplus-hero.jpg"
            alt="SK Pharmacy Certified Pharmacist Doctor"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '68% 8%', // Full hair, forehead, eyes, smile, stethoscope and white coat visible!
              display: 'block',
            }}
          />
          {/* Smooth horizontal gradient to blend seamlessly into #0a1d1a */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, #0a1d1a 0%, rgba(10, 29, 26, 0.92) 16%, rgba(10, 29, 26, 0.42) 48%, rgba(10, 29, 26, 0.05) 100%)',
            }}
          />
          {/* Subtle top & bottom vignette */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(10, 29, 26, 0.4) 0%, transparent 18%, transparent 75%, rgba(10, 29, 26, 0.95) 100%)',
            }}
          />
        </div>

        {/* Ambient teal glow behind text */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(13, 148, 136, 0.18) 0%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Centered Content Container Inside Edge-to-Edge Hero */}
        <div
          style={{
            maxWidth: '1600px',
            width: '100%',
            margin: '0 auto',
            padding: 'clamp(3rem, 5vw, 5rem) clamp(1.25rem, 4vw, 3rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Avatar Pill Badge: "SK Pharmacy • 100% Genuine Care & Certified Pharmacists" */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.85rem',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              padding: '0.4rem 1.25rem 0.4rem 0.5rem',
              borderRadius: '9999px',
              marginBottom: '1.75rem',
              width: 'fit-content',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            }}
          >
            {/* Overlapping Avatars */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {[
                { bg: '#0d9488', text: 'KP' },
                { bg: '#0284c7', text: 'SP' },
                { bg: '#10b981', text: 'SK' },
              ].map((av, idx) => (
                <div
                  key={idx}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: av.bg,
                    color: '#ffffff',
                    fontSize: '0.725rem',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: idx === 0 ? 0 : '-10px',
                    border: '2px solid #ffffff',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                  }}
                >
                  {av.text}
                </div>
              ))}
            </div>
            <span
              style={{
                color: '#ffffff',
                fontSize: '0.875rem',
                fontWeight: '700',
                letterSpacing: '0.01em',
              }}
            >
              SK Pharmacy • 100% Genuine Care & Certified Pharmacists
            </span>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: 'clamp(2.3rem, 5vw, 4.2rem)',
              fontWeight: '800',
              lineHeight: '1.14',
              color: '#ffffff',
              letterSpacing: '-0.035em',
              marginBottom: '1.35rem',
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.45)',
              maxWidth: '720px',
            }}
          >
            Healthcare Choices & <br />
            <span style={{ color: '#2dd4bf' }}>Genuine Medicines</span> for Better Living...
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1rem, 1.35vw, 1.15rem)',
              color: 'rgba(255, 255, 255, 0.92)',
              lineHeight: '1.75',
              maxWidth: '580px',
              marginBottom: '2.5rem',
              textShadow: '0 1px 12px rgba(0, 0, 0, 0.3)',
            }}
          >
            Order 100% verified medications, daily health supplements, and prescription remedies from SK Pharmacy.
            Rapid doorstep delivery, verified stock, and 24/7 pharmacist assistance.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.15rem',
              flexWrap: 'wrap',
              marginBottom: '2.5rem',
            }}
          >
            {/* Primary Action Button: "Order Medicines Now" */}
            <Link
              to="/medicines"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.85rem',
                backgroundColor: '#ffffff',
                color: '#0a1d1a',
                border: 'none',
                borderRadius: '9999px',
                padding: '0.85rem 1.85rem',
                fontSize: '1rem',
                fontWeight: '800',
                textDecoration: 'none',
                cursor: 'pointer',
                boxShadow: '0 14px 32px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 18px 40px rgba(0, 0, 0, 0.4)';
                e.currentTarget.style.backgroundColor = '#ecfdf5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 14px 32px rgba(0, 0, 0, 0.3)';
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
            >
              <span>Order Medicines Now</span>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#0a1d1a',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ChevronRight size={17} />
              </div>
            </Link>

            {/* Secondary Direct Phone Call Button */}
            <a
              href="tel:+917383882621"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                backgroundColor: 'rgba(255, 255, 255, 0.14)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1.5px solid rgba(255, 255, 255, 0.35)',
                color: '#ffffff',
                borderRadius: '9999px',
                padding: '0.85rem 1.65rem',
                fontSize: '0.95rem',
                fontWeight: '700',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.14)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <PhoneCall size={17} />
              <span>24/7 Helpline: +91 73838 82621</span>
            </a>
          </div>

          {/* Quick Trust Highlights Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(1rem, 2.5vw, 2.2rem)',
              flexWrap: 'wrap',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: '0.85rem',
              fontWeight: '600',
              maxWidth: '680px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={17} color="#2dd4bf" />
              <span>100% Genuine Certified</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Truck size={17} color="#2dd4bf" />
              <span>Express Doorstep Delivery</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={17} color="#f59e0b" />
              <span>Licensed Pharmacists</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Home Content Container for sections below Hero */}
      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 clamp(1rem, 3.5vw, 2.5rem)' }}>


      {/* ========================================================
          2. SLIDING CATEGORIES ON TOP OF MEDICINES TO CATEGORIZE
          ======================================================== */}
      <section id="categorized-medicines" style={{ marginBottom: '4.5rem' }}>
        <div
          className="section-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <span className="section-tag">
              <Sparkles size={13} /> Slide To Categorize
            </span>
            <h2 className="section-title">Explore Medicines By Category</h2>
            <p className="section-subtitle">
              Slide through health categories to instantly filter and browse verified medications.
            </p>
          </div>

          <Link
            to="/medicines"
            className="btn btn-outline btn-sm"
            style={{ fontWeight: '700' }}
          >
            All Medicines Catalog <ChevronRight size={16} />
          </Link>
        </div>

        {/* HORIZONTAL CATEGORY SLIDER BAR */}
        <div className="category-slider-wrapper">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => scrollCategory('left')}
            className="slider-arrow-btn"
            title="Scroll categories left"
            aria-label="Scroll categories left"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Scrollable Track */}
          <div ref={categoryTrackRef} className="category-slider-track">
            {/* "All" Category Pill */}
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={`category-pill ${selectedCategory === 'All' ? 'active' : ''}`}
            >
              <span>🌟</span>
              <span>All Medicines</span>
              <span
                style={{
                  fontSize: '0.75rem',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  backgroundColor: selectedCategory === 'All' ? 'rgba(255, 255, 255, 0.25)' : '#f1f5f9',
                  color: selectedCategory === 'All' ? '#ffffff' : '#64748b',
                  fontWeight: '800',
                }}
              >
                {products.length}
              </span>
            </button>

            {/* Dynamic Category Pills */}
            {categories.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.name.toLowerCase();
              const categoryCount = products.filter(
                (p) => p.category && p.category.toLowerCase() === cat.name.toLowerCase()
              ).length;

              return (
                <button
                  key={cat._id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`category-pill ${isActive ? 'active' : ''}`}
                >
                  <span>{getCategoryIcon(cat.name)}</span>
                  <span>{cat.name}</span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : '#f1f5f9',
                      color: isActive ? '#ffffff' : '#64748b',
                      fontWeight: '800',
                    }}
                  >
                    {categoryCount > 0 ? categoryCount : (cat.productCount || 0)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            onClick={() => scrollCategory('right')}
            className="slider-arrow-btn"
            title="Scroll categories right"
            aria-label="Scroll categories right"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* ========================================================
            3. MEDICINES LIST DIRECTLY BELOW CATEGORY SLIDER
            ======================================================== */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            border: '1.5px solid #e2ece9',
            padding: '1.75rem',
            boxShadow: '0 4px 20px rgba(6, 78, 59, 0.04)',
            marginBottom: '1rem',
          }}
        >
          {/* Subheader Toolbar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.75rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #f1f5f9',
            }}
          >
            {/* Status indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 10px #10b981',
                }}
              />
              <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#091e1b' }}>
                Showing {sortedProducts.length} medicines in{' '}
                <span style={{ color: '#0d9488' }}>
                  "{selectedCategory === 'All' ? 'All Formulations' : selectedCategory}"
                </span>
              </span>
            </div>

            {/* Toolbar Controls: Search within category & Sort */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '9999px',
                  border: '1.5px solid #e2e8f0',
                  backgroundColor: '#f8fafc',
                }}
              >
                <Search size={15} color="#94a3b8" />
                <input
                  type="text"
                  placeholder="Filter within list..."
                  value={categoryFilterSearch}
                  onChange={(e) => setCategoryFilterSearch(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    fontSize: '0.85rem',
                    backgroundColor: 'transparent',
                    width: '140px',
                  }}
                />
                {categoryFilterSearch && (
                  <button
                    type="button"
                    onClick={() => setCategoryFilterSearch('')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: '800',
                    }}
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '9999px',
                  border: '1.5px solid #e2e8f0',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: '#091e1b',
                  backgroundColor: '#f8fafc',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <Loader text="Loading medicines catalog..." />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : sortedProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#f0fdf9',
                  color: '#0d9488',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                }}
              >
                <Pill size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#091e1b', marginBottom: '0.5rem' }}>
                No medicines found
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
                There are currently no items matching your criteria in {selectedCategory}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setCategoryFilterSearch('');
                }}
                className="btn btn-primary btn-sm"
              >
                View All Medicines
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {sortedProducts.map((product) => (
                <ProductCard key={product._id} product={product} onToast={showToast} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          4. AESTHETIC VALUE PILLARS (WHY SK PHARMACY)
          ======================================================== */}
      <section style={{ marginBottom: '4.5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2.5rem' }}>
          <span className="section-tag">
            <Award size={13} /> The Clinical Standard
          </span>
          <h2 className="section-title">Why Patients Choose SK Pharmacy</h2>
          <p className="section-subtitle">
            Engineered from the ground up to guarantee therapeutic authenticity, safety, and rapid access.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {/* Pillar 1 */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1.5px solid #e2ece9',
              padding: '2rem 1.5rem',
              transition: 'all 0.25s',
              boxShadow: '0 2px 8px rgba(6, 78, 59, 0.03)',
            }}
            className="aesthetic-feature-card"
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                backgroundColor: '#f0fdf9',
                color: '#0d9488',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                border: '1px solid #ccfbf1',
              }}
            >
              <ShieldCheck size={26} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#091e1b', marginBottom: '0.5rem' }}>
              100% Genuine Drugs
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.6 }}>
              Direct procurement from certified pharmaceutical manufacturers with verifiable serial numbers,
              tamper seals, and expiry audits.
            </p>
          </div>

          {/* Pillar 2 */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1.5px solid #e2ece9',
              padding: '2rem 1.5rem',
              transition: 'all 0.25s',
              boxShadow: '0 2px 8px rgba(6, 78, 59, 0.03)',
            }}
            className="aesthetic-feature-card"
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                backgroundColor: '#f0fdf9',
                color: '#0d9488',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                border: '1px solid #ccfbf1',
              }}
            >
              <Microscope size={26} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#091e1b', marginBottom: '0.5rem' }}>
              Cold-Chain Certified
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.6 }}>
              Temperature-regulated cold storage (2°C to 8°C) for vaccines, insulins, and sensitive antibiotics
              from warehouse to doorstep.
            </p>
          </div>

          {/* Pillar 3 */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1.5px solid #e2ece9',
              padding: '2rem 1.5rem',
              transition: 'all 0.25s',
              boxShadow: '0 2px 8px rgba(6, 78, 59, 0.03)',
            }}
            className="aesthetic-feature-card"
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                backgroundColor: '#f0fdf9',
                color: '#0d9488',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                border: '1px solid #ccfbf1',
              }}
            >
              <Zap size={26} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#091e1b', marginBottom: '0.5rem' }}>
              2-Hour Express Delivery
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.6 }}>
              Rapid neighborhood dispatch network ensures critical pain relief and acute emergency orders reach you
              within hours.
            </p>
          </div>

          {/* Pillar 4 */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1.5px solid #e2ece9',
              padding: '2rem 1.5rem',
              transition: 'all 0.25s',
              boxShadow: '0 2px 8px rgba(6, 78, 59, 0.03)',
            }}
            className="aesthetic-feature-card"
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                backgroundColor: '#f0fdf9',
                color: '#0d9488',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                border: '1px solid #ccfbf1',
              }}
            >
              <Stethoscope size={26} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#091e1b', marginBottom: '0.5rem' }}>
              Doctor Consultation
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.6 }}>
              On-demand guidance by licensed clinical pharmacists for contraindications, dosage clarity, and medical
              prescription review.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. PRESCRIPTION ASSISTANCE BANNER
          ======================================================== */}
      {/* ========================================================
          5. PRESCRIPTION ASSISTANCE BANNER (LIGHT THEME)
          ======================================================== */}
      <section
        style={{
          background: 'linear-gradient(135deg, #f0fdf9 0%, #ecfdf5 50%, #eff6ff 100%)',
          borderRadius: '24px',
          border: '1.5px solid #a7f3d0',
          color: '#0f172a',
          padding: '3rem 2.5rem',
          marginBottom: '4.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem',
          boxShadow: '0 16px 36px -8px rgba(13, 148, 136, 0.08)',
        }}
      >
        <div style={{ maxWidth: '600px' }}>
          <span
            style={{
              backgroundColor: '#ffffff',
              color: '#0d9488',
              border: '1px solid #99f6e4',
              padding: '0.25rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.775rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              display: 'inline-block',
              marginBottom: '1rem',
              boxShadow: '0 2px 6px rgba(13, 148, 136, 0.08)',
            }}
          >
            Prescription Upload & Refills
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.75rem', lineHeight: 1.2 }}>
            Have a Doctor's Prescription?
          </h2>
          <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Simply message or call our registered pharmacy team. We will verify your prescription, assemble your
            medicines, and dispatch with express priority.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href="https://wa.me/917383882621"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{
              backgroundColor: '#10b981',
              borderRadius: '12px',
              fontWeight: '800',
              padding: '0.85rem 1.6rem',
            }}
          >
            💬 WhatsApp Prescription
          </a>
          <Link
            to="/contact"
            className="btn btn-outline"
            style={{
              borderColor: '#cbd5e1',
              color: '#0f172a',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '0.85rem 1.6rem',
            }}
          >
            Contact Helpdesk
          </Link>
        </div>
      </section>

      {/* ========================================================
          6. PATIENT TRUST & VERIFIED REVIEWS (ONLY 2 CARDS: KRISH PATEL & SLOK PANCHAL)
          ======================================================== */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          <span className="section-tag">
            <Star size={13} /> Verified Feedback
          </span>
          <h2 className="section-title">Trusted By Thousands of Patients</h2>
          <p className="section-subtitle">Real experiences from patients relying on SK Pharmacy every single day.</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
            maxWidth: '860px',
            margin: '0 auto',
          }}
        >
          {/* Card 1: Krish Patel */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1.5px solid #e2ece9',
              padding: '2rem 1.75rem',
              boxShadow: '0 4px 14px rgba(6, 78, 59, 0.04)',
              transition: 'all 0.25s',
            }}
            className="aesthetic-feature-card"
          >
            <div style={{ display: 'flex', color: '#f59e0b', gap: '3px', marginBottom: '0.85rem' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#f59e0b" />
              ))}
            </div>
            <p style={{ color: '#334155', fontSize: '0.925rem', lineHeight: 1.65, marginBottom: '1.5rem', fontStyle: 'italic' }}>
              "I regularly order cardiac medications and daily vitamins. The batch numbers are always genuine and delivery
              arrived within 2 hours. Exceptional service!"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#0d9488',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '0.95rem',
                  boxShadow: '0 2px 8px rgba(13, 148, 136, 0.3)',
                }}
              >
                K
              </div>
              <div>
                <strong style={{ fontSize: '0.95rem', color: '#0f172a', display: 'block' }}>Krish Patel</strong>
                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '700' }}>✓ Verified Buyer</span>
              </div>
            </div>
          </div>

          {/* Card 2: Slok Panchal */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1.5px solid #e2ece9',
              padding: '2rem 1.75rem',
              boxShadow: '0 4px 14px rgba(6, 78, 59, 0.04)',
              transition: 'all 0.25s',
            }}
            className="aesthetic-feature-card"
          >
            <div style={{ display: 'flex', color: '#f59e0b', gap: '3px', marginBottom: '0.85rem' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#f59e0b" />
              ))}
            </div>
            <p style={{ color: '#334155', fontSize: '0.925rem', lineHeight: 1.65, marginBottom: '1.5rem', fontStyle: 'italic' }}>
              "The sliding category feature makes it super easy to find specific antibiotics and pediatric drops. Very
              clean and aesthetic UI compared to regular pharmacy sites."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#064e3b',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '0.95rem',
                  boxShadow: '0 2px 8px rgba(6, 78, 59, 0.3)',
                }}
              >
                S
              </div>
              <div>
                <strong style={{ fontSize: '0.95rem', color: '#0f172a', display: 'block' }}>Slok Panchal</strong>
                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '700' }}>✓ Verified Patient</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .aesthetic-feature-card:hover {
          transform: translateY(-4px);
          border-color: #0d9488 !important;
          box-shadow: 0 12px 28px -6px rgba(13, 148, 136, 0.15) !important;
        }
        @media (max-width: 900px) {
          .hero-doctor-bg-container {
            width: 100% !important;
            opacity: 0.24 !important;
          }
        }
      `}</style>
      </div>
    </div>
  );
};

export default HomePage;
