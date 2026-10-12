const Category = require('../models/Category');
const Product = require('../models/Product');

// @desc    Get all categories with medicine counts
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ name: 1 });

    // Calculate product counts for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await Product.countDocuments({
          category: { $regex: new RegExp(`^${cat.name}$`, 'i') },
        });
        return {
          ...cat.toObject(),
          productCount: count,
        };
      })
    );

    res.json({
      success: true,
      categories: categoriesWithCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching categories',
    });
  }
};

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res) => {
  try {
    const { name, description, icon } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Category name is required',
      });
    }

    const existingCategory = await Category.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, 'i') },
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category already exists',
      });
    }

    const category = await Category.create({
      name: name.trim(),
      description: description || '',
      icon: icon || 'pill',
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error creating category',
    });
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (category) {
      await Category.deleteOne({ _id: category._id });
      res.json({
        success: true,
        message: 'Category removed successfully',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error deleting category',
    });
  }
};

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
};
