import axios from 'axios';
import Logger from '../utils/logger';

const API_BASE_URL = process.env.REACT_APP_API_URL;

Logger.info('API Base URL:', API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // 120 seconds (2 minutes) - handles cold starts on free tiers
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    Logger.debug(`${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    Logger.error('Request error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    Logger.debug(`${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      Logger.error(`${error.response.status} ${error.config.url}:`, error.response.data);
    } else if (error.request) {
      Logger.error('No response from server:', error.message);
    } else {
      Logger.error('Request error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
