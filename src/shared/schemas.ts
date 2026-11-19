import { z } from './validation';
import { industryIds, serviceIds, validPhone } from './selection';
import { calculatorInputSchema } from './pricing';

export const contactFieldsSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().max(80).default(''),
  email: z.union([z.string().trim().email("Invalid email address").max(254), z.literal('')]).default(''),
  phone: z.string().trim().max(50).refine(value => value === '' || validPhone(value), 'Invalid phone').optional(),
  company: z.string().trim().max(200).optional(),
  service: z.string().trim().max(200).optional(),
  subject: z.string().trim().min(1).max(200).optional(),
  message: z.string().trim().max(5000).default(''),
  industry: z.enum(industryIds).default('other'),
  services: z.array(z.enum(serviceIds)).max(serviceIds.length).refine(ids => new Set(ids).size === ids.length, 'Duplicate services').default([]),
  calculator: calculatorInputSchema.optional(),
  privacy: z.boolean().optional().default(false),
});

export const insertContactSchema = contactFieldsSchema.superRefine((value, context) => {
  if (!value.email && !value.phone) context.addIssue({ code: z.ZodIssueCode.custom, path: ['email'], message: 'Email or phone is required' });
  if (!value.privacy) context.addIssue({ code: z.ZodIssueCode.custom, path: ['privacy'], message: 'Consent is required' });
});

// Read legacy local records with their original constraints; validate new writes below.
export const jobApplicationFieldsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  position: z.string().min(1, "Position is required"),
  resume: z.string().optional(), // Assuming string (e.g. filename or link)
  coverLetter: z.string().optional(),
  privacy: z.boolean().optional().default(false),
});

export const insertJobApplicationSchema = jobApplicationFieldsSchema.extend({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(50).refine(value => !value || validPhone(value), 'Invalid phone').optional(),
  position: z.string().trim().min(1).max(200),
  resume: z.string().trim().max(2048).optional(),
  coverLetter: z.string().trim().max(5000).optional(),
}).refine(value => value.privacy, { path: ['privacy'], message: 'Consent is required' });
