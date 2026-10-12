import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  PlusCircle,
  Search,
  Edit2,
  Trash2,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import api from '../../services/api';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import ConfirmModal from '../../components/ConfirmModal';
import Toast from '../../components/Toast';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Delete modal state
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/products?limit=100');
      setProducts(data.products || []);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch medicines');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeletePrompt = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    try {
      setDeleting(true);
      await api.delete(`/products/${productToDelete._id}`);
      setDeleting(false);
      setDeleteModalOpen(false);
      setProductToDelete(null);
      setToast({
        show: true,
        message: 'Medicine removed successfully from catalog',
        type: 'success',
      });
      fetchProducts();
    } catch (err) {
      setDeleting(false);
      setDeleteModalOpen(false);
      setToast({
        show: true,
        message: err.message || 'Failed to delete medicine',
        type: 'error',
      });
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: 'success' })}
        />
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Medicine"
        message={`Are you sure you want to permanently remove "${productToDelete?.name}" from SK Pharmacy inventory? This action cannot be undone.`}
        confirmText={deleting ? 'Deleting...' : 'Yes, Delete'}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModalOpen(false)}
      />

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
          <span className="section-tag">Pharmacy Catalog</span>
          <h1 style={{ fontSize: '2.1rem', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.025em' }}>
            Medicines Inventory
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Manage medicine listings, formulations, pricing, and live inventory levels
          </p>
        </div>

        <Link
          to="/admin/products/add"
          className="btn btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <PlusCircle size={18} /> Add New Medicine
        </Link>
      </div>

      {error && <Message variant="danger">{error}</Message>}

      {/* Search Bar */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          border: '1px solid #e2e8f0',
          padding: '0.85rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <Search size={18} color="#94a3b8" />
        <input
          type="text"
          placeholder="Filter medicines by name, brand, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            border: 'none',
            outline: 'none',
            width: '100%',
            fontSize: '0.925rem',
            color: '#0f172a',
          }}
        />
      </div>

      {loading ? (
        <Loader text="Loading medicines catalog..." />
      ) : (
        <div
          className="card"
          style={{
            padding: 0,
            overflow: 'hidden',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                fontSize: '0.875rem',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  <th style={{ padding: '0.95rem 1.25rem' }}>Medicine</th>
                  <th style={{ padding: '0.95rem 1rem' }}>Category</th>
                  <th style={{ padding: '0.95rem 1rem' }}>Price & Discount</th>
                  <th style={{ padding: '0.95rem 1rem' }}>Stock Status</th>
                  <th style={{ padding: '0.95rem 1rem' }}>Rx Required</th>
                  <th style={{ padding: '0.95rem 1.25rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ padding: '2.5rem', textAlign: 'center', color: '#64748b' }}>
                      No matching medicines found in catalog.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => {
                    const finalPrice =
                      product.discount > 0
                        ? Math.round(product.price * (1 - product.discount / 100))
                        : product.price;

                    return (
                      <tr
                        key={product._id}
                        style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.15s' }}
                      >
                        <td style={{ padding: '0.95rem 1.25rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                            <img
                              src={product.image}
                              alt={product.name}
                              style={{
                                width: '44px',
                                height: '44px',
                                objectFit: 'contain',
                                borderRadius: '8px',
                                backgroundColor: '#f8fafc',
                                border: '1px solid #e2e8f0',
                              }}
                            />
                            <div>
                              <strong style={{ color: '#0f172a', display: 'block', fontSize: '0.95rem' }}>
                                {product.name}
                              </strong>
                              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                {product.brand} • {product.dosage}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td style={{ padding: '0.95rem 1rem' }}>
                          <span
                            style={{
                              backgroundColor: '#f1f5f9',
                              color: '#334155',
                              padding: '0.2rem 0.6rem',
                              borderRadius: '9999px',
                              fontSize: '0.775rem',
                              fontWeight: '700',
                            }}
                          >
                            {product.category}
                          </span>
                        </td>

                        <td style={{ padding: '0.95rem 1rem' }}>
                          <div style={{ fontWeight: '800', color: '#0f172a' }}>
                            ₹{finalPrice}
                          </div>
                          {product.discount > 0 && (
                            <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: '600' }}>
                              ₹{product.price} ({product.discount}% off)
                            </span>
                          )}
                        </td>

                        <td style={{ padding: '0.95rem 1rem' }}>
                          {product.stock <= 0 ? (
                            <span className="badge badge-outofstock">OUT OF STOCK</span>
                          ) : product.stock <= 10 ? (
                            <span className="badge badge-lowstock">LOW: {product.stock} LEFT</span>
                          ) : (
                            <span className="badge badge-instock">{product.stock} IN STOCK</span>
                          )}
                        </td>

                        <td style={{ padding: '0.95rem 1rem' }}>
                          {product.requiresPrescription ? (
                            <span style={{ color: '#b91c1c', fontWeight: '800', fontSize: '0.75rem' }}>
                              Yes (Rx)
                            </span>
                          ) : (
                            <span style={{ color: '#64748b', fontSize: '0.75rem' }}>No (OTC)</span>
                          )}
                        </td>

                        <td style={{ padding: '0.95rem 1.25rem', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Link
                              to={`/medicines/${product._id}`}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-outline btn-sm"
                              style={{ padding: '0.35rem 0.55rem', color: '#64748b' }}
                              title="View on store"
                            >
                              <ExternalLink size={14} />
                            </Link>

                            <Link
                              to={`/admin/products/edit/${product._id}`}
                              className="btn btn-outline btn-sm"
                              style={{ padding: '0.35rem 0.65rem', color: '#0284c7', borderColor: '#bae6fd' }}
                              title="Edit product"
                            >
                              <Edit2 size={14} />
                            </Link>

                            <button
                              type="button"
                              onClick={() => handleDeletePrompt(product)}
                              className="btn btn-outline btn-sm"
                              style={{ padding: '0.35rem 0.65rem', color: '#ef4444', borderColor: '#fca5a5' }}
                              title="Delete product"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
