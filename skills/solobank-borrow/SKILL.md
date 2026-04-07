---
name: solobank-borrow
description: >-
  Borrow USDC or SOL against supplied collateral on a Solana lending protocol
  (Kamino or Marginfi). Use when the user asks to "borrow USDC", "take a
  loan", "draw credit", "leverage", or "borrow against my deposits".
  Requires an existing supply position (run `solobank-save` first).
license: MIT
metadata:
  author: solobank
  version: "4.0.2"
  requires: Solobank CLI 4.0.x (npx -y @solobank/cli@latest init)
  tags: [solana, defi, lending, kamino, marginfi, borrow, credit, solobank]
---

# Solobank: Borrow

## Purpose
Borrow USDC or SOL against assets the agent has already supplied to
Kamino or Marginfi. The protocol enforces a health factor — the agent
will be liquidated if it drops below 1.0.

## Command
```bash
solobank borrow <amount> <asset> [options]
```

| Option | Description |
|---|---|
| `--protocol auto\|kamino\|marginfi` | Which protocol to borrow from. Defaults to `auto`. |
| `--market <address>` | Target Kamino market (overrides `--protocol`). |
| `--bank <address>` | Target Marginfi bank. |
| `--reserve <address>` | Target Kamino reserve. |

## Examples
```bash
# Borrow 40 USDC, auto-route
solobank borrow 40 USDC

# Force Marginfi
solobank borrow 0.1 SOL --protocol marginfi

# Borrow against a specific Kamino market
solobank borrow 100 USDC --market 45FNL6...Uztc98
```

## Pre-flight checks
1. Existing supply position with enough collateral value.
2. Resulting health factor stays above the protocol's liquidation
   threshold.
3. Amount within safeguard limits (`maxAmountPerTx`, `maxDailySend`).

## Output
```
✓ Borrowed 40 USDC from Kamino
  Market:        45FNL6...Uztc98
  Borrow APR:    12.5 %
  Health factor: 2.15
  Signature:     csaQC2HN69e3pei6...
```

## Notes
- Must supply collateral first (`solobank lend`).
- Interest accrues continuously — repay with `solobank repay`.
- Track health factor in the protocol UI; below 1.0 means liquidation.
- Borrowed funds land in the agent's wallet and count against any
  daily-spend safeguard if you immediately move them.
