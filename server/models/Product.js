const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide medicine/product name'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Please provide brand name'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide price'],
      min: [0, 'Price must be greater than or equal to 0'],
      default: 0,
    },
    discount: {
      type: Number,
      min: [0, 'Discount must be at least 0%'],
      max: [100, 'Discount cannot exceed 100%'],
      default: 0,
    },
    stock: {
      type: Number,
      required: [true, 'Please provide available stock count'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL'],
      default: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60',
    },
    manufacturer: {
      type: String,
      required: [true, 'Please provide manufacturer name'],
      trim: true,
    },
    dosage: {
      type: String,
      required: [true, 'Please specify dosage (e.g. 500mg, 10ml, 1 tablet daily)'],
    },
    usage: {
      type: String,
      required: [true, 'Please specify usage/indication instructions'],
    },
    expiryDate: {
      type: Date,
      required: [true, 'Please specify product expiry date'],
    },
    requiresPrescription: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 12,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual property for discounted final price
productSchema.virtual('finalPrice').get(function () {
  if (this.discount > 0) {
    return Math.round(this.price * (1 - this.discount / 100));
  }
  return this.price;
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
