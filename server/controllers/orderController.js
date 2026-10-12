const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No order items specified in cart',
      });
    }

    if (
      !shippingAddress ||
      !shippingAddress.fullName ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.postalCode ||
      !shippingAddress.phone
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required shipping address fields',
      });
    }

    // Validate stock and update inventory
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product "${item.name}" was not found`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for "${product.name}". Only ${product.stock} available.`,
        });
      }
    }

    // Deduct stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || 'Cash on Delivery',
      itemsPrice: Number(itemsPrice),
      taxPrice: Number(taxPrice),
      shippingPrice: Number(shippingPrice),
      totalPrice: Number(totalPrice),
      orderStatus: 'Pending',
      isPaid: paymentMethod !== 'Cash on Delivery',
      paidAt: paymentMethod !== 'Cash on Delivery' ? Date.now() : null,
    });

    const createdOrder = await order.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: createdOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error creating order',
    });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching your orders',
    });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email phone'
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Ensure only the order creator or an admin can view this order
    if (
      req.user.role !== 'admin' &&
      order.user._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order',
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Invalid order ID format',
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || 'Server error retrieving order',
    });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching all orders',
    });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, isPaid } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    const previousStatus = order.orderStatus;
    const allowedStatuses = [
      'Pending',
      'Confirmed',
      'Processing',
      'Shipped',
      'Delivered',
      'Cancelled',
    ];

    if (orderStatus && !allowedStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid order status. Allowed values: ${allowedStatuses.join(', ')}`,
      });
    }

    // If order is getting cancelled now (and wasn't already cancelled), restore stock
    if (orderStatus === 'Cancelled' && previousStatus !== 'Cancelled') {
      for (const item of order.orderItems) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity },
        });
      }
    }

    if (orderStatus) {
      order.orderStatus = orderStatus;
      if (orderStatus === 'Delivered') {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        order.isPaid = true;
        order.paidAt = order.paidAt || Date.now();
      }
    }

    if (isPaid !== undefined) {
      order.isPaid = Boolean(isPaid);
      if (order.isPaid && !order.paidAt) {
        order.paidAt = Date.now();
      }
    }

    const updatedOrder = await order.save();

    res.json({
      success: true,
      message: `Order status updated to ${updatedOrder.orderStatus}`,
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error updating order status',
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};
