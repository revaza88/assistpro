import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { config } from "../config";

export const errorHandler = (
  err: any, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  // Log error details
  logger.error(`Error ${status}: ${message}`, {
    path: `${req.method} ${req.path}`,
    stack: err.stack,
    body: req.body,
    query: req.query,
    params: req.params,
    userAgent: req.get('User-Agent'),
    ip: req.ip
  });

  // Send appropriate response
  res.status(status).json({
    error: {
      message,
      status,
      ...(config.isDevelopment && { 
        stack: err.stack,
        details: {
          path: req.path,
          method: req.method,
          timestamp: new Date().toISOString()
        }
      }),
      timestamp: new Date().toISOString(),
      path: req.path
    }
  });
};
