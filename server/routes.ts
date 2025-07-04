import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertJobApplicationSchema } from "@shared/schema";
import { z } from "zod";
import { logger } from "./utils/logger"; // Added logger import

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || "1.0.0",
      environment: process.env.NODE_ENV || "development",
      uptime: process.uptime()
    });
  });

  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      // Log the contact submission
      console.log("New contact submission:", {
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
      console.log("New job application:", {
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
