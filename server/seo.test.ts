import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isPublicPath, pageSeo, publicPaths, seoHead, siteOrigin, sitemapPaths } from '../src/shared/seo';

test('all public routes have unique Georgian titles, descriptions and supported languages', () => {
  assert.equal(publicPaths.length, 15);
  assert.equal(new Set(publicPaths.map(path => pageSeo(path).title)).size, 15);
  assert.equal(new Set(publicPaths.map(path => pageSeo(path).description)).size, 15);
  for (const route of publicPaths) for (const language of ['ka', 'en', 'ru']) {
    assert.equal(pageSeo(route, language).lang, language);
    assert.ok(pageSeo(route, language).description.length > 40);
  }
  assert.equal(isPublicPath('/does-not-exist'), false);
  assert.equal(pageSeo('/does-not-exist').indexable, false);
});
test('canonical and Open Graph URL use only a configured origin and exclude selections', () => {
  const head = seoHead('/calculator', 'https://assist.example', true, true);
  assert.match(head, /noindex,follow/);
  assert.match(head, /rel="canonical" href="https:\/\/assist.example\/calculator"/);
  assert.match(head, /property="og:image" content="https:\/\/assist.example\/assets\/brand\/ASSIST_Locked_White_Native_1405px.png"/);
  assert.doesNotMatch(head, /documents=|sector=|services=/);
  assert.match(seoHead('/', null, false), /noindex,follow/);
  assert.doesNotMatch(seoHead('/', null, false), /rel="canonical"/);
  assert.doesNotMatch(seoHead('/', null, false), /property="og:image"/);
  assert.match(seoHead('/services', 'https://assist.example', true), /content="index,follow"/);
  assert.doesNotMatch(seoHead('/bad"><script>', 'https://assist.example', true), /<script>/);
});
test('origin configuration rejects paths, credentials and non-HTTP schemes', () => {
  assert.equal(siteOrigin(undefined), null);
  assert.equal(siteOrigin('https://assist.example/'), 'https://assist.example');
  for (const url of ['javascript:alert(1)', 'https://user:password@assist.example', 'https://assist.example/path', 'https://assist.example/?foo=bar', 'https://assist.example/#fragment']) assert.throws(() => siteOrigin(url));
});
test('sitemap excludes unknown routes and local inquiry or unconfirmed team/career content', () => {
  for (const path of sitemapPaths) assert.equal(pageSeo(path).indexable, true);
  for (const path of ['/404', '/contact', '/team', '/career', '/api/contacts']) assert.equal(sitemapPaths.includes(path), false);
});
