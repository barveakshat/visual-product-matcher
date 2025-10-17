const axios = require('axios');
const FormData = require('form-data');
const Logger = require('../utils/logger');

const USE_LOCAL_CLIP = process.env.USE_LOCAL_CLIP === 'true';
const LOCAL_CLIP_URL = process.env.LOCAL_CLIP_URL || 'http://localhost:3000';
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HUGGINGFACE_MODEL = process.env.HUGGINGFACE_MODEL || 'google/vit-base-patch16-384';
const HUGGINGFACE_API_URL = `https://api-inference.huggingface.co/models/${HUGGINGFACE_MODEL}`;

if (!USE_LOCAL_CLIP && (!HUGGINGFACE_API_KEY || HUGGINGFACE_API_KEY === 'your_huggingface_api_key_here')) {
  Logger.warn('⚠️  No ML service configured! Please enable CLIP or set HUGGINGFACE_API_KEY');
}

/**
 * Convert various image input types to Buffer
 * @param {string|Buffer} imageInput - Image URL, file path, base64 string, or buffer
 * @returns {Promise<Buffer>} Image data as buffer
 */
async function imageInputToBuffer(imageInput) {
  if (Buffer.isBuffer(imageInput)) {
    return imageInput;
  }

  if (typeof imageInput === 'string' && imageInput.startsWith('http')) {
    const response = await axios.get(imageInput, { 
      responseType: 'arraybuffer',
      timeout: 10000 
    });
    return Buffer.from(response.data);
  }

  if (typeof imageInput === 'string' && imageInput.startsWith('data:')) {
    const base64Data = imageInput.split(',')[1];
    if (!base64Data) {
      throw new Error('Invalid base64 image format');
    }
    return Buffer.from(base64Data, 'base64');
  }

  const fs = require('fs');
  if (!fs.existsSync(imageInput)) {
    throw new Error(`Image file not found: ${imageInput}`);
  }
  return fs.readFileSync(imageInput);
}

/**
 * Generate image embedding using CLIP service (512 dimensions)
 * @param {Buffer} imageBuffer - Image data as buffer
 * @returns {Promise<number[]>} Image embedding vector (512 dimensions)
 */
async function getClipEmbedding(imageBuffer) {
  try {
    const formData = new FormData();
    formData.append('file', imageBuffer, {
      filename: 'image.jpg',
      contentType: 'image/jpeg'
    });

    const response = await axios.post(`${LOCAL_CLIP_URL}/encode_image`, formData, {
      headers: formData.getHeaders(),
      timeout: 30000,
      maxBodyLength: Infinity,
      maxContentLength: Infinity
    });

    if (!response.data) {
      throw new Error('Empty response from CLIP service');
    }

    let embedding;
    if (Array.isArray(response.data)) {
      embedding = response.data;
    } else if (response.data.embedding && Array.isArray(response.data.embedding)) {
      embedding = response.data.embedding;
    } else if (Array.isArray(response.data[0])) {
      embedding = response.data[0];
    } else {
      throw new Error('Unexpected response format from CLIP service');
    }

    if (embedding.length !== 512) {
      Logger.warn(`Expected 512 dimensions, got ${embedding.length}`);
    }

    return embedding;

  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      throw new Error(
        'CLIP service is not running. Start it with: cd clip-service && python service.py'
      );
    }
    
    if (error.response) {
      Logger.error('CLIP service error:', error.response.data);
      throw new Error(`CLIP service error: ${error.response.data?.error || error.response.statusText}`);
    }

    throw new Error(`CLIP service error: ${error.message}`);
  }
}

/**
 * Generate image embedding using Hugging Face API (fallback - only 5 dimensions)
 * @param {Buffer} imageBuffer - Image data as buffer
 * @returns {Promise<number[]>} Image embedding vector (5 dimensions - poor quality)
 */
async function getHuggingFaceEmbedding(imageBuffer) {
  if (!HUGGINGFACE_API_KEY || HUGGINGFACE_API_KEY === 'your_huggingface_api_key_here') {
    throw new Error(
      'No embedding service available! ' +
      'Either enable local CLIP (USE_LOCAL_CLIP=true) or set HUGGINGFACE_API_KEY in .env'
    );
  }

  Logger.warn('⚠️  Using Hugging Face fallback (5 dimensions - limited accuracy)');

  try {
    const response = await axios.post(HUGGINGFACE_API_URL, imageBuffer, {
      headers: {
        'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/octet-stream'
      },
      timeout: 60000,
      maxBodyLength: Infinity
    });

    const data = response.data;

    if (Array.isArray(data) && data[0]?.score) {
      return data.map(item => item.score);
    }

    if (Array.isArray(data) && typeof data[0] === 'number') {
      return data;
    }

    if (Array.isArray(data[0]) && typeof data[0][0] === 'number') {
      return data[0];
    }

    throw new Error('Unexpected response format from Hugging Face');

  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Invalid Hugging Face API key. Check your HUGGINGFACE_API_KEY in .env');
    }
    
    if (error.response) {
      Logger.error('Hugging Face error:', error.response.data);
    }
    
    throw new Error(`Hugging Face error: ${error.message}`);
  }
}

/**
 * Generate image embedding using CLIP (preferred) or Hugging Face (fallback)
 * @param {string|Buffer} imageInput - Image URL, file path, base64 string, or buffer
 * @returns {Promise<number[]>} Image embedding vector
 */
async function getImageEmbedding(imageInput) {
  const imageBuffer = await imageInputToBuffer(imageInput);

  if (USE_LOCAL_CLIP) {
    Logger.info('🎯 Using CLIP service (512 dimensions)');
    return await getClipEmbedding(imageBuffer);
  }

  Logger.warn('⚠️  CLIP disabled, using Hugging Face fallback (5 dimensions)');
  return await getHuggingFaceEmbedding(imageBuffer);
}

module.exports = { 
  getImageEmbedding,
  getClipEmbedding,
  getHuggingFaceEmbedding
};