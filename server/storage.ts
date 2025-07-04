import { 
  users, 
  contacts, 
  jobApplications,
  type User, 
  type InsertUser,
  type Contact,
  type InsertContact,
  type JobApplication,
  type InsertJobApplication
} from "@shared/schema";

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
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact,
      phone: insertContact.phone || null,
      company: insertContact.company || null,
      service: insertContact.service || null,
      privacy: insertContact.privacy || false,
      id, 
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createJobApplication(insertApplication: InsertJobApplication): Promise<JobApplication> {
    const id = this.currentJobApplicationId++;
    const application: JobApplication = { 
      ...insertApplication,
      phone: insertApplication.phone || null,
      resume: insertApplication.resume || null,
      coverLetter: insertApplication.coverLetter || null,
      id, 
      createdAt: new Date()
    };
    this.jobApplications.set(id, application);
    return application;
  }

  async getAllJobApplications(): Promise<JobApplication[]> {
    return Array.from(this.jobApplications.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export const storage = new MemStorage();
