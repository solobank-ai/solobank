<p align="center">
  <strong>Solobank</strong><br>
  A bank account for AI agents.
</p>

<p align="center">
  <a href="https://solobank.vercel.app">Website</a> &middot;
  <a href="https://solobank.vercel.app/docs">Docs</a> &middot;
  <a href="https://solobank.vercel.app/demos">Live Demos</a> &middot;
  <a href="https://www.npmjs.com/package/@solobank/cli">npm</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Solana-black?logo=solana&logoColor=14F195" alt="Solana" />
  <img src="https://img.shields.io/badge/Next.js_16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-black?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-black?logo=tailwindcss" alt="Tailwind" />
</p>

---

Landing page and documentation for **Solobank** — an open-source, non-custodial banking SDK for AI agents on Solana.

## What is Solobank?

Five accounts. Earn, borrow, invest, swap, pay — autonomously.

| Package | Purpose |
|---------|---------|
| [`@solobank/sdk`](https://github.com/decentrathon/package) | TypeScript SDK — wallet, transfers, swaps, lending, MPP payments |
| [`@solobank/cli`](https://www.npmjs.com/package/@solobank/cli) | CLI wrapping the SDK — 14 commands |
| [`@solobank/mcp`](https://github.com/decentrathon/package) | MCP server for Claude, Cursor, Windsurf |
| [`@solobank/mpp-solana`](https://github.com/decentrathon/mpp-solana) | Solana USDC payment method for MPP |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing — hero, accounts, features, install |
| `/demos` | Interactive AI conversation and CLI command demos |
| `/docs` | Full SDK, CLI, MCP, and payments reference |
| `/services` | MPP Gateway service catalog |
| `/stats` | Real-time payment statistics |
| `/terms` `/privacy` `/security` | Legal pages |

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS 4**
- **TypeScript 5**
- **Lucide** icons

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Architecture

```
src/
  app/                  # Routes (/, /demos, /docs, /services, /stats, /terms, /privacy, /security)
  components/
    ui/                 # Reusable: Button, Badge, Terminal, AnimateIn, GridSpotlight
    sections/           # Homepage sections: Hero, Accounts, HowItWorks, Comparison, Install
    demos/              # Demo page: ChatWindow, TerminalWindow, ModeToggle, ScenarioTabs
    layout/             # Navbar, Footer
    providers/          # LocaleWrapper, WalletProvider
  lib/
    i18n/               # Translations (EN)
    utils.ts            # cn() helper
```

## Related Repositories

- [decentrathon/package](https://github.com/decentrathon/package) — SDK + CLI + MCP monorepo
- [decentrathon/mpp-solana](https://github.com/decentrathon/mpp-solana) — MPP payment method
- [decentrathon/backend](https://github.com/decentrathon/backend) — MPP Gateway server

## License

MIT
