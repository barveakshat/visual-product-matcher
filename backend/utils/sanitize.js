/**
 * Input Sanitization Utilities
 * Prevents XSS, SQL injection, and other malicious inputs
 */

/**
 * Sanitize string input by removing potentially dangerous characters
 * @param {string} input - Input string to sanitize
 * @param {number} maxLength - Maximum allowed length
 * @returns {string} Sanitized string
 */
function sanitizeString(input, maxLength = 255) {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, '') // Remove < and > to prevent XSS
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers like onclick=
}

/**
 * Validate and sanitize URL
 * @param {string} url - URL to validate
 * @returns {string|null} Sanitized URL or null if invalid
 */
function sanitizeUrl(url) {
  if (!url || typeof url !== 'string') return null;
  
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return null;
    }
    return parsed.href;
  } catch (error) {
    return null;
  }
}

/**
 * Validate and sanitize product name
 * @param {string} name - Product name
 * @returns {string} Sanitized product name
 */
function sanitizeProductName(name) {
  if (!name || typeof name !== 'string') {
    return 'Unnamed Product';
  }
  return sanitizeString(name, 100);
}

/**
 * Validate and sanitize category
 * @param {string} category - Category name
 * @param {string[]} allowedCategories - List of allowed categories
 * @returns {string} Sanitized category
 */
function sanitizeCategory(category, allowedCategories = []) {
  if (!category || typeof category !== 'string') return 'Uncategorized';
  
  const cleaned = sanitizeString(category, 50);
  
  if (allowedCategories.length > 0 && !allowedCategories.includes(cleaned)) {
    return 'Uncategorized';
  }
  
  return cleaned;
}

/**
 * Sanitize MongoDB query to prevent NoSQL injection
 * @param {object} query - MongoDB query object
 * @returns {object} Sanitized query
 */
function sanitizeMongoQuery(query) {
  if (typeof query !== 'object' || query === null) {
    return {};
  }

  const sanitized = {};
  for (const [key, value] of Object.entries(query)) {
    if (key.startsWith('$')) continue;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      sanitized[key] = sanitizeMongoQuery(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}

/**
 * Validate file upload
 * @param {object} file - Multer file object
 * @returns {object} Validation result
 */
function validateFileUpload(file) {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return { valid: false, error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File size exceeds 5MB limit' };
  }

  return { valid: true };
}

module.exports = {
  sanitizeString,
  sanitizeUrl,
  sanitizeProductName,
  sanitizeCategory,
  sanitizeMongoQuery,
  validateFileUpload
};
