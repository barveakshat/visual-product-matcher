const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const connectDatabase = require('./config/database');
const corsConfig = require('./config/cors');
const requestLogger = require('./middleware/logger');
const { errorHandler } = require('./middleware/errorHandler');
const Logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 5000;

connectDatabase();

app.use(corsConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/health', (req, res) => {
  res.json({ 
    success: true,
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.use('/api', require('./routes/api'));

app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Route not found' 
  });
});

app.use(errorHandler);

const server = app.listen(PORT, '0.0.0.0', () => {
  Logger.server(PORT, process.env.NODE_ENV || 'development');
});

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      Logger.error(`Port ${PORT} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      Logger.error(`Port ${PORT} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

function gracefulShutdown() {
  Logger.info('Shutdown signal received: closing HTTP server...');
  server.close(() => {
    Logger.info('HTTP server closed');
    const mongoose = require('mongoose');
    mongoose.connection.close()
      .then(() => {
        Logger.info('MongoDB connection closed');
        process.exit(0);
      })
      .catch((err) => {
        Logger.error('Error closing MongoDB:', err);
        process.exit(1);
      });
  });

  setTimeout(() => {
    Logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
}

module.exports = app;