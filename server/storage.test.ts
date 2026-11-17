import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { FileStorage } from "./file-storage";

const contact = { firstName: "Local", lastName: "Test", email: "test@example.invalid", message: "Test" };

test("submissions survive reopening, with unique IDs under concurrent writes", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "assistpro-"));
  try {
    const file = path.join(directory, "submissions.json");
    const storage = new FileStorage(file);
    const contacts = await Promise.all(Array.from({ length: 20 }, () => storage.createContact(contact)));
    assert.equal(new Set(contacts.map(item => item.id)).size, 20);
    await storage.createJobApplication({ ...contact, position: "Test" });
    const reopened = new FileStorage(file);
    assert.equal((await reopened.getAllContacts()).length, 20);
    assert.equal((await reopened.getAllJobApplications()).length, 1);
    assert.ok((await reopened.getAllContacts())[0].createdAt instanceof Date);
    assert.equal((await reopened.createContact(contact)).id, 21);
    const copy = await reopened.getAllContacts();
    copy[0].email = "changed@example.invalid";
    assert.equal((await reopened.getAllContacts())[0].email, contact.email);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("invalid saved data is never silently replaced", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "assistpro-"));
  try {
    const file = path.join(directory, "submissions.json");
    await writeFile(file, "corrupt data");
    assert.throws(() => new FileStorage(file));
    assert.equal(await readFile(file, "utf8"), "corrupt data");
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("a failed disk write is rejected without committing an in-memory record", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "assistpro-"));
  try {
    const file = path.join(directory, "submissions.json");
    const storage = new FileStorage(file);
    // Block the temporary file with a directory to cause a real filesystem failure.
    const { mkdir } = await import("node:fs/promises");
    await mkdir(`${file}.tmp`);
    await assert.rejects(storage.createContact(contact));
    assert.deepEqual(await storage.getAllContacts(), []);
    await rm(`${file}.tmp`, { recursive: true });
    assert.equal((await storage.createContact(contact)).id, 1);
    assert.equal((await new FileStorage(file).getAllContacts()).length, 1);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
