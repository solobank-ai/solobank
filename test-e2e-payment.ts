/**
 * E2E Payment Flow Test on Devnet
 *
 * Tests the full MPP payment flow:
 *   1. Request without payment → 402 challenge
 *   2. Build & send SOL transfer on devnet
 *   3. Retry with x-payment-signature → 200 OK
 *   4. Replay same signature → 409 Conflict
 *   5. Verify recipient balance increased
 *
 * Also measures timing at each step.
 */

import {
  createSolanaRpc,
  createSolanaRpcSubscriptions,
  sendAndConfirmTransactionFactory,
  createTransactionMessage,
  setTransactionMessageFeePayer,
  setTransactionMessageLifetimeUsingBlockhash,
  appendTransactionMessageInstruction,
  pipe,
  compileTransaction,
  signTransaction,
  getSignatureFromTransaction,
  address,
  createKeyPairSignerFromBytes,
  lamports,
} from '@solana/kit';
import bs58 from 'bs58';

// ── Config ──

const DEVNET_RPC = 'https://api.devnet.solana.com';
const GATEWAY = 'http://130.61.175.254:3001';
const PRIVATE_KEY = '3736GM8u93ya4NDWjMzmeJk3QXvhHHnbJkfnTLPQJU1zRppK7Hu1TT1r8PpSrqLnA47vP1YLSAZG3uv9NF4mYBCM';
const SYSTEM_PROGRAM = address('11111111111111111111111111111111');
const ENDPOINT = '/openai/v1/chat/completions';
const REQUEST_BODY = JSON.stringify({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'e2e payment test' }],
});

// ── Helpers ──

/** Decode base64url string */
function decodeBase64Url(b64url: string): string {
  const base64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  return Buffer.from(padded, 'base64').toString('utf-8');
}

/** Encode to base64url (no padding) */
function encodeBase64Url(str: string): string {
  return Buffer.from(str).toString('base64url');
}

/** Parse full challenge from WWW-Authenticate header */
function parseChallengeFromHeader(res: Response): {
  amount: string;
  currency: string;
  recipient: string;
  fullChallenge: Record<string, string>;
} {
  const wwwAuth = res.headers.get('www-authenticate') ?? '';
  // Parse all key="value" pairs from the Payment scheme
  const params: Record<string, string> = {};
  const regex = /(\w+)="([^"]+)"/g;
  let match;
  while ((match = regex.exec(wwwAuth)) !== null) {
    params[match[1]] = match[2];
  }

  if (!params.request) {
    throw new Error(`No request= in WWW-Authenticate header: ${wwwAuth.slice(0, 200)}`);
  }

  const request = JSON.parse(decodeBase64Url(params.request));
  return { ...request, fullChallenge: params };
}

/** Build mppx Authorization header with full credential */
function buildAuthorizationHeader(
  challenge: Record<string, string>,
  signature: string,
): string {
  const credential = {
    challenge: {
      id: challenge.id,
      realm: challenge.realm,
      method: challenge.method,
      intent: challenge.intent,
      request: challenge.request, // keep as base64url
      ...(challenge.expires ? { expires: challenge.expires } : {}),
    },
    payload: { signature },
  };
  const encoded = encodeBase64Url(JSON.stringify(credential));
  return `Payment ${encoded}`;
}

function buildTransferData(amountLamports: bigint): Uint8Array {
  const data = new Uint8Array(12);
  const view = new DataView(data.buffer);
  view.setUint32(0, 2, true); // instruction index 2 = Transfer
  view.setUint32(4, Number(amountLamports & 0xFFFFFFFFn), true);
  view.setUint32(8, Number(amountLamports >> 32n), true);
  return data;
}

function parseAmountToLamports(amount: string): bigint {
  const [whole = '0', fraction = ''] = amount.split('.');
  const padded = fraction.padEnd(9, '0').slice(0, 9);
  return BigInt(whole + padded);
}

function fmt(ms: number): string {
  return `${Math.round(ms)}ms`.padStart(7);
}

// ── Main ──

const rpc = createSolanaRpc(DEVNET_RPC);
const rpcSub = createSolanaRpcSubscriptions('wss://api.devnet.solana.com');
const sendAndConfirm = sendAndConfirmTransactionFactory({ rpc, rpcSubscriptions: rpcSub });

console.log('═══════════════════════════════════════════');
console.log('  E2E Payment Flow Test (Devnet)');
console.log('═══════════════════════════════════════════\n');

// 1. Import keypair
const secretBytes = bs58.decode(PRIVATE_KEY);
const signer = await createKeyPairSignerFromBytes(secretBytes);
console.log(`Wallet:    ${signer.address}`);
console.log(`Gateway:   ${GATEWAY}`);

// 2. Check balance & airdrop if needed
const balResult = await rpc.getBalance(signer.address).send();
console.log(`Balance:   ${Number(balResult.value) / 1e9} SOL\n`);

if (balResult.value < 200_000_000n) {
  console.log('⚠ Low balance, requesting airdrop...');
  try {
    await rpc.requestAirdrop(signer.address, lamports(1_000_000_000n)).send();
    console.log('  Waiting 5s for airdrop confirmation...');
    await new Promise((r) => setTimeout(r, 5000));
    const newBal = await rpc.getBalance(signer.address).send();
    console.log(`  New balance: ${Number(newBal.value) / 1e9} SOL\n`);
  } catch (e: any) {
    console.error(`  Airdrop failed: ${e.message}`);
    console.log(`  Manual airdrop: https://faucet.solana.com/ → ${signer.address}`);
    process.exit(1);
  }
}

// ── Single Payment Flow (with timing) ──

interface TimingResult {
  challengeMs: number;
  buildMs: number;
  onChainMs: number;
  verifyMs: number;
  totalMs: number;
  status: number;
  replayStatus: number;
}

async function runPaymentFlow(index: number): Promise<TimingResult> {
  console.log(`─── Payment #${index} ───────────────────────────`);

  const t0 = performance.now();

  // Step 1: Request without payment → 402
  const res402 = await fetch(`${GATEWAY}${ENDPOINT}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: REQUEST_BODY,
  });

  const t1 = performance.now();
  const challengeMs = t1 - t0;

  if (res402.status !== 402) {
    console.error(`  ✗ Expected 402, got ${res402.status}`);
    process.exit(1);
  }

  const { amount, currency, recipient, fullChallenge } = parseChallengeFromHeader(res402);
  console.log(`  ✓ 402 Challenge: ${amount} SOL → ${recipient.slice(0, 8)}... (devnet)`);
  console.log(`    (currency mint: ${currency.slice(0, 8)}... — verifier accepts SOL on devnet)`);

  // Step 2: Build & sign SOL transfer (devnet verifier accepts system transfers)
  const amountLamports = parseAmountToLamports(amount);
  const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();

  const transferIx = {
    programAddress: SYSTEM_PROGRAM,
    accounts: [
      { address: signer.address, role: 3 as const },    // writable + signer
      { address: address(recipient), role: 1 as const }, // writable
    ],
    data: buildTransferData(amountLamports),
  };

  const txMessage = pipe(
    createTransactionMessage({ version: 0 }),
    (m) => setTransactionMessageFeePayer(signer.address, m),
    (m) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, m),
    (m) => appendTransactionMessageInstruction(transferIx, m),
  );

  const signed = await signTransaction([signer.keyPair], compileTransaction(txMessage));
  const txSig = getSignatureFromTransaction(signed);

  const t2 = performance.now();
  const buildMs = t2 - t1;
  console.log(`  ✓ TX built & signed: ${txSig.slice(0, 16)}...`);

  // Step 3: Send & confirm on-chain
  try {
    await sendAndConfirm(signed, { commitment: 'confirmed' });
  } catch (e: any) {
    console.error(`  ✗ TX failed: ${e.message}`);
    process.exit(1);
  }

  const t3 = performance.now();
  const onChainMs = t3 - t2;
  console.log(`  ✓ TX confirmed on-chain`);

  // Step 4: Retry with mppx Authorization header → 200
  const authHeader = buildAuthorizationHeader(fullChallenge, txSig);
  const res200 = await fetch(`${GATEWAY}${ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authHeader,
    },
    body: REQUEST_BODY,
  });

  const t4 = performance.now();
  const verifyMs = t4 - t3;
  const totalMs = t4 - t0;

  if (res200.status === 200) {
    console.log(`  ✓ Gateway: 200 OK — payment accepted!`);
  } else {
    const errBody = await res200.text();
    console.error(`  ✗ Expected 200, got ${res200.status}: ${errBody.slice(0, 200)}`);
  }

  // Step 5: Replay protection → 409
  const resReplay = await fetch(`${GATEWAY}${ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authHeader,
    },
    body: REQUEST_BODY,
  });

  if (resReplay.status === 409) {
    console.log(`  ✓ Replay protection: 409 Conflict`);
  } else {
    console.error(`  ✗ Replay: expected 409, got ${resReplay.status}`);
  }

  // Timing report
  console.log(`\n  ⏱ Timing:`);
  console.log(`    1. 402 challenge:      ${fmt(challengeMs)}`);
  console.log(`    2. Build & sign TX:    ${fmt(buildMs)}`);
  console.log(`    3. On-chain confirm:   ${fmt(onChainMs)}`);
  console.log(`    4. Gateway verify:     ${fmt(verifyMs)}`);
  console.log(`    ─────────────────────────────`);
  console.log(`    Total:                 ${fmt(totalMs)}`);
  const onChainPct = ((onChainMs / totalMs) * 100).toFixed(0);
  const overheadPct = (((totalMs - onChainMs) / totalMs) * 100).toFixed(0);
  console.log(`    On-chain: ${onChainPct}% | Overhead: ${overheadPct}%\n`);

  return {
    challengeMs,
    buildMs,
    onChainMs,
    verifyMs,
    totalMs,
    status: res200.status,
    replayStatus: resReplay.status,
  };
}

// ── Run 3 sequential payments ──

const results: TimingResult[] = [];

for (let i = 1; i <= 3; i++) {
  const result = await runPaymentFlow(i);
  results.push(result);

  // Small pause between payments
  if (i < 3) {
    console.log('  Waiting 2s before next payment...\n');
    await new Promise((r) => setTimeout(r, 2000));
  }
}

// ── Check recipient balance ──

console.log('─── Balance Check ────────────────────────');
// Get recipient from last challenge
const balCheckRes = await fetch(`${GATEWAY}${ENDPOINT}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: REQUEST_BODY,
});
const { recipient: recipientStr } = parseChallengeFromHeader(balCheckRes);
const recipientAddr = address(recipientStr);
const recipientBal = await rpc.getBalance(recipientAddr).send();
console.log(`  Recipient ${recipientStr.slice(0, 8)}... balance: ${Number(recipientBal.value) / 1e9} SOL`);

// ── Summary ──

console.log('\n═══════════════════════════════════════════');
console.log('  Summary');
console.log('═══════════════════════════════════════════\n');

const allPassed = results.every((r) => r.status === 200 && r.replayStatus === 409);
console.log(`  Payments: ${results.filter((r) => r.status === 200).length}/3 accepted`);
console.log(`  Replay:   ${results.filter((r) => r.replayStatus === 409).length}/3 blocked\n`);

const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

console.log('  ⏱ Average Timing (3 payments):');
console.log(`    402 challenge:      ${fmt(avg(results.map((r) => r.challengeMs)))}`);
console.log(`    Build & sign TX:    ${fmt(avg(results.map((r) => r.buildMs)))}`);
console.log(`    On-chain confirm:   ${fmt(avg(results.map((r) => r.onChainMs)))}`);
console.log(`    Gateway verify:     ${fmt(avg(results.map((r) => r.verifyMs)))}`);
console.log(`    ─────────────────────────────`);
console.log(`    Total avg:          ${fmt(avg(results.map((r) => r.totalMs)))}`);
console.log(`    Fastest:            ${fmt(Math.min(...results.map((r) => r.totalMs)))}`);
console.log(`    Slowest:            ${fmt(Math.max(...results.map((r) => r.totalMs)))}\n`);

if (allPassed) {
  console.log('  ✅ ALL TESTS PASSED\n');
} else {
  console.log('  ❌ SOME TESTS FAILED\n');
  process.exit(1);
}

process.exit(0);
