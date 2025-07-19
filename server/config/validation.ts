import { logger } from '../utils/logger';
import { config } from '../config';

interface EnvValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateEnvironment(): EnvValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  logger.info('🔧 Validating environment variables...');
  
  // Required environment variables
  const required = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT
  };
  
  // Optional environment variables with defaults
  const optional = {
    HOST: process.env.HOST || '0.0.0.0',
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5000',
    LOG_LEVEL: process.env.LOG_LEVEL || 'info'
  };
  
  // Validate required variables
  for (const [key, value] of Object.entries(required)) {
    if (!value) {
      errors.push(`Required environment variable missing: ${key}`);
      logger.error(`❌ ${key}: undefined`);
    } else {
      logger.info(`✅ ${key}: ${value}`);
    }
  }
  
  // Log optional variables
  for (const [key, value] of Object.entries(optional)) {
    if (process.env[key]) {
      logger.info(`✅ ${key}: ${value}`);
    } else {
      warnings.push(`Optional environment variable not set: ${key} (using default: ${value})`);
      logger.warn(`⚠️ ${key}: using default "${value}"`);
    }
  }
  
  // Validate PORT is a number
  const port = parseInt(process.env.PORT || '');
  if (isNaN(port) || port < 1 || port > 65535) {
    errors.push(`PORT must be a valid number between 1-65535, got: ${process.env.PORT}`);
    logger.error(`❌ PORT validation failed: ${process.env.PORT}`);
  }
  
  // Validate NODE_ENV
  const validEnvs = ['development', 'production', 'test'];
  if (process.env.NODE_ENV && !validEnvs.includes(process.env.NODE_ENV)) {
    warnings.push(`NODE_ENV should be one of: ${validEnvs.join(', ')}, got: ${process.env.NODE_ENV}`);
    logger.warn(`⚠️ NODE_ENV: unexpected value "${process.env.NODE_ENV}"`);
  }
  
  // Log configuration summary
  logger.info('📋 Configuration Summary:', {
    environment: config.environment,
    port: config.port,
    host: config.host,
    isDevelopment: config.isDevelopment,
    features: config.features,
    corsOrigin: config.corsOrigin
  });
  
  const isValid = errors.length === 0;
  
  if (isValid) {
    logger.info(`✅ Environment validation completed (${warnings.length} warnings)`);
  } else {
    logger.error(`❌ Environment validation failed (${errors.length} errors, ${warnings.length} warnings)`);
  }
  
  return { isValid, errors, warnings };
}

export function validateSystemRequirements() {
  logger.info('🔍 Checking system requirements...');
  
  // Check Node.js version
  const nodeVersion = process.version;
  const requiredVersion = '18.0.0';
  logger.info(`📦 Node.js version: ${nodeVersion} (required: >=${requiredVersion})`);
  
  // Check memory
  const memUsage = process.memoryUsage();
  logger.info('💾 Memory usage:', {
    rss: `${Math.round(memUsage.rss / 1024 / 1024)}MB`,
    heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`,
    heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`,
    external: `${Math.round(memUsage.external / 1024 / 1024)}MB`
  });
  
  // Check uptime
  logger.info(`⏱️ Process uptime: ${Math.round(process.uptime())}s`);
}
