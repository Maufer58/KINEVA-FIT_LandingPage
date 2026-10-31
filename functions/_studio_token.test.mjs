import test from 'node:test';
import assert from 'node:assert/strict';
import { issueToken, verifyToken, planFromSubscriber } from './_studio_token.js';

const secret = 'test-signing-key';

test('a signed code verifies and a changed code does not', async () => {
  const code = await issueToken(secret, 'studio', 1_700_000_000);
  const ok = await verifyToken(secret, code, 1_700_000_000);
  assert.equal(ok.ok, true);
  assert.equal(ok.payload.p, 'studio');
  const broken = `${code.slice(0, -2)}aa`;
  const bad = await verifyToken(secret, broken, 1_700_000_000);
  assert.equal(bad.ok, false);
  assert.equal(bad.reason, 'invalid');
});

test('an old code is expired', async () => {
  const code = await issueToken(secret, 'pro', 1_700_000_000);
  const late = await verifyToken(secret, code, 1_700_000_000 + (8 * 24 * 60 * 60));
  assert.equal(late.ok, false);
  assert.equal(late.reason, 'expired');
});

test('only paid trainer and studio plans get a code', () => {
  const now = Date.parse('2026-10-31T00:00:00Z');
  const later = '2026-12-01T00:00:00Z';
  assert.equal(planFromSubscriber({
    entitlements: { studio: { expires_date: later, period_type: 'normal' } },
  }, now), 'studio');
  assert.equal(planFromSubscriber({
    entitlements: { proTrainer: { expires_date: later, period_type: 'normal' } },
  }, now), 'pro');
  assert.equal(planFromSubscriber({
    entitlements: { proTrainer: { expires_date: later, period_type: 'trial' } },
  }, now), null);
  assert.equal(planFromSubscriber({
    entitlements: { athletePro: { expires_date: later, period_type: 'normal' } },
  }, now), null);
  assert.equal(planFromSubscriber({
    entitlements: {
      studio: { expires_date: later, period_type: 'trial' },
      proTrainer: { expires_date: later, period_type: 'normal' },
    },
  }, now), null);
});
