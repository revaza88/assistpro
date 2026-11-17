import { parseSelection, selectionHref, type Selection } from './selection';

export const calculatorIndustries = ['service', 'trade', 'manufacturing', 'hospitality'] as const;
export const calculatorLimits = { documents: 1_000_000, employees: 10_000 } as const;
export const calculatorTypes = ['monthly', 'recovery'] as const;
export type CalculatorInput = {
  industry: typeof calculatorIndustries[number]; documents: number; employees: number;
  vat: boolean; type: typeof calculatorTypes[number];
};
// Navigation needs only these small checks; full form/API schemas load with the forms.
export function isCalculatorInput(value: unknown): value is CalculatorInput {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const input = value as Record<string, unknown>;
  const keys = ['industry', 'documents', 'employees', 'vat', 'type'];
  return Object.keys(input).length === keys.length && keys.every(key => Object.hasOwn(input, key))
    && calculatorIndustries.includes(input.industry as CalculatorInput['industry'])
    && calculatorTypes.includes(input.type as CalculatorInput['type']) && typeof input.vat === 'boolean'
    && typeof input.documents === 'number' && Number.isInteger(input.documents) && input.documents >= 0 && input.documents <= calculatorLimits.documents
    && typeof input.employees === 'number' && Number.isInteger(input.employees) && input.employees >= 0 && input.employees <= calculatorLimits.employees;
}

// Copied from the user's Sites demo-1. These are illustrative UI rules, not tariffs.
export const demoRules = Object.freeze({
  version: 'demo-1' as const, base: 200, documentRate: 1.2, employeeRate: 12,
  vatSurcharge: 120, lower: .9, upper: 1.2,
  industries: Object.freeze({ service: 1, trade: 1.2, manufacturing: 1.4, hospitality: 1.3 }),
});
export const defaultCalculatorInput: CalculatorInput = { industry: 'service', employees: 5, documents: 100, vat: false, type: 'monthly' };

export function parseCalculatorQuery(search: string): CalculatorInput | null {
  const params = new URLSearchParams(search);
  if (params.getAll('source').length !== 1 || params.get('source') !== 'calculator') return null;
  if (params.has('service')) return null;
  if (params.has('sector') || params.has('services')) {
    if (!params.has('sector') || !params.has('services') || !parseSelection(search)) return null;
  }
  const keys = ['industry', 'documents', 'employees', 'vat', 'type'];
  if (keys.some(key => params.getAll(key).length !== 1 || !params.get(key))) return null;
  if (params.getAll('rules').length > 1 || (params.has('rules') && params.get('rules') !== demoRules.version)) return null;
  if (!/^\d+$/.test(params.get('documents')!) || !/^\d+$/.test(params.get('employees')!) || !['true','false'].includes(params.get('vat')!)) return null;
  const input = {
    industry: params.get('industry'), documents: Number(params.get('documents')), employees: Number(params.get('employees')),
    vat: params.get('vat') === 'true', type: params.get('type'),
  };
  return isCalculatorInput(input) ? input : null;
}

export function isCalculatorQuery(search: string): boolean {
  return new URLSearchParams(search).getAll('source').includes('calculator');
}

export function calculatorHref(path: '/contact' | '/calculator' | '/industries', value: CalculatorInput, selection?: Selection): string {
  if (!isCalculatorInput(value)) throw new Error('Invalid calculator input');
  const input = value;
  const params = new URLSearchParams({ source: 'calculator', industry: input.industry, documents: String(input.documents), employees: String(input.employees), vat: String(input.vat), type: input.type, rules: demoRules.version });
  if (selection) {
    const selected = new URLSearchParams(selectionHref('/contact', selection).split('?')[1]);
    selected.forEach((value, key) => params.set(key, value));
  }
  return path + '?' + params;
}

export function calculatorJourneySelection(search: string): Selection | null {
  const input = parseCalculatorQuery(search);
  if (!input) return null;
  return new URLSearchParams(search).has('sector') ? parseSelection(search) : calculatorSelection(input);
}

export function calculatorForSelection(selection: Selection): CalculatorInput {
  const industry = selection.industry === 'manufacturing' ? 'manufacturing' : selection.industry === 'hotels' ? 'hospitality' : ['retail', 'wholesale', 'distribution'].includes(selection.industry) ? 'trade' : 'service';
  return { ...defaultCalculatorInput, industry, type: selection.services.includes('cleanup') && !selection.services.includes('bookkeeping') ? 'recovery' : 'monthly' };
}

export function calculatorEntryHref(search: string): string {
  const input = parseCalculatorQuery(search);
  if (input) return calculatorHref('/calculator', input, calculatorJourneySelection(search) ?? undefined);
  const params = new URLSearchParams(search);
  const selection = ['sector', 'services', 'service'].some(key => params.has(key)) ? parseSelection(search) : null;
  return selection ? calculatorHref('/calculator', calculatorForSelection(selection), selection) : '/calculator';
}

export function inquiryEntryHref(path: '/contact' | '/industries', search: string): string {
  const input = parseCalculatorQuery(search);
  if (input) return calculatorHref(path, input, calculatorJourneySelection(search) ?? undefined);
  const params = new URLSearchParams(search);
  const selection = ['sector', 'services', 'service'].some(key => params.has(key)) ? parseSelection(search) : null;
  return selection ? selectionHref(path, selection) : path;
}

export function calculatorSelection(input: CalculatorInput): Selection {
  // Trade is broader than retail/wholesale. Preserve that exact category in calculator.
  const industry = input.industry === 'manufacturing' ? 'manufacturing' : input.industry === 'hospitality' ? 'hotels' : input.industry === 'service' ? 'service' : 'other';
  return { industry, services: [input.type === 'recovery' ? 'cleanup' : 'bookkeeping'] };
}
