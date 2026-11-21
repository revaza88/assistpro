import { brandLogo } from './brand';
import { company } from './company';
import { seoDescriptions } from './seo-descriptions';
import { localizedPath, siteLanguages, splitLocalePath, type SiteLanguage } from './localization';
const titles: Record<string, [string, string, string]> = {
  '/': ['ბუღალტერია და ბიზნესის მხარდაჭერა', 'Accounting and business support', 'Бухгалтерия и поддержка бизнеса'],
  '/services': ['მომსახურებები', 'Services', 'Услуги'],
  '/services/accounting': ['ბუღალტრული აუთსორსინგი', 'Outsourced accounting', 'Бухгалтерский аутсорсинг'],
  '/services/tax': ['საგადასახადო კონსულტაცია', 'Tax consultation in Georgia', 'Налоговые консультации в Грузии'],
  '/services/legal': ['იურიდიული მომსახურება', 'Legal services', 'Юридические услуги'],
  '/services/business': ['რეგისტრაცია და ბიზნეს ასისტი', 'Registration and business assistance', 'Регистрация и бизнес-поддержка'],
  '/services/audit': ['აუდიტი და ანგარიშგება', 'Audit and reporting', 'Аудит и отчётность'],
  '/services/hr': ['HR მომსახურება', 'HR services', 'HR-услуги'],
  '/industries': ['ინდუსტრიისა და მომსახურებების არჩევა', 'Choose your industry and services', 'Выбор отрасли и услуг'],
  '/calculator': ['ფასის დემო კალკულატორი', 'Demo cost calculator', 'Демо-калькулятор стоимости'],
  '/contact': ['კონტაქტი და მოკლე მოთხოვნა', 'Contact and inquiry', 'Контакты и запрос'],
  '/faq': ['ხშირი კითხვები', 'Frequently asked questions', 'Частые вопросы'],
  '/about': ['ჩვენ შესახებ', 'About us', 'О нас'],
  '/team': ['გუნდის შესახებ', 'About the team', 'О команде'],
  '/career': ['კარიერა', 'Careers', 'Карьера'],
};

export const publicPaths = Object.keys(titles);
export const localizedPublicPaths = siteLanguages.flatMap(language => publicPaths.map(path => localizedPath(path, language)));
export const prerenderPaths = [...localizedPublicPaths, ...siteLanguages.map(language => localizedPath('/404', language))];
export const isPublicPath = (path: string) => Object.hasOwn(titles, splitLocalePath(path).path);
const excluded = ['/contact','/team','/career','/industries','/calculator'];
export const sitemapPaths = localizedPublicPaths.filter(path => !excluded.includes(splitLocalePath(path).path));
export function pageSeo(path: string, language?: string) {
  const parsed = splitLocalePath(path), requested = language ?? parsed.language;
  const lang: SiteLanguage = requested.startsWith('en') ? 'en' : requested.startsWith('ru') ? 'ru' : 'ka';
  const index = siteLanguages.indexOf(lang), label = titles[parsed.path]?.[index] ?? ['გვერდი ვერ მოიძებნა','Page not found','Страница не найдена'][index];
  return { lang, label, title: label + ' | ' + ['ასისტი','ASSIST','АССИСТ'][index], description: seoDescriptions[parsed.path]?.[index] ?? ['მოთხოვნილი გვერდი ვერ მოიძებნა. დაბრუნდით ასისტის მთავარ გვერდზე.','The requested page could not be found. Return to the ASSIST home page.','Страница не найдена. Вернитесь на главную страницу ASSIST.'][index], indexable: isPublicPath(path) && !excluded.includes(parsed.path), canonicalPath: localizedPath(parsed.path, lang) };
}
export function siteOrigin(value?: string): string | null {
  if (!value) return null;
  const url = new URL(value);
  if (!['https:','http:'].includes(url.protocol) || url.username || url.password || url.search || url.hash || url.pathname !== '/') throw new Error('SITE_URL must be an HTTP(S) origin without path, credentials, query or fragment');
  return url.origin;
}
export const escapeHtml = (text: string) => text.replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]!);
export function languageAlternates(path: string, origin: string) {
  if (!isPublicPath(path)) return '';
  return [...siteLanguages.map(lang => '<link rel="alternate" hreflang="' + lang + '" href="' + escapeHtml(origin + localizedPath(path, lang)) + '" />'), '<link rel="alternate" hreflang="x-default" href="' + escapeHtml(origin + localizedPath(path, 'ka')) + '" />'].join('\n');
}
export function structuredData(path: string, origin: string, language?: string) {
  if (!isPublicPath(path)) return null;
  const meta = pageSeo(path, language), base = splitLocalePath(path).path, url = origin + meta.canonicalPath;
  const organization = { '@type':'Organization', '@id':origin+'/#organization', name:'ASSIST — ასისტი', legalName:company.legalName, taxID:company.identificationCode, url:origin+'/', email:company.email, address:{ '@type':'PostalAddress', streetAddress:company.address, addressLocality:'თბილისი', addressCountry:'GE' }, logo:{ '@type':'ImageObject', url:origin+brandLogo.src, width:brandLogo.width, height:brandLogo.height } };
  const graph: Record<string, unknown>[] = [organization];
  if (base.startsWith('/services/')) {
    const home = ['მთავარი','Home','Главная'][siteLanguages.indexOf(meta.lang)];
    graph.push({ '@type':'BreadcrumbList', '@id':url+'#breadcrumb', itemListElement:[{ '@type':'ListItem', position:1, name:home, item:origin+localizedPath('/',meta.lang) },{ '@type':'ListItem', position:2, name:pageSeo('/services',meta.lang).label, item:origin+localizedPath('/services',meta.lang) },{ '@type':'ListItem', position:3, name:meta.label, item:url }] });
    if (['/services/accounting','/services/tax','/services/audit'].includes(base)) graph.push({ '@type':'Service', '@id':url+'#service', name:meta.label, description:meta.description, url, provider:{ '@id':origin+'/#organization' }, mainEntityOfPage:url });
  }
  return { '@context':'https://schema.org', '@graph':graph };
}
export function seoHead(path: string, origin: string | null, indexing: boolean, query = false, nonce = ''): string {
  const meta = pageSeo(path), robots = indexing && meta.indexable && !query ? 'index,follow' : 'noindex,follow';
  const url = origin && isPublicPath(path) ? origin + meta.canonicalPath : null;
  const data = origin && !query ? structuredData(path, origin) : null;
  return '<title>'+escapeHtml(meta.title)+'</title>\n'
    + '<meta name="description" content="'+escapeHtml(meta.description)+'" />\n<meta name="robots" content="'+robots+'" />\n'
    + '<meta name="site-indexing" content="'+indexing+'" />\n<meta name="site-origin" content="'+escapeHtml(origin??'')+'" />\n'
    + '<meta property="og:title" content="'+escapeHtml(meta.title)+'" />\n<meta property="og:description" content="'+escapeHtml(meta.description)+'" />\n<meta property="og:type" content="website" />\n<meta property="og:site_name" content="ASSIST — ასისტი" />\n<meta property="og:locale" content="'+({ka:'ka_GE',en:'en_US',ru:'ru_RU'}[meta.lang])+'" />\n<meta name="twitter:card" content="summary" />\n'
    + (origin ? '<meta property="og:image" content="'+escapeHtml(origin+brandLogo.src)+'" />\n<meta property="og:image:width" content="'+brandLogo.width+'" />\n<meta property="og:image:height" content="'+brandLogo.height+'" />\n<meta property="og:image:alt" content="'+brandLogo.alt+'" />\n<meta name="twitter:image" content="'+escapeHtml(origin+brandLogo.src)+'" />\n<meta name="twitter:image:alt" content="'+brandLogo.alt+'" />\n' : '')
    + (url ? '<link rel="canonical" href="'+escapeHtml(url)+'" /><meta property="og:url" content="'+escapeHtml(url)+'" />\n'+languageAlternates(meta.canonicalPath,origin!) : '')
    + (data ? '\n<script type="application/ld+json" data-site-schema nonce="'+escapeHtml(nonce)+'">'+JSON.stringify(data).replaceAll('<','\u003c')+'</script>' : '');
}
