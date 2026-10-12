import React, { useState, useEffect } from 'react';
import { Users, Shield, User, Trash2, Calendar, Phone, Mail } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import ConfirmModal from '../../components/ConfirmModal';
import Toast from '../../components/Toast';

const AdminUsersPage = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Delete modal state
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/users');
      setUsers(data.users || []);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to retrieve registered users');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleToggle = async (user) => {
    if (user._id === currentUser._id) {
      setToast({
        show: true,
        message: 'You cannot change your own administrator role',
        type: 'error',
      });
      return;
    }

    const newRole = user.role === 'admin' ? 'user' : 'admin';
    try {
      await api.put(`/users/${user._id}/role`, { role: newRole });
      setToast({
        show: true,
        message: `${user.name} role updated to ${newRole}`,
        type: 'success',
      });
      fetchUsers();
    } catch (err) {
      setToast({
        show: true,
        message: err.message || 'Failed to toggle user role',
        type: 'error',
      });
    }
  };

  const handleDeletePrompt = (user) => {
    if (user._id === currentUser._id) {
      setToast({
        show: true,
        message: 'You cannot delete your own account while logged in',
        type: 'error',
      });
      return;
    }
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    try {
      setDeleting(true);
      await api.delete(`/users/${userToDelete._id}`);
      setDeleting(false);
      setDeleteModalOpen(false);
      setUserToDelete(null);
      setToast({
        show: true,
        message: 'User removed successfully',
        type: 'success',
      });
      fetchUsers();
    } catch (err) {
      setDeleting(false);
      setDeleteModalOpen(false);
      setToast({
        show: true,
        message: err.message || 'Failed to delete user',
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
        title="Delete User Account"
        message={`Are you sure you want to delete user account "${userToDelete?.name}" (${userToDelete?.email})?`}
        confirmText={deleting ? 'Deleting...' : 'Delete'}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModalOpen(false)}
      />

      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a' }}>
          Registered User Accounts
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.925rem' }}>
          Manage customer and administrator account privileges
        </p>
      </div>

      {error && <Message variant="danger">{error}</Message>}

      {loading ? (
        <Loader text="Loading user accounts..." />
      ) : (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
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
                  <th style={{ padding: '0.85rem 1rem' }}>User Profile</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Contact Info</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Role</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Joined Date</th>
                  <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const isCurrent = u._id === currentUser._id;
                  const formattedDate = new Date(u.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  });

                  return (
                    <tr key={u._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div
                            style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '50%',
                              backgroundColor: u.role === 'admin' ? '#fef3c7' : '#ccfbf1',
                              color: u.role === 'admin' ? '#b45309' : '#0f766e',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: '700',
                              fontSize: '0.9rem',
                            }}
                          >
                            {u.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <strong style={{ color: '#0f172a' }}>
                              {u.name} {isCurrent && '(You)'}
                            </strong>
                            <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>
                              ID: {u._id}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '0.85rem 1rem' }}>
                        <div style={{ color: '#0f172a' }}>{u.email}</div>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          {u.phone || 'No phone provided'}
                        </span>
                      </td>

                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '9999px',
                            backgroundColor: u.role === 'admin' ? '#fee2e2' : '#e0f2fe',
                            color: u.role === 'admin' ? '#b91c1c' : '#0369a1',
                            textTransform: 'uppercase',
                          }}
                        >
                          {u.role}
                        </span>
                      </td>

                      <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>
                        {formattedDate}
                      </td>

                      <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                          <button
                            type="button"
                            onClick={() => handleRoleToggle(u)}
                            disabled={isCurrent}
                            className="btn btn-outline btn-sm"
                            style={{
                              padding: '0.35rem 0.65rem',
                              fontSize: '0.75rem',
                              opacity: isCurrent ? 0.5 : 1,
                            }}
                          >
                            {u.role === 'admin' ? 'Demote to User' : 'Make Admin'}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeletePrompt(u)}
                            disabled={isCurrent}
                            className="btn btn-outline btn-sm"
                            style={{
                              padding: '0.35rem 0.55rem',
                              color: '#ef4444',
                              borderColor: '#fca5a5',
                              opacity: isCurrent ? 0.5 : 1,
                            }}
                            title={isCurrent ? 'Cannot delete self' : 'Delete user'}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
