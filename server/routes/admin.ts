import { Router } from 'express';
import { adminAuth } from '../middleware/adminAuth';
import { logger } from '../utils/logger';
import { config } from '../config';
import { storage } from '../storage'; // Added storage import

const router = Router();

// Apply admin authentication to all routes
router.use(adminAuth);

// Dashboard stats
router.get('/dashboard', (req, res) => {
  const stats = {
    server: {
      uptime: Math.floor(process.uptime()),
      environment: config.environment,
      nodeVersion: process.version,
      memoryUsage: process.memoryUsage(),
      pid: process.pid
    },
    logs: {
      total: logger.getLogs().length,
      errors: logger.getLogs('error').length,
      warnings: logger.getLogs('warn').length,
      info: logger.getLogs('info').length
    },
    timestamp: new Date().toISOString()
  };

  res.json({ success: true, data: stats });
});

// Get logs
router.get('/logs', (req, res) => {
  const { level, limit = 100 } = req.query;
  const logs = logger.getLogs(level as any);
  const limitedLogs = logs.slice(0, Number(limit));
  
  res.json({ 
    success: true, 
    data: limitedLogs,
    total: logs.length
  });
});

// Server health check
router.get('/health', (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    load: process.cpuUsage()
  };

  res.json({ success: true, data: health });
});

// Get all contacts
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await storage.getAllContacts();
    res.json({ success: true, data: contacts });
  } catch (error) {
    logger.error("Error fetching contacts for admin:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts"
    });
  }
});

// Get all job applications
router.get('/job-applications', async (req, res) => {
  try {
    const applications = await storage.getAllJobApplications();
    res.json({ success: true, data: applications });
  } catch (error) {
    logger.error("Error fetching job applications for admin:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch job applications"
    });
  }
});

export default router;
