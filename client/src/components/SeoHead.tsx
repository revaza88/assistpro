import { useEffect } from 'react';
import { useLocation, useSearch } from 'wouter';
import { useTranslation } from 'react-i18next';
import { isPublicPath, pageSeo, structuredData } from '@shared/seo';
import { localizedPath, siteLanguages } from '@shared/localization';

export default function SeoHead() {
  const [path] = useLocation();
  const search = useSearch();
  const { i18n } = useTranslation();
  useEffect(() => {
    const meta = pageSeo(path, i18n.language);
    document.title = meta.title;
    document.documentElement.lang = meta.lang;
    const set = (key: string, value: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, key); document.head.append(element); }
      element.content = value;
    };
    set('description', meta.description);
    set('og:title', meta.title, true); set('og:description', meta.description, true);
    set('og:locale', meta.lang === 'ka' ? 'ka_GE' : meta.lang === 'en' ? 'en_US' : 'ru_RU', true);
    const enabled = document.head.querySelector('meta[name="site-indexing"]')?.getAttribute('content') === 'true';
    set('robots', enabled && meta.indexable && !search ? 'index,follow' : 'noindex,follow');
    const origin = document.head.querySelector('meta[name="site-origin"]')?.getAttribute('content');
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (origin && isPublicPath(path)) {
      if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
      canonical.href = origin + meta.canonicalPath; set('og:url', origin + meta.canonicalPath, true);
    } else { canonical?.remove(); document.head.querySelector('meta[property="og:url"]')?.remove(); }
    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(element => element.remove());
    if (origin && isPublicPath(path)) for (const lang of [...siteLanguages,'x-default'] as const) {
      const link = document.createElement('link'); link.rel='alternate'; link.hreflang=lang;
      link.href=origin+localizedPath(path,lang==='x-default'?'ka':lang); document.head.append(link);
    }
    document.head.querySelectorAll('script[data-site-schema]').forEach(element => element.remove());
    const data = origin && !search ? structuredData(path,origin,meta.lang) : null;
    if (data) {
      const script = document.createElement('script'); script.type='application/ld+json'; script.dataset.siteSchema='';
      script.nonce=document.querySelector<HTMLScriptElement>('script[nonce]')?.nonce ?? '';
      script.textContent=JSON.stringify(data).replaceAll('<','\\u003c');document.head.append(script);
    }
  }, [path, search, i18n.language]);
  return null;
}
