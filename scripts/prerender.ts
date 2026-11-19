import { createServer } from 'vite';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { localizedPublicPaths, prerenderPaths } from '../src/shared/seo';
import { prerenderFile } from '../src/shared/localization';
import { brandSlogan } from '../client/src/lib/company';

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { render } = await vite.ssrLoadModule('/src/entry-prerender.tsx');
  const folder = path.resolve('dist/prerender');
  await mkdir(folder, { recursive: true });
  for (const route of prerenderPaths) {
    const html: string = await render(route);
    if (!html.includes('<h1') || !html.includes('main-content')) throw new Error(`Prerender missing page content: ${route}`);
    if (html.includes('\u0000') || !html.includes(`<p lang="ka">${brandSlogan}</p>`)) throw new Error(`Prerender corrupted or missing brand text: ${route}`);
    await writeFile(path.join(folder, prerenderFile(route)), html);
  }
  const template = await readFile('dist/public/index.html', 'utf8');
  if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) throw new Error('Missing HTML template markers');
  console.log(`Prerendered ${localizedPublicPaths.length} localized pages and 3 localized 404s with actual React content.`);
} finally { await vite.close(); }
