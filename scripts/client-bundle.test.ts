import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { clientContentFiles } from './tailwind-content';
import i18n, { changeSiteLanguage } from '../client/src/lib/i18n';

test('optional translations load on demand without changing any existing copy', async () => {
  assert.equal(i18n.hasResourceBundle('en', 'translation'), false);
  assert.equal(i18n.hasResourceBundle('ru', 'translation'), false);
  // Checksums of the complete, merged translation dictionaries before splitting.
  const expected = {
    ka: '7c23e19df85a70dac4b41050c5780d0a0f1fb645002eaf81df3635f5e609d3af',
    en: '561d38976a103e51a44444615d7acd95d12e9e602f2365c62ed630e916c4060c',
    ru: '4fbe4a8ae3260201d30b0cfeec8574293c2183b7c2b58dd70f536754cd98dd95',
  };
  for (const language of ['ka', 'en', 'ru'] as const) {
    await changeSiteLanguage(language);
    assert.equal(i18n.language, language);
    assert.equal(createHash('sha256').update(JSON.stringify(i18n.getResourceBundle(language, 'translation'))).digest('hex'), expected[language]);
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
