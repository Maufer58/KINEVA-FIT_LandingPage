const PREFIX = 'KF1';
const TTL_SEC = 7 * 24 * 60 * 60;

function bytesToB64Url(bytes) {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64UrlToBytes(text) {
  const pad = text.length % 4 === 0 ? '' : '='.repeat(4 - (text.length % 4));
  const b64 = text.replace(/-/g, '+').replace(/_/g, '/') + pad;
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
  return out;
}

function timingSafeEqual(a, b) {
  if (!(a instanceof Uint8Array) || !(b instanceof Uint8Array)) return false;
  if (a.length !== b.length || a.length === 0) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function hmac(secret, body) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, body);
  return new Uint8Array(sig);
}

export function isEntitlementActive(ent, nowMs) {
  if (!ent || typeof ent !== 'object') return false;
  const exp = ent.expires_date;
  if (exp == null || exp === '') return true;
  const ms = Date.parse(exp);
  return Number.isFinite(ms) && ms > nowMs;
}

function periodBlocksDownload(ent) {
  const period = String(ent.period_type || ent.periodType || '').toLowerCase();
  return period === 'trial' || period === 'intro';
}

/** Paid Piano Pro or Studio & Gym. Trial and Athlete Pro get nothing. */
export function planFromSubscriber(subscriber, nowMs = Date.now()) {
  const ents = subscriber?.entitlements || {};
  for (const [key, plan] of [['studio', 'studio'], ['proTrainer', 'pro']]) {
    const ent = ents[key];
    if (!isEntitlementActive(ent, nowMs)) continue;
    if (periodBlocksDownload(ent)) return null;
    return plan;
  }
  return null;
}

export async function issueToken(secret, plan, nowSec = Math.floor(Date.now() / 1000)) {
  const payload = {
    v: 1,
    p: plan,
    e: nowSec + TTL_SEC,
    n: bytesToB64Url(crypto.getRandomValues(new Uint8Array(9))),
  };
  const body = new TextEncoder().encode(JSON.stringify(payload));
  const sig = await hmac(secret, body);
  return `${PREFIX}.${bytesToB64Url(body)}.${bytesToB64Url(sig)}`;
}

export async function verifyToken(secret, token, nowSec = Math.floor(Date.now() / 1000)) {
  const parts = String(token || '').split('.');
  if (parts.length !== 3 || parts[0] !== PREFIX) return { ok: false, reason: 'invalid' };
  let body;
  let sig;
  try {
    body = b64UrlToBytes(parts[1]);
    sig = b64UrlToBytes(parts[2]);
  } catch {
    return { ok: false, reason: 'invalid' };
  }
  const expected = await hmac(secret, body);
  if (!timingSafeEqual(sig, expected)) return { ok: false, reason: 'invalid' };
  let payload;
  try {
    payload = JSON.parse(new TextDecoder().decode(body));
  } catch {
    return { ok: false, reason: 'invalid' };
  }
  if (payload.v !== 1 || (payload.p !== 'pro' && payload.p !== 'studio')) {
    return { ok: false, reason: 'invalid' };
  }
  if (typeof payload.e !== 'number' || payload.e < nowSec) {
    return { ok: false, reason: 'expired' };
  }
  return { ok: true, payload };
}

export const STUDIO_CODE_TTL_SEC = TTL_SEC;
