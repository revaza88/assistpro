import express from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import { errorHandler } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/requestLogger";
import { securityMiddleware, corsMiddleware, compressionMiddleware } from "./middleware/security";
import { apiLimiter } from "./middleware/rateLimiter";
import { config } from "./config";
import { logger } from "./utils/logger";
import adminRoutes from "./routes/admin";

const app = express();

// Security middleware (first)
if (config.features.compression) {
  app.use(compressionMiddleware);
}

app.use(securityMiddleware);
app.use(corsMiddleware);

// Rate limiting for API routes
if (config.features.rateLimiting) {
  app.use('/api', apiLimiter);
}

// Body parsing middleware
app.use(express.json({ limit: config.bodyLimit }));
app.use(express.urlencoded({ extended: false, limit: config.bodyLimit }));

// Custom middleware
app.use(requestLogger);

// Admin routes (protected)
if (config.features.adminPanel) {
  app.use('/api/admin', adminRoutes);
}

(async () => {
  try {
    logger.info('🚀 Starting server...');
    logger.info(`📦 Environment: ${config.environment}`);
    logger.info(`🔧 Features: ${Object.entries(config.features).filter(([_, enabled]) => enabled).map(([name]) => name).join(', ')}`);

    const server = await registerRoutes(app);

    // Error handling middleware (must be last)
    app.use(errorHandler);

    // Environment-specific setup
    if (config.isDevelopment) {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // Server startup
    server.listen(config.port, config.host, () => {
      logger.info(`🚀 Server running on ${config.host}:${config.port}`);
      logger.info(`📦 Environment: ${config.environment}`);
      if (config.features.adminPanel) {
        logger.info(`🔧 Admin panel available at: http://${config.host}:${config.port}/admin`);
      if (config.isProduction && config.adminToken === 'dev-admin-token-123') {
        logger.warn('🚨 SECURITY WARNING: Running in production with the default admin token. Please set a strong ADMIN_TOKEN environment variable.');
      }
      }
    });

  } catch (error) {
    logger.error(`❌ Failed to start server: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
})();
