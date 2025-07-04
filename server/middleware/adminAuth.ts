import { Request, Response, NextFunction } from 'express';

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  // Simple admin authentication - in production use proper JWT/session auth
  const adminToken = req.headers.authorization?.replace('Bearer ', '');
  
  if (!adminToken || adminToken !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ 
      error: 'Unauthorized access to admin panel' 
    });
  }
  
  next();
};
