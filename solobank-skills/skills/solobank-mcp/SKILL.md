---
name: solobank-mcp
description: >-
  Install and manage the Solobank MCP server so AI agents (Claude Desktop,
  Claude Code, Cursor, OpenClaw, VS Code, etc.) can call Solobank tools
  directly. Use when the user asks to "install MCP", "connect to Claude",
  "set up Cursor integration", "wire OpenClaw to my wallet", "check MCP
  status", or "configure agent tools".
license: MIT
metadata:
  author: solobank
  version: "4.0.2"
  requires: Solobank CLI 4.0.x (npx -y @solobank/cli@latest init)
  tags: [solana, mcp, claude, cursor, openclaw, integration, solobank]
---

# Solobank: MCP Server

## Purpose
The Solobank MCP server exposes the wallet, lending, swap, and MPP
payment surface as Model Context Protocol tools so any compliant agent
runtime can drive Solobank.

## Commands
```bash
solobank mcp install     # auto-configure Claude Desktop + Cursor
solobank mcp uninstall   # remove Solobank MCP from those configs
solobank mcp status      # show which apps have Solobank MCP wired
solobank mcp config      # print the JSON snippet for manual setup
```

## Auto-install targets
`solobank mcp install` writes config blocks into:
- **Claude Desktop**: `~/.config/Claude/claude_desktop_config.json`
  (`%APPDATA%\Claude\claude_desktop_config.json` on Windows)
- **Cursor**: `~/.cursor/mcp.json`

For other clients (Claude Code, OpenClaw, VS Code, Devin, ...) use
`solobank mcp config` to copy the JSON snippet and paste it into the
client's MCP configuration file by hand.

## Manual config snippet (`solobank mcp config`)
```json
{
  "mcpServers": {
    "solobank": {
      "command": "npx",
      "args": ["-y", "@solobank/mcp@latest"]
    }
  }
}
```

For OpenClaw, drop the same block into the OpenClaw MCP config (path
depends on your OpenClaw install — typically
`~/.openclaw/workspace/mcp.json` or wherever your distribution stores
client MCP servers).

## MCP tools exposed (15)

| Tool | Type | What it does |
|---|---|---|
| `solobank_address` | read | Print the wallet address |
| `solobank_balance` | read | SOL + USDC balances |
| `solobank_services` | read | List available MPP services + endpoints |
| `solobank_swap_quote` | read | Jupiter swap quote (no execute) |
| `solobank_lending_rates` | read | Kamino + Marginfi APYs for an asset |
| `solobank_send` | write | Send SOL or USDC to an address |
| `solobank_pay` | write | Pay an MPP-protected endpoint |
| `solobank_swap` | write | Execute a Jupiter swap |
| `solobank_lend` | write | Supply to a lending venue |
| `solobank_borrow` | write | Borrow against collateral |
| `solobank_withdraw` | write | Withdraw from a lending venue |
| `solobank_repay` | write | Repay a borrow |
| `solobank_rebalance` | write | Move a supply between venues |
| `solobank_lock` | admin | Emergency freeze of all writes |
| `solobank_config` | admin | View safeguard settings (read-only via MCP) |

All `write` and `admin` tools route through the safeguard layer
(`maxAmountPerTx`, `maxDailySend`, lock state). Read tools always work.

## Important security note
The MCP server intentionally does **not** expose `solobank unlock`. If
the lock is triggered (via `solobank_lock` from the agent or
`solobank lock` from a human), only a human running `solobank unlock` in
a real terminal can re-enable writes.

## Verification
After installing:
1. Restart the host app (Claude Desktop / Cursor / OpenClaw).
2. Open a new chat — the agent should see tools prefixed `solobank_*`.
3. Ask "What's my Solobank address?" — the agent should call
   `solobank_address` and return the wallet pubkey.
