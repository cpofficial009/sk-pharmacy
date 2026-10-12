import React, { useState, useEffect } from 'react';
import { Tags, PlusCircle, Trash2, Activity, AlertCircle } from 'lucide-react';
import api from '../../services/api';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import ConfirmModal from '../../components/ConfirmModal';
import Toast from '../../components/Toast';

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [adding, setAdding] = useState(false);

  // Delete modal state
  const [catToDelete, setCatToDelete] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/categories');
      setCategories(data.categories || []);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to load categories');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setAdding(true);
      await api.post('/categories', { name: name.trim(), description });
      setName('');
      setDescription('');
      setAdding(false);
      setToast({
        show: true,
        message: 'Category created successfully!',
        type: 'success',
      });
      fetchCategories();
    } catch (err) {
      setAdding(false);
      setToast({
        show: true,
        message: err.message || 'Failed to add category',
        type: 'error',
      });
    }
  };

  const handleDeletePrompt = (cat) => {
    setCatToDelete(cat);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!catToDelete) return;
    try {
      setDeleting(true);
      await api.delete(`/categories/${catToDelete._id}`);
      setDeleting(false);
      setDeleteModalOpen(false);
      setCatToDelete(null);
      setToast({
        show: true,
        message: 'Category removed successfully',
        type: 'success',
      });
      fetchCategories();
    } catch (err) {
      setDeleting(false);
      setDeleteModalOpen(false);
      setToast({
        show: true,
        message: err.message || 'Failed to delete category',
        type: 'error',
      });
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem' }}>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: 'success' })}
        />
      )}

      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Category"
        message={`Are you sure you want to delete category "${catToDelete?.name}"?`}
        confirmText={deleting ? 'Deleting...' : 'Delete'}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModalOpen(false)}
      />

      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a' }}>
          Medicine Categories
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.925rem' }}>
          Organize inventory into clinical classifications
        </p>
      </div>

      {error && <Message variant="danger">{error}</Message>}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 380px) 1fr',
          gap: '2.5rem',
          alignItems: 'flex-start',
        }}
        className="category-grid"
      >
        {/* Left: Add Category Form */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.25rem' }}>
            Add New Category
          </h3>

          <form onSubmit={handleAddCategory}>
            <div className="form-group">
              <label className="form-label">Category Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Eye & Ear Care"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                rows={3}
                className="form-textarea"
                placeholder="Short medical indications description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={adding}
            >
              <PlusCircle size={18} /> {adding ? 'Creating...' : 'Create Category'}
            </button>
          </form>
        </div>

        {/* Right: Existing Categories */}
        <div>
          {loading ? (
            <Loader text="Loading categories..." />
          ) : (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem', borderBottom: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a' }}>
                  Available Categories ({categories.length})
                </h3>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                      <th style={{ padding: '0.75rem 1rem' }}>Category</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Description</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Products Count</th>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat) => (
                      <tr key={cat._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: '700', color: '#0f172a' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '6px',
                                backgroundColor: '#ccfbf1',
                                color: '#0d9488',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Activity size={16} />
                            </div>
                            {cat.name}
                          </div>
                        </td>
                        <td style={{ padding: '0.85rem 1rem', color: '#64748b', fontSize: '0.825rem' }}>
                          {cat.description || 'No description provided'}
                        </td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <span
                            style={{
                              backgroundColor: '#f1f5f9',
                              color: '#334155',
                              padding: '0.2rem 0.6rem',
                              borderRadius: '9999px',
                              fontWeight: '600',
                              fontSize: '0.8rem',
                            }}
                          >
                            {cat.productCount} medicines
                          </span>
                        </td>
                        <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                          <button
                            type="button"
                            onClick={() => handleDeletePrompt(cat)}
                            className="btn btn-outline btn-sm"
                            style={{ padding: '0.35rem 0.55rem', color: '#ef4444', borderColor: '#fca5a5' }}
                            title="Delete category"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .category-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminCategoriesPage;
