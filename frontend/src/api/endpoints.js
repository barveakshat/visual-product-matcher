/**
 * API Endpoints
 * All API calls for the application
 */

import apiClient from './client';

/**
 * Health check
 */
export const healthCheck = async () => {
  const response = await apiClient.get('/test');
  return response.data;
};

/**
 * Upload product image (file)
 */
export const uploadProductImage = async (file, name = 'Unnamed Product', category = null) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('name', name);
  if (category) {
    formData.append('category', category);
  }

  const response = await apiClient.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

/**
 * Upload product by URL
 */
export const uploadProductUrl = async (imageUrl, name = 'Unnamed Product', category = null) => {
  const body = {
    imageUrl,
    name,
  };
  
  if (category) {
    body.category = category;
  }

  const response = await apiClient.post('/upload', body);

  return response.data;
};

/**
 * Find similar products
 */
export const findSimilarProducts = async (imageUrl) => {
  const response = await apiClient.post('/match', {
    image_url: imageUrl,
  });

  return response.data;
};

/**
 * Get all products
 */
export const getAllProducts = async () => {
  const response = await apiClient.get('/products');
  return response.data;
};

/**
 * Get single product by ID
 */
export const getProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

/**
 * Delete product by ID
 */
export const deleteProduct = async (id) => {
  const response = await apiClient.delete(`/products/${id}`);
  return response.data;
};

export default {
  healthCheck,
  uploadProductImage,
  uploadProductUrl,
  findSimilarProducts,
  getAllProducts,
  getProductById,
  deleteProduct,
};
