export const config = {
  port: parseInt(process.env.PORT || '5000'),
  host: process.env.HOST || 'localhost',
  environment: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV !== 'production',
  isProduction: process.env.NODE_ENV === 'production',
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
  
  // Security
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  adminToken: process.env.ADMIN_TOKEN || 'dev-admin-token-123',
  
  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  },

  // Request body limits
  bodyLimit: '10mb',

  // Database
  database: {
    url: process.env.DATABASE_URL || 'postgresql://localhost:5432/assist',
  },

  // Features
  features: {
    adminPanel: process.env.ENABLE_ADMIN_PANEL !== 'false',
    rateLimiting: process.env.ENABLE_RATE_LIMITING !== 'false',
    compression: process.env.ENABLE_COMPRESSION !== 'false',
    monitoring: process.env.ENABLE_MONITORING !== 'false'
  }
} as const;
