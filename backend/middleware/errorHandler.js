/**
 * Centralized Error Handling Middleware
 */

const Logger = require('../utils/logger');

const isProduction = process.env.NODE_ENV === 'production';

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  Logger.error('Error:', {
    message: err.message,
    stack: isProduction ? undefined : err.stack,
    url: req.originalUrl,
    method: req.method
  });

  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new AppError(message, 404);
  }

  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new AppError(message, 400);
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = new AppError(message, 400);
  }

  if (err.code === 'LIMIT_FILE_SIZE') {
    error = new AppError('File size exceeds 5MB limit', 400);
  }

  if (err.message && err.message.includes('Only image files')) {
    error = new AppError(err.message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
    ...(isProduction ? {} : { stack: err.stack })
  });
};

module.exports = { errorHandler, AppError };
