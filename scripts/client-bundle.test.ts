import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { clientContentFiles } from './tailwind-content';
import i18n, { changeSiteLanguage } from '../client/src/lib/i18n';

test('optional translations load on demand and match the reviewed dictionaries', async () => {
  assert.equal(i18n.hasResourceBundle('en', 'translation'), false);
  assert.equal(i18n.hasResourceBundle('ru', 'translation'), false);
  // Reviewed copy: responsibility is agreed before work begins, matching FAQ.
  // Keep dictionary fingerprints strict after the bounded KA/EN/RU correction.
  const expected = {
    ka: '1b3e7ae4d7ba423ef09816ee99e8ea1b020cc2c5fe82a206ee8ea57f127dd6c1',
    en: '6656bb10c73faeb51ab1d56fd7dc20840d0aba136f8d0544754a605e625a842a',
    ru: '4edd430ba2d12ceea54f105d3e9305a610f81480ebd619ae54ce5aed28c2ff4d',
  };
  for (const language of ['ka', 'en', 'ru'] as const) {
    await changeSiteLanguage(language);
    assert.equal(i18n.language, language);
    const { serviceSearch, ...legacy } = i18n.getResourceBundle(language, 'translation');
    assert.equal(createHash('sha256').update(JSON.stringify(legacy)).digest('hex'), expected[language]);
    assert.ok(serviceSearch.accounting.faq.length >= 3);
  }
  await changeSiteLanguage('ka');
});

test('public translations have matching keys and no editorial team placeholder', async () => {
  const paths = (value: unknown, prefix = ''): string[] => value && typeof value === 'object'
    ? Object.entries(value).flatMap(([key, child]) => paths(child, prefix + '.' + key)).sort()
    : [prefix];
  const baseline = paths(i18n.getResourceBundle('ka', 'translation'));
  for (const language of ['ka', 'en', 'ru'] as const) {
    await changeSiteLanguage(language);
    const dictionary = i18n.getResourceBundle(language, 'translation');
    assert.deepEqual(paths(dictionary), baseline, language + ' translation key parity');
    assert.doesNotMatch(dictionary.about.ourTeamText, /ვიზუალი მზად|ჩანართი გუნდის|brief insert|visual is ready|краткая вставка|визуальные материалы/i);
  }
  await changeSiteLanguage('ka');
});

test('Tailwind follows lazy routes and shared controls, excluding unreachable prototypes', () => {
  const files = clientContentFiles().map(file => file.replaceAll('\\', '/'));
  for (const file of ['pages/calculator.tsx', 'pages/services/accounting.tsx', 'pages/contact.tsx', 'components/ui/button.tsx', 'lib/locales/en.ts', 'lib/locales/ru.ts']) {
    assert.ok(files.some(path => path.endsWith(file)), file);
  }
  for (const file of ['components/BlogTeaserSection.tsx', 'components/ui/chart.tsx', 'components/ui/dropdown-menu.tsx']) {
    assert.ok(!files.some(path => path.endsWith(file)), file);
  }
});
