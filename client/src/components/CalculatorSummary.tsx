import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { calculateDemoEstimate, calculatorHref, calculatorIndustries, type CalculatorInput } from '@shared/pricing';
import { calculatorCopy } from '@/lib/calculator-copy';
import type { Selection } from '@shared/selection';

export default function CalculatorSummary({ input, selection }: { input: CalculatorInput; selection?: Selection }) {
  const { i18n } = useTranslation();
  const copy = calculatorCopy(i18n.language);
  const result = calculateDemoEstimate(input);
  const number = new Intl.NumberFormat(i18n.language);
  return <section className="calculator-context" aria-label={copy.context}>
    <h2>{copy.context}</h2><p className="calculator-demo-label">{copy.result} · {result.version}</p>
    <dl className="calculator-details">
      <div><dt>{copy.industry}</dt><dd>{copy.industries[calculatorIndustries.indexOf(input.industry)]}</dd></div>
      <div><dt>{copy.type}</dt><dd>{copy.types[input.type === 'monthly' ? 0 : 1]}</dd></div>
      <div><dt>{copy.documents}</dt><dd>{number.format(input.documents)}</dd></div>
      <div><dt>{copy.employees}</dt><dd>{number.format(input.employees)}</dd></div>
      <div><dt>{copy.vat}</dt><dd>{input.vat ? copy.yes : copy.no}</dd></div>
    </dl>
    <p className="calculator-context-amount">{result.kind === 'range' ? number.format(result.low) + '–' + number.format(result.high) + ' ' + copy.perMonth : copy.individual}</p>
    <p className="text-sm">{result.kind === 'range' ? copy.excluded : copy.recovery}</p><p className="text-sm mt-3">{copy.notice}</p>
    <p className="text-sm mt-3">{copy.scope}</p>
    <Link href={calculatorHref('/calculator', input, selection)} className="inline-flex items-center min-h-12 underline mt-3">{copy.edit}</Link>
  </section>;
}
