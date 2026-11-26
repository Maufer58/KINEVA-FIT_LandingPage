import { licenseFromPayload, verifyToken } from '../_studio_token.js';

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

export async function onRequestPost(context) {
  const expected = String(context.env.KINEVA_STUDIO_DOWNLOAD_CODE || '').trim();
  if (!expected) return json(503, { error: 'unavailable' });

  let code = '';
  try {
    const body = await context.request.json();
    code = String(body?.code || '').trim();
  } catch {
    code = '';
  }
  const token = await verifyToken(expected, code);
  if (!token.ok || (token.payload.p !== 'pro' && token.payload.p !== 'studio')) {
    return json(401, { error: token.reason === 'expired' ? 'expired' : 'invalid' });
  }
  return json(200, licenseFromPayload(token.payload));
}
