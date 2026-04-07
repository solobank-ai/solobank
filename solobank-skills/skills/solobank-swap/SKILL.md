---
name: solobank-swap
description: >-
  Swap one Solana token for another via the Jupiter aggregator. Use when the
  user asks to "swap SOL to USDC", "convert tokens", "exchange assets",
  "trade tokens", or get a swap quote. Jupiter aggregates 20 + Solana DEXs
  (Raydium, Orca, Whirlpool, Manifest, ...) and routes for best price.
license: MIT
metadata:
  author: solobank
  version: "4.0.2"
  requires: Solobank CLI 4.0.x (npx -y @solobank/cli@latest init)
  tags: [solana, swap, jupiter, dex, trading, solobank]
---

# Solobank: Swap Tokens

## Purpose
Exchange one Solana token for another via Jupiter, the leading DEX
aggregator on Solana. Always start with a quote, then execute.

## Commands
```bash
solobank swap-quote <amount> <from> <to> [--slippage-bps <bps>]
solobank swap        <amount> <from> <to> [--slippage-bps <bps>]
```

`<from>` and `<to>` accept either a known symbol (`SOL`, `USDC`, `USDT`,
`JUP`) or a raw SPL token mint pubkey.

`--slippage-bps` defaults to **50** (= 0.5 %).

## Recommended flow
1. `solobank swap-quote 1 SOL USDC` — preview the route + impact.
2. Show the quote to the user (or check it programmatically).
3. `solobank swap 1 SOL USDC` — only execute after the quote is OK.

## Examples
```bash
# Get a quote without executing (safe, read-only)
solobank swap-quote 1 SOL USDC

# Convert 100 USDC to SOL with default slippage (0.5 %)
solobank swap 100 USDC SOL

# Convert 0.5 SOL to USDC with 1 % slippage tolerance
solobank swap 0.5 SOL USDC --slippage-bps 100

# Swap to a token addressed by mint (e.g. Jupiter)
solobank swap 50 USDC JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN
```

## Output (real CLI 4.0.2)
```
$ solobank swap-quote 1 SOL USDC
Swap quote ready
From: 1 SOL
To: 79.110827 USDC
Price impact: 0.02%
Route: Whirlpool -> Manifest
```

```
$ solobank swap 1 SOL USDC
✓ Swapped 1 SOL → 79.11 USDC
  Price impact: 0.02 %
  Signature:    uj9VaWXry7F3xwB1...
  Explorer:     https://solscan.io/tx/uj9Va...?cluster=devnet
```

## Notes
- Quotes are live — re-run `swap-quote` immediately before `swap` if any
  noticeable time has passed.
- High price impact (> 1 %) on a small swap usually means low liquidity
  for the chosen pair on devnet. Mainnet typically has tighter pricing.
- The swap is gated by safeguards (`maxAmountPerTx` based on USD value
  of the input asset).
- Read-only `swap-quote` works even when the wallet is `solobank lock`-ed.
