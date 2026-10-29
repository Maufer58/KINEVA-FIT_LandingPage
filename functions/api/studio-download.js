function sameSecret(given, expected) {
  const enc = new TextEncoder();
  const a = enc.encode(given);
  const b = enc.encode(expected);
  if (a.length !== b.length || a.length === 0) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a[i] ^ b[i];
  return diff === 0;
}

function json(status, error) {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

export async function onRequestPost(context) {
  const expected = String(context.env.KINEVA_STUDIO_DOWNLOAD_CODE || '').trim();
  if (!expected) return json(503, 'unavailable');

  let code = '';
  try {
    const body = await context.request.json();
    code = String(body?.code || '').trim();
  } catch {
    code = '';
  }
  if (!sameSecret(code, expected)) return json(401, 'invalid');

  const assetUrl = new URL('/downloads/kineva-fit-studio.zip', context.request.url);
  const asset = await context.env.ASSETS.fetch(new Request(assetUrl, { method: 'GET' }));
  if (!asset.ok) return json(404, 'missing');

  const headers = new Headers();
  headers.set('content-type', 'application/zip');
  headers.set('content-disposition', 'attachment; filename="KINEVA-FIT-Studio.zip"');
  headers.set('cache-control', 'private, no-store');
  const length = asset.headers.get('content-length');
  if (length) headers.set('content-length', length);
  return new Response(asset.body, { status: 200, headers });
}
