import { z } from "zod";

export const insertContactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  privacy: z.boolean().optional().default(false),
});

export const insertJobApplicationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  position: z.string().min(1, "Position is required"),
  resume: z.string().optional(), // Assuming string (e.g. filename or link)
  coverLetter: z.string().optional(),
  privacy: z.boolean().optional().default(false),
});
