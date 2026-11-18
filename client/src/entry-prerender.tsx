import { renderToReadableStream } from 'react-dom/server.browser';
import { Router } from 'wouter';
import App from './App';
import './lib/i18n';

export async function render(path: string): Promise<string> {
  let failure: unknown;
  // The Web Streams renderer encodes complete UTF-8 chunks. React 18's Node
  // development renderer can pad partially filled string buffers with NUL bytes.
  const stream = await renderToReadableStream(<Router ssrPath={path}><App /></Router>, {
    onError(error) { failure = error; },
  });
  await stream.allReady;
  if (failure) throw failure;
  return new Response(stream).text();
}
