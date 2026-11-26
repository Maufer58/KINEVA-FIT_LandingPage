import test from 'node:test';
import assert from 'node:assert/strict';
import {
  issueToken,
  verifyToken,
  planFromSubscriber,
  portalDenial,
  pilatesFromSubscriber,
  licenseFromPayload,
} from './_studio_token.js';

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

test('the signing secret is not a download code', async () => {
  const bad = await verifyToken(secret, secret, 1_700_000_000);
  assert.equal(bad.ok, false);
  assert.equal(bad.reason, 'invalid');
});

test('only annual trainer and studio plans get a code', () => {
  const now = Date.parse('2026-10-31T00:00:00Z');
  const later = '2026-12-01T00:00:00Z';
  const yearly = 'com.mauroferrari.FITPlus.studio.yearly';
  const proAnnual = 'com.mauroferrari.FITPlus.pro_trainer.annual';
  const proMonthly = 'com.mauroferrari.FITPlus.pro_trainer.monthly';
  const studioMonthly = 'com.mauroferrari.FITPlus.studio.monthly';
  assert.equal(planFromSubscriber({
    entitlements: { studio: { expires_date: later, period_type: 'normal', product_identifier: yearly } },
  }, now), 'studio');
  assert.equal(planFromSubscriber({
    entitlements: { proTrainer: { expires_date: later, period_type: 'normal', product_identifier: proAnnual } },
  }, now), 'pro');
  assert.equal(planFromSubscriber({
    entitlements: { proTrainer: { expires_date: later, period_type: 'normal', product_identifier: proMonthly } },
  }, now), null);
  assert.equal(portalDenial({
    entitlements: { proTrainer: { expires_date: later, period_type: 'normal', product_identifier: proMonthly } },
  }, now), 'monthly');
  assert.equal(planFromSubscriber({
    entitlements: { studio: { expires_date: later, period_type: 'normal', product_identifier: studioMonthly } },
  }, now), null);
  assert.equal(planFromSubscriber({
    entitlements: {
      studio: { expires_date: later, period_type: 'normal', product_identifier: studioMonthly },
      proTrainer: { expires_date: later, period_type: 'normal', product_identifier: proAnnual },
    },
  }, now), null);
  assert.equal(planFromSubscriber({
    entitlements: { studio: { expires_date: later, period_type: 'normal', product_identifier: 'com.mauroferrari.FITPlus.studio.annual' } },
  }, now), 'studio');
  assert.equal(planFromSubscriber({
    entitlements: { proTrainer: { expires_date: later, period_type: 'trial', product_identifier: proAnnual } },
  }, now), null);
  assert.equal(portalDenial({
    entitlements: { proTrainer: { expires_date: later, period_type: 'trial', product_identifier: proAnnual } },
  }, now), 'forbidden');
  assert.equal(portalDenial({
    entitlements: { proTrainer: { expires_date: later, period_type: 'trial', product_identifier: proMonthly } },
  }, now), 'monthly');
  assert.equal(planFromSubscriber({
    entitlements: { athletePro: { expires_date: later, period_type: 'normal', product_identifier: 'com.mauroferrari.FITPlus.athlete_pro.annual' } },
  }, now), null);
  assert.equal(planFromSubscriber({
    entitlements: {
      studio: { expires_date: later, period_type: 'trial', product_identifier: yearly },
      proTrainer: { expires_date: later, period_type: 'normal', product_identifier: proAnnual },
    },
  }, now), null);
});

test('the code records mobility and the pilates pack separately', async () => {
  const withPack = await issueToken(secret, 'pro', 1_700_000_000, true);
  const packed = await verifyToken(secret, withPack, 1_700_000_000);
  assert.deepEqual(licenseFromPayload(packed.payload), {
    plan: 'pro',
    mobility: true,
    pilates: true,
    expiresAt: 1_700_000_000 + (7 * 24 * 60 * 60),
  });
  const plainCode = await issueToken(secret, 'studio', 1_700_000_000, false);
  const plain = await verifyToken(secret, plainCode, 1_700_000_000);
  assert.equal(licenseFromPayload(plain.payload).pilates, false);
  assert.equal(licenseFromPayload(plain.payload).mobility, true);
  assert.equal(licenseFromPayload({ p: 'pro', e: 10 }).mobility, true);
  assert.equal(licenseFromPayload({ p: 'pro', e: 10 }).pilates, false);
});

test('pilates follows the pack entitlement, not the trainer plan', () => {
  const now = Date.parse('2026-10-31T00:00:00Z');
  const later = '2026-12-01T00:00:00Z';
  assert.equal(pilatesFromSubscriber({
    entitlements: {
      proTrainer: { expires_date: later, period_type: 'normal' },
    },
  }, now), false);
  assert.equal(pilatesFromSubscriber({
    entitlements: {
      proTrainer: { expires_date: later, period_type: 'normal' },
      pilates: { expires_date: null, period_type: 'normal' },
    },
  }, now), true);
  assert.equal(pilatesFromSubscriber({
    entitlements: {
      pilates: { expires_date: later, period_type: 'trial' },
    },
  }, now), false);
});
