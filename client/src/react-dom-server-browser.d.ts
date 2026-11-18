// React 18 exposes the Web Streams renderer through this runtime subpath;
// its installed type definitions declare the API in react-dom/server.
declare module 'react-dom/server.browser' {
  export { renderToReadableStream } from 'react-dom/server';
}
