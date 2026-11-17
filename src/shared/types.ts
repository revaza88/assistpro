import type { IndustryId, ServiceId } from './selection';
import type { CalculatorInput, DemoEstimate } from './pricing';

export type Contact = {
  calculator?: CalculatorInput;
  demoEstimate?: DemoEstimate;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  message: string;
  subject?: string;
  industry?: IndustryId;
  services?: ServiceId[];
  privacy: boolean;
  createdAt: Date;
};

export type InsertContact = {
  calculator?: CalculatorInput;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  message: string;
  subject?: string;
  industry?: IndustryId;
  services?: ServiceId[];
  privacy?: boolean; // Made optional as it has a default in schema
};

export type JobApplication = {
  id: number;
  firstName: string;
  lastName:string;
  email: string;
  phone?: string | null;
  position: string;
  resume?: string | null; // Assuming URL or file path
  coverLetter?: string | null;
  createdAt: Date;
  privacy?: boolean; // Added based on contact form, ensure consistency if needed
};

export type InsertJobApplication = {
  firstName: string;
  lastName:string;
  email: string;
  phone?: string | null;
  position: string;
  resume?: string | null;
  coverLetter?: string | null;
  privacy?: boolean;
};
