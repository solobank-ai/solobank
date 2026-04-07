---
name: solobank-repay
description: >-
  Repay borrowed USDC or SOL on a Solana lending protocol (Kamino or
  Marginfi). Use when the user asks to "repay the loan", "pay back debt",
  "reduce my borrow", "clear the outstanding balance", or "improve health
  factor by paying down debt".
license: MIT
metadata:
  author: solobank
  version: "4.0.2"
  requires: Solobank CLI 4.0.x (npx -y @solobank/cli@latest init)
  tags: [solana, defi, lending, kamino, marginfi, repay, solobank]
---

# Solobank: Repay Loan

## Purpose
Repay an outstanding borrow on Kamino or Marginfi to reduce debt and
raise the position's health factor.

## Command
```bash
solobank repay <amount> <asset> [options]
```

| Option | Description |
|---|---|
| `--protocol auto\|kamino\|marginfi` | Defaults to `auto`. |
| `--market <address>` | Target Kamino market. |
| `--bank <address>` | Target Marginfi bank. |
| `--reserve <address>` | Target Kamino reserve. |
| `--all` | Repay the entire debt (pass `0` as the amount placeholder). |

## Examples
```bash
# Repay 20 USDC, auto-route
solobank repay 20 USDC

# Force Marginfi
solobank repay 20 USDC --protocol marginfi

# Repay the whole debt
solobank repay 0 USDC --all
```

## Output
```
✓ Repaid 20 USDC to Kamino
  Market:        45FNL6...Uztc98
  Remaining:     20 USDC
  Health factor: 4.30
  Signature:     eaceRMotCWs3Lvm6...
```

## Notes
- Must have enough free balance of the borrowed asset to cover the repay.
  Use `solobank balance` first if unsure.
- `--all` is the safest option for closing a borrow position cleanly.
- Repaying always raises the health factor — useful safety move when
  the market moves against the collateral asset.
