---
name: solobank-init
description: >-
  Create or restore a Solobank agent wallet — generates a Solana keypair and
  saves it to ~/.config/solobank/id.json. Use when the user is setting Solobank
  up for the first time, asks to "create a wallet", "set up Solobank",
  "initialise the agent", or hits any "wallet not found" error from another
  Solobank command. Skip if a wallet already exists at the standard path
  (use --force only if the user explicitly wants to overwrite it).
license: MIT
metadata:
  author: solobank
  version: "4.0.2"
  requires: Node.js 18+ (no global install needed)
  tags: [solana, wallet, setup, init, solobank]
---

# Solobank: Initialise Wallet

## Purpose
Bootstrap a fresh Solobank agent wallet on Solana **devnet**. Generates a
new ed25519 keypair, persists it to `~/.config/solobank/id.json`, and
registers default safeguards (per-tx and daily spend limits).

## One-line install + init (universal)
```bash
npx -y @solobank/cli@latest init
```

This is the recommended path — works on macOS, Linux, Windows (PowerShell /
cmd / WSL), CI runners, Docker, and any other environment that has
Node.js 18 +. No global install, no sudo, always pulls the latest CLI.

## Options
```bash
solobank init [--force] [--password <password>]
```

| Option | Effect |
|---|---|
| `--force` | Overwrite an existing keypair at the standard path. **Destructive.** |
| `--password <p>` | Encrypt the keypair on disk with AES-256-GCM. The password is required again for any signing operation. |

## Output
```
✓ Wallet created
  Address:  BYw72eRN6C8vQdbopEYzvnPRsyFfep67xcSwGZ1BXsML
  Keypair:  C:\Users\you\.config\solobank\id.json
  Network:  devnet
  Safeguards: maxAmountPerTx=1, maxDailySend=10
```

## Permanent CLI install (optional)
If the user wants a real `solobank` command on PATH instead of always
typing `npx`:
```bash
npm install -g @solobank/cli
```

## After init — typical next steps
1. `solobank address` — copy the wallet address
2. Fund it via the Solana devnet faucet at <https://faucet.solana.com>
   or `solana airdrop 2`
3. `solobank balance` — confirm SOL arrived
4. `solobank mcp install` — wire the MCP server into Claude Desktop /
   Cursor / OpenClaw

## Error handling
- `Wallet already exists`: pass `--force` only if the user really wants to
  overwrite. **Always confirm with the user before doing this** — it
  destroys the existing keypair.
- `EACCES` on `~/.config/solobank/`: directory perms are wrong; suggest
  `mkdir -p ~/.config/solobank && chmod 700 ~/.config/solobank`.

## Notes
- The keypair is **plaintext on disk** unless `--password` is used.
- Solobank ships safeguards (per-tx + daily limits, lock/unlock) so even
  a leaked keypair has bounded blast radius.
- Default network is **devnet** in 4.0.x. Override with the
  `SOLOBANK_RPC_URL` environment variable if you need another cluster.
