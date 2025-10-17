const express = require('express');
const upload = require('../config/multer');
const { validateImageInput, validateMatchRequest } = require('../middleware/validateRequest');
const { limiter, strictLimiter } = require('../middleware/rateLimiter');
const { uploadProduct } = require('../controllers/upload.controller');
const { getAllProducts, getProductById, deleteProduct } = require('../controllers/product.controller');
const { findSimilarProducts } = require('../controllers/match.controller');

const router = express.Router();

router.use(limiter);

/**
 * Health check endpoint
 */
router.get('/test', (req, res) => {
  res.json({ 
    success: true,
    message: 'API is working', 
    timestamp: new Date().toISOString() 
  });
});

/**
 * Product upload with image and embedding generation
 * Applies strict rate limiting
 */
router.post('/upload', 
  strictLimiter,
  upload.single('image'), 
  validateImageInput, 
  uploadProduct
);

/**
 * Find visually similar products
 * Applies strict rate limiting
 */
router.post('/match', 
  strictLimiter,
  validateMatchRequest, 
  findSimilarProducts
);

/**
 * Get all products
 */
router.get('/products', getAllProducts);

/**
 * Get single product by ID
 */
router.get('/products/:id', getProductById);

/**
 * Delete product by ID
 */
router.delete('/products/:id', deleteProduct);

module.exports = router;