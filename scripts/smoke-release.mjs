import assert from 'node:assert/strict';
const base = process.argv[2] ?? 'http://127.0.0.1:5004';
for (const route of ['/', '/services/accounting', '/industries', '/calculator', '/contact', '/faq']) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200, route);
  const html = await response.text();
  assert.match(html, /<h1(?:\s|>)/, route);
  assert.match(html, /name="intake-mode" content="disabled"/, route);
  assert.match(html, /content="noindex,follow"/, route);
}
assert.equal((await fetch(base + '/health')).status, 200);
for (const route of ['/api/contacts', '/api/job-applications']) {
  const response = await fetch(base + route, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
  assert.equal(response.status, 503, route);
  assert.equal((await response.json()).code, 'INTAKE_DISABLED');
}
assert.equal((await fetch(base + '/does-not-exist')).status, 404);
assert.equal((await fetch(base + '/sitemap.xml')).status, 503);
console.log('Release smoke passed: production pages, prerender, noindex, health, 404 and disabled online intake.');
