import type { Express } from 'express';
import { escapeHtml, isPublicPath, seoHead, siteOrigin, sitemapPaths } from '../src/shared/seo';
import { config } from './config';

export const seoOrigin = siteOrigin(process.env.SITE_URL);
export const indexingEnabled = process.env.INDEXING_ENABLED === 'true' && !!seoOrigin;
export function pageHtml(template: string, pathname: string, query: boolean, body = '', scriptNonce = '') {
  // Substitute only the developer-owned template, before inserting page content.
  return template.replaceAll('__ASSISTPRO_CSP_NONCE__', scriptNonce).replace('<!--app-head-->', () => seoHead(pathname, seoOrigin, indexingEnabled, query) + `<meta name="intake-mode" content="${config.intakeMode === 'local' ? 'local' : 'disabled'}" />`)
    .replace('<!--app-html-->', () => body);
}
export function setupSeoRoutes(app: Express) {
  app.get('/robots.txt', (_req, res) => {
    res.type('text/plain').set('Cache-Control', 'no-cache').send(`User-agent: *\nAllow: /\nDisallow: /api/\n${indexingEnabled ? `Sitemap: ${seoOrigin}/sitemap.xml\n` : ''}`);
  });
  app.get('/sitemap.xml', (_req, res) => {
    if (!indexingEnabled) { res.status(503).type('text/plain').set('X-Robots-Tag', 'noindex').send('Sitemap requires a confirmed SITE_URL and INDEXING_ENABLED=true.'); return; }
    const urls = sitemapPaths.map(route => `<url><loc>${escapeHtml(seoOrigin! + route)}</loc></url>`).join('');
    res.type('application/xml').set('Cache-Control', 'no-cache').send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
  });
}
export function htmlStatus(pathname: string) { return isPublicPath(pathname) ? 200 : 404; }
