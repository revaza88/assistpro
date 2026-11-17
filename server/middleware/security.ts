import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { config } from '../config';
import { randomBytes } from 'node:crypto';
import type { RequestHandler, Response } from 'express';
import type { IncomingMessage, ServerResponse } from 'node:http';

const headers = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: config.isProduction
        ? ["'self'", "'strict-dynamic'", "'report-sample'", (_req: IncomingMessage, res: ServerResponse) => `'nonce-${(res as Response).locals.scriptNonce}'`]
        : ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      fontSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: config.isProduction ? ["'self'"] : ["'self'", "ws:", "wss:"],
      objectSrc: ["'none'"],
      baseUri: ["'none'"],
      frameAncestors: ["'none'"],
      formAction: ["'self'"],
    }
  },
  crossOriginEmbedderPolicy: false,
  frameguard: { action: 'deny' },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
});

export const securityMiddleware: RequestHandler = (req, res, next) => {
  if (config.isProduction) res.locals.scriptNonce = randomBytes(18).toString('base64');
  res.setHeader('Permissions-Policy', 'camera=(), geolocation=(), microphone=()');
  headers(req, res, next);
};

export const corsMiddleware = cors({
  origin: config.corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
});

export const compressionMiddleware = compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
  level: 6
});
