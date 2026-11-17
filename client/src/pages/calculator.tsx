import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation, useSearch } from 'wouter';
import { useTranslation } from 'react-i18next';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import SelectionSummary from '@/components/SelectionSummary';
import { parseSelection } from '@shared/selection';
import { calculatorCopy } from '@/lib/calculator-copy';
import { calculateDemoEstimate, calculatorInputSchema, calculatorIndustries, calculatorHref, defaultCalculatorInput, demoRules, parseCalculatorQuery } from '@shared/pricing';

type Fields = { industry: string; documents: string; employees: string; vat: boolean; type: string };
const fieldsFrom = (input = defaultCalculatorInput): Fields => ({ ...input, documents: String(input.documents), employees: String(input.employees) });
const parseFields = (fields: Fields) => calculatorInputSchema.safeParse({ ...fields,
  documents: /^\d+$/.test(fields.documents) ? Number(fields.documents) : NaN,
  employees: /^\d+$/.test(fields.employees) ? Number(fields.employees) : NaN,
});

function CalculatorForm({ search }: { search: string }) {
  const { i18n } = useTranslation();
  const copy = calculatorCopy(i18n.language);
  const incoming = search ? parseCalculatorQuery(search) : defaultCalculatorInput;
  const selection = incoming && new URLSearchParams(search).has('sector') ? parseSelection(search) : null;
  const [fields, setFields] = useState<Fields>(() => incoming ? fieldsFrom(incoming) : { industry: 'service', documents: '', employees: '', vat: false, type: 'monthly' });
  const [invalidLink, setInvalidLink] = useState(!incoming);
  const [, navigate] = useLocation();
  useEffect(() => {
    const input = search ? parseCalculatorQuery(search) : defaultCalculatorInput;
    setFields(input ? fieldsFrom(input) : { industry: 'service', documents: '', employees: '', vat: false, type: 'monthly' });
    setInvalidLink(!input);
  }, [search]);
  const update = (patch: Partial<Fields>) => {
    const next = { ...fields, ...patch };
    setFields(next); setInvalidLink(false);
    const valid = parseFields(next);
    // Keep refresh, menu and footer links in sync without adding history on each keystroke.
    if (valid.success) navigate(calculatorHref('/calculator', valid.data, selection ?? undefined), { replace: true });
  };
  const parsed = parseFields(fields);
  const result = parsed.success ? calculateDemoEstimate(parsed.data) : null;
  const invalidField = (key: string) => !parsed.success && parsed.error.issues.some(issue => issue.path[0] === key);
  const number = new Intl.NumberFormat(i18n.language);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!parsed.success) event.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  };
  return <div className="calculator-page min-h-screen"><Navigation /><main id="main-content" tabIndex={-1} className="design-wrap calculator-main">
    <header className="calculator-header"><div className="site-eyebrow">{copy.nav}</div><h1>{copy.title}</h1><p>{copy.intro}</p></header>
    <p className="calculator-notice">{copy.notice}</p>
    {invalidLink && <p role="alert" className="mb-5 text-red-700">{copy.invalidLink}</p>}
    {selection && <div className="mb-6"><SelectionSummary selection={selection} editable editHref={parsed.success ? calculatorHref('/industries', parsed.data, selection) : undefined} /></div>}
    <div className="calculator-layout">
      <form onSubmit={onSubmit} noValidate className="calculator-panel" aria-label={copy.business}>
        <h2>{copy.business}</h2><div className="calculator-fields">
          <div><label htmlFor="calc-industry">{copy.industry}</label><select id="calc-industry" value={fields.industry} onChange={event => update({ industry: event.target.value })}>
            {calculatorIndustries.map((id,index) => <option key={id} value={id}>{copy.industries[index]}</option>)}
          </select></div>
          <div><label htmlFor="calc-employees">{copy.employees}</label><input id="calc-employees" type="number" inputMode="numeric" min={0} max={10000} step={1} required value={fields.employees} onChange={event => update({ employees: event.target.value })} aria-invalid={invalidField('employees')} aria-describedby={invalidField('employees') ? 'employees-error' : undefined} />{invalidField('employees') && <p id="employees-error" className="calculator-field-error">{copy.employeeError}</p>}</div>
          <div><label htmlFor="calc-documents">{copy.documents}</label><input id="calc-documents" type="number" inputMode="numeric" min={0} max={1000000} step={1} required value={fields.documents} onChange={event => update({ documents: event.target.value })} aria-invalid={invalidField('documents')} aria-describedby={invalidField('documents') ? 'documents-error' : undefined} />{invalidField('documents') && <p id="documents-error" className="calculator-field-error">{copy.documentError}</p>}</div>
          <div><label htmlFor="calc-type">{copy.type}</label><select id="calc-type" value={fields.type} onChange={event => update({ type: event.target.value })}><option value="monthly">{copy.types[0]}</option><option value="recovery">{copy.types[1]}</option></select></div>
        </div>
        <label className="calculator-check"><input type="checkbox" checked={fields.vat} onChange={event => update({ vat: event.target.checked })} />{copy.vat}</label>
        <p className="calculator-help">{copy.help}</p><p className="calculator-help">{copy.vatNote}</p>
        <button type="button" className="min-h-12 text-sm underline mt-3" onClick={() => update(fieldsFrom())}>{copy.reset}</button>
      </form>
      <aside className="calculator-result" aria-label={copy.result}>
        <h2>{copy.result}</h2><div role="status" aria-live="polite" aria-atomic="true">
          <p className="calculator-amount">{!result ? copy.invalid : result.kind === 'individual' ? copy.individual : number.format(result.low) + '–' + number.format(result.high) + ' ' + copy.perMonth}</p>
          <p>{!result ? copy.numberError : result.kind === 'individual' ? copy.recovery : copy.excluded}</p>
        </div>
        <dl className="calculator-details"><div><dt>{copy.version}</dt><dd>{demoRules.version}</dd></div></dl>
        {parsed.success && <Link href={calculatorHref('/contact', parsed.data, selection ?? undefined)} className="site-button site-button-lime w-full mt-5">{copy.discuss} →</Link>}
        <p className="calculator-scope">{copy.scope}</p>
      </aside>
    </div>
  </main><Footer /></div>;
}

export default function CalculatorPage() {
  const search = useSearch();
  return <CalculatorForm search={search} />;
}
