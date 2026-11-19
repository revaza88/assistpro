import '../page-system.css';
import { Link, useSearch } from 'wouter';
import { useTranslation } from 'react-i18next';
import { calculatorEntryHref, inquiryEntryHref } from '@shared/calculator-context';
import { interfaceCopy } from '@/lib/interface-copy';

export default function JourneySteps({ current }: { current: 0 | 1 | 2 }) {
  const { i18n } = useTranslation();
  const copy = interfaceCopy(i18n.language), search = useSearch();
  const paths = [inquiryEntryHref('/industries', search), calculatorEntryHref(search), inquiryEntryHref('/contact', search)];
  return <nav className="journey-steps" aria-label={copy.journey}><ol>{copy.steps.map((label, index) => <li key={label}>
    <Link href={paths[index]} aria-current={current === index ? 'step' : undefined}><span className="journey-step-index" aria-hidden="true">{index + 1}</span><span>{label}</span></Link>
  </li>)}</ol></nav>;
}
