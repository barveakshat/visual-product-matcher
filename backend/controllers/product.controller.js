/**
 * Product Controller
 * Handles product retrieval operations
 */

const Product = require('../models/Product');
const { AppError } = require('../middleware/errorHandler');

/**
 * Get all products
 * @route GET /api/products
 */
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .select('-embedding') // Exclude large embedding field
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single product by ID
 * @route GET /api/products/:id
 */
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete product by ID
 * @route DELETE /api/products/:id
 */
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  deleteProduct
};
