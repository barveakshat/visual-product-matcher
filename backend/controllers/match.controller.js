/**
 * Match Controller
 * Handles visual similarity matching
 */

const Product = require('../models/Product');
const { getImageEmbedding } = require('../services/ml-service');
const { AppError } = require('../middleware/errorHandler');
const Logger = require('../utils/logger');

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(vecA, vecB) {
  if (vecA.length !== vecB.length) {
    throw new Error('Vectors must have the same length');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dotProduct / (normA * normB);
}

/**
 * Find similar products based on image
 * @route POST /api/match
 */
const findSimilarProducts = async (req, res, next) => {
  try {
    const { image_url } = req.body;

    if (!image_url) {
      return next(new AppError('Image URL is required', 400));
    }

    Logger.debug('Finding matches for:', image_url);

    // Generate embedding for query image
    Logger.debug('Generating query embedding...');
    const queryEmbedding = await getImageEmbedding(image_url);

    if (!queryEmbedding || !Array.isArray(queryEmbedding)) {
      return next(new AppError('Failed to generate query embedding', 500));
    }

    Logger.debug('Query embedding generated, length:', queryEmbedding.length);

    // Get all products with embeddings
    // Exclude user-uploaded products (only show catalog/seeded products)
    const products = await Product.find({ 
      embedding: { $exists: true },
      // Exclude products with generic names that indicate user uploads
      name: { 
        $nin: ['Uploaded Product', 'Product from URL', 'Unnamed Product'],
        $not: /^iphone$/i // Exclude exact match "iphone" (user upload)
      }
    });

    if (products.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No products available for matching',
        data: []
      });
    }

    Logger.debug(`Comparing against ${products.length} products...`);

    // Calculate similarities
    const similarities = products.map(product => {
      const similarity = cosineSimilarity(queryEmbedding, product.embedding);
      return {
        id: product._id,
        productId: product._id.toString(),
        name: product.name,
        category: product.category || 'Uncategorized',
        image_url: product.image_url,
        similarity: similarity,
        similarityScore: similarity,
        similarity_percentage: (similarity * 100).toFixed(2)
      };
    });

    // Sort by similarity (highest first) and get top 10
    const topMatches = similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 10);

    Logger.debug('Top match:', topMatches[0]?.similarity_percentage + '%');

    res.status(200).json({
      success: true,
      query_image: image_url,
      count: topMatches.length,
      data: topMatches
    });

  } catch (error) {
    Logger.error('Match error:', error);
    next(error);
  }
};

module.exports = {
  findSimilarProducts
};
