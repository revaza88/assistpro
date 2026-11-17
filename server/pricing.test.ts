import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { calculateDemoEstimate, calculatorInputSchema, isCalculatorInput, calculatorHref, calculatorForSelection, calculatorJourneySelection, calculatorEntryHref, defaultCalculatorInput, parseCalculatorQuery } from '../src/shared/pricing';
import { insertContactSchema } from '../src/shared/schemas';
import { FileStorage } from './file-storage';

test('demo-1 matches the reference model and explicitly excludes VAT', () => {
  assert.deepEqual(calculateDemoEstimate(defaultCalculatorInput), { kind: 'range', low: 340, high: 460, version: 'demo-1', isDemo: true, currency: 'GEL', vatIncluded: false });
  const vat = calculateDemoEstimate({ ...defaultCalculatorInput, vat: true });
  assert.equal(vat.kind, 'range');
  if (vat.kind === 'range') { assert.equal(vat.low, 450); assert.equal(vat.high, 600); }
  const industry = calculateDemoEstimate({ ...defaultCalculatorInput, industry: 'manufacturing' });
  if (industry.kind !== 'range') throw new Error('Expected range');
  assert.equal(industry.low, 480); assert.equal(industry.high, 640);
});

test('zero is a valid count; recovery never returns a numeric price', () => {
  const zero = calculateDemoEstimate({ ...defaultCalculatorInput, documents: 0, employees: 0 });
  assert.equal(zero.kind, 'range');
  if (zero.kind === 'range') { assert.equal(zero.low, 180); assert.equal(zero.high, 240); }
  const recovery = calculateDemoEstimate({ ...defaultCalculatorInput, type: 'recovery' });
  assert.equal(recovery.kind, 'individual'); assert.equal('low' in recovery, false);
});

test('counts and enums are validated before calculation, without coercion', () => {
  for (const value of [-1, .5, NaN, Infinity, 1000001, '', '100', null]) assert.throws(() => calculateDemoEstimate({ ...defaultCalculatorInput, documents: value }));
  for (const patch of [{ employees: 10001 }, { employees: -1 }, { vat: 'false' }, { industry: '__proto__' }, { type: 'other' }]) assert.throws(() => calculateDemoEstimate({ ...defaultCalculatorInput, ...patch }));
  const upper = calculateDemoEstimate({ ...defaultCalculatorInput, documents: 1000000, employees: 10000, vat: true, industry: 'hospitality' });
  assert.equal(upper.kind, 'range');
});

test('lightweight navigation validation agrees with the full schema at input boundaries', () => {
  const candidates: unknown[] = [null, [], {}, defaultCalculatorInput, { ...defaultCalculatorInput, extra: true }];
  for (const key of ['documents', 'employees']) for (const value of [-1, 0, 1, 10000, 10001, 1000000, 1000001, .5, NaN, Infinity, '100', null, undefined]) candidates.push({ ...defaultCalculatorInput, [key]: value });
  for (const industry of ['service', 'trade', 'manufacturing', 'hospitality', '__proto__']) candidates.push({ ...defaultCalculatorInput, industry });
  for (const type of ['monthly', 'recovery', '', null]) candidates.push({ ...defaultCalculatorInput, type });
  for (const vat of [true, false, 'false', 0]) candidates.push({ ...defaultCalculatorInput, vat });
  for (const value of candidates) assert.equal(isCalculatorInput(value), calculatorInputSchema.safeParse(value).success);
});

test('calculator context round-trips and malformed links never become zero estimates', () => {
  const href = calculatorHref('/contact', defaultCalculatorInput);
  assert.deepEqual(parseCalculatorQuery(href.split('?')[1]), defaultCalculatorInput);
  const base = new URLSearchParams(href.split('?')[1]);
  for (const key of ['documents','employees','vat','industry','type']) {
    const missing = new URLSearchParams(base); missing.delete(key); assert.equal(parseCalculatorQuery(missing.toString()), null);
    const duplicate = new URLSearchParams(base); duplicate.append(key, base.get(key)!); assert.equal(parseCalculatorQuery(duplicate.toString()), null);
  }
  for (const [key, value] of [['employees',''], ['documents','1e2'], ['documents','-1'], ['vat','0'], ['rules','real-1'], ['services','bookkeeping']]) {
    const invalid = new URLSearchParams(base); invalid.set(key,value); assert.equal(parseCalculatorQuery(invalid.toString()), null);
  }
  const duplicateSource = new URLSearchParams(base); duplicateSource.append('source','calculator'); assert.equal(parseCalculatorQuery(duplicateSource.toString()), null);
});

test('a local inquiry stores inputs and a server-computed demo result after reopening', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'assistpro-price-'));
  try {
    const file = path.join(directory, 'data.json');
    const input = insertContactSchema.parse({ firstName: 'Local calculator test', email: 'price@example.invalid', privacy: true, industry: 'education', calculator: defaultCalculatorInput, demoEstimate: { low: 1, high: 1, isDemo: false }, services: ['bookkeeping', 'hr'] });
    assert.equal('demoEstimate' in input, false);
    await new FileStorage(file).createContact(input);
    const saved = (await new FileStorage(file).getAllContacts())[0];
    assert.deepEqual(saved.calculator, defaultCalculatorInput);
    assert.equal(saved.industry, 'education');
    assert.deepEqual(saved.services, ['bookkeeping', 'hr']);
    assert.equal(saved.demoEstimate?.isDemo, true);
    assert.deepEqual(saved.demoEstimate, calculateDemoEstimate(defaultCalculatorInput));
    assert.equal(insertContactSchema.safeParse({ ...input, calculator: { ...defaultCalculatorInput, documents: -1 } }).success, false);
  } finally { await rm(directory, { recursive: true, force: true }); }
});

test('selection survives calculator, inquiry and selection editing without pricing extra services', () => {
  const selection = { industry: 'education' as const, services: ['bookkeeping', 'hr'] as ('bookkeeping' | 'hr')[] };
  const input = calculatorForSelection(selection);
  assert.equal(input.industry, 'service');
  let search = calculatorHref('/calculator', input, selection).split('?')[1];
  assert.deepEqual(calculatorJourneySelection(search), selection);
  assert.deepEqual(parseCalculatorQuery(search), defaultCalculatorInput);
  const changed = { ...input, documents: 200 };
  search = calculatorHref('/contact', changed, calculatorJourneySelection(search)!).split('?')[1];
  const edit = calculatorHref('/industries', parseCalculatorQuery(search)!, calculatorJourneySelection(search)!);
  assert.deepEqual(calculatorJourneySelection(edit.split('?')[1]), selection);
  assert.equal(parseCalculatorQuery(edit.split('?')[1])?.documents, 200);
  assert.equal(calculatorEntryHref('sector=education&services=bookkeeping,hr'), calculatorHref('/calculator', input, selection));
  assert.equal(calculatorForSelection({ industry: 'retail', services: ['cleanup'] }).type, 'recovery');
  assert.equal(calculatorForSelection({ industry: 'retail', services: [] }).industry, 'trade');
  for (const suffix of ['&sector=education', '&sector=unknown&services=hr', '&sector=education&services=unknown', '&sector=education&services=hr&services=bookkeeping', '&sector=education&services=hr&service=accounting']) {
    assert.equal(parseCalculatorQuery(calculatorHref('/contact', input).split('?')[1] + suffix), null);
  }
});
