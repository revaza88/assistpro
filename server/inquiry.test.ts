import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { parseSelection, selectionHref } from '../src/shared/selection';
import { insertContactSchema } from '../src/shared/schemas';
import { FileStorage } from './file-storage';

test('stricter new job validation does not invalidate or rewrite legacy local records', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'assist-legacy-job-'));
  try {
    const file = path.join(directory, 'data.json');
    const legacy = { id: 1, firstName: ' ', lastName: ' ', email: 'qa@example.invalid', position: ' ', privacy: false, createdAt: new Date().toISOString() };
    await writeFile(file, JSON.stringify({ version: 1, contacts: [], jobApplications: [legacy] }));
    const records = await new FileStorage(file).getAllJobApplications();
    assert.equal(records.length, 1);assert.equal(records[0].firstName, ' ');assert.equal(records[0].privacy, false);
  } finally { await rm(directory, { recursive: true, force: true }); }
});

test('selection survives navigation, refresh and editing, without private query data', () => {
  const selection = { industry: 'retail' as const, services: ['payroll', 'bookkeeping'] as const };
  const url = selectionHref('/contact', { ...selection, services: [...selection.services] });
  assert.deepEqual(parseSelection(url.split('?')[1]), { industry: 'retail', services: ['bookkeeping', 'payroll'] });
  const edit = selectionHref('/industries', parseSelection(url.split('?')[1])!);
  assert.deepEqual(parseSelection(edit.split('?')[1]), parseSelection(url.split('?')[1]));
  assert.equal(url.includes('email'), false);
  assert.deepEqual(parseSelection(''), { industry: 'other', services: [] });
  assert.deepEqual(parseSelection('service=accounting'), { industry: 'other', services: ['bookkeeping'] });
});

test('invalid or ambiguous selection URLs are rejected', () => {
  for (const query of ['sector=invalid', 'sector=retail&sector=medical', 'services=unknown', 'services=payroll,payroll', 'services=payroll&services=bookkeeping', 'services=payroll,', 'service=', 'service=hr&services=payroll', 'service=__proto__']) {
    assert.equal(parseSelection(query), null, query);
  }
});

test('short inquiry accepts one valid contact method and optional description', () => {
  const email = insertContactSchema.parse({ firstName: ' Local ', email: 'test@example.invalid', privacy: true });
  assert.equal(email.firstName, 'Local');
  assert.equal(email.lastName, '');
  assert.equal(email.message, '');
  const phone = insertContactSchema.parse({ firstName: 'Local', phone: '+995 (555) 12-34-56', privacy: true });
  assert.equal(phone.email, '');
  assert.equal(insertContactSchema.safeParse({ firstName: 'Local', email: 'test@example.invalid' }).success, false);
  assert.equal(insertContactSchema.safeParse({ firstName: 'Local', email: 'test@example.invalid', privacy: false }).success, false);
  assert.equal(insertContactSchema.safeParse({ firstName: 'Local', privacy: true }).success, false);
  assert.equal(insertContactSchema.safeParse({ firstName: 'Local', phone: '123', privacy: true }).success, false);
  assert.equal(insertContactSchema.safeParse({ firstName: '  ', email: 'test@example.invalid', privacy: true }).success, false);
  assert.equal(insertContactSchema.safeParse({ firstName: 'Local', email: 'test@example.invalid', services: ['unknown'], privacy: true }).success, false);
  assert.equal(insertContactSchema.safeParse({ firstName: 'Local', email: 'test@example.invalid', industry: 'unknown', privacy: true }).success, false);
});

test('industry and multiple services persist with a phone-only inquiry', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'assistpro-inquiry-'));
  try {
    const file = path.join(directory, 'data.json');
    const payload = insertContactSchema.parse({ firstName: 'Local', phone: '+995555123456', industry: 'education', services: ['bookkeeping', 'hr'], privacy: true });
    await new FileStorage(file).createContact(payload);
    const record = (await new FileStorage(file).getAllContacts())[0];
    assert.equal(record.industry, 'education');
    assert.deepEqual(record.services, ['bookkeeping', 'hr']);
    assert.equal(record.phone, '+995555123456');
    assert.equal(record.email, '');
  } finally { await rm(directory, { recursive: true, force: true }); }
});
