# Solobank Website

Landing page and documentation for [Solobank](https://solobank.lol) -- an AI bank account for autonomous agents on Solana.

[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://solobank.lol)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing -- hero, accounts overview, features, install |
| `/demos` | Interactive AI conversation and CLI demos |
| `/docs` | SDK, CLI, MCP, and payments reference |
| `/services` | MPP Gateway service catalog (51 APIs) |
| `/stats` | Real-time payment statistics |
| `/mpp` | Machine Payments Protocol overview |
| `/terms` `/privacy` `/security` | Legal |

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS 4**
- **TypeScript 5**
- **Lucide** icons
- Deployed on **Vercel** at [solobank.lol](https://solobank.lol)

## Architecture

```
src/
  app/                  # Routes (/, /demos, /docs, /services, /stats, /mpp, /terms, /privacy, /security)
  components/
    ui/                 # Reusable: Button, Badge, Terminal, AnimateIn, GridSpotlight
    sections/           # Homepage: Hero, Accounts, HowItWorks, Comparison, Install
    demos/              # Demo page: ChatWindow, TerminalWindow, ModeToggle, ScenarioTabs
    layout/             # Navbar, Footer
    providers/          # LocaleWrapper, WalletProvider
  lib/
    i18n/               # Translations (EN)
    utils.ts            # cn() helper
```

## Related Repos

- [solobank-ai/package](https://github.com/solobank-ai/package) -- SDK + MCP + CLI monorepo
- [solobank-ai/backend](https://github.com/solobank-ai/backend) -- MPP payment gateway
- [solobank-ai/mpp-solana](https://github.com/solobank-ai/mpp-solana) -- Solana MPP payment method
- [solobank-ai/solobank-skills](https://github.com/solobank-ai/solobank-skills) -- Agent skills
- [solobank-ai/contracts](https://github.com/solobank-ai/contracts) -- Solana programs

## License

MIT
