import { mkdirSync, readFileSync } from "node:fs";
import { rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { z } from '../src/shared/validation';
import { contactFieldsSchema, jobApplicationFieldsSchema } from "../src/shared/schemas";
import type { Contact, InsertContact, JobApplication, InsertJobApplication } from "../src/shared/types";
import { calculateDemoEstimate, demoEstimateSchema } from '../src/shared/pricing';
import { createHash } from 'node:crypto';

export class ContactReplayConflict extends Error {}

const savedDataSchema = z.object({
  version: z.literal(1),
  contacts: z.array(contactFieldsSchema.extend({
    idempotencyKey: z.string().uuid().optional(),
    payloadFingerprint: z.string().regex(/^[a-f0-9]{64}$/).optional(),
    demoEstimate: demoEstimateSchema.optional(),
    id: z.number().int().positive(), createdAt: z.coerce.date(),
    phone: z.string().nullish(), company: z.string().nullish(), service: z.string().nullish(),
  })),
  jobApplications: z.array(jobApplicationFieldsSchema.extend({
    id: z.number().int().positive(), createdAt: z.coerce.date(),
    phone: z.string().nullish(), resume: z.string().nullish(), coverLetter: z.string().nullish(),
  })),
});
type SavedData = z.infer<typeof savedDataSchema>;

// A single server process owns this file. Keep DATA_FILE on persistent storage.
export class FileStorage {
  private data: SavedData;
  private writes: Promise<unknown> = Promise.resolve();

  constructor(private file = path.resolve(process.env.DATA_FILE || "data/submissions.json")) {
    mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 });
    try {
      this.data = savedDataSchema.parse(JSON.parse(readFileSync(file, "utf8")));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      this.data = { version: 1, contacts: [], jobApplications: [] };
    }
  }

  private save<T>(update: (next: SavedData) => T, replay?: (current: SavedData) => T | undefined): Promise<T> {
    const operation = this.writes.then(async () => {
      const previous = replay?.(this.data);
      if (previous !== undefined) return structuredClone(previous);
      const next = structuredClone(this.data);
      const result = update(next);
      const temporaryFile = `${this.file}.tmp`;
      await writeFile(temporaryFile, JSON.stringify(next), { mode: 0o600 });
      await rename(temporaryFile, this.file);
      this.data = next;
      return structuredClone(result);
    });
    this.writes = operation.catch(() => undefined);
    return operation;
  }

  createContact(input: InsertContact, idempotencyKey?: string): Promise<Contact> {
    const payloadFingerprint = idempotencyKey ? createHash('sha256').update(JSON.stringify(input)).digest('hex') : undefined;
    return this.save(next => {
      const contact = {
        idempotencyKey, payloadFingerprint,
        ...input, id: next.contacts.reduce((max, item) => Math.max(max, item.id), 0) + 1,
        demoEstimate: input.calculator ? calculateDemoEstimate(input.calculator) : undefined,
        createdAt: new Date(), privacy: input.privacy ?? false,
        industry: input.industry ?? 'other', services: input.services ?? [],
      };
      next.contacts.push(contact);
      return contact;
    }, current => {
      if (!idempotencyKey) return undefined;
      const previous = current.contacts.find(item => item.idempotencyKey === idempotencyKey);
      if (!previous) return undefined;
      if (previous.payloadFingerprint !== payloadFingerprint) throw new ContactReplayConflict('Submission key already belongs to another payload');
      return previous;
    });
  }

  async getAllContacts(): Promise<Contact[]> {
    await this.writes;
    return structuredClone(this.data.contacts);
  }

  createJobApplication(input: InsertJobApplication): Promise<JobApplication> {
    return this.save(next => {
      const application = {
        ...input, id: next.jobApplications.reduce((max, item) => Math.max(max, item.id), 0) + 1,
        createdAt: new Date(), privacy: input.privacy ?? false,
      };
      next.jobApplications.push(application);
      return application;
    });
  }

  async getAllJobApplications(): Promise<JobApplication[]> {
    await this.writes;
    return structuredClone(this.data.jobApplications);
  }
}
