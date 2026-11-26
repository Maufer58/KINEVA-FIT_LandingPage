export function onRequest() {
  return new Response('File non disponibile.', {
    status: 410,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}
