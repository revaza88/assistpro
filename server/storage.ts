// Define simplified types directly, removing dependency on @shared/schema
export type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  message: string;
  privacy: boolean;
  createdAt: Date;
};

export type InsertContact = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  message: string;
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


export interface IStorage {
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
  
  // Job application methods
  createJobApplication(application: InsertJobApplication): Promise<JobApplication>;
  getAllJobApplications(): Promise<JobApplication[]>;
}

export class MemStorage implements IStorage {
  private contacts: Map<number, Contact>;
  private jobApplications: Map<number, JobApplication>;
  private currentContactId: number;
  private currentJobApplicationId: number;

  constructor() {
    this.contacts = new Map();
    this.jobApplications = new Map();
    this.currentContactId = 1;
    this.currentJobApplicationId = 1;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const newContact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date(),
      privacy: insertContact.privacy || false, // Ensure privacy has a default
      phone: insertContact.phone || null,
      company: insertContact.company || null,
      service: insertContact.service || null,
    };
    this.contacts.set(id, newContact);
    console.log("New contact created (in-memory):", newContact);
    return newContact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async createJobApplication(insertApplication: InsertJobApplication): Promise<JobApplication> {
    const id = this.currentJobApplicationId++;
    const newApplication: JobApplication = {
      ...insertApplication,
      id,
      createdAt: new Date(),
      privacy: insertApplication.privacy || false, // Ensure privacy has a default
      phone: insertApplication.phone || null,
      resume: insertApplication.resume || null,
      coverLetter: insertApplication.coverLetter || null,
    };
    this.jobApplications.set(id, newApplication);
    console.log("New job application created (in-memory):", newApplication);
    return newApplication;
  }

  async getAllJobApplications(): Promise<JobApplication[]> {
    return Array.from(this.jobApplications.values());
  }
}

export const storage = new MemStorage();
