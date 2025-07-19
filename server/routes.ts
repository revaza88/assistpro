import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
// import { insertContactSchema, insertJobApplicationSchema } from "@shared/schema"; // Removed
import { z } from "zod";
import { logger } from "./utils/logger"; // Added logger import
import { insertContactSchema, insertJobApplicationSchema } from "../src/shared/schemas";


export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint with detailed information
  app.get("/health", (req, res) => {
    const memUsage = process.memoryUsage();
    const uptime = process.uptime();
    
    const healthData = {
      status: "ok",
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || "1.0.0",
      environment: process.env.NODE_ENV || "development",
      uptime: {
        seconds: Math.floor(uptime),
        human: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`
      },
      memory: {
        rss: `${Math.round(memUsage.rss / 1024 / 1024)}MB`,
        heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`,
        heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`,
        heapUsedPercent: `${Math.round((memUsage.heapUsed / memUsage.heapTotal) * 100)}%`
      },
      node: {
        version: process.version,
        platform: process.platform,
        arch: process.arch
      },
      features: {
        compression: !!process.env.ENABLE_COMPRESSION,
        rateLimiting: !!process.env.ENABLE_RATE_LIMITING,
        monitoring: !!process.env.ENABLE_MONITORING
      }
    };
    
    logger.debug("Health check requested", { 
      ip: req.ip, 
      userAgent: req.get('User-Agent'),
      memory: healthData.memory
    });
    
    res.status(200).json(healthData);
  });

  // Debug endpoint (development only)
  if (process.env.NODE_ENV === 'development') {
    app.get("/debug/logs", (req, res) => {
      const level = req.query.level as string;
      const logs = logger.getLogs(level as any);
      res.json({
        count: logs.length,
        logs: logs.slice(0, 100) // Last 100 logs
      });
    });
    
    app.get("/debug/config", (req, res) => {
      res.json({
        config: {
          port: process.env.PORT,
          host: process.env.HOST,
          nodeEnv: process.env.NODE_ENV,
          corsOrigin: process.env.CORS_ORIGIN,
          logLevel: process.env.LOG_LEVEL
        },
        env: Object.keys(process.env).filter(key => !key.includes('SECRET') && !key.includes('PASSWORD'))
      });
    });
  }

  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      // Log the contact submission
      logger.info("New contact submission:", {
        name: `${contact.firstName} ${contact.lastName}`,
        email: contact.email,
        service: contact.service,
        company: contact.company
      });
      
      res.status(201).json({ 
        success: true, 
        message: "თქვენი შეტყობინება წარმატებით გაიგზავნა",
        id: contact.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "არასწორი მონაცემები", 
          errors: error.errors 
        });
      } else {
        logger.error("Error creating contact:", error);
        res.status(500).json({ 
          success: false, 
          message: "სერვერის შეცდომა" 
        });
      }
    }
  });

  // Job application submission
  app.post("/api/job-applications", async (req, res) => {
    try {
      const validatedData = insertJobApplicationSchema.parse(req.body);
      const application = await storage.createJobApplication(validatedData);
      
      // Log the job application
      logger.info("New job application:", {
        name: `${application.firstName} ${application.lastName}`,
        email: application.email,
        position: application.position
      });
      
      res.status(201).json({ 
        success: true, 
        message: "თქვენი განაცხადი წარმატებით გაიგზავნა",
        id: application.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "არასწორი მონაცემები", 
          errors: error.errors 
        });
      } else {
        logger.error("Error creating job application:", error);
        res.status(500).json({ 
          success: false, 
          message: "სერვერის შეცდომა" 
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
