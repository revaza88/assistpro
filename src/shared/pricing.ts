import { z } from 'zod';
import { calculatorIndustries, calculatorLimits, calculatorTypes, demoRules } from './calculator-context';
export * from './calculator-context';

export const calculatorInputSchema = z.object({
  industry: z.enum(calculatorIndustries),
  documents: z.number().int().min(0).max(calculatorLimits.documents),
  employees: z.number().int().min(0).max(calculatorLimits.employees),
  vat: z.boolean(),
  type: z.enum(calculatorTypes),
}).strict();

const resultContext = { version: z.literal('demo-1'), isDemo: z.literal(true), currency: z.literal('GEL'), vatIncluded: z.literal(false) };
export const demoEstimateSchema = z.discriminatedUnion('kind', [
  z.object({ ...resultContext, kind: z.literal('range'), low: z.number().int().nonnegative(), high: z.number().int().nonnegative() }),
  z.object({ ...resultContext, kind: z.literal('individual') }),
]);
export type DemoEstimate = z.infer<typeof demoEstimateSchema>;

export function calculateDemoEstimate(value: unknown): DemoEstimate {
  const input = calculatorInputSchema.parse(value);
  const context = { version: demoRules.version, isDemo: true as const, currency: 'GEL' as const, vatIncluded: false as const };
  if (input.type === 'recovery') return { ...context, kind: 'individual' };
  const base = (demoRules.base + input.documents * demoRules.documentRate + input.employees * demoRules.employeeRate + (input.vat ? demoRules.vatSurcharge : 0)) * demoRules.industries[input.industry];
  return { ...context, kind: 'range', low: Math.round(base * demoRules.lower / 10) * 10, high: Math.round(base * demoRules.upper / 10) * 10 };
}
