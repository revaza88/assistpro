type Language = 'ka' | 'en' | 'ru';
const titles: Record<string, [string, string, string]> = {
  '/': ['ბუღალტერია და ბიზნესის მხარდაჭერა', 'Accounting and business support', 'Бухгалтерия и поддержка бизнеса'],
  '/services': ['მომსახურებები', 'Services', 'Услуги'],
  '/services/accounting': ['ბუღალტრული მომსახურება', 'Accounting services', 'Бухгалтерские услуги'],
  '/services/tax': ['საგადასახადო მხარდაჭერა', 'Tax support', 'Налоговая поддержка'],
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
const descriptions: Record<string, string> = {
  '/': 'ასისტი — ბუღალტრული და საგადასახადო მომსახურება, ანგარიშგება და ბიზნესის მხარდაჭერა. გაეცანით მიმართულებებს და აირჩიეთ საჭირო მომსახურებები.',
  '/services': 'გაეცანით ასისტის ბუღალტრულ, საგადასახადო, იურიდიულ, აუდიტისა და HR მიმართულებებს და შეარჩიეთ თქვენი ბიზნესისთვის საჭირო მომსახურებები.',
  '/services/accounting': 'გაეცანით ბუღალტრული მომსახურების მიმართულებას: დოკუმენტების აღრიცხვა, ხელფასები, ანგარიშგება და აღრიცხვის აღდგენა.',
  '/services/tax': 'საგადასახადო მხარდაჭერის მიმართულებები: დეკლარაციების მომზადება, კონსულტაცია, რისკების შეფასება და დავის მხარდაჭერა.',
  '/services/legal': 'გაეცანით ბიზნესის იურიდიული მხარდაჭერის მიმართულებას და მოგვიყევით თქვენი კომპანიის საჭიროების შესახებ.',
  '/services/business': 'კომპანიის რეგისტრაციისა და ბიზნესის ყოველდღიური მხარდაჭერის მიმართულებები. აირჩიეთ საჭირო მომსახურებები და აღწერეთ მოთხოვნა.',
  '/services/audit': 'ფინანსური და მმართველობითი ანგარიშგების, აუდიტისა და ბიზნესის ფინანსური სურათის შეფასების მიმართულება.',
  '/services/hr': 'გაეცანით HR მიმართულებას: თანამშრომლების შერჩევა, საკადრო პროცესები და გუნდის მხარდაჭერა.',
  '/industries': 'აირჩიეთ ბიზნესის საქმიანობის სფერო და რამდენიმე მომსახურება ერთად. მომსახურებების არჩევა ფიქსირებული პაკეტით შეზღუდული არ არის.',
  '/calculator': 'ბუღალტრული მომსახურების დემო შეფასება საქმიანობის, დოკუმენტების, თანამშრომლებისა და დღგ-ის სტატუსის მიხედვით. ეს არ არის მოქმედი ტარიფი.',
  '/contact': 'ასისტის დადასტურებული კონტაქტები და მოკლე მოთხოვნის ფორმა. ამ ლოკალურ საცდელ ვერსიაში მოთხოვნა მხოლოდ ამ კომპიუტერზე ინახება.',
  '/faq': 'პასუხები მომსახურებების არჩევის, ფასის დემო შეფასების, თანამშრომლობის დაწყებისა და ადგილობრივი საცდელი მოთხოვნის შესახებ.',
  '/about': 'გაეცანით ასისტის საქმიანობის მიმართულებებს და ბიზნესის მხარდაჭერისადმი მიდგომას.',
  '/team': 'ინფორმაცია ასისტის გუნდის შესახებ. გუნდის პერსონალური მონაცემები გამოჩნდება დადასტურების შემდეგ.',
  '/career': 'ინფორმაცია ასისტთან კარიერისა და თანამშრომლობის შესახებ. გაეცანით გვერდზე მითითებულ მიმდინარე მდგომარეობას.',
};
export const publicPaths = Object.keys(titles);
export const isPublicPath = (path: string) => Object.hasOwn(titles, path);
export const sitemapPaths = publicPaths.filter(path => !['/contact', '/team', '/career'].includes(path));
export function pageSeo(path: string, language = 'ka') {
  const lang: Language = language.startsWith('en') ? 'en' : language.startsWith('ru') ? 'ru' : 'ka';
  const index = lang === 'ka' ? 0 : lang === 'en' ? 1 : 2;
  const label = titles[path]?.[index] ?? ['გვერდი ვერ მოიძებნა', 'Page not found', 'Страница не найдена'][index];
  const brand = ['ასისტი', 'ASSIST', 'АССИСТ'][index];
  return {
    lang, title: `${label} | ${brand}`,
    description: lang === 'ka' ? descriptions[path] ?? 'მოთხოვნილი გვერდი ვერ მოიძებნა. დაბრუნდით ასისტის მთავარ გვერდზე.' : `${label}. ${lang === 'en' ? 'Explore ASSIST services, choose the support your business needs and learn about the local demo.' : 'Узнайте об услугах АССИСТ, выберите поддержку для бизнеса и ознакомьтесь с локальной демоверсией.'}`,
    indexable: isPublicPath(path) && !['/contact', '/team', '/career'].includes(path),
  };
}
export function siteOrigin(value?: string): string | null {
  if (!value) return null;
  const url = new URL(value);
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.search || url.hash || url.pathname !== '/') throw new Error('SITE_URL must be an HTTP(S) origin without path, credentials, query or fragment');
  return url.origin;
}
export const escapeHtml = (text: string) => text.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
export function seoHead(path: string, origin: string | null, indexing: boolean, query = false): string {
  const meta = pageSeo(path);
  const robots = indexing && meta.indexable && !query ? 'index,follow' : 'noindex,follow';
  const url = origin && isPublicPath(path) ? origin + path : null;
  return `<title>${escapeHtml(meta.title)}</title>
<meta name="description" content="${escapeHtml(meta.description)}" />
<meta name="robots" content="${robots}" />
<meta name="site-indexing" content="${indexing}" />
<meta name="site-origin" content="${escapeHtml(origin ?? '')}" />
<meta property="og:title" content="${escapeHtml(meta.title)}" />
<meta property="og:description" content="${escapeHtml(meta.description)}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="ასისტი" />
<meta property="og:locale" content="ka_GE" />
<meta name="twitter:card" content="summary" />
${url ? `<link rel="canonical" href="${escapeHtml(url)}" /><meta property="og:url" content="${escapeHtml(url)}" />` : ''}`;
}
