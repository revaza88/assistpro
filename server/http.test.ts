import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { once } from 'node:events';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

async function fixture(flags: string, run: (base: string, file: string, logs: () => string) => Promise<void>) {
  const directory = await mkdtemp(path.join(tmpdir(), 'assist-http-'));
  const socket = createServer().listen(0, '127.0.0.1'); await once(socket, 'listening');
  const port = (socket.address() as { port: number }).port;
  await new Promise<void>(resolve => socket.close(() => resolve()));
  const file = path.join(directory, 'submissions.json');
  const child = spawn(process.execPath, ['--import', 'tsx', 'server/fixtures/http-server.ts'], {
    env: { ...process.env, NODE_ENV: 'production', HOST: '127.0.0.1', PORT: String(port), DATA_FILE: file, INTAKE_MODE: 'local', LOG_TO_FILE: 'false', ENABLE_COMPRESSION: flags, ENABLE_RATE_LIMITING: flags, ENABLE_MONITORING: flags },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let logs = '';child.stdout.on('data', b => { logs += b; });child.stderr.on('data', b => { logs += b; });
  const base = `http://127.0.0.1:${port}`;
  try {
    let ready = false;
    for (let i = 0; i < 100; i++) { try { ready = (await fetch(base + '/health')).ok; } catch {} if (ready) break; await new Promise(r => setTimeout(r, 50)); }
    assert.ok(ready, logs); await run(base, file, () => logs);
  } finally { const closed = once(child, 'close'); child.kill(); await closed; await rm(directory, { recursive: true, force: true }); }
}
const post = (base: string, route: string, value: unknown) => fetch(base + route, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(value) });

test('HTTP feature flags report the effective configuration, including false', async () => {
  for (const flag of ['true', 'false']) await fixture(flag, async base => {
    const health = await (await fetch(base + '/health')).json();
    assert.deepEqual(health.features, { compression: flag === 'true', rateLimiting: flag === 'true', monitoring: flag === 'true' });
  });
});

test('HTTP errors hide private content and reject oversized bodies before storage', async () => {
  await fixture('true', async (base, file, logs) => {
    const malformed = await fetch(base + '/api/contacts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{QA_PRIVATE_INPUT}' });
    assert.equal(malformed.status, 400);
    assert.doesNotMatch(await malformed.text(), /QA_PRIVATE|SyntaxError|JSON at position/);
    const failure = await post(base, '/qa/error', { message: 'QA_PRIVATE_CONTACT' });
    assert.equal(failure.status, 500);assert.doesNotMatch(await failure.text(), /QA_PRIVATE/);
    const large = await post(base, '/api/contacts', { message: 'x'.repeat(70_000) });
    assert.equal(large.status, 413);assert.doesNotMatch(logs(), /QA_PRIVATE/);
    await assert.rejects(readFile(file), { code: 'ENOENT' });
  });
});

test('job API rejects missing consent, whitespace fields and oversized values without saving', async () => {
  await fixture('true', async (base, file) => {
    const valid = { firstName: ' QA ', lastName: ' Tester ', email: 'qa@example.invalid', position: 'Testing', privacy: true };
    for (const patch of [{ privacy: false }, { firstName: ' ' }, { position: ' ' }, { coverLetter: 'x'.repeat(5001) }, { phone: '123' }]) {
      assert.equal((await post(base, '/api/job-applications', { ...valid, ...patch })).status, 400);
    }
    await assert.rejects(readFile(file), { code: 'ENOENT' });
    const saved = await post(base, '/api/job-applications', valid);assert.equal(saved.status, 201);
    const data = JSON.parse(await readFile(file, 'utf8'));
    assert.equal(data.jobApplications.length, 1);assert.equal(data.jobApplications[0].firstName, 'QA');
  });
});

test('API rate limiting rejects the next request after the configured allowance', async () => {
  await fixture('true', async base => {
    for (let i = 0; i < 100; i++) assert.equal((await fetch(base + '/api/not-found')).status, 404);
    const limited = await fetch(base + '/api/not-found');
    assert.equal(limited.status, 429);
    assert.ok(Number(limited.headers.get('retry-after')) > 0);
    assert.match((await limited.json()).error, /Too many requests/);
  });
});
