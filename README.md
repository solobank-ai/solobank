<div align="center">

<img src="https://raw.githubusercontent.com/solobank-ai/.github/main/assets/logo.jpg" width="180" />

# Solobank

### Bank for AI Agents. Give your Agent a financial life.

[![npm](https://img.shields.io/npm/v/@solobank/sdk?label=sdk&color=black)](https://www.npmjs.com/package/@solobank/sdk)
[![npm](https://img.shields.io/npm/v/@solobank/cli?label=cli&color=black)](https://www.npmjs.com/package/@solobank/cli)
[![npm](https://img.shields.io/npm/v/@solobank/mcp?label=mcp&color=black)](https://www.npmjs.com/package/@solobank/mcp)
[![Gateway](https://img.shields.io/badge/gateway-mpp.solobank.lol-blue)](https://mpp.solobank.lol/health)
[![Solana](https://img.shields.io/badge/Solana-devnet-9945FF)](https://solana.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-14F195.svg)](LICENSE)
[![Hackathon](https://img.shields.io/badge/Decentrathon-5.0-14F195)](https://decentrathon.org)

**Wallet** &middot; **Payments** &middot; **Swaps** &middot; **Lending** &middot; **MCP** &middot; **Pay-per-call APIs**

[Live Demo](https://www.solobank.lol) &middot;
[Docs](https://www.solobank.lol/docs) &middot;
[Services](https://www.solobank.lol/services) &middot;
[Install](#install) &middot;
[Talk to your Agent](#talk-to-your-agent) &middot;
[Architecture](#architecture)

</div>

---

<div align="center">
<a href="https://solobank.lol/docs">
<img src="https://raw.githubusercontent.com/solobank-ai/.github/main/assets/demo.svg" alt="Solobank CLI Demo" width="800" />
</a>
</div>

---

## Submission to Decentrathon 5.0 — Case 2 (AI + Blockchain: Autonomous Smart Contracts)

| Name | Role | Contact |
|------|------|---------|
| Igor Stolyarov | Founder & Lead Engineer | [Telegram](https://t.me/Magurin) · [GitHub](https://github.com/Magurin) |
| Stanislav | Backend & Contracts | [GitHub](https://github.com/stanislav744) |

> Replace the rows above with the actual team. Add Twitter/X handles, demo
> video links, and pitch deck links here as they become available.

---

## Problem and Solution

### 1. AI agents have no native way to handle money
- **Problem:** an AI agent that wants to pay for an API call, top up its
  inference budget, or move idle stablecoins between yield sources has to
  rely on a human in the loop, an embedded credit card, or a custom
  custodial integration. None of those scale to autonomous workflows.
- **Solobank:** ships a non-custodial wallet, send / swap / lend, and an
  HTTP-402 payment gateway behind a single CLI / SDK / MCP surface so an
  agent can transact without ever touching a human.

### 2. Pay-per-call APIs require an account per provider
- **Problem:** every LLM provider, search API, audio model, on-chain data
  provider, etc., demands a separate account, billing setup, and API key.
  An agent that wants to use 20 services needs 20 accounts.
- **Solobank:** the **MPP gateway** at
  [`mpp.solobank.lol`](https://mpp.solobank.lol) proxies **46 + services**
  with `HTTP 402 Payment Required` negotiation. The agent pays USDC on
  Solana per call, no accounts.

### 3. Yield optimisation is manual
- **Problem:** Kamino and MarginFi offer different APYs at different
  times. Moving an idle position requires watching dashboards and signing
  manually.
- **Solobank:** `solobank lend-rates` + `solobank rebalance` let an agent
  poll, compare, and rotate positions on its own — gated by a
  configurable APY-delta threshold so it never burns gas on tiny moves.

### 4. Autonomous money is dangerous without guardrails
- **Problem:** giving an LLM raw signing keys is a great way to wake up
  with a drained wallet.
- **Solobank:** built-in safeguards (`maxPerTx`, `maxDailySend`,
  emergency lock) and an asymmetric lock model — the agent can panic-stop
  itself but only a human in a real terminal can `solobank unlock`.

---

## Why Solana

- **Speed** — 400 ms block time means an agent's payment for an API call
  clears before the request would otherwise time out.
- **Cost** — sub-cent transactions make pay-per-call viable; the same
  flow on Ethereum mainnet would cost more in gas than the API itself.
- **USDC native** — Circle issues USDC directly on Solana, so the agent's
  unit of account is a real dollar, not a wrapped derivative.
- **Ecosystem** — Jupiter, Kamino, MarginFi and 20 + DEXs are all
  composable from a single Anchor program; no bridging headaches.
- **Tooling** — `@solana/kit` v2 gives us a modern, tree-shakeable client;
  Anchor 0.32 keeps the smart contracts safe and ergonomic.

---

## Summary of Features

- **Non-custodial wallet** — `solobank init` generates a Solana keypair
  in `~/.config/solobank/id.json`. Optional AES-256-GCM encryption.
- **Send & receive** — SOL and any SPL token (USDC by default), with
  contact aliases and history.
- **Jupiter swap** — quote + execute with configurable slippage; routes
  across 20 + Solana DEXs automatically.
- **Lending across protocols** — Kamino and MarginFi, auto-routed to the
  highest APY for the asset, with rebalance + min-APY-delta guard.
- **MPP pay-per-call** — `solobank pay <url>` handles HTTP 402
  negotiation, signs an on-chain USDC transfer, and replays the request
  with proof. **46 + services**, **95 + endpoints** behind the gateway.
- **Model Context Protocol server** — 15 tools + prompt templates so any
  MCP-aware agent (Claude Desktop, Claude Code, OpenClaw, Cursor,
  Windsurf, Devin) can drive the wallet directly.
- **Agent Skills** — a `solobank-skills` directory ships SKILL.md
  files compatible with the open Anthropic Agent Skills standard.
- **Safeguards** — per-tx and rolling-24h spending caps, plus an
  emergency lock that only a human can clear.
- **Treasury contract** — Anchor program collecting protocol fees on
  save / borrow / swap; admin-controlled, paused-by-default deploys.

---

## What is Solobank?

Solobank gives AI agents a full financial stack on Solana: a non-custodial
wallet, token transfers, Jupiter swaps, Kamino & MarginFi lending, and
pay-per-call access to 46 + APIs — all controllable via CLI, SDK, or MCP
(Model Context Protocol).

```
Agent needs data  ->  solobank pay https://mpp.solobank.lol/openai/v1/chat/completions
Agent earns idle  ->  solobank lend 100 USDC --protocol auto
Agent rebalances  ->  solobank rebalance 50 USDC --min-apy-delta 0.5
```

## Install

The recommended one-liner — works on macOS, Linux, Windows, WSL, and any
CI runner with Node.js 18 +:

```bash
npx -y @solobank/cli@latest init
```

For a permanent `solobank` command on `PATH`:

```bash
npm install -g @solobank/cli
solobank init
```

The init wizard creates a wallet, configures safeguards, and auto-installs
the MCP server into Claude Desktop, Cursor, and Windsurf.

## Demo

<div align="center">
<a href="https://solobank.lol/docs">
<img src="https://raw.githubusercontent.com/solobank-ai/.github/main/assets/demo.svg" alt="Solobank CLI Demo" width="800" />
</a>
</div>

---

## Talk to your Agent

After installing, just ask your AI agent in natural language:

> "Check my balance"
>
> "Send 5 USDC to alice"
>
> "Swap 1 SOL to USDC"
>
> "Find the best lending rate for USDC and deposit 100"
>
> "What APIs are available? Call OpenAI to summarize this article"
>
> "Lock my wallet, something looks wrong"

The agent uses Solobank MCP tools behind the scenes — no commands to memorize.

## CLI Commands

For direct use or scripting:

```bash
solobank balance                          # Check balances
solobank send 5 alice --asset USDC        # Send to contact
solobank swap 1 SOL USDC                  # Swap via Jupiter
solobank lend 100 USDC --protocol auto    # Lend to best APY
solobank lend-rates USDC                  # Compare rates
solobank history                          # Transaction history
solobank pay https://mpp.solobank.lol/openai/v1/chat/completions \
  --method POST --data '{"model":"gpt-4o","messages":[...]}'
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| On-chain programs | Rust · Anchor 0.32 · SPL Token |
| SDK / Client | TypeScript · `@solana/kit` v2 · `@solana-program/*` |
| CLI | Node.js · Commander · `npx`-able |
| MCP Server | TypeScript · `@modelcontextprotocol/sdk` |
| Lending integrations | Kamino `klend-sdk` · MarginFi v2 SDK |
| Swaps | Jupiter aggregator (20 + Solana DEXs) |
| Gateway / Backend | Hono · PostgreSQL · Redis · Docker |
| Frontend | Next.js 16 · React · Tailwind v4 · Three.js |
| Skills | Anthropic Agent Skills (SKILL.md, OpenClaw-compatible) |
| Hosting | Vercel (frontend) · Oracle Cloud (gateway) |

---

## Architecture

```
┌───────────────────────────────────────────────────────────┐
│                       AI Agent                            │
│          (Claude, GPT, Cursor, OpenClaw custom agent)     │
└─────────┬──────────────────┬──────────────────────────────┘
          │                  │
    MCP (stdio)         SDK / CLI
          │                  │
┌─────────▼──────────────────▼──────────────────────────────┐
│                   @solobank/sdk                           │
│                                                           │
│  Wallet · Send · Swap · Lend · Borrow · Pay               │
│  Safeguards · Contacts · History · Session                │
└─────┬──────────┬───────────┬───────────┬──────────────────┘
      │          │           │           │
  Solana RPC   Jupiter    Kamino     MarginFi
      │        Aggregator  (klend)   (v2 SDK)
      │          │           │           │
┌─────▼──────────▼───────────▼───────────▼──────────────────┐
│                     Solana Blockchain                     │
│           ┌──────────────────────────────┐                │
│           │  Treasury Contract (Anchor)  │                │
│           │  save 0.1% · borrow 0.05%    │                │
│           │  swap 0.1% · admin controls  │                │
│           └──────────────────────────────┘                │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│                    MPP Gateway                            │
│              mpp.solobank.lol                             │
│                                                           │
│  46+ APIs: OpenAI · Anthropic · Gemini · Groq · Mistral   │
│  Perplexity · fal.ai · Brave · ElevenLabs · Replicate     │
│  CoinGecko · Jupiter · Helius · Birdeye · DexScreener     │
│  and 30+ more...                                          │
│                                                           │
│  Agent pays USDC on-chain -> Gateway verifies -> Proxy    │
└───────────────────────────────────────────────────────────┘
```

See each subdirectory's own README for component-level details.

---

## Quick Start (monorepo)

**Prerequisites:** Node.js 18 +, pnpm 9 +, Rust 1.89 +, Anchor CLI 0.32 +,
Solana CLI, Docker (for the gateway).

```bash
# Clone the monorepo
git clone https://github.com/solobank-ai/solobank.git
cd solobank

# 1. Build the SDK + CLI + MCP packages
cd package
pnpm install
pnpm build
cd ..

# 2. Build the Anchor programs
cd contracts
anchor build
cd ..

# 3. Start the MPP gateway locally
cd backend
docker compose up -d        # Postgres + Redis
cp .env.example .env
pnpm install
pnpm dev
cd ..

# 4. Run the frontend
cd solobank_frontend
pnpm install
pnpm dev                    # http://localhost:3000
cd ..
```

Each subdirectory has its own README with detailed instructions.

---

## SDK

```typescript
import { Solobank } from '@solobank/sdk';

const agent = await Solobank.create();

// Balance
const { sol, usdc } = await agent.getBalance();

// Send
await agent.send({ to: 'alice', amount: 5, asset: 'USDC' });

// Swap
await agent.swap({ fromAsset: 'USDC', toAsset: 'SOL', amount: 25 });

// Lend
await agent.lend({ asset: 'USDC', amount: 100, protocol: 'auto' });

// Pay for API
const response = await agent.pay({
  url: 'https://mpp.solobank.lol/openai/v1/chat/completions',
  method: 'POST',
  body: { model: 'gpt-4o', messages: [{ role: 'user', content: 'hello' }] },
});
```

## MCP Server

15 tools + 16 prompt templates for AI agents:

```json
{
  "mcpServers": {
    "solobank": {
      "command": "npx",
      "args": ["-y", "@solobank/mcp"]
    }
  }
}
```

**Tools:** `balance` · `send` · `pay` · `swap` · `swap_quote` · `lend` · `borrow` · `withdraw` · `repay` · `rebalance` · `lending_rates` · `services` · `lock` · `config` · `address`

**Prompts:** `financial-report` · `optimize-yield` · `morning-briefing` · `send-money` · `emergency` · `sweep` · `risk-check` · `onboarding` · and 8 more

## Safeguards

Built-in spending controls that persist across restarts:

```bash
solobank config set maxPerTx 100      # Max $100 per transaction
solobank config set maxDailySend 500   # Max $500 per day
solobank lock                          # Emergency freeze (only CLI can unlock)
```

The MCP server **refuses to start** until safeguards are configured. AI agents can lock the wallet but cannot unlock it — only humans can via the CLI.

## MPP Gateway

The gateway at `mpp.solobank.lol` turns any API into a pay-per-call service. Agents pay with USDC on Solana — no API keys, no subscriptions.

```bash
# List available services
curl https://mpp.solobank.lol/services

# 46+ services from $0.001 to $0.10 per call
```

---

## Subdirectories

This monorepo bundles every Solobank component as a top-level folder.
Each one was previously a standalone repository under
[`solobank-ai`](https://github.com/solobank-ai); the source repos still
exist for history but day-to-day work happens here.

| Folder | Source repo | Description |
|---|---|---|
| [**`package/`**](./package) | [`solobank-ai/package`](https://github.com/solobank-ai/package) | SDK + CLI + MCP server monorepo (`@solobank/sdk`, `@solobank/cli`, `@solobank/mcp`) |
| [**`backend/`**](./backend) | [`solobank-ai/backend`](https://github.com/solobank-ai/backend) | MPP gateway — Hono server that proxies 46 + APIs and handles HTTP 402 negotiation |
| [**`contracts/`**](./contracts) | [`solobank-ai/contracts`](https://github.com/solobank-ai/contracts) | Anchor smart contracts (treasury, fee collection) |
| [**`mpp-solana/`**](./mpp-solana) | [`solobank-ai/mpp-solana`](https://github.com/solobank-ai/mpp-solana) | Solana USDC payment method for the [MPP](https://github.com/coinbase/x402) standard |
| [**`solobank-skills/`**](./solobank-skills) | [`solobank-ai/solobank-skills`](https://github.com/solobank-ai/solobank-skills) | Anthropic-format Agent Skills (`SKILL.md`) — works with Claude Code, OpenClaw, Cursor, etc. |
| [**`prices-tracker-bot/`**](./prices-tracker-bot) | [`solobank-ai/prices-tracker-bot`](https://github.com/solobank-ai/prices-tracker-bot) | Telegram bot that watches MPP service pricing and pings on margin drift |
| [**`solobank_frontend/`**](./solobank_frontend) | [`Magurin/solobank_frontend`](https://github.com/Magurin/solobank_frontend) | Marketing site + interactive demo at [solobank.lol](https://www.solobank.lol) |

---

## Roadmap

- [x] Wallet, send, swap, lend, borrow, repay, rebalance (CLI + SDK + MCP)
- [x] MPP gateway with 46 + services live on devnet
- [x] Treasury Anchor contract deployed on devnet
- [x] Agent Skills bundle (Anthropic Agent Skills standard, OpenClaw-compatible)
- [x] Marketing site with live particle headline + interactive demos
- [x] Frontend ↔ devnet end-to-end flow
- [ ] AI Vault Anchor program — autonomous yield allocation by AI Oracle
- [ ] Mainnet deployment of treasury + AI Vault contracts
- [ ] On-chain reasoning-hash audit trail for every AI decision (SHA-256 of LLM rationale)
- [ ] Multi-protocol AI Oracle (Drift, Solend) beyond Kamino + MarginFi
- [ ] First-class OpenClaw plugin install path
- [ ] Hardware-wallet support for the human admin keypair

---

## Resources

- 🌐 Website — <https://www.solobank.lol>
- 📚 Docs — <https://www.solobank.lol/docs>
- 🛒 Services — <https://www.solobank.lol/services>
- 🚪 Gateway — <https://mpp.solobank.lol>
- 📦 npm scope — <https://www.npmjs.com/org/solobank>
- 🐙 GitHub org — <https://github.com/solobank-ai>
- 🎬 Demo asciinema (in `solobank-ai/.github/assets/demo.cast`)
- 💬 Telegram — *(add link)*
- 🐦 X / Twitter — *(add handle)*

---

## Stack

**SDK:** TypeScript · `@solana/kit` v2 · Jupiter · Kamino · MarginFi · `mppx`

**Gateway:** Hono · PostgreSQL · Redis · Docker

**Contracts:** Rust · Anchor 0.32 · SPL Token

**Frontend:** Next.js 16 · React 19 · Tailwind v4 · Three.js (DottedSurface, particle text)

---

## License

MIT — see [LICENSE](LICENSE).

---

<div align="center">

**Solobank** — Give your Agent a financial life.

Built on Solana.

</div>
