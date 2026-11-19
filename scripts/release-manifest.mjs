import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export function htmlAssets(html) {
  return [...new Set([...html.matchAll(/(?:src|href)="([^"?#]+\.(?:js|css))"/g)].map(match => match[1]))].sort();
}
export function assetPath(asset) {
  if (!/^\/(?:assets\/[a-zA-Z0-9_./-]+\.(?:js|css)|theme-init\.js)$/.test(asset) || asset.split('/').includes('..')) throw new Error('Invalid release asset path');
  return asset.slice(1);
}
function sha(value, label) {
  if (value && !/^[0-9a-f]{40}$/.test(value)) throw new Error(`Invalid release ${label}; a full Git SHA is required`);
  return value || null;
}
export async function createReleaseManifest(publicDirectory, source) {
  const folder = path.resolve(publicDirectory);
  const html = await readFile(path.join(folder, 'index.html'), 'utf8');
  const assets = [];
  for (const name of htmlAssets(html)) {
    const file = path.resolve(folder, assetPath(name));
    if (!file.startsWith(folder + path.sep)) throw new Error('Release asset escaped build directory');
    const bytes = await readFile(file);
    assets.push({ path: name, sha256: createHash('sha256').update(bytes).digest('hex'), bytes: bytes.length });
  }
  if (!assets.some(asset => asset.path.endsWith('.js')) || !assets.some(asset => asset.path.endsWith('.css'))) throw new Error('Release must contain its initial JS and CSS');
  return { schema_version: 1, commit: sha(source.commit, 'commit'), tree: sha(source.tree, 'tree'), dirty: source.dirty ?? null, built_at: new Date().toISOString(), assets };
}
function git(...args) { try { return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return null; } }
export function releaseSource(env = process.env) {
  if (env.RELEASE_DIRTY && !['true', 'false'].includes(env.RELEASE_DIRTY)) throw new Error('RELEASE_DIRTY must be true or false');
  const status = git('status', '--porcelain');
  return { commit: env.RELEASE_COMMIT || git('rev-parse', 'HEAD'), tree: env.RELEASE_TREE || git('rev-parse', 'HEAD^{tree}'), dirty: env.RELEASE_DIRTY ? env.RELEASE_DIRTY === 'true' : status === null ? null : status.length > 0 };
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const manifest = await createReleaseManifest('dist/public', releaseSource());
  await mkdir('dist', { recursive: true });
  await writeFile('dist/release.json', JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Release identity: ${manifest.commit ?? 'unavailable'}; source ${manifest.dirty === false ? 'clean' : manifest.dirty ? 'modified' : 'unverified'}`);
}
