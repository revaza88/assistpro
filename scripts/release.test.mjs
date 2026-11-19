import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { createReleaseManifest } from './release-manifest.mjs';
import { auditRelease } from './audit-release.mjs';

const source = { commit: 'a'.repeat(40), tree: 'b'.repeat(40), dirty: false };
async function fixture(run) {
  const directory = await mkdtemp(path.join(tmpdir(), 'assist-release-'));
  try {
    await mkdir(path.join(directory, 'assets'));
    await writeFile(path.join(directory, 'index.html'), '<script src="/assets/app-123.js"></script><link href="/assets/app-123.css" rel="stylesheet">');
    await writeFile(path.join(directory, 'assets/app-123.js'), 'export const version=1;');
    await writeFile(path.join(directory, 'assets/app-123.css'), 'body{color:navy}');
    await run(directory);
  } finally {
    assert.equal(path.dirname(path.resolve(directory)), path.resolve(tmpdir()));
    assert.ok(path.basename(directory).startsWith('assist-release-'));
    await rm(directory, { recursive: true, force: true });
  }
}
test('release identity fingerprints the actual JS/CSS and rejects escaped assets or invalid revisions', () => fixture(async directory => {
  const first = await createReleaseManifest(directory, source);
  assert.equal(first.commit, source.commit);
  assert.equal(first.assets.length, 2);
  await writeFile(path.join(directory, 'assets/app-123.css'), 'body{color:purple}');
  const second = await createReleaseManifest(directory, source);
  assert.notEqual(first.assets[0].sha256, second.assets[0].sha256);
  await assert.rejects(createReleaseManifest(directory, { ...source, commit: 'not-a-sha' }));
  await writeFile(path.join(directory, 'index.html'), '<script src="/assets/../../outside.js"></script>');
  await assert.rejects(createReleaseManifest(directory, source), /Invalid release asset path/);
}));
test('HTTP release audit detects stale assets and wrong source even when health/home are successful', () => fixture(async directory => {
  const manifest = await createReleaseManifest(directory, source);
  const assets = new Map([['/assets/app-123.js', 'export const version=1;'], ['/assets/app-123.css', 'body{color:navy}']]);
  const server = createServer((req, res) => {
    if (req.url === '/release.json') { res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(manifest)); }
    else if (req.url === '/') res.end('<script src="/assets/app-123.js"></script><link href="/assets/app-123.css" rel="stylesheet">');
    else res.end(assets.get(req.url) ?? '');
  }).listen(0, '127.0.0.1');
  await once(server, 'listening');
  const origin = 'http://127.0.0.1:' + server.address().port;
  try {
    assert.equal((await auditRelease(origin, source.commit)).verified_assets, 2);
    await assert.rejects(auditRelease(origin, 'c'.repeat(40)), /different commit/);
    assets.set('/assets/app-123.css', 'stale or changed CSS');
    await assert.rejects(auditRelease(origin, source.commit), /Asset (length|content) differs/);
  } finally { await new Promise(resolve => server.close(resolve)); }
}));
