import { Link, useSearch, useLocation } from 'wouter';
import { localizedPath } from '@shared/localization';
import { calculatorEntryHref, inquiryEntryHref } from '@shared/calculator-context';
import { useTranslation } from 'react-i18next';
import { brandSlogan, company } from '@/lib/company';
import { requestCopy } from '@/lib/request-copy';
import { designCopy } from '@/lib/design-copy';
import { calculatorCopy } from '@/lib/calculator-copy';
import BrandLogo from '@/components/BrandLogo';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const copy = designCopy(i18n.language);
  const request = requestCopy(i18n.language);
  const search = useSearch();
  const [path] = useLocation();
  const links = [[t('nav.services'),'/services'],[request.industries,inquiryEntryHref('/industries', search)],[calculatorCopy(i18n.language).nav,calculatorEntryHref(search)],[request.faq,'/faq'],[t('nav.about'),'/about'],[t('nav.team'),'/team'],[t('nav.career'),'/career'],[t('nav.contact'),inquiryEntryHref('/contact', search)]];
  return <footer className="site-footer"><div className="design-wrap">
    <div className="footer-grid"><div><Link href="/" className="site-brand"><BrandLogo footer /></Link><p lang="ka">{brandSlogan}</p></div>
      <div><h2>{t('nav.contact')}</h2><p>{company.address}</p><a href={'mailto:'+company.email}>{company.email}</a>{company.phone && <p><a href={'tel:'+company.phone}>{company.phone}</a></p>}</div>
      <div><h2>{t('footer.quickLinks')}</h2><ul className="footer-links">{links.map(([title,href]) => <li key={href}><Link href={href}>{title}</Link></li>)}</ul></div>
    </div><div className="footer-bottom"><span lang="ka">© {new Date().getFullYear()} {company.legalName} · {company.identificationCode}</span><nav aria-label={i18n.language.startsWith('en') ? 'Languages' : i18n.language.startsWith('ru') ? 'Языки' : 'ენები'} className="footer-languages">{(['ka','en','ru'] as const).map((lang,index) => <a key={lang} href={localizedPath(path,lang)+search} hrefLang={lang} lang={lang} aria-current={i18n.language.startsWith(lang) ? 'page' : undefined}>{['ქართული','English','Русский'][index]}</a>)}</nav><span>{t('footer.copyright').replace('2025',String(new Date().getFullYear())).replace(/^© \d{4} ASSIST[. ]*/, '')}</span></div>
  </div></footer>;
}
