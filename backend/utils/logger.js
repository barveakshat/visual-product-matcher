/**
 * Production-quality logger utility
 * Respects NODE_ENV - verbose in development, minimal in production
 */

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

class Logger {
  /**
   * Log info messages (only in development)
   * @param {...any} args - Arguments to log
   */
  static info(...args) {
    if (isDevelopment) {
      console.log('[INFO]', ...args);
    }
  }

  /**
   * Log debug messages (only in development)
   * @param {...any} args - Arguments to log
   */
  static debug(...args) {
    if (isDevelopment) {
      console.log('[DEBUG]', ...args);
    }
  }

  /**
   * Log warning messages (always)
   * @param {...any} args - Arguments to log
   */
  static warn(...args) {
    console.warn('[WARN]', ...args);
  }

  /**
   * Log error messages (always)
   * @param {...any} args - Arguments to log
   */
  static error(...args) {
    console.error('[ERROR]', ...args);
  }

  /**
   * Log success messages (only in development)
   * @param {...any} args - Arguments to log
   */
  static success(...args) {
    if (isDevelopment) {
      console.log('[SUCCESS] ✅', ...args);
    }
  }

  /**
   * Log HTTP requests (only in development)
   * @param {string} method - HTTP method
   * @param {string} url - Request URL
   */
  static http(method, url) {
    if (isDevelopment) {
      console.log(`[HTTP] ${method.toUpperCase()} ${url}`);
    }
  }

  /**
   * Log server startup (always)
   * @param {number} port - Server port
   * @param {string} env - Environment
   */
  static server(port, env = 'development') {
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║                                                        ║');
    console.log('║         🚀 Visual Product Matcher API                 ║');
    console.log('║                                                        ║');
    console.log('╚════════════════════════════════════════════════════════╝');
    console.log('');
    console.log(`📍 Server:      http://localhost:${port}`);
    console.log(`💚 Health:      http://localhost:${port}/health`);
    console.log(`🔌 API:         http://localhost:${port}/api`);
    console.log(`🌍 Environment: ${env}`);
    console.log('');
    if (isDevelopment) {
      console.log('Press Ctrl+C to stop the server');
      console.log('─────────────────────────────────────────────────────────');
    }
  }
}

module.exports = Logger;
