const axios = require('axios');

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HUGGINGFACE_MODEL = process.env.HUGGINGFACE_MODEL || 'google/vit-base-patch16-224';

if (!HUGGINGFACE_API_KEY || HUGGINGFACE_API_KEY === 'hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') {
  console.warn('⚠️  WARNING: Hugging Face API key is not set or invalid. Please set HUGGINGFACE_API_KEY in your .env file.');
  console.warn('   Get your API key from: https://huggingface.co/settings/tokens');
  console.warn('   Note: Seeding will continue but may fail if the key is invalid.');
}

async function getImageEmbedding(imageInput) {
  if (!HUGGINGFACE_API_KEY || HUGGINGFACE_API_KEY === 'hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') {
    console.warn('⚠️  WARNING: Hugging Face API key not configured, proceeding anyway...');
  }

  let imageUrl;

  if (typeof imageInput === 'string' && imageInput.startsWith('http')) {
    imageUrl = imageInput;
  } else if (typeof imageInput === 'string' && imageInput.startsWith('data:')) {
    imageUrl = imageInput;
  } else {
    const fs = require('fs');
    const path = require('path');

    if (!fs.existsSync(imageInput)) {
      throw new Error('Image file not found');
    }

    const imageBuffer = fs.readFileSync(imageInput);
    const mimeType = require('mime-types').lookup(path.extname(imageInput)) || 'image/jpeg';
    imageUrl = `data:${mimeType};base64,${imageBuffer.toString('base64')}`;
  }

  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${HUGGINGFACE_MODEL}`,
      { inputs: imageUrl },
      {
        headers: {
          'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data && Array.isArray(response.data)) {
      if (response.data[0] && typeof response.data[0].label === 'string' && typeof response.data[0].score === 'number') {
        const topN = 10;
        const featureVector = new Array(1000).fill(0);

        response.data.slice(0, topN).forEach((item, idx) => {
          let hash = 0;
          for (let i = 0; i < item.label.length; i++) {
            hash = ((hash << 5) - hash) + item.label.charCodeAt(i);
            hash = hash & hash;
          }
          const vectorIndex = Math.abs(hash) % 1000;
          featureVector[vectorIndex] = item.score;
        });

        return featureVector;
      }

      if (response.data[0] && response.data[0].image_embeds) {
        return response.data[0].image_embeds;
      }
      return response.data[0];
    } else if (response.data && response.data.image_embeds) {
      return response.data.image_embeds;
    } else if (Array.isArray(response.data)) {
      return response.data;
    }

    throw new Error('Unexpected response format from Hugging Face API');
  } catch (error) {
    console.error('Hugging Face API error:', error.response?.data || error.message);
    throw new Error('Failed to get image embedding');
  }
}

async function findSimilarProducts(queryEmbedding) {
  const Product = require('../models/Product');

  try {
    const products = await Product.find({}, 'name category image_url embedding');

    const similarities = products.map(product => {
      const similarity = cosineSimilarity(queryEmbedding, product.embedding);
      return {
        productId: product._id,
        name: product.name,
        category: product.category,
        image_url: product.image_url,
        similarityScore: similarity
      };
    });

    similarities.sort((a, b) => b.similarityScore - a.similarityScore);
    return similarities.slice(0, 10);
  } catch (error) {
    console.error('Find similar products error:', error);
    throw new Error('Failed to find similar products');
  }
}

function cosineSimilarity(vecA, vecB) {
  if (vecA.length !== vecB.length) {
    throw new Error('Vectors must be of the same length');
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

module.exports = {
  getImageEmbedding,
  findSimilarProducts
};