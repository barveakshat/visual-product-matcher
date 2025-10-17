/**
 * Request Validation Middleware
 */

const { AppError } = require('./errorHandler');

/**
 * Validate image upload or URL
 */
const validateImageInput = (req, res, next) => {
  const hasFile = req.file;
  const hasUrl = req.body.imageUrl;

  if (!hasFile && !hasUrl) {
    return next(new AppError('Please provide an image file or image URL', 400));
  }

  if (hasUrl && !isValidUrl(req.body.imageUrl)) {
    return next(new AppError('Please provide a valid image URL', 400));
  }

  next();
};

/**
 * Validate match request
 */
const validateMatchRequest = (req, res, next) => {
  const { image_url } = req.body;

  if (!image_url) {
    return next(new AppError('Image URL is required', 400));
  }

  next();
};

/**
 * Helper: Check if string is valid URL
 */
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

module.exports = {
  validateImageInput,
  validateMatchRequest
};
