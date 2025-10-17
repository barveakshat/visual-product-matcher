const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    minlength: [3, 'Product name must be at least 3 characters'],
    validate: {
      validator: function(v) {
        return v && v.trim().length > 0;
      },
      message: 'Product name cannot be empty'
    }
  },
  category: {
    type: String,
    required: false,
    trim: true,
    default: 'Uncategorized',
    validate: {
      validator: function(v) {
        return !v || v.trim().length > 0;
      },
      message: 'Category cannot be empty string'
    }
  },
  image_url: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return v && v.trim().length > 0;
      },
      message: 'Image URL cannot be empty'
    }
  },
  embedding: {
    type: [Number],
    required: [true, 'Embedding is required'],
    validate: {
      validator: function(v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: 'Embedding must be a non-empty array'
    }
  },
  metadata: {
    type: Object,
    default: {}
  }
}, {
  timestamps: true
});

// Index for vector search
productSchema.index({ embedding: 1 });

module.exports = mongoose.model('Product', productSchema);