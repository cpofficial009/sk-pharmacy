const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Get all registered users
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching users',
    });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
      res.json({
        success: true,
        user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error retrieving user',
    });
  }
};

// @desc    Update user role (promote to admin or demote to user)
// @route   PUT /api/users/:id/role
// @access  Private/Admin
const updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot modify your own admin role',
      });
    }

    user.role = req.body.role || (user.role === 'admin' ? 'user' : 'admin');
    await user.save();

    res.json({
      success: true,
      message: `User role updated to ${user.role}`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error updating user role',
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account while logged in',
      });
    }

    await User.deleteOne({ _id: user._id });

    res.json({
      success: true,
      message: 'User removed successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error deleting user',
    });
  }
};

// @desc    Get dashboard metrics & summary
// @route   GET /api/users/dashboard/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Calculate total revenue (from non-cancelled orders)
    const validOrders = await Order.find({ orderStatus: { $ne: 'Cancelled' } });
    const totalRevenue = validOrders.reduce(
      (acc, order) => acc + (order.totalPrice || 0),
      0
    );

    // Orders status distribution
    const statusCounts = {
      Pending: await Order.countDocuments({ orderStatus: 'Pending' }),
      Confirmed: await Order.countDocuments({ orderStatus: 'Confirmed' }),
      Processing: await Order.countDocuments({ orderStatus: 'Processing' }),
      Shipped: await Order.countDocuments({ orderStatus: 'Shipped' }),
      Delivered: await Order.countDocuments({ orderStatus: 'Delivered' }),
      Cancelled: await Order.countDocuments({ orderStatus: 'Cancelled' }),
    };

    // Low stock items (stock <= 10)
    const lowStockProducts = await Product.find({ stock: { $lte: 10 } })
      .select('name brand stock price category image')
      .limit(8);

    // Recent 5 orders
    const recentOrders = await Order.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        statusCounts,
        lowStockProducts,
        recentOrders,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching dashboard metrics',
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  getDashboardStats,
};
