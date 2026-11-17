import { useEffect } from 'react';
import { useLocation, useSearch } from 'wouter';
import { useTranslation } from 'react-i18next';
import { isPublicPath, pageSeo } from '@shared/seo';

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
      canonical.href = origin + path; set('og:url', origin + path, true);
    } else { canonical?.remove(); document.head.querySelector('meta[property="og:url"]')?.remove(); }
  }, [path, search, i18n.language]);
  return null;
}
