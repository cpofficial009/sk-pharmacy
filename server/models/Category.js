const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide category name'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'pill',
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
