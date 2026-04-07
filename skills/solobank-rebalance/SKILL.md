---
name: solobank-rebalance
description: >-
  Move a supply position from one Solana lending protocol to another that
  offers a better APY. Use when the user asks to "rebalance", "optimise
  yield", "move to better APY", "switch lending protocol", or "rotate the
  position". Compares Kamino and Marginfi automatically.
license: MIT
metadata:
  author: solobank
  version: "4.0.2"
  requires: Solobank CLI 4.0.x (npx -y @solobank/cli@latest init)
  tags: [solana, defi, lending, kamino, marginfi, rebalance, yield, solobank]
---

# Solobank: Rebalance Yield

## Purpose
Withdraw a supply position from one lending venue and re-deposit it on
another that pays a higher APY. Two on-chain steps in one CLI call.

## Command
```bash
solobank rebalance <amount> <asset> [options]
```

| Option | Description |
|---|---|
| `--protocol auto\|kamino\|marginfi` | Source protocol (where the funds are supplied today). Defaults to `auto`. |
| `--target-protocol auto\|kamino\|marginfi` | Destination protocol. Defaults to `auto` (highest APY). |
| `--market <address>` | Source Kamino market. |
| `--bank <address>` | Source Marginfi bank. |
| `--reserve <address>` | Source Kamino reserve. |
| `--min-apy-delta <pct>` | Refuse to rebalance unless the destination's APY is this many percentage points higher than the source. Recommended ≥ 0.5. |

## Recommended flow
1. `solobank lend-rates USDC` — confirm the APY gap is real.
2. `solobank rebalance 100 USDC --min-apy-delta 0.5` — move only if the
   gap clears the threshold.

## Examples
```bash
# Auto-detect both ends, only move on > 0.5 % improvement
solobank rebalance 100 USDC --min-apy-delta 0.5

# Force a Marginfi → Kamino move
solobank rebalance 100 USDC --protocol marginfi --target-protocol kamino
```

## Output
```
✓ Rebalanced 100 USDC: Marginfi (7.05%) → Kamino (8.21%)
  APY delta:    +1.16 %
  Extra yield:  ~$0.003 / day
  Withdraw sig: LborpWqqCS7aGJES...
  Deposit sig:  3jkPzbX9NF2vfqGe...
```

## Notes
- The two on-chain transactions happen in the same CLI call but are
  **not atomic** — if the second step fails the funds end up free in
  the wallet. Re-run `solobank lend` to redeploy.
- The `--min-apy-delta` guard prevents wasted gas on tiny improvements.
- Will not rebalance if the source has zero supply.
