import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { once } from 'node:events';
import express from 'express';

process.env.NODE_ENV = 'production';
const { securityMiddleware } = await import('../server/middleware/security');
const { pageHtml } = await import('../server/seo');

test('production CSP uses unique nonces and authorizes only template scripts', async () => {
  const app = express();
  app.use(securityMiddleware);
  const template = '<script nonce="__ASSISTPRO_CSP_NONCE__" src="/theme-init.js"></script><!--app-html-->';
  app.get('/', (_req, res) => res.type('html').send(pageHtml(template, '/', false, '<script src="/untrusted.js"></script>', res.locals.scriptNonce)));
  const server = app.listen(0, '127.0.0.1');
  try {
    await once(server, 'listening');
    const address = server.address();
    assert.ok(address && typeof address !== 'string');
    const get = () => fetch(`http://127.0.0.1:${address.port}/`);
    const first = await get();
    const policy = first.headers.get('content-security-policy')!;
    const nonce = policy.match(/'nonce-([^']+)'/)?.[1];
    assert.ok(nonce && Buffer.from(nonce, 'base64').length >= 16);
    const scriptPolicy = policy.match(/script-src [^;]+/)![0];
    assert.match(scriptPolicy, /'strict-dynamic'/);
    assert.doesNotMatch(scriptPolicy, /unsafe-inline|unsafe-eval/);
    assert.match(policy, /object-src 'none'/);
    assert.match(policy, /base-uri 'none'/);
    assert.equal(first.headers.get('x-frame-options'), 'DENY');
    assert.match(first.headers.get('permissions-policy')!, /camera=\(\)/);
    const html = await first.text();
    assert.ok(html.includes(`nonce="${nonce}" src="/theme-init.js"`));
    assert.ok(html.includes('<script src="/untrusted.js"></script>'));
    assert.doesNotMatch(html, /__ASSISTPRO_CSP_NONCE__/);
    const second = await get();
    assert.notEqual(second.headers.get('content-security-policy'), policy);
    await second.arrayBuffer();
  } finally { server.closeAllConnections(); await new Promise<void>(resolve => server.close(() => resolve())); }
});

const bootstrap = readFileSync(new URL('../client/public/theme-init.js', import.meta.url), 'utf8');
for (const scenario of [
  { name: 'legacy saved dark keeps the continuous light brand surface', saved: 'dark', system: false, expected: 'light', meta: 'light' },
  { name: 'saved light overrides dark OS', saved: 'light', system: true, expected: 'light', meta: 'light' },
  { name: 'dark OS cannot split the light brand surface', saved: 'unexpected', system: true, expected: 'light', meta: 'light' },
  { name: 'blocked storage keeps the light brand surface', blocked: true, system: false, expected: 'light', meta: 'light' },
]) test(`prepaint theme: ${scenario.name}`, () => {
  const classes: string[] = [];
  const meta = { content: 'light dark' };
  runInNewContext(bootstrap, {
    localStorage: { getItem: () => { if (scenario.blocked) throw new Error('Storage blocked'); return scenario.saved; } },
    matchMedia: () => ({ matches: scenario.system }),
    document: { documentElement: { classList: { add: (value: string) => classes.push(value) } }, querySelector: () => meta },
  }, { timeout: 1000 });
  assert.deepEqual(classes, [scenario.expected]);
  assert.equal(meta.content, scenario.meta);
});
