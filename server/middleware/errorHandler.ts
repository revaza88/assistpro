import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { config } from "../config";

export const errorHandler = (
  err: any, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  if (res.headersSent) { next(err); return; }
  const requestedStatus = err.status || err.statusCode;
  const status = Number.isInteger(requestedStatus) && requestedStatus >= 400 && requestedStatus <= 599 ? requestedStatus : 500;
  const publicMessages: Record<number, string> = { 400: 'Invalid request', 413: 'Request body too large', 415: 'Unsupported content type' };
  const message = config.isProduction ? publicMessages[status] ?? 'Request failed' : err.message || 'Internal Server Error';
  
  // Log error details
  logger.error(`Error ${status}: ${message}`, {
    path: `${req.method} ${req.path}`,
    ...(config.isDevelopment && { stack: err.stack }),
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
