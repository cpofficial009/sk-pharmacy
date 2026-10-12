const Product = require('../models/Product');

// @desc    Fetch all products with filtering, search, sorting & pagination
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const pageSize = Number(req.query.limit) || 12;
    const page = Number(req.query.page) || 1;

    const query = {};

    // Search keyword across name, brand, or description
    if (req.query.search && req.query.search.trim() !== '') {
      const searchRegex = { $regex: req.query.search.trim(), $options: 'i' };
      query.$or = [
        { name: searchRegex },
        { brand: searchRegex },
        { description: searchRegex },
        { usage: searchRegex },
      ];
    }

    // Category filter
    if (req.query.category && req.query.category !== 'All') {
      query.category = { $regex: new RegExp(`^${req.query.category}$`, 'i') };
    }

    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) {
        query.price.$gte = Number(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        query.price.$lte = Number(req.query.maxPrice);
      }
    }

    // In-stock filter
    if (req.query.inStock === 'true') {
      query.stock = { $gt: 0 };
    }

    // Sorting
    let sortOption = { createdAt: -1 }; // Default: newest
    if (req.query.sort === 'price-asc') {
      sortOption = { price: 1 };
    } else if (req.query.sort === 'price-desc') {
      sortOption = { price: -1 };
    } else if (req.query.sort === 'name-asc') {
      sortOption = { name: 1 };
    } else if (req.query.sort === 'name-desc') {
      sortOption = { name: -1 };
    } else if (req.query.sort === 'rating') {
      sortOption = { rating: -1 };
    }

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOption)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      success: true,
      products,
      page,
      pages: Math.ceil(count / pageSize),
      totalProducts: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching products',
    });
  }
};

// @desc    Fetch featured / top-rated products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      $or: [{ isFeatured: true }, { rating: { $gte: 4.5 } }],
    })
      .limit(8)
      .sort({ rating: -1 });

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching featured products',
    });
  }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json({
        success: true,
        product,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Medicine product not found',
      });
    }
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Invalid product ID format',
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching product details',
    });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      description,
      price,
      discount,
      stock,
      image,
      manufacturer,
      dosage,
      usage,
      expiryDate,
      requiresPrescription,
      isFeatured,
    } = req.body;

    if (
      !name ||
      !brand ||
      !category ||
      !description ||
      price === undefined ||
      stock === undefined ||
      !manufacturer ||
      !dosage ||
      !usage ||
      !expiryDate
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required medicine details',
      });
    }

    const product = new Product({
      name,
      brand,
      category,
      description,
      price: Number(price),
      discount: Number(discount) || 0,
      stock: Number(stock),
      image:
        image ||
        'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60',
      manufacturer,
      dosage,
      usage,
      expiryDate,
      requiresPrescription: Boolean(requiresPrescription),
      isFeatured: Boolean(isFeatured),
    });

    const createdProduct = await product.save();
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: createdProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error creating product',
    });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      const {
        name,
        brand,
        category,
        description,
        price,
        discount,
        stock,
        image,
        manufacturer,
        dosage,
        usage,
        expiryDate,
        requiresPrescription,
        isFeatured,
      } = req.body;

      product.name = name !== undefined ? name : product.name;
      product.brand = brand !== undefined ? brand : product.brand;
      product.category = category !== undefined ? category : product.category;
      product.description = description !== undefined ? description : product.description;
      product.price = price !== undefined ? Number(price) : product.price;
      product.discount = discount !== undefined ? Number(discount) : product.discount;
      product.stock = stock !== undefined ? Number(stock) : product.stock;
      product.image = image !== undefined ? image : product.image;
      product.manufacturer = manufacturer !== undefined ? manufacturer : product.manufacturer;
      product.dosage = dosage !== undefined ? dosage : product.dosage;
      product.usage = usage !== undefined ? usage : product.usage;
      product.expiryDate = expiryDate !== undefined ? expiryDate : product.expiryDate;
      product.requiresPrescription =
        requiresPrescription !== undefined
          ? Boolean(requiresPrescription)
          : product.requiresPrescription;
      product.isFeatured =
        isFeatured !== undefined ? Boolean(isFeatured) : product.isFeatured;

      const updatedProduct = await product.save();
      res.json({
        success: true,
        message: 'Product updated successfully',
        product: updatedProduct,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error updating product',
    });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({
        success: true,
        message: 'Product deleted successfully',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error deleting product',
    });
  }
};

module.exports = {
  getProducts,
  getFeaturedProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
