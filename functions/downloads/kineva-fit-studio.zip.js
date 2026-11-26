export function onRequest() {
  return new Response(
    'Questo file si scarica dalla sezione Portale da scrivania, con il codice dell’app.',
    {
      status: 401,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'cache-control': 'no-store',
      },
    },
  );
}
