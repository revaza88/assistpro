import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const directory = path.resolve(process.argv[2] ?? '../lighthouse-reports');
const rows = [];
for (const file of (await readdir(directory)).filter(name => name.endsWith('.report.json')).sort()) {
  const report = JSON.parse(await readFile(path.join(directory, file), 'utf8'));
  const categoryData = report.categories ?? {};
  const audits = report.audits ?? {};
  const categories = ['performance', 'accessibility', 'best-practices', 'seo'];
  const scores = Object.fromEntries(categories.map(key => [key, categoryData[key]?.score == null ? null : Math.round(categoryData[key].score * 100)]));
  const findings = Object.fromEntries(categories.map(key => [key, categoryData[key]?.auditRefs
    .filter(ref => ref.weight > 0 && audits[ref.id]?.score === 0)
    .map(ref => ({ id: ref.id, title: audits[ref.id].title })) ?? []]));
  rows.push({ file, url: report.requestedUrl, fetchTime: report.fetchTime, version: report.lighthouseVersion,
    mode: report.configSettings.formFactor, throttling: report.configSettings.throttling,
    scores, fcpMs: audits['first-contentful-paint']?.numericValue ?? null,
    lcpMs: audits['largest-contentful-paint']?.numericValue ?? null,
    tbtMs: audits['total-blocking-time']?.numericValue ?? null,
    cls: audits['cumulative-layout-shift']?.numericValue ?? null,
    runtimeError: report.runtimeError ?? null, warnings: report.runWarnings, findings });
}
await writeFile(path.join(directory, 'summary.json'), JSON.stringify(rows, null, 2));
console.log(JSON.stringify(rows, null, 2));
