// Define simplified types directly, removing dependency on @shared/schema
export type User = {
  id: number;
  username: string;
  password?: string; // Password might not always be present in User objects
};

export type InsertUser = {
  username: string;
  password?: string;
};

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
  // User methods (existing)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
  
  // Job application methods
  createJobApplication(application: InsertJobApplication): Promise<JobApplication>;
  getAllJobApplications(): Promise<JobApplication[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private jobApplications: Map<number, JobApplication>;
  private currentUserId: number;
  private currentContactId: number;
  private currentJobApplicationId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.jobApplications = new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
    this.currentJobApplicationId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    // Simulate creation without actual storage
    console.log("Contact form submission (in-memory storage disabled):", insertContact);
    // Return a mock Contact object matching the expected structure but without saving
    return {
      id: this.currentContactId++, // Still increment to mimic ID generation
      firstName: insertContact.firstName,
      lastName: insertContact.lastName,
      email: insertContact.email,
      phone: insertContact.phone || null,
      company: insertContact.company || null,
      service: insertContact.service || null,
      message: insertContact.message,
      privacy: insertContact.privacy || false,
      createdAt: new Date(),
    } as Contact; // Type assertion might be needed if schema is strict
  }

  async getAllContacts(): Promise<Contact[]> {
    // Return empty array as no contacts are stored
    return [];
  }

  async createJobApplication(insertApplication: InsertJobApplication): Promise<JobApplication> {
    // Simulate creation without actual storage
    console.log("Job application submission (in-memory storage disabled):", insertApplication);
    // Return a mock JobApplication object
    return {
      id: this.currentJobApplicationId++, // Still increment
      firstName: insertApplication.firstName,
      lastName: insertApplication.lastName,
      email: insertApplication.email,
      phone: insertApplication.phone || null,
      position: insertApplication.position,
      resume: insertApplication.resume || null,
      coverLetter: insertApplication.coverLetter || null,
      privacy: insertApplication.privacy || false,
      createdAt: new Date(),
    } as JobApplication; // Type assertion
  }

  async getAllJobApplications(): Promise<JobApplication[]> {
    // Return empty array as no applications are stored
    return [];
  }
}

export const storage = new MemStorage();
