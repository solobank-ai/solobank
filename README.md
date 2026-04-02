# @solobank/mpp-solana

Solana USDC payment method for the [Machine Payments Protocol (MPP)](https://mpp.dev), built on `@solana/kit` v2 with SPL Token transfers.

[![CI](https://github.com/decentrathon/mpp-solana/actions/workflows/ci.yml/badge.svg)](https://github.com/decentrathon/mpp-solana/actions/workflows/ci.yml)

## Installation

```bash
pnpm add @solobank/mpp-solana mppx @solana/kit
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
    }),
  ],
});
```

The server verifies submitted Solana signatures against RPC using instruction-level checks and token balance deltas.

## Make Payments (Client)

```ts
import { createKeyPairSignerFromBytes } from '@solana/kit';
import { Mppx } from 'mppx/client';
import { solanaClient } from '@solobank/mpp-solana';

const signer = await createKeyPairSignerFromBytes(secretKeyBytes);

const mppx = Mppx.create({
  methods: [
    solanaClient({
      rpcUrl: 'https://api.mainnet-beta.solana.com',
      signer,
    }),
  ],
});
```

The client:

- Loads all SPL token accounts for the requested mint
- Builds one or more `transferChecked` instructions via `@solana-program/token`
- Creates the recipient ATA idempotently if needed
- Signs, validates size, and broadcasts the transaction
- Returns the Solana signature as the MPP credential

## Exports

```ts
// Client
import { solanaClient } from '@solobank/mpp-solana';
// or
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
pnpm typecheck    # Type checking
pnpm test         # 22 unit tests
pnpm build        # Build ESM + CJS + types
```

## Tech Stack

- `@solana/kit` v2 — RPC, transaction building, signing
- `@solana-program/token` — SPL token instructions (transferChecked, ATA)
- `mppx` — MPP protocol framework
- `vitest` — Testing
- `tsup` — Build (ESM + CJS)

## License

MIT
