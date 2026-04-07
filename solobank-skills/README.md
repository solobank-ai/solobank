# Solobank Agent Skills

[Agent Skills](https://github.com/anthropics/skills) for the
[Solobank](https://www.solobank.lol) AI bank account on Solana. Install
once and your AI agent gains the ability to check balances, send
payments, earn yield via Kamino / Marginfi, borrow against deposits,
swap tokens via Jupiter, and pay for any of the **46 + services** behind
the Solobank MPP gateway.

The skills are written in the open `SKILL.md` format, so they work with
any agent runtime that adopts it: **Claude Code, Claude Desktop,
[OpenClaw](https://docs.openclaw.ai), Cursor, VS Code, Devin, Codex CLI,
Gemini CLI**, and friends.

## Prerequisites

Solobank ships as an `npx`-able CLI plus an MCP server — no global
install or sudo required:

```bash
npx -y @solobank/cli@latest init
```

The wallet is created at `~/.config/solobank/id.json`. Default network
is **Solana devnet** in 4.0.x. Override with `SOLOBANK_RPC_URL` if you
need another cluster.

If you'd like a permanent `solobank` command on `PATH`:

```bash
npm install -g @solobank/cli
```

## Install the skills

### Claude Code (project-scoped)

```bash
git clone https://github.com/solobank-ai/solobank-skills.git \
  .claude/skills/solobank-skills
```

### Claude Code (user-scoped, available in every project)

```bash
git clone https://github.com/solobank-ai/solobank-skills.git \
  ~/.claude/skills/solobank-skills
```

### OpenClaw

```bash
git clone https://github.com/solobank-ai/solobank-skills.git \
  ~/.openclaw/workspace/skills/solobank-skills
```

OpenClaw scans `~/.openclaw/workspace/skills/` on launch and surfaces
each `SKILL.md` automatically. After cloning, restart OpenClaw (or run
`openclaw skills reload` if your build supports it).

### Cursor / VS Code

```bash
git clone https://github.com/solobank-ai/solobank-skills.git \
  .cursor/skills/solobank-skills
```

### Anything else

The repo is just a folder of `SKILL.md` files — point any compliant
runtime at it.

## Skills

| Skill | Trigger phrases (examples) |
|---|---|
| [`solobank-init`](skills/solobank-init/SKILL.md) | "set up Solobank", "create a wallet", "initialise the agent" |
| [`solobank-check-balance`](skills/solobank-check-balance/SKILL.md) | "check balance", "how much SOL / USDC do I have", "show wallet" |
| [`solobank-send`](skills/solobank-send/SKILL.md) | "send 10 USDC to ...", "transfer SOL to that address" |
| [`solobank-save`](skills/solobank-save/SKILL.md) | "earn yield", "deposit to savings", "lend my USDC" |
| [`solobank-withdraw`](skills/solobank-withdraw/SKILL.md) | "withdraw from savings", "pull funds out of Kamino" |
| [`solobank-borrow`](skills/solobank-borrow/SKILL.md) | "borrow 40 USDC", "take out a loan against my deposits" |
| [`solobank-repay`](skills/solobank-repay/SKILL.md) | "repay the loan", "pay back the borrow", "clear the debt" |
| [`solobank-rebalance`](skills/solobank-rebalance/SKILL.md) | "optimise yield", "move to higher APY", "rebalance" |
| [`solobank-swap`](skills/solobank-swap/SKILL.md) | "swap SOL to USDC", "convert tokens", "exchange via Jupiter" |
| [`solobank-pay`](skills/solobank-pay/SKILL.md) | "call that paid API", "use the gated endpoint", "pay for the LLM call" |
| [`solobank-safeguards`](skills/solobank-safeguards/SKILL.md) | "set spending limit", "lock the agent", "raise the daily limit" |
| [`solobank-mcp`](skills/solobank-mcp/SKILL.md) | "install MCP", "wire OpenClaw / Claude Desktop / Cursor to my wallet" |

Each skill is a single `SKILL.md` file with a frontmatter description
the agent runtime uses for selection, plus a body that documents
commands, examples, and pre-flight checks.

## Solobank in one screen

| Surface | What it gives you |
|---|---|
| **Checking** | Send and receive SOL / USDC on Solana |
| **Savings** | Earn yield via Kamino + Marginfi (auto-routes to highest APY) |
| **Credit** | Borrow against your supplied collateral |
| **Swap** | Trade tokens via Jupiter (20 + Solana DEXs aggregated) |
| **MPP gateway** | Pay-per-call access to 46 + APIs (OpenAI, Anthropic, Brave, Exa, CoinGecko, ElevenLabs, fal.ai, ...) — handles HTTP 402 automatically |

**Resources:**

| | |
|---|---|
| Web        | <https://www.solobank.lol> |
| Docs       | <https://www.solobank.lol/docs> |
| Services   | <https://www.solobank.lol/services> |
| MPP gateway| <https://mpp.solobank.lol> |
| GitHub     | <https://github.com/solobank-ai> |
| SDK        | `npm install @solobank/sdk` |
| CLI        | `npx -y @solobank/cli@latest init` |
| MCP        | `npx -y @solobank/mcp@latest` |

## Versioning

These skills target **Solobank CLI 4.0.x**. Each `SKILL.md` declares
the exact version it was written against in its frontmatter
`metadata.version` field. If a CLI command's options drift, please open
an issue or PR on this repo.

## License

MIT
