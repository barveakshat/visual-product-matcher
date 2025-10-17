const Logger = require('../utils/logger');

const logger = (req, res, next) => {
  const start = Date.now();

  Logger.http(req.method, req.originalUrl);

  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    
    Logger.debug(`${req.method} ${req.originalUrl} - ${statusCode} (${duration}ms)`);
  });

  next();
};

module.exports = logger;
