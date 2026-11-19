import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { assetPath, htmlAssets } from './release-manifest.mjs';

export async function auditRelease(address, expectedCommit) {
  const base = new URL(address);
  assert.ok(['http:', 'https:'].includes(base.protocol) && !base.username && !base.password && base.pathname === '/' && !base.search && !base.hash, 'Use an HTTP(S) origin without credentials, path or query');
  if (expectedCommit) assert.match(expectedCommit, /^[0-9a-f]{40}$/, 'Expected commit must be a full Git SHA');
  const options = { headers: { 'Cache-Control': 'no-cache' }, signal: AbortSignal.timeout(20000) };
  const page = await fetch(base, options);
  assert.equal(page.status, 200, 'Home page unavailable');
  const origin = new URL(page.url).origin;
  const html = await page.text();
  const response = await fetch(origin + '/release.json', options);
  assert.equal(response.status, 200, 'Deployment has no release.json identity; rebuild/restart the selected release');
  assert.match(response.headers.get('content-type') ?? '', /application\/json/, 'Release identity returned HTML instead of JSON');
  assert.match(response.headers.get('cache-control') ?? '', /no-store/, 'Release identity must not be cached');
  const manifest = await response.json();
  assert.equal(manifest.schema_version, 1);
  assert.match(manifest.commit ?? '', /^[0-9a-f]{40}$/, 'Build source commit is unknown');
  assert.match(manifest.tree ?? '', /^[0-9a-f]{40}$/, 'Build source tree is unknown');
  assert.equal(manifest.dirty, false, 'Deployment identity does not describe a clean source revision');
  if (expectedCommit) assert.equal(manifest.commit, expectedCommit, 'Server is running a different commit');
  assert.ok(Array.isArray(manifest.assets) && manifest.assets.length > 0 && manifest.assets.length <= 64, 'Invalid initial assets');
  assert.deepEqual(manifest.assets.map(asset => asset.path).sort(), htmlAssets(html), 'HTML and release identity refer to different builds; restart/check proxy caching');
  for (const asset of manifest.assets) {
    assetPath(asset.path);
    assert.match(asset.sha256, /^[0-9a-f]{64}$/);
    assert.ok(Number.isSafeInteger(asset.bytes) && asset.bytes > 0 && asset.bytes < 5_000_000);
    const result = await fetch(origin + asset.path, { ...options, signal: AbortSignal.timeout(20000) });
    assert.equal(result.status, 200, `Missing asset ${asset.path}`);
    const bytes = Buffer.from(await result.arrayBuffer());
    assert.equal(bytes.length, asset.bytes, `Asset length differs: ${asset.path}`);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256, `Asset content differs: ${asset.path}`);
  }
  return { origin, commit: manifest.commit, tree: manifest.tree, verified_assets: manifest.assets.length };
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try { console.log(JSON.stringify(await auditRelease(process.argv[2] ?? 'http://127.0.0.1:3000', process.argv[3]), null, 2)); }
  catch (error) { console.error(`Release verification failed: ${error.message}`); process.exitCode = 1; }
}
