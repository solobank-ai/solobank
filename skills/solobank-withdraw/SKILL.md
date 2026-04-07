---
name: solobank-withdraw
description: >-
  Withdraw previously supplied assets from a Solana lending protocol back to
  the agent's wallet. Use when the user asks to "withdraw from savings",
  "pull funds out of Kamino / Marginfi", "stop earning yield", or "access
  my deposits".
license: MIT
metadata:
  author: solobank
  version: "4.0.2"
  requires: Solobank CLI 4.0.x (npx -y @solobank/cli@latest init)
  tags: [solana, defi, lending, kamino, marginfi, withdraw, solobank]
---

# Solobank: Withdraw from Savings

## Purpose
Move funds out of a lending protocol's supply position back to the
agent's available balance.

## Command
```bash
solobank withdraw <amount> <asset> [options]
```

| Option | Description |
|---|---|
| `--protocol auto\|kamino\|marginfi` | Defaults to `auto`. |
| `--market <address>` | Target Kamino market. |
| `--bank <address>` | Target Marginfi bank. |
| `--reserve <address>` | Target Kamino reserve. |
| `--all` | Withdraw the entire position (ignores `<amount>`, pass `0` as a placeholder). |

## Examples
```bash
# Withdraw 50 USDC from auto-detected venue
solobank withdraw 50 USDC

# Force Marginfi
solobank withdraw 50 USDC --protocol marginfi

# Withdraw the entire position
solobank withdraw 0 USDC --all
```

## Output
```
✓ Withdrew 50 USDC from Kamino
  Market:    45FNL6...Uztc98
  Available: 550 USDC
  Signature: 2vikaMaehqtCHqRz...
```

## Notes
- Cannot withdraw more than the supplied amount.
- If the position is also serving as collateral for an active borrow,
  withdrawing may **lower the health factor** — check `solobank borrow`'s
  most recent output before pulling significant amounts. If health
  factor would drop below 1.0 the protocol blocks the withdrawal.
- Read-only operations (balance, rates, quotes) keep working while a
  position is open.
