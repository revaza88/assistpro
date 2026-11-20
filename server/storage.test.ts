import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { ContactReplayConflict, FileStorage } from "./file-storage";

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

test('contact replays are atomic, survive reopening and reject changed payloads', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'assist-replay-'));
  const file = path.join(directory, 'submissions.json'), key = '123e4567-e89b-42d3-a456-426614174000';
  try {
    const storage = new FileStorage(file);
    const records = await Promise.all(Array.from({length:8}, () => storage.createContact(contact,key)));
    assert.deepEqual(records.map(item=>item.id),Array(8).fill(1));
    assert.equal((await new FileStorage(file).getAllContacts()).length,1);
    assert.equal((await new FileStorage(file).createContact(contact,key)).id,1);
    await assert.rejects(storage.createContact({...contact,message:'Different request'},key),ContactReplayConflict);
    assert.equal((await storage.getAllContacts()).length,1);
  } finally { await rm(directory,{recursive:true,force:true}); }
});

test('a failed keyed write can retry with the same key without a phantom record', async () => {
  const directory=await mkdtemp(path.join(tmpdir(),'assist-replay-failure-'));
  const file=path.join(directory,'submissions.json'),key='123e4567-e89b-42d3-a456-426614174001';
  try {
    const storage=new FileStorage(file), {mkdir}=await import('node:fs/promises');
    await mkdir(file+'.tmp');
    await assert.rejects(storage.createContact(contact,key));
    assert.equal((await storage.getAllContacts()).length,0);
    await rm(file+'.tmp',{recursive:true});
    assert.equal((await storage.createContact(contact,key)).id,1);
    // A duplicate returns its saved receipt even if new disk writes would fail.
    await mkdir(file+'.tmp');
    assert.equal((await storage.createContact(contact,key)).id,1);
    assert.equal((await new FileStorage(file).getAllContacts()).length,1);
  } finally { await rm(directory,{recursive:true,force:true}); }
});
