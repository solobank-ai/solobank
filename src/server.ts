import { Method, Receipt } from 'mppx';
import { Connection, PublicKey, clusterApiUrl, type Cluster, type Finality } from '@solana/web3.js';
import { solanaCharge } from './method.js';
import {
  SOLANA_USDC_MINT,
  USDC_DECIMALS,
  parseAmountToRaw,
  sumReceivedTokenAmount,
} from './utils.js';

export { solanaCharge } from './method.js';
export { SOLANA_USDC_MINT, USDC_DECIMALS } from './utils.js';

export interface SolanaServerOptions {
  currency?: string;
  recipient: string;
  rpcUrl?: string;
  network?: Cluster;
  commitment?: Finality;
  /** Atomic check-and-mark: return true if reference is NEW (first use). Must be atomic (e.g. Redis SETNX). */
  tryConsumeReference?: (reference: string) => Promise<boolean>;
  /** @deprecated Use tryConsumeReference for atomic replay protection */
  isReferenceConsumed?: (reference: string) => Promise<boolean>;
  /** @deprecated Use tryConsumeReference for atomic replay protection */
  markReferenceConsumed?: (reference: string) => Promise<void>;
}

export function solana(options: SolanaServerOptions) {
  const network = options.network ?? 'mainnet-beta';
  const commitment = options.commitment ?? 'finalized';
  const connection = new Connection(
    options.rpcUrl ?? clusterApiUrl(network),
    commitment,
  );
  const recipient = new PublicKey(options.recipient).toBase58();
  const currency = options.currency ?? SOLANA_USDC_MINT;

  if (!options.tryConsumeReference && !options.isReferenceConsumed) {
    console.warn('[mpp-solana] WARNING: No replay protection configured. Signatures can be reused!');
  }

  return Method.toServer(solanaCharge, {
    defaults: {
      currency,
      recipient,
    },

    async verify({ credential }) {
      const signature = credential.payload.signature;

      // Validate signature format
      if (!/^[1-9A-HJ-NP-Za-km-z]{64,88}$/.test(signature)) {
        throw new Error('Invalid signature format');
      }

      // 1. Verify on-chain FIRST (before consuming reference)
      let tx: Awaited<ReturnType<typeof connection.getParsedTransaction>> | null = null;
      for (let attempt = 0; attempt < 5; attempt += 1) {
        tx = await connection.getParsedTransaction(signature, {
          commitment,
          maxSupportedTransactionVersion: 0,
        });

        if (tx) break;

        if (attempt === 4) {
          throw new Error('Transaction not found');
        }

        await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
      }

      if (!tx?.meta) {
        throw new Error('Transaction not found');
      }

      if (tx.meta.err) {
        throw new Error('Transaction failed on-chain');
      }

      const transferredRaw = sumReceivedTokenAmount(
        tx.meta.preTokenBalances,
        tx.meta.postTokenBalances,
        currency,
        recipient,
      );

      if (transferredRaw <= 0n) {
        throw new Error('Payment not found in transaction token balances');
      }

      const requestedRaw = parseAmountToRaw(credential.challenge.request.amount, USDC_DECIMALS);
      if (requestedRaw <= 0n) {
        throw new Error('Invalid requested amount');
      }
      if (transferredRaw < requestedRaw) {
        throw new Error(
          `Transferred ${transferredRaw} < requested ${requestedRaw} (raw units)`,
        );
      }

      // 2. Replay protection AFTER successful verification
      if (options.tryConsumeReference) {
        const isNew = await options.tryConsumeReference(signature);
        if (!isNew) {
          throw new Error('Payment reference already used');
        }
      } else {
        // Legacy: separate check + mark (not atomic, kept for backwards compat)
        if (await options.isReferenceConsumed?.(signature)) {
          throw new Error('Payment reference already used');
        }
        await options.markReferenceConsumed?.(signature);
      }

      return Receipt.from({
        method: 'solana',
        reference: signature,
        status: 'success',
        timestamp: new Date().toISOString(),
      });
    },
  });
}
