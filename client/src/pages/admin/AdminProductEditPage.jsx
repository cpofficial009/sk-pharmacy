import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Sparkles, Upload, Camera, Trash2, Link2 } from 'lucide-react';
import api from '../../services/api';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const AdminProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    description: '',
    price: '',
    discount: 0,
    stock: '',
    image: '',
    manufacturer: '',
    dosage: '',
    usage: '',
    expiryDate: '',
    requiresPrescription: false,
    isFeatured: false,
  });

  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);
        const [catRes, prodRes] = await Promise.all([
          api.get('/categories'),
          api.get(`/products/${id}`),
        ]);
        setCategories(catRes.data.categories || []);

        const prod = prodRes.data.product;
        // Format expiry date for date input (YYYY-MM-DD)
        const expDateFormatted = prod.expiryDate
          ? new Date(prod.expiryDate).toISOString().split('T')[0]
          : '';

        setFormData({
          name: prod.name || '',
          brand: prod.brand || '',
          category: prod.category || '',
          description: prod.description || '',
          price: prod.price !== undefined ? prod.price : '',
          discount: prod.discount !== undefined ? prod.discount : 0,
          stock: prod.stock !== undefined ? prod.stock : '',
          image: prod.image || '',
          manufacturer: prod.manufacturer || '',
          dosage: prod.dosage || '',
          usage: prod.usage || '',
          expiryDate: expDateFormatted,
          requiresPrescription: Boolean(prod.requiresPrescription),
          isFeatured: Boolean(prod.isFeatured),
        });
        setFetching(false);
      } catch (err) {
        setFetching(false);
        setErrorMsg(err.message || 'Failed to load medicine data');
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const [showUrlInput, setShowUrlInput] = useState(false);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('Image file size should be under 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      setLoading(true);
      await api.put(`/products/${id}`, formData);
      setLoading(false);
      navigate('/admin/products');
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || 'Failed to update medicine');
    }
  };

  if (fetching) {
    return <Loader text="Loading medicine details..." />;
  }

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem', maxWidth: '850px' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link
          to="/admin/products"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0d9488', fontSize: '0.875rem', fontWeight: '600' }}
        >
          <ArrowLeft size={16} /> Back to Medicine Inventory
        </Link>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a' }}>
          Edit Medicine: {formData.name}
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.925rem' }}>
          Modify pricing, active formulation, stock count, and clinical guidelines
        </p>
      </div>

      {errorMsg && <Message variant="danger">{errorMsg}</Message>}

      <div className="card" style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.25rem' }}>
            Basic Product Details
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Medicine Name *</label>
              <input
                type="text"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Brand / Trade Name *</label>
              <input
                type="text"
                name="brand"
                className="form-input"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
                required
              >
                {categories.map((c) => (
                  <option key={c._id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Manufacturer Company *</label>
              <input
                type="text"
                name="manufacturer"
                className="form-input"
                value={formData.manufacturer}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description & Formulation *</label>
            <textarea
              name="description"
              rows={3}
              className="form-textarea"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Dosage & Presentation *</label>
              <input
                type="text"
                name="dosage"
                className="form-input"
                value={formData.dosage}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Expiry Date *</label>
              <input
                type="date"
                name="expiryDate"
                className="form-input"
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Usage & Instructions *</label>
            <textarea
              name="usage"
              rows={2}
              className="form-textarea"
              value={formData.usage}
              onChange={handleChange}
              required
            />
          </div>

          {/* Pricing & Stock */}
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', margin: '1.5rem 0 1rem' }}>
            Pricing & Inventory
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Price (₹) *</label>
              <input
                type="number"
                name="price"
                min="0"
                step="any"
                className="form-input"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Discount (%)</label>
              <input
                type="number"
                name="discount"
                min="0"
                max="100"
                className="form-input"
                value={formData.discount}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Stock Units *</label>
              <input
                type="number"
                name="stock"
                min="0"
                className="form-input"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Add Photos / Product Image */}
          <div className="form-group" style={{ margin: '1.75rem 0' }}>
            <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '700' }}>
                <Camera size={18} color="#0d9488" /> Product Photo *
              </span>
              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0d9488',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Link2 size={14} /> {showUrlInput ? 'Hide URL field' : 'Or paste Image URL'}
              </button>
            </label>

            {/* Photo Upload Box */}
            <div
              style={{
                border: '2px dashed #cbd5e1',
                borderRadius: '16px',
                padding: '1.5rem',
                backgroundColor: '#f8fafc',
                textAlign: 'center',
                transition: 'all 0.2s',
              }}
            >
              {formData.image ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div
                    style={{
                      width: '140px',
                      height: '140px',
                      borderRadius: '16px',
                      backgroundColor: '#ffffff',
                      border: '1.5px solid #e2e8f0',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={formData.image}
                      alt="Selected Medicine Photo"
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80';
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <label
                      htmlFor="edit-photo-file-input"
                      className="btn btn-outline btn-sm"
                      style={{ cursor: 'pointer', backgroundColor: '#ffffff' }}
                    >
                      <Upload size={14} /> Change Photo
                    </label>
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, image: '' }))}
                      className="btn btn-outline btn-sm"
                      style={{ color: '#ef4444', borderColor: '#fca5a5', backgroundColor: '#ffffff' }}
                    >
                      <Trash2 size={14} /> Remove Photo
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '1rem 0' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: '#f0fdfa',
                      color: '#0d9488',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem',
                    }}
                  >
                    <Upload size={26} />
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.35rem' }}>
                    Upload Medicine Photo
                  </h4>
                  <p style={{ fontSize: '0.825rem', color: '#64748b', marginBottom: '1rem' }}>
                    PNG, JPG, WEBP up to 5MB from your device
                  </p>
                  <label
                    htmlFor="edit-photo-file-input"
                    className="btn btn-primary btn-sm"
                    style={{ cursor: 'pointer', borderRadius: '9999px', padding: '0.6rem 1.4rem' }}
                  >
                    <Upload size={15} /> Choose Photo
                  </label>
                </div>
              )}

              {/* Hidden file input */}
              <input
                id="edit-photo-file-input"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ display: 'none' }}
              />
            </div>

            {/* Optional URL input when toggled */}
            {showUrlInput && (
              <div style={{ marginTop: '0.85rem' }}>
                <input
                  type="url"
                  name="image"
                  className="form-input"
                  placeholder="https://example.com/medicine-photo.jpg"
                  value={formData.image}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Quick Presets for Convenient Testing */}
            <div style={{ marginTop: '0.85rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600', marginRight: '0.5rem' }}>
                Quick Presets:
              </span>
              {[
                { name: 'Tablets', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80' },
                { name: 'Capsules', url: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&auto=format&fit=crop&q=80' },
                { name: 'Syrup Bottle', url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80' },
                { name: 'Inhaler / Care', url: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80' },
              ].map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, image: p.url }))}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '9999px',
                    padding: '2px 8px',
                    fontSize: '0.75rem',
                    color: '#0f766e',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginRight: '0.4rem',
                    marginBottom: '0.4rem',
                  }}
                >
                  + {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Checkboxes */}
          <div style={{ display: 'flex', gap: '2rem', margin: '1.5rem 0' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '600' }}>
              <input
                type="checkbox"
                name="requiresPrescription"
                checked={formData.requiresPrescription}
                onChange={handleChange}
              />
              Requires Prescription (Rx)
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '600' }}>
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
              />
              Mark as Featured Medicine
            </label>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '0.8rem 2rem' }}
              disabled={loading}
            >
              <Save size={18} /> {loading ? 'Saving Changes...' : 'Update Medicine'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductEditPage;
