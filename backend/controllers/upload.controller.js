/**
 * Upload Controller
 * Handles product image uploads and embedding generation
 */

const path = require('path');
const Product = require('../models/Product');
const { getImageEmbedding } = require('../services/ml-service');
const { AppError } = require('../middleware/errorHandler');

/**
 * Upload product image and generate embedding
 * @route POST /api/upload
 */
const uploadProduct = async (req, res, next) => {
  try {
    const { name, imageUrl, category } = req.body;
    
    // Determine image source
    let imageSource;
    if (req.file) {
      imageSource = path.join(__dirname, '../uploads', req.file.filename);
      console.log('📁 Processing uploaded file:', req.file.filename);
      console.log('📂 Full path:', imageSource);
    } else if (imageUrl) {
      imageSource = imageUrl;
      console.log('🔗 Processing image URL:', imageUrl);
    } else {
      return next(new AppError('No image provided', 400));
    }

    // Generate embedding using ML service
    console.log('🧠 Generating embedding...');
    const embedding = await getImageEmbedding(imageSource);

    if (!embedding || !Array.isArray(embedding)) {
      return next(new AppError('Failed to generate embedding', 500));
    }

    console.log('✅ Embedding generated, length:', embedding.length);

    // Create product with embedding
    const productImageUrl = req.file 
      ? `/uploads/${req.file.filename}`
      : imageUrl;
    
    // Validate image URL is not null/empty
    if (!productImageUrl || productImageUrl.trim() === '') {
      return next(new AppError('Image URL cannot be empty', 400));
    }

    const product = new Product({
      name: name || 'Unnamed Product',
      category: category || 'Uncategorized',
      image_url: productImageUrl,
      embedding: embedding
    });

    await product.save();
    console.log('💾 Product saved to database');

    res.status(201).json({
      success: true,
      message: 'Product uploaded successfully',
      data: {
        id: product._id,
        name: product.name,
        category: product.category,
        image_url: product.image_url,
        embedding_length: product.embedding.length
      }
    });

  } catch (error) {
    console.error('❌ Upload error:', error);
    next(error);
  }
};

module.exports = {
  uploadProduct
};
