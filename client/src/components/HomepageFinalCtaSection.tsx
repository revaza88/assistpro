import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { designCopy } from '@/lib/design-copy';
import { requestCopy } from '@/lib/request-copy';

export default function HomepageFinalCtaSection() {
  const { i18n } = useTranslation();
  const copy = designCopy(i18n.language);
  return <section id="final-cta" className="final-section"><div className="design-wrap"><div className="final-card">
    <div><div className="site-eyebrow">{copy.finalEyebrow}</div><h2>{copy.finalTitle}</h2><p>{copy.finalSummary}</p></div>
    <Link href="/industries" className="site-button site-button-lime">{requestCopy(i18n.language).quote}</Link>
  </div></div></section>;
}
