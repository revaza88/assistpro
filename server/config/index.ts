export const config = {
  port: parseInt(process.env.PORT || '5000'),
  host: process.env.HOST || '0.0.0.0',
  environment: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV !== 'production',
  isProduction: process.env.NODE_ENV === 'production',
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
  
  // Security
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5000',
  
  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  },

  // Request body limits
  bodyLimit: '10mb',

  // Features
  features: {
    rateLimiting: process.env.ENABLE_RATE_LIMITING !== 'false',
    compression: process.env.ENABLE_COMPRESSION !== 'false',
    monitoring: process.env.ENABLE_MONITORING !== 'false'
  }
} as const;
