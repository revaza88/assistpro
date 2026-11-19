import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isPublicPath, pageSeo, publicPaths, localizedPublicPaths, seoHead, siteOrigin, sitemapPaths, structuredData } from '../src/shared/seo';
import { withPageStyles, robotsText, sitemapXml, pageHtml } from './seo';
import { localizedPath, siteLanguages, splitLocalePath } from '../src/shared/localization';
import { company } from '../src/shared/company';

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

test('inner-page prerenders receive their stylesheet before content without adding it to home', () => {
  const template = '<head><!--app-head--></head><body><!--app-html--></body>';
  const css = '/assets/page-system-Ab12_cd.css';
  assert.equal(withPageStyles(template, '/', [css]), template);
  for (const route of ['/services/accounting', '/contact', '/calculator', '/missing-page']) {
    const html = withPageStyles(template, route, [css]);
    assert.ok(html.indexOf(css) < html.indexOf('</head>'), route);
    assert.match(html, /<!--app-head-->/);
  }
  for (const css of ['https://example.invalid/style.css', '/assets/../private.css', '/assets/page-system-x.css" onload="bad']) assert.throws(() => withPageStyles(template, '/contact', [css]));
});

test('language URL families have unique metadata and reciprocal self-canonical alternates', () => {
  assert.equal(localizedPublicPaths.length,45);
  assert.equal(new Set(localizedPublicPaths).size,45);
  for(const lang of siteLanguages) {
    assert.equal(new Set(publicPaths.map(path=>pageSeo(path,lang).title)).size,15);
    assert.equal(new Set(publicPaths.map(path=>pageSeo(path,lang).description)).size,15);
    for(const path of publicPaths) {
      const url=localizedPath(path,lang),head=seoHead(url,'https://assist.example',false);
      assert.equal(pageSeo(url).lang,lang);
      assert.match(head,new RegExp('rel="canonical" href="https://assist\\.example'+url+'"'));
      for(const alternate of siteLanguages) assert.ok(head.includes('hreflang="'+alternate+'" href="https://assist.example'+localizedPath(path,alternate)+'"'));
      assert.ok(head.includes('hreflang="x-default" href="https://assist.example'+path+'"'));
      assert.doesNotMatch(head,/local demo|локальной демоверсией|მხოლოდ ამ კომპიუტერზე/);
    }
  }
  assert.deepEqual(splitLocalePath('/en/services/tax'),{language:'en',path:'/services/tax',prefix:'/en'});
  assert.equal(isPublicPath('/fr/services/tax'),false);
  assert.equal(pageSeo('/ru/unknown').indexable,false);
});

test('launch sitemap contains only canonical public editorial pages in each language', () => {
  const xml=sitemapXml('https://assist.example');
  assert.equal((xml.match(/<loc>/g)||[]).length,30);
  for(const path of sitemapPaths) assert.ok(xml.includes('<loc>https://assist.example'+path+'</loc>'));
  for(const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) assert.doesNotMatch(match[1],/contact|team|career|calculator|industries|404|\/api\/|\?|localhost|127\.0\.0\.1/);
  for(const path of ['/calculator','/industries','/contact','/team','/career'])for(const lang of siteLanguages)assert.match(seoHead(localizedPath(path,lang),'https://assist.example',true),/noindex,follow/);
});

test('search robot groups preserve the previous inherited GPTBot policy', () => {
  for(const enabled of [false,true]) {
    const robots=robotsText(enabled,'https://assist.example');
    assert.equal(robots.split('\n\n')[0],'User-agent: *\nAllow: /\nDisallow: /api/');
    assert.doesNotMatch(robots,/User-agent: GPTBot/);
    assert.ok(robots.includes('User-agent: Googlebot\nAllow: /\nDisallow: /api/'));
    assert.ok(robots.includes('User-agent: OAI-SearchBot\n'+(enabled?'Allow: /\nDisallow: /api/':'Disallow: /')));
    assert.equal(robots.includes('Sitemap:'),enabled);
  }
});

test('structured data uses visible confirmed identity and scoped services without tariffs or credentials', () => {
  for(const lang of siteLanguages)for(const service of ['accounting','tax','audit']) {
    const path=localizedPath('/services/'+service,lang),data=structuredData(path,'https://assist.example')!;
    const org=data['@graph'][0];assert.equal(org.legalName,company.legalName);assert.equal(org.email,company.email);
    assert.equal(org.taxID,company.identificationCode);assert.equal('telephone' in org,false);
    const serviceData=data['@graph'].find(item=>item['@type']==='Service')!;
    assert.equal(serviceData.description,pageSeo(path).description);assert.equal(serviceData.url,'https://assist.example'+path);
    const head=seoHead(path,'https://assist.example',false,false,'qa-nonce');
    const script=head.match(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/)!;
    assert.deepEqual(JSON.parse(script[1]),data);
    assert.ok(head.includes('nonce="qa-nonce"'));assert.ok(head.includes('\n<meta'));
    assert.doesNotMatch(JSON.stringify(data),/AggregateRating|Review|priceCurrency|offers|Certified|სერტიფიცირებული|Сертифицирован/);
  }
  assert.equal(structuredData('/bad','https://assist.example'),null);
  const query=seoHead('/en/calculator','https://assist.example',true,true,'qa');
  assert.doesNotMatch(query,/application\/ld\+json|documents=|sector=/);
});

test('localized initial document language and CSP nonces are inserted before content', () => {
  const template='<html lang="ka"><head><!--app-head--></head><body><!--app-html--></body></html>';
  const html=pageHtml(template,'/ru/services/tax',false,'<main><h1>Налоги</h1></main>','qa-csp');
  assert.match(html,/<html lang="ru">/);assert.match(html,/<h1>Налоги<\/h1>/);
  assert.doesNotMatch(html,/<!--app-|__ASSISTPRO_CSP_NONCE__/);
  assert.equal(withPageStyles(template,'/en/',['/assets/page-system-Ab.css']),template);
});
