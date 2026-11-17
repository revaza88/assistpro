import { Link, useSearch } from 'wouter';
import { calculatorEntryHref, inquiryEntryHref } from '@shared/calculator-context';
import { useTranslation } from 'react-i18next';
import { company } from '@/lib/company';
import { requestCopy } from '@/lib/request-copy';
import { designCopy } from '@/lib/design-copy';
import { calculatorCopy } from '@/lib/calculator-copy';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const copy = designCopy(i18n.language);
  const request = requestCopy(i18n.language);
  const search = useSearch();
  const links = [[t('nav.services'),'/services'],[request.industries,inquiryEntryHref('/industries', search)],[calculatorCopy(i18n.language).nav,calculatorEntryHref(search)],[request.faq,'/faq'],[t('nav.about'),'/about'],[t('nav.team'),'/team'],[t('nav.career'),'/career'],[t('nav.contact'),inquiryEntryHref('/contact', search)]];
  return <footer className="site-footer"><div className="design-wrap">
    <div className="footer-grid"><div><Link href="/" className="site-brand"><span className="site-mark" aria-hidden="true" /><span className="site-wordmark">{copy.brand}</span></Link><p>{copy.brandDescription}</p></div>
      <div><h3>{t('nav.contact')}</h3><p>{company.address}</p><a href={'mailto:'+company.email}>{company.email}</a>{company.phone && <p><a href={'tel:'+company.phone}>{company.phone}</a></p>}</div>
      <div><h3>{t('footer.quickLinks')}</h3><ul>{links.map(([title,href]) => <li key={href}><Link href={href}>{title}</Link></li>)}</ul></div>
    </div><div className="footer-bottom"><span>© {new Date().getFullYear()} {copy.brand}</span><span>{t('footer.copyright').replace('2025',String(new Date().getFullYear())).replace(/^© \d{4} ASSIST[. ]*/, '')}</span></div>
  </div></footer>;
}
