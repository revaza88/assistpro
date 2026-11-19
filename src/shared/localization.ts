export const siteLanguages = ['ka', 'en', 'ru'] as const;
export type SiteLanguage = typeof siteLanguages[number];
export function splitLocalePath(pathname: string) {
  const match = pathname.match(/^\/(ka|en|ru)(?=\/|$)/);
  const language = (match?.[1] ?? 'ka') as SiteLanguage;
  const path = (match ? pathname.slice(match[0].length) : pathname) || '/';
  return { language, path, prefix: language === 'ka' ? '' : '/' + language };
}
export function localizedPath(path: string, language: SiteLanguage) {
  const base = splitLocalePath(path).path;
  return language === 'ka' ? base : '/' + language + (base === '/' ? '/' : base);
}
export function prerenderFile(path: string) {
  return (path === '/' ? 'home' : path.slice(1).replaceAll('/', '_')) + '.html';
}
