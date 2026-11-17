import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { Router } from 'wouter';
import App from './App';
import './lib/i18n';

export function render(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    const output = new PassThrough();
    output.on('data', chunk => chunks.push(Buffer.from(chunk)));
    output.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    output.on('error', reject);
    const stream = renderToPipeableStream(<Router ssrPath={path}><App /></Router>, {
      onAllReady() { stream.pipe(output); }, onError: reject,
    });
  });
}
