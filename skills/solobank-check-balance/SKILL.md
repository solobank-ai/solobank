---
name: solobank-check-balance
description: >-
  Check the Solobank agent wallet balance on Solana — SOL and USDC. Use when
  the user asks about wallet balance, "how much SOL / USDC do I have", how
  much is available to spend, or when the agent needs to confirm sufficient
  funds before any send / swap / lend / pay operation. Read-only, never
  triggers a transaction.
license: MIT
metadata:
  author: solobank
  version: "4.0.2"
  requires: Solobank CLI 4.0.x (npx -y @solobank/cli@latest init)
  tags: [solana, wallet, balance, read-only, solobank]
---

# Solobank: Check Balance

## Purpose
Fetch the current balance of the agent's Solobank wallet on Solana
devnet — SOL plus USDC. Always run this **before** any spend so the
agent knows the budget.

## Commands
```bash
solobank address    # print just the wallet's base58 public key
solobank balance    # human-readable SOL + USDC summary
```

## Output (real CLI 4.0.2)
```
$ solobank address
BYw72eRN6C8vQdbopEYzvnPRsyFfep67xcSwGZ1BXsML

$ solobank balance
Address: BYw7...XsML
SOL: 0.0000 SOL
USDC: $0.00
```

## Notes
- Default network is **Solana devnet**. Override via the
  `SOLOBANK_RPC_URL` environment variable for mainnet or another cluster.
- USDC is shown in dollars at face value (1 USDC = $1). SOL is shown in
  raw token units, not USD — convert with the current SOL price if you
  need a dollar figure.
- If both balances are zero, the agent must be funded before doing
  anything else:
  - Devnet: <https://faucet.solana.com> or `solana airdrop 2`
  - Mainnet: transfer from another wallet
- Read-only — works even when the wallet is `solobank lock`-ed.

## When NOT to use
- Don't use to check balances of *other* wallets — Solobank only knows
  about the local agent wallet at `~/.config/solobank/id.json`. Use a
  block explorer or RPC for arbitrary addresses.
