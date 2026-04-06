# @solobank/mpp-solana

Solana USDC payment method for the [Machine Payments Protocol (MPP)](https://mpp.dev). Client and server implementations built on `@solana/kit` v2 with SPL Token transfers.

[![npm](https://img.shields.io/npm/v/@solobank/mpp-solana)](https://www.npmjs.com/package/@solobank/mpp-solana)
[![CI](https://github.com/solobank-ai/mpp-solana/actions/workflows/ci.yml/badge.svg)](https://github.com/solobank-ai/mpp-solana/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Note**: This is the standalone version. The MPP Solana payment method is also bundled into [`@solobank/sdk`](https://github.com/solobank-ai/package).

## Install

```bash
npm install @solobank/mpp-solana mppx @solana/kit
```

## Accept Payments (Server)

```ts
import { Mppx } from 'mppx';
import { solanaServer, SOLANA_USDC_MINT } from '@solobank/mpp-solana';

const mppx = Mppx.create({
  methods: [
    solanaServer({
      currency: SOLANA_USDC_MINT,
      recipient: 'YOUR_SOLANA_WALLET',
      rpcUrl: 'https://mainnet.helius-rpc.com/?api-key=YOUR_KEY',
    }),
  ],
});
```

The server verifies Solana signatures via RPC using instruction-level checks and token balance deltas.

## Make Payments (Client)

```ts
import { createKeyPairSignerFromBytes } from '@solana/kit';
import { Mppx } from 'mppx/client';
import { solanaClient } from '@solobank/mpp-solana';

const signer = await createKeyPairSignerFromBytes(secretKeyBytes);

const mppx = Mppx.create({
  methods: [
    solanaClient({
      rpcUrl: 'https://mainnet.helius-rpc.com/?api-key=YOUR_KEY',
      signer,
    }),
  ],
});
```

The client loads SPL token accounts, builds `transferChecked` instructions, creates the recipient ATA if needed, signs and broadcasts, then returns the Solana signature as the MPP credential.

## Exports

```ts
// Client
import { solanaClient } from '@solobank/mpp-solana';
import { solanaClient } from '@solobank/mpp-solana/client';

// Server
import { solanaServer } from '@solobank/mpp-solana/server';

// Utilities
import {
  SOLANA_USDC_MINT,
  USDC_DECIMALS,
  parseAmountToRaw,
  fetchTokenAccounts,
  buildTransferPlan,
} from '@solobank/mpp-solana';
```

## Development

```bash
pnpm install
pnpm build            # Build ESM + CJS + types
pnpm typecheck        # Type checking
pnpm test             # 22 unit tests
```

## Tech Stack

- **Solana**: `@solana/kit` v2 (RPC, transactions, signing)
- **SPL Token**: `@solana-program/token` (transferChecked, ATA)
- **MPP**: `mppx` protocol framework
- **RPC**: Helius
- **Build**: tsup (ESM + CJS)
- **Testing**: Vitest

## Related Repos

- [solobank-ai/package](https://github.com/solobank-ai/package) -- SDK + MCP + CLI (includes this library)
- [solobank-ai/backend](https://github.com/solobank-ai/backend) -- MPP payment gateway
- [mppx](https://github.com/nichochar/mppx) -- MPP protocol framework

## License

MIT
