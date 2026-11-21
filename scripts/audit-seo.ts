import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { localizedPublicPaths, pageSeo, sitemapPaths, structuredData } from '../src/shared/seo';
import { splitLocalePath, localizedPath } from '../src/shared/localization';

// Read-only HTTP audit. An indexing-enabled run must use an isolated preview.
const base = process.argv[2] ?? 'http://127.0.0.1:5016';
const origin = process.argv[3] ?? 'https://assist.ge';
const indexing = process.argv.includes('--indexing');
const output = process.argv.find(arg => arg.startsWith('--output='))?.slice(9);
const get = (path: string) => fetch(base + path, { redirect: 'manual' });
const pages = [];
const links = new Set<string>();
for (const path of localizedPublicPaths) {
  const response = await get(path), html = await response.text(), meta = pageSeo(path);
  assert.equal(response.status, 200, path);
  assert.ok(html.includes('name="intake-mode" content="disabled"'), 'Intake must stay disabled: '+path);
  assert.ok(html.includes('<html lang="'+meta.lang+'">'), path);
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, path);
  assert.ok(html.includes('<link rel="canonical" href="'+origin+path+'"'), path);
  const robots = indexing && meta.indexable ? 'index,follow' : 'noindex,follow';
  assert.ok(html.includes('name="robots" content="'+robots+'"'), path);
  assert.equal(response.headers.get('x-robots-tag'), robots, path);
  for (const language of ['ka','en','ru'] as const) {
    assert.ok(html.includes('hreflang="'+language+'" href="'+origin+localizedPath(path,language)+'"'), path);
  }
  assert.ok(html.includes('hreflang="x-default" href="'+origin+localizedPath(path,'ka')+'"'));
  const json = html.match(/<script type="application\/ld\+json"[^>]*nonce="([^"]+)"[^>]*>(.*?)<\/script>/s);
  assert.ok(json, 'Structured data in initial HTML: '+path);
  assert.deepEqual(JSON.parse(json[2]), structuredData(path,origin));
  assert.ok(response.headers.get('content-security-policy')?.includes("'nonce-"+json[1]+"'"),path);
  assert.ok(html.includes('თქვენი ბიზნესის მხარდამჭერი'));
  for (const match of html.matchAll(/<a\b[^>]*href="([^"#]+)"/g)) {
    const href=match[1].replaceAll('&amp;','&');
    if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/assets/')) links.add(href);
  }
  if (['/services/accounting','/services/tax','/services/audit'].includes(splitLocalePath(path).path)) {
    for (const id of ['service-audience','service-includes','service-excludes','service-start','service-price','service-questions']) assert.ok(html.includes('id="'+id+'"'),path+': '+id);
    assert.ok(html.includes('2026-11-20'));
    assert.ok(html.includes(meta.description),path+': visible description matches schema');
  }
  pages.push({path,lang:meta.lang,status:response.status,robots,title:meta.title,bytes:Buffer.byteLength(html),schema:true});
}
for (const path of links) assert.equal((await get(path)).status,200,'Internal link: '+path);
const sitemap=await get('/sitemap.xml'), xml=await sitemap.text();
assert.equal(sitemap.status,indexing?200:503);
if(indexing) {
  const locations=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
  assert.deepEqual(locations,sitemapPaths.map(path=>origin+path));
  assert.equal(locations.length,30);
  for(const url of locations) assert.ok(pageSeo(new URL(url).pathname).indexable);
}
const robots=await get('/robots.txt'), policy=await robots.text();
assert.equal(robots.status,200);
assert.ok(policy.startsWith('User-agent: *\nAllow: /\nDisallow: /api/\n'));
assert.ok(!policy.includes('GPTBot'),'Do not introduce a new training policy');
assert.ok(policy.includes('User-agent: Googlebot\nAllow: /\nDisallow: /api/'));
assert.ok(policy.includes('User-agent: OAI-SearchBot\n'+(indexing?'Allow: /\nDisallow: /api/':'Disallow: /')));
for(const [from,to] of [['/en','/en/'],['/ka/services/tax','/services/tax'],['/ru/services/tax/?services=tax','/ru/services/tax?services=tax'],['/en/index.html','/en/']]) {
  const response=await get(from);assert.equal(response.status,301,from);assert.equal(response.headers.get('location'),to,from);
}
for(const path of ['/not-a-page','/en/not-a-page','/ru/not-a-page','/fr/services/tax']) {
  const response=await get(path);assert.equal(response.status,404,path);assert.ok((await response.text()).includes('noindex,follow'));
}
const query=await get('/en/calculator?industry=retail&services=bookkeeping,tax'),queryHtml=await query.text();
assert.equal(query.status,200);assert.equal(query.headers.get('x-robots-tag'),'noindex,follow');
assert.ok(queryHtml.includes('rel="canonical" href="'+origin+'/en/calculator"'));
assert.ok(!queryHtml.includes('application/ld+json'));
const report={base,origin,indexing,checkedAt:new Date().toISOString(),pages,internalLinks:links.size,sitemapStatus:sitemap.status,sitemapUrls:indexing?sitemapPaths.length:0,redirects:4,notFound:4,queryContextNoindex:true,gptbotPolicyUnchanged:true};
if(output) await writeFile(output,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({pages:pages.length,internalLinks:links.size,sitemapStatus:sitemap.status,indexing,success:true}));
