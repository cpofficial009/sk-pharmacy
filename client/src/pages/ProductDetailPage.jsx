import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Calendar,
  Building,
  FileText,
  AlertTriangle,
  ChevronRight,
  Plus,
  Minus,
} from 'lucide-react';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Toast from '../components/Toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/products/${id}`);
        setProduct(data.product);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to load medicine details');
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleQtyChange = (delta) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && product && newQty <= product.stock) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    const res = addToCart(product, quantity);
    setToast({
      show: true,
      message: res.message,
      type: res.success ? 'success' : 'error',
    });
  };

  const handleBuyNow = () => {
    if (!product) return;
    const res = addToCart(product, quantity);
    if (res.success) {
      navigate('/cart');
    } else {
      setToast({ show: true, message: res.message, type: 'error' });
    }
  };

  if (loading) {
    return <Loader text="Loading medicine details..." />;
  }

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '3rem 1.25rem' }}>
        <Message variant="danger">{error || 'Medicine not found'}</Message>
        <Link to="/medicines" className="btn btn-outline" style={{ marginTop: '1rem' }}>
          Back to Medicines
        </Link>
      </div>
    );
  }

  const finalPrice =
    product.discount > 0
      ? Math.round(product.price * (1 - product.discount / 100))
      : product.price;

  const formattedExpiry = new Date(product.expiryDate).toLocaleDateString('en-IN', {
    month: 'short',
    year: 'numeric',
  });

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem' }}>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: 'success' })}
        />
      )}

      {/* Breadcrumbs */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.85rem',
          color: '#64748b',
          marginBottom: '2rem',
        }}
      >
        <Link to="/" style={{ color: '#0d9488' }}>Home</Link>
        <ChevronRight size={14} />
        <Link to="/medicines" style={{ color: '#0d9488' }}>Medicines</Link>
        <ChevronRight size={14} />
        <Link to={`/medicines?category=${encodeURIComponent(product.category)}`} style={{ color: '#0d9488' }}>
          {product.category}
        </Link>
        <ChevronRight size={14} />
        <span style={{ color: '#0f172a', fontWeight: '600' }}>{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 450px) 1fr',
          gap: '3rem',
          marginBottom: '3.5rem',
        }}
        className="product-detail-grid"
      >
        {/* Left: Product Image */}
        <div>
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            }}
          >
            {product.discount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '9999px',
                }}
              >
                {product.discount}% OFF
              </span>
            )}
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                maxHeight: '380px',
                objectFit: 'contain',
                borderRadius: '12px',
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60';
              }}
            />
          </div>

          {/* Quick Assurance Badges */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
              marginTop: '1.5rem',
            }}
          >
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '0.85rem 0.5rem',
                textAlign: 'center',
              }}
            >
              <ShieldCheck size={20} color="#0d9488" style={{ margin: '0 auto 0.25rem' }} />
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0f172a' }}>100% Genuine</div>
            </div>
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '0.85rem 0.5rem',
                textAlign: 'center',
              }}
            >
              <Truck size={20} color="#0284c7" style={{ margin: '0 auto 0.25rem' }} />
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0f172a' }}>Free &gt; ₹500</div>
            </div>
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '0.85rem 0.5rem',
                textAlign: 'center',
              }}
            >
              <RotateCcw size={20} color="#10b981" style={{ margin: '0 auto 0.25rem' }} />
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0f172a' }}>Easy Returns</div>
            </div>
          </div>
        </div>

        {/* Right: Product Information */}
        <div>
          {/* Brand & Category row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: '700',
                color: '#0d9488',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {product.brand}
            </span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span
              style={{
                fontSize: '0.8rem',
                backgroundColor: '#f1f5f9',
                color: '#475569',
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
              }}
            >
              {product.category}
            </span>
          </div>

          <h1
            style={{
              fontSize: '2rem',
              fontWeight: '800',
              color: '#0f172a',
              marginBottom: '0.75rem',
              lineHeight: 1.25,
            }}
          >
            {product.name}
          </h1>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <Rating value={product.rating || 4.5} text={`${product.rating || 4.5} (${product.numReviews || 12} reviews)`} size={18} />
            <span style={{ color: '#cbd5e1' }}>|</span>
            {isOutOfStock ? (
              <span className="badge badge-outofstock">Out of Stock</span>
            ) : product.stock <= 10 ? (
              <span className="badge badge-lowstock">Only {product.stock} Left</span>
            ) : (
              <span className="badge badge-instock">In Stock ({product.stock} units)</span>
            )}
          </div>

          {/* Prescription Warning if applicable */}
          {product.requiresPrescription && (
            <div
              style={{
                backgroundColor: '#fee2e2',
                border: '1px solid #fca5a5',
                color: '#991b1b',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                fontSize: '0.875rem',
                fontWeight: '600',
              }}
            >
              <FileText size={20} color="#b91c1c" />
              <span>Prescription Required: Please ensure you possess a valid doctor prescription.</span>
            </div>
          )}

          {/* Price Block */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '1.25rem',
              marginBottom: '1.75rem',
              display: 'flex',
              alignItems: 'baseline',
              gap: '1rem',
            }}
          >
            <span style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f172a' }}>
              ₹{finalPrice}
            </span>
            {product.discount > 0 && (
              <>
                <span
                  style={{
                    fontSize: '1.15rem',
                    color: '#94a3b8',
                    textDecoration: 'line-through',
                  }}
                >
                  ₹{product.price}
                </span>
                <span
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    color: '#15803d',
                  }}
                >
                  Save ₹{product.price - finalPrice} ({product.discount}%)
                </span>
              </>
            )}
            <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#64748b' }}>
              Inclusive of all taxes
            </span>
          </div>

          {/* Key Specifications Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              marginBottom: '2rem',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '1.25rem',
            }}
          >
            <div>
              <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>Dosage & Form</span>
              <strong style={{ fontSize: '0.925rem', color: '#0f172a' }}>{product.dosage}</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>Expiry Date</span>
              <strong style={{ fontSize: '0.925rem', color: '#0f172a' }}>{formattedExpiry}</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>Manufacturer</span>
              <strong style={{ fontSize: '0.925rem', color: '#0f172a' }}>{product.manufacturer}</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>Return Window</span>
              <strong style={{ fontSize: '0.925rem', color: '#0f172a' }}>7 Days Policy</strong>
            </div>
          </div>

          {/* Quantity and Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              marginBottom: '2rem',
              flexWrap: 'wrap',
            }}
          >
            {/* Quantity Stepper */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1.5px solid #cbd5e1',
                borderRadius: '10px',
                backgroundColor: '#ffffff',
                overflow: 'hidden',
              }}
            >
              <button
                type="button"
                onClick={() => handleQtyChange(-1)}
                disabled={quantity <= 1 || isOutOfStock}
                style={{
                  border: 'none',
                  background: 'none',
                  padding: '0.65rem 0.85rem',
                  cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                  color: '#334155',
                }}
              >
                <Minus size={16} />
              </button>
              <span
                style={{
                  padding: '0.65rem 1rem',
                  fontWeight: '700',
                  minWidth: '40px',
                  textAlign: 'center',
                }}
              >
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => handleQtyChange(1)}
                disabled={quantity >= product.stock || isOutOfStock}
                style={{
                  border: 'none',
                  background: 'none',
                  padding: '0.65rem 0.85rem',
                  cursor: quantity >= product.stock ? 'not-allowed' : 'pointer',
                  color: '#334155',
                }}
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Add to Cart button */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              style={{ flex: 1, minWidth: '160px', padding: '0.8rem 1.5rem' }}
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>

            {/* Buy Now button */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              style={{ flex: 1, minWidth: '160px', padding: '0.8rem 1.5rem' }}
            >
              <Zap size={18} /> Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Tabs / Description & Usage Sections */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '800',
              color: '#0f172a',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <FileText size={20} color="#0d9488" /> Description & Pharmacology
          </h3>
          <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem' }}>
            {product.description}
          </p>
        </div>

        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem', marginBottom: '2rem' }}>
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '800',
              color: '#0f172a',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <AlertTriangle size={20} color="#0284c7" /> Indications & Directions for Use
          </h3>
          <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem' }}>
            {product.usage}
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            padding: '1.25rem',
            border: '1px solid #e2e8f0',
            fontSize: '0.875rem',
            color: '#64748b',
          }}
        >
          <strong style={{ color: '#0f172a' }}>Medical Disclaimer: </strong>
          The information provided above is for educational purposes and should not be used as a
          substitute for direct medical diagnosis or treatment from a qualified healthcare practitioner.
          Keep all medicines out of reach of children.
        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailPage;
