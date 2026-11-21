import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { clientContentFiles } from './tailwind-content';
import i18n, { changeSiteLanguage } from '../client/src/lib/i18n';

test('optional translations load on demand and match the reviewed dictionaries', async () => {
  assert.equal(i18n.hasResourceBundle('en', 'translation'), false);
  assert.equal(i18n.hasResourceBundle('ru', 'translation'), false);
  // Fingerprints include the reviewed public-copy corrections in all languages.
  const expected = {
    ka: '4eb32fe20fc2e795de133fff2c8dfa92e2ac68210333b1207e83b55d0801d5c3',
    en: '5991a7e609495ff7c97060c64d00d1dd6b5030d03e45b6dc0f728528b2d55f34',
    ru: '297bb7da315e218ff84f8ffd0431da03adf692c6a30e0536d039cbdc6298809d',
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
