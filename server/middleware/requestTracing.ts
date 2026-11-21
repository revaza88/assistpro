import { Request, Response, NextFunction } from "express";
import { randomBytes } from 'node:crypto';
import { logger } from "../utils/logger";

// Extend Request interface to include traceId
declare global {
  namespace Express {
    interface Request {
      traceId?: string;
    }
  }
}

export const requestTracing = (req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith('/api/test-staff')) { next(); return; }
  if (req.path === '/api/chat' || req.path.startsWith('/api/chat/')) { next(); return; }
  const traceId = randomBytes(6).toString('base64url');
  req.traceId = traceId;
  
  // Log request start with trace ID
  logger.info(`🔄 REQUEST START [${traceId}]`, {
    method: req.method,
    url: req.url,
    headers: {
      'user-agent': req.get('User-Agent'),
      'content-type': req.get('Content-Type'),
      'accept': req.get('Accept')
    },
    query: Object.keys(req.query).length > 0 ? req.query : undefined,
    ip: req.ip
  });
  
  const startTime = Date.now();
  
  // Override res.json to capture response
  const originalJson = res.json;
  res.json = function(body) {
    const duration = Date.now() - startTime;
    
    logger.info(`✅ REQUEST END [${traceId}]`, {
      status: res.statusCode,
      duration: `${duration}ms`,
      responseBody: process.env.NODE_ENV === 'development' ? body : undefined,
      size: JSON.stringify(body).length
    });
    
    return originalJson.call(this, body);
  };
  
  // Handle response finish for non-JSON responses
  res.on('finish', () => {
    if (!res.headersSent) return;
    
    const duration = Date.now() - startTime;
    logger.info(`🏁 RESPONSE FINISHED [${traceId}]`, {
      status: res.statusCode,
      duration: `${duration}ms`,
      headers: {
        'content-type': res.get('Content-Type'),
        'content-length': res.get('Content-Length')
      }
    });
  });
  
  next();
};
