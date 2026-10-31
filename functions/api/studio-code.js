import { planFromSubscriber, issueToken, STUDIO_CODE_TTL_SEC } from '../_studio_token.js';

const RC_API = 'https://api.revenuecat.com/v1';
const APP_USER_ID = /^[A-Za-z0-9_$.:@-]{1,200}$/;

function json(status, error, extra) {
  return new Response(JSON.stringify(extra ? { error, ...extra } : { error }), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

async function fetchSubscriber(appUserId, secret) {
  const res = await fetch(`${RC_API}/subscribers/${encodeURIComponent(appUserId)}`, {
    headers: {
      Authorization: `Bearer ${secret}`,
      Accept: 'application/json',
    },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('rc');
  const payload = await res.json();
  return payload?.subscriber || null;
}

export async function onRequestPost(context) {
  const signingKey = String(context.env.KINEVA_STUDIO_DOWNLOAD_CODE || '').trim();
  const rcKey = String(context.env.REVENUECAT_SECRET_API_KEY || '').trim();
  if (!signingKey || !rcKey) return json(503, 'unavailable');

  let appUserId = '';
  try {
    const body = await context.request.json();
    appUserId = String(body?.appUserId || '').trim();
  } catch {
    appUserId = '';
  }
  if (!APP_USER_ID.test(appUserId)) return json(400, 'invalid');

  let subscriber;
  try {
    subscriber = await fetchSubscriber(appUserId, rcKey);
  } catch {
    return json(503, 'unavailable');
  }
  if (!subscriber) return json(403, 'forbidden');
  const plan = planFromSubscriber(subscriber);
  if (!plan) return json(403, 'forbidden');

  const code = await issueToken(signingKey, plan);
  return new Response(JSON.stringify({
    code,
    expiresInDays: STUDIO_CODE_TTL_SEC / 86400,
  }), {
    status: 200,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}
