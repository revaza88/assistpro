import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  // Response interceptor
  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    if (path.startsWith("/api")) {
      logApiRequest(req, res, Date.now() - start, capturedJsonResponse);
    }
  });

  next();
};

function logApiRequest(
  req: Request, 
  res: Response, 
  duration: number, 
  response?: Record<string, any>
) {
  const status = res.statusCode;
  const statusEmoji = status >= 400 ? '❌' : status >= 300 ? '⚠️' : '✅';
  
  let logMessage = `${req.method} ${req.path} ${status} (${duration}ms)`;
  
  const logData = {
    method: req.method,
    path: req.path,
    status,
    duration,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
    ...(response && { response: response })
  };

  if (status >= 400) {
    logger.warn(`${statusEmoji} ${logMessage}`, logData);
  } else {
    logger.info(`${statusEmoji} ${logMessage}`, logData);
  }
}
