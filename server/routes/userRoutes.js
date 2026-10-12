const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  getDashboardStats,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/dashboard/stats', protect, admin, getDashboardStats);
router.route('/').get(protect, admin, getAllUsers);
router
  .route('/:id')
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser);
router.put('/:id/role', protect, admin, updateUserRole);

module.exports = router;
