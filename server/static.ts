import express, { type Express } from "express";
import fs from "node:fs";
import path from "node:path";
import { htmlStatus, indexingEnabled, pageHtml, setupSeoRoutes, withPageStyles } from './seo';
import { isPublicPath, pageSeo, publicPaths } from '../src/shared/seo';

export function serveStatic(app: Express) {
  // In production, dist folder is at the same level as the server bundle
  const distPath = path.resolve(process.cwd(), "dist", "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  const template = fs.readFileSync(path.join(distPath, 'index.html'), 'utf8');
  const pageStyles = fs.readdirSync(path.join(distPath, 'assets')).filter(file => /^page-system-[a-zA-Z0-9_-]+\.css$/.test(file)).map(file => '/assets/' + file);
  if (pageStyles.length !== 1) throw new Error('Page stylesheet missing or ambiguous; rebuild the client before starting production.');
  const rendered = new Map<string, string>();
  for (const route of [...publicPaths, '/404']) {
    const file = (route === '/' ? 'home' : route.slice(1).replaceAll('/', '_')) + '.html';
    rendered.set(route, fs.readFileSync(path.resolve('dist/prerender', file), 'utf8'));
  }
  setupSeoRoutes(app);
  // Cache identity with the HTML template: a restart changes both together.
  const releaseFile = path.resolve('dist/release.json');
  const release = fs.existsSync(releaseFile) ? JSON.parse(fs.readFileSync(releaseFile, 'utf8')) : null;
  app.get('/release.json', (_req, res) => {
    res.set({ 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' });
    if (!release) { res.status(404).json({ error: 'Release identity unavailable' }); return; }
    res.json(release);
  });
  app.get('/index.html', (_req, res) => { res.redirect(301, '/'); });
  app.use('/assets', express.static(path.join(distPath, 'assets'), { maxAge: '1y', immutable: true, index: false }));
  app.use(express.static(distPath, { index: false, redirect: false, maxAge: 0 }));
  app.use((req, res) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.status(404).json({ error: 'Not found' }); return; }
    if (req.path.startsWith('/api/') || /\.[a-z0-9]+$/i.test(req.path)) { res.status(404).set('X-Robots-Tag', 'noindex').type('text/plain').send('Not found'); return; }
    if (req.path.length > 1 && req.path.endsWith('/') && isPublicPath(req.path.replace(/\/+$/, ''))) { res.redirect(301, req.path.replace(/\/+$/, '') + (req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '')); return; }
    const status = htmlStatus(req.path);
    const query = req.url.includes('?');
    const body = query ? '' : rendered.get(status === 404 ? '/404' : req.path)!;
    res.status(status).set('Cache-Control', 'no-cache').set('X-Robots-Tag', !indexingEnabled || !pageSeo(req.path).indexable || query ? 'noindex,follow' : 'index,follow')
      .type('html').send(pageHtml(withPageStyles(template, req.path, pageStyles), req.path, query, body, res.locals.scriptNonce));
  });
}
