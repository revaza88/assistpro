import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { requestCopy } from '@/lib/request-copy';
import { designCopy } from '@/lib/design-copy';
import { calculatorCopy } from '@/lib/calculator-copy';
import { brandSlogan } from '@/lib/company';

export default function HeroSection() {
  const { t, i18n } = useTranslation();
  const copy = designCopy(i18n.language);
  return <>
    <section id="hero" className="site-hero"><div className="design-wrap hero-grid">
      <div><div className="site-eyebrow" lang="ka">{brandSlogan}</div><h1 className="hero-heading">{copy.title}</h1><p className="hero-summary">{copy.summary}</p>
        <div className="hero-actions"><Link href="/industries" className="site-button">{requestCopy(i18n.language).quote}<ArrowRight size={18} aria-hidden="true" /></Link><Link href="/calculator" className="site-button site-button-outline">{calculatorCopy(i18n.language).nav}</Link></div>
        <p className="hero-note">{copy.note}</p>
      </div>
      <div className="report-scene" role="img" aria-label={copy.illustration + ' — ' + copy.report}>
        <div className="report-paper" aria-hidden="true"><div className="report-meta"><span>{copy.overview}</span><span>01 — 06</span></div><div className="report-title">{copy.report}</div><p className="report-caption">{copy.chart}</p><strong className="report-amount">₾ 48,250</strong>
          <div className="report-bars">{[35,52,44,72,90,81].map((height,index) => <span key={index} style={{height: height + '%'}} />)}</div><div className="report-axis"><span>{copy.january}</span><span>{copy.june}</span></div>
        </div>
        <div className="report-stamp" aria-hidden="true">✓ {copy.stamp}<small>{copy.stampNote}</small></div><span className="report-disclaimer">{copy.illustration}</span>
      </div>
    </div></section>
    <div className="design-wrap"><div className="service-strip">{copy.strip.map(text => <span key={text}>{text}</span>)}</div></div>
  </>;
}
