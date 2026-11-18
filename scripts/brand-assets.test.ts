import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { brandLogo } from '../src/shared/brand';

test('the authorized public logo preserves the source bytes, dimensions and manifest identity', async () => {
  const manifest = JSON.parse(await readFile(new URL('../docs/brand/asset-manifest.json', import.meta.url), 'utf8'));
  const asset = manifest.assets.find((item: { role: string }) => item.role === 'existing_documented_digital_logo_export');
  const original = await readFile(new URL('../docs/brand/' + asset.path, import.meta.url));
  const published = await readFile(new URL('../client/public' + brandLogo.src, import.meta.url));
  assert.deepEqual(published, original, 'Do not crop, recolor or regenerate the supplied logo');
  assert.equal(createHash('sha256').update(published).digest('hex'), asset.source_sha256);
  assert.equal(asset.site_production_path, 'client/public' + brandLogo.src);
  assert.equal(published.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  assert.equal(published.readUInt32BE(16), brandLogo.width);
  assert.equal(published.readUInt32BE(20), brandLogo.height);
});
