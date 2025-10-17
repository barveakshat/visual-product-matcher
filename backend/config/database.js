const mongoose = require('mongoose');
const Logger = require('../utils/logger');

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/product-matcher');

    Logger.info(`MongoDB Connected: ${conn.connection.host}`);
    Logger.info(`Database: ${conn.connection.name}`);

    mongoose.connection.on('error', (err) => {
      Logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      Logger.warn('MongoDB disconnected');
    });

    return conn;
  } catch (error) {
    Logger.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;
