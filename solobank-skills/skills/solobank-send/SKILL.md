---
name: solobank-send
description: >-
  Send SOL or USDC from the Solobank agent wallet to another Solana address.
  Use when the user asks to "pay someone", "transfer funds to a wallet",
  "send 10 USDC to <address>", "send money", or any peer-to-peer transfer.
  Do NOT use for paid API calls — those go through `solobank-pay` (MPP),
  not a raw transfer.
license: MIT
metadata:
  author: solobank
  version: "4.0.2"
  requires: Solobank CLI 4.0.x (npx -y @solobank/cli@latest init)
  tags: [solana, wallet, send, transfer, payment, solobank]
---

# Solobank: Send Tokens

## Purpose
Transfer SOL or USDC from the agent's wallet to any Solana address. Goes
through the safeguard layer (per-tx + daily limits), so the agent cannot
drain the wallet by accident.

## Command
```bash
solobank send <amount> <to> [--asset <SOL|USDC>]
```

`--asset` defaults to **USDC** if omitted.

## Examples
```bash
# Send 10 USDC (default asset)
solobank send 10 9pFr1xrmRkYDPjUFYmqUxNEVQ2vYtmpGN3JhvKf8B2kLx

# Same thing, explicit asset
solobank send 10 9pFr1xrmRkYDPjUFYmqUxNEVQ2vYtmpGN3JhvKf8B2kLx --asset USDC

# Send 0.5 SOL
solobank send 0.5 9pFr1xrmRkYDPjUFYmqUxNEVQ2vYtmpGN3JhvKf8B2kLx --asset SOL
```

## Pre-flight checks (run automatically)
1. Sufficient balance for the requested amount + network fee.
2. Recipient is a valid Solana base58 address (32-44 chars, on the curve).
3. `amount ≤ maxAmountPerTx` (safeguard).
4. `amount + spent_today ≤ maxDailySend` (rolling 24 h safeguard).
5. Wallet is not currently `solobank lock`-ed.

If any check fails the command aborts **before** broadcasting.

## Output
```
✓ Transfer sent
  Asset:     USDC
  Amount:    10
  To:        9pFr1xrmRkYDPjUFYmqUxNEVQ2vYtmpGN3JhvKf8B2kLx
  Signature: 3k1i2eiRwCnc49bh...
  Explorer:  https://solscan.io/tx/3k1i2eiRwCnc49bh...?cluster=devnet
```

## Error handling
- `Insufficient balance` — fund the wallet (devnet faucet) before retrying.
- `Invalid address` — recipient is not a valid Solana base58 pubkey.
- `Exceeds per-transaction limit` — bump `maxAmountPerTx` via
  `solobank config set maxAmountPerTx <value>` (only with explicit user
  consent — this is a safety guard).
- `Wallet is locked` — emergency lock is active, run `solobank unlock`
  to clear it.

## Notes
- The signature link uses the current cluster (`?cluster=devnet` on
  devnet, omitted on mainnet).
- For multiple recipients, call `solobank send` once per recipient — the
  CLI does not support batch sends today.
