import { useTranslation } from 'react-i18next';
import { Link, useLocation, useSearch } from 'wouter';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import PageHeader from '@/components/PageHeader';
import JourneySteps from '@/components/JourneySteps';
import SelectionSummary from '@/components/SelectionSummary';
import { requestCopy } from '@/lib/request-copy';
import { calculatorCopy } from '@/lib/calculator-copy';
import { calculatorForSelection, calculatorHref, isCalculatorQuery, parseCalculatorQuery } from '@shared/pricing';
import { emptySelection, industryIds, serviceGroups, serviceIds, parseSelection, selectionHref, type IndustryId, type Selection } from '@shared/selection';

export default function IndustriesPage() {
  const { i18n } = useTranslation();
  const copy = requestCopy(i18n.language);
  const search = useSearch();
  const calculator = parseCalculatorQuery(search);
  const selection = isCalculatorQuery(search) && !calculator ? null : parseSelection(search);
  const [, navigate] = useLocation();
  const href = (path: '/industries' | '/contact', next: Selection) => calculator ? calculatorHref(path, calculator, next) : selectionHref(path, next);
  const update = (next: Selection) => navigate(href('/industries', next), { replace: true });
  return <div className="selection-page min-h-screen"><Navigation /><main id="main-content" tabIndex={-1} className="design-wrap journey-main">
    <JourneySteps current={0} />
    <PageHeader title={copy.title} description={copy.intro} />
    {!selection ? <div role="alert" className="rounded-xl bg-amber-50 p-6"><p>{copy.invalid}</p><Link href={selectionHref('/industries', emptySelection)} className="inline-flex items-center min-h-12 underline">{copy.edit}</Link></div> : <>
      <div className="selection-layout"><div>
      <label htmlFor="industry" className="block font-semibold mb-2">{copy.industry}</label>
      <select id="industry" value={selection.industry} onChange={event => update({ ...selection, industry: event.target.value as IndustryId })} className="min-h-12 w-full sm:max-w-md border border-slate-300 rounded-lg px-3 text-base bg-white mb-8">
        {industryIds.map((id, index) => <option key={id} value={id}>{copy.industryLabels[index]}</option>)}
      </select>
      <h2 className="text-2xl font-semibold text-brand-blue-700 mb-4">{copy.services}</h2>
      <div className="grid md:grid-cols-2 gap-5 mb-8">{serviceGroups.map((group, index) => <fieldset key={group.id} className="rounded-xl border border-slate-200 p-4">
        <legend className="font-semibold px-2">{copy.groupLabels[index]}</legend>
        {group.services.map(id => <label key={id} className="flex items-center gap-3 min-h-12 px-2 py-3 rounded-lg hover:bg-slate-50 cursor-pointer">
          <input type="checkbox" name="services" value={id} checked={selection.services.includes(id)} onChange={event => update({ ...selection, services: event.target.checked ? [...selection.services, id] : selection.services.filter(service => service !== id) })} className="w-5 h-5 accent-blue-600 shrink-0" />
          <span>{copy.serviceLabels[serviceIds.indexOf(id)]}</span>
        </label>)}
      </fieldset>)}</div>
      </div><aside className="selection-next">
      <SelectionSummary selection={selection} />
      <div className="selection-actions">
        <Link href={calculatorHref('/calculator', calculator ?? calculatorForSelection(selection), selection)} className="site-button">{calculatorCopy(i18n.language).nav}</Link>
        <Link href={href('/contact', selection)} className="site-button site-button-outline">{copy.continue}</Link>
        <Link href={href('/contact', { ...selection, services: [] })} className="inline-flex min-h-12 items-center justify-center underline text-brand-blue-700">{copy.unsure}</Link>
      </div>
      </aside></div>
    </>}
  </main><Footer /></div>;
}
