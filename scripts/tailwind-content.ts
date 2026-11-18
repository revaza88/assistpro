import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

// Scan the full client import graph, including lazy routes and locales, instead
// of every old prototype and unused UI component left in the source directory.
export function clientContentFiles() {
  const root = process.cwd();
  const files = new Set<string>();
  const resolve = (specifier: string, importer: string) => {
    const base = specifier.startsWith('@/') ? path.resolve(root, 'client/src', specifier.slice(2))
      : specifier.startsWith('@shared/') ? path.resolve(root, 'src/shared', specifier.slice(8))
      : specifier.startsWith('.') ? path.resolve(path.dirname(importer), specifier) : null;
    if (!base) return;
    return [base, ...['.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx'].map(extension => base + extension)]
      .find(candidate => /\.[jt]sx?$/.test(candidate) && fs.existsSync(candidate));
  };
  const visit = (file: string) => {
    if (files.has(file)) return;
    files.add(file);
    const { importedFiles } = ts.preProcessFile(fs.readFileSync(file, 'utf8'), true, true);
    for (const imported of importedFiles) {
      const dependency = resolve(imported.fileName, file);
      if (dependency) visit(dependency);
    }
  };
  visit(path.resolve(root, 'client/src/main.tsx'));
  return [path.resolve(root, 'client/index.html'), ...[...files].sort()];
}
