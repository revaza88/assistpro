import http from 'node:http';
import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { writeFile } from 'node:fs/promises';
import { publicPaths } from '../src/shared/seo';

const base = process.argv[2] ?? 'http://127.0.0.1:5001';
const indexing = process.argv.includes('--indexing');
function get(path: string, gzip = false): Promise<{ status: number; headers: http.IncomingHttpHeaders; body: Buffer; ms: number; ttfb: number }> {
  return new Promise((resolve, reject) => {
    const start = performance.now();
    const req = http.get(base + path, { headers: { 'Accept-Encoding': gzip ? 'gzip' : 'identity' }, agent: false }, res => {
      const ttfb = performance.now() - start;
      const chunks: Buffer[] = [];
      res.on('data', chunk => chunks.push(Buffer.from(chunk)));
      res.on('end', () => resolve({ status: res.statusCode!, headers: res.headers, body: Buffer.concat(chunks), ms: performance.now() - start, ttfb }));
      res.on('error', reject);
    });
    req.setTimeout(10000, () => req.destroy(new Error('HTTP audit timed out')));
    req.on('error', reject);
  });
}
const pages = [];
for (const route of publicPaths) {
  const response = await get(route);
  const html = response.body.toString();
  assert.equal(response.status, 200, route);
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, route);
  assert.match(html, /<html lang="ka">/);
  assert.match(html, /<meta name="description" content="[^"]+"/);
  assert.doesNotMatch(html, /<!--app-(?:html|head)-->/);
  assert.match(String(response.headers['cache-control']), /no-cache/);
  assert.doesNotMatch(html, /maximum-scale=1/, 'Do not disable zoom');
  pages.push({ route, bytes: response.body.length, ttfbMs: +response.ttfb.toFixed(1) });
}
const home = (await get('/')).body.toString();
const assetPath = home.match(/src="(\/assets\/index-[^"]+\.js)"/)![1];
const js = await get(assetPath);
const compressed = await get(assetPath, true);
assert.ok(js.body.length < 600000, 'Initial UTF-8 JS exceeded 600 kB budget');
assert.ok(compressed.body.length < 180000, 'Initial gzip JS exceeded 180 kB budget');
assert.match(String(js.headers['cache-control']), /immutable/);
assert.equal(compressed.headers['content-encoding'], 'gzip');
// Count every script and stylesheet declared for initial loading, including
// shared modulepreloads. An entry chunk alone is not a full-page JS budget.
const initialScripts = new Set([...home.matchAll(/<script\b[^>]*src="([^"]+)"[^>]*>/g)].map(match => match[1]));
const initialStyles = new Set<string>();
for (const [tag] of home.matchAll(/<link\b[^>]*>/g)) {
  const href = tag.match(/href="([^"]+)"/)?.[1];
  if (!href) continue;
  if (/rel="modulepreload"/.test(tag)) initialScripts.add(href);
  if (/rel="stylesheet"/.test(tag)) initialStyles.add(href);
}
const initialAssets = [];
for (const [kind, paths] of [['script', initialScripts], ['stylesheet', initialStyles]] as const) {
  for (const path of paths) {
    assert.ok(path.startsWith('/') && !path.startsWith('//'), 'Initial assets must be same-origin');
    const raw = await get(path);
    const gzip = await get(path, true);
    assert.equal(raw.status, 200, path);
    assert.equal(gzip.status, 200, path);
    initialAssets.push({ kind, path, rawBytes: raw.body.length, gzipBytes: gzip.body.length });
  }
}
const total = (kind: string, key: 'rawBytes' | 'gzipBytes') => initialAssets.filter(asset => asset.kind === kind).reduce((sum, asset) => sum + asset[key], 0);
assert.ok(total('script', 'rawBytes') < 400000, 'Initial scripts exceeded 400 kB raw budget');
assert.ok(total('script', 'gzipBytes') < 120000, 'Initial scripts exceeded 120 kB gzip budget');
assert.ok(total('stylesheet', 'gzipBytes') < 12000, 'Initial styles exceeded 12 kB gzip budget');
for (const route of ['/missing-page', '/assets/missing.js', '/api/missing']) assert.equal((await get(route)).status, 404, route);
assert.equal((await get('/index.html')).status, 301);
assert.equal((await get('/services/')).status, 301);
const query = await get('/calculator?source=calculator&documents=99');
assert.match(query.body.toString(), /content="noindex,follow"/);
assert.match(String(query.headers['x-robots-tag']), /noindex/);
const faviconPath = home.match(/<link rel="icon" href="([^"]+)"/)?.[1];
assert.ok(faviconPath, 'The site declares its favicon');
const favicon = await get(faviconPath);
assert.equal(favicon.status, 200);
assert.match(String(favicon.headers['content-type']), /^image\//);
const robots = await get('/robots.txt');
assert.equal(robots.status, 200);
const sitemap = await get('/sitemap.xml');
assert.equal(sitemap.status, indexing ? 200 : 503);
if (indexing) {
  assert.match(home, /rel="canonical" href="https:\/\/assist.example\/"/);
  assert.match(sitemap.body.toString(), /https:\/\/assist.example\/services/);
  assert.doesNotMatch(sitemap.body.toString(), /\/contact|<loc>[^<]*\?|localhost/);
  assert.match(robots.body.toString(), /Sitemap: https:\/\/assist.example\/sitemap.xml/);
} else { assert.match(home, /content="noindex,follow"/); assert.doesNotMatch(home, /rel="canonical"/); }
const timings = [];
for (let run = 0; run < 7; run++) timings.push((await get('/', true)).ttfb);
timings.sort((a, b) => a - b);
const report = { base, indexing, pages: pages.length, rawEntryJsBytes: js.body.length, gzipEntryJsBytes: compressed.body.length, rawInitialJsBytes: total('script', 'rawBytes'), gzipInitialJsBytes: total('script', 'gzipBytes'), gzipInitialCssBytes: total('stylesheet', 'gzipBytes'), initialAssets, medianLocalTtfbMs: +timings[3].toFixed(1), pageChecks: pages, checks: 'HTML content, metadata, status codes, gzip, cache headers, full declared initial JS/CSS budgets, favicon, robots, sitemap, query noindex', limits: 'Local unthrottled HTTP. HTML-declared assets exclude later dynamic imports; Lighthouse checks actual network activity. Not LCP, INP, CLS, real network or field Core Web Vitals.' };
await writeFile(`dist/seo-performance-${indexing ? 'configured' : 'local'}.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
