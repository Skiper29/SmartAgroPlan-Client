// Environment configuration
export const env = {
  NODE_ENV: import.meta.env.MODE,
  API_URL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:7168/api',
  APP_NAME: 'SmartAgroPlan',
  APP_VERSION: '1.0.0',
} as const;

export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
