---
name: solobank-safeguards
description: >-
  Manage Solobank wallet spending limits and the emergency lock. Use when the
  user asks to "set a spending limit", "lock the agent", "freeze the wallet",
  "unlock", "see current limits", "raise daily limit", or any other guardrail
  configuration. Lock can be triggered from MCP but only unlocked from the
  CLI for safety.
license: MIT
metadata:
  author: solobank
  version: "4.0.2"
  requires: Solobank CLI 4.0.x (npx -y @solobank/cli@latest init)
  tags: [solana, wallet, safeguards, limits, lock, safety, solobank]
---

# Solobank: Safeguards (Limits + Lock)

## Purpose
Solobank ships hard guardrails on top of the raw signing key:

1. **`maxAmountPerTx`** — maximum USD value for a single send/swap/lend.
2. **`maxDailySend`** — maximum USD value spent in a rolling 24 h window.
3. **Emergency lock** — freezes every write operation until manually
   unlocked from the CLI.

The agent cannot disable safeguards on its own — only the CLI user can.

## Commands
```bash
solobank config get                       # show every safeguard value
solobank config get maxAmountPerTx        # show one specific key
solobank config set maxAmountPerTx <usd>  # update per-tx limit
solobank config set maxDailySend <usd>    # update daily limit
solobank lock                             # emergency freeze (no writes)
solobank unlock                           # re-enable writes (CLI only!)
```

`set` only accepts `maxAmountPerTx` and `maxDailySend`. Anything else is
rejected.

## Examples
```bash
# Cap any single tx at $5
solobank config set maxAmountPerTx 5

# Cap rolling-24h spend at $100
solobank config set maxDailySend 100

# Inspect current values
solobank config get
# {
#   "maxAmountPerTx": 5,
#   "maxDailySend": 100,
#   "locked": false
# }

# Panic — freeze everything
solobank lock

# Resume
solobank unlock
```

## How safeguards interact with other commands
- `send`, `swap`, `lend`, `borrow`, `pay`, `withdraw`, `repay`,
  `rebalance` all check `maxAmountPerTx` **and** that the cumulative
  rolling-24h spend stays under `maxDailySend`. Any failure aborts
  before broadcasting.
- Read-only commands (`address`, `balance`, `lend-rates`, `swap-quote`)
  ignore safeguards entirely.
- A locked wallet refuses every write but reads still work.

## Lock vs unlock asymmetry
- `solobank lock` — works from the CLI **and** from MCP via the
  `solobank_lock` tool. The agent itself can panic-stop on demand.
- `solobank unlock` — **CLI only**. The MCP server intentionally has no
  unlock tool, so a compromised agent cannot reverse its own lockdown.
  A human has to type `solobank unlock` in a terminal.

## Notes
- Safeguard config lives at `~/.config/solobank/safeguards.json`
  (path may differ on Windows / WSL — check `solobank config get` if
  you're unsure).
- Default per-tx limit is conservative (`1.0` USD). Bump it explicitly
  before any larger operation.
- When proposing a `set` to raise a limit, always confirm with the user
  first — that's the whole point of the guardrail.
