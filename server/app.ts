import express from "express";
import { registerRoutes } from "./routes";
import type { Server } from 'node:http';
import { errorHandler } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/requestLogger";
import { requestTracing } from "./middleware/requestTracing";
import { securityMiddleware, corsMiddleware, compressionMiddleware } from "./middleware/security";
import { apiLimiter } from "./middleware/rateLimiter";
import { config } from "./config";
import { logger } from "./utils/logger";
import { validateEnvironment, validateSystemRequirements } from "./config/validation";

const app = express();
app.set('trust proxy', config.trustProxy);

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
if (config.isDevelopment) {
  app.use(requestTracing);
}
app.use(requestLogger);

export async function startServer(setupClient: (application: typeof app, server: Server) => void | Promise<void>) {
  try {
    // Validate environment and system requirements
    const validation = validateEnvironment();
    if (!validation.isValid) {
      logger.error('❌ Environment validation failed:', validation.errors);
      process.exit(1);
    }

    validateSystemRequirements();

    logger.info('🚀 Starting server...');
    logger.info(`📦 Environment: ${config.environment}`);
    logger.info(`🔧 Features: ${Object.entries(config.features).filter(([_, enabled]) => enabled).map(([name]) => name).join(', ')}`);

    const server = await registerRoutes(app);

    await setupClient(app, server);

    // Catch errors from static/client handlers as well as API/body parsing.
    app.use(errorHandler);

    // Server startup
    server.listen(config.port, config.host, () => {
      logger.info(`🚀 Server running on ${config.host}:${config.port}`);
      logger.info(`📦 Environment: ${config.environment}`);
      logger.info(`🌐 Access URL: http://${config.host}:${config.port}`);

      if (config.isDevelopment) {
        logger.info('🔧 Development mode features enabled:');
        logger.info('  • Request tracing');
        logger.info('  • Detailed error messages');
        logger.info('  • Hot module reloading');
      }
    });

    let stopping = false;
    const shutdown = () => {
      if (stopping) return;
      stopping = true;
      server.close(() => process.exit(0));
      server.closeIdleConnections();
      setTimeout(() => process.exit(1), 10000).unref();
    };
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    logger.error(`❌ Failed to start server: ${error instanceof Error ? error.message : String(error)}`);
    if (error instanceof Error) {
      logger.error('Stack trace:', error.stack);
    }
    process.exit(1);
  }
}
