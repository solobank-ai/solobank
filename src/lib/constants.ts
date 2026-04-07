import type { NavLink } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Accounts", href: "#accounts" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Docs", href: "/docs" },
  {
    label: "GitHub",
    href: "https://github.com/solobank-ai",
    external: true,
  },
];

export const TERMINAL_LINES: string[] = [
  "$ solobank init",
  "Wallet created: 7xKp...3mNq",
  "MCP server configured",
  "Safeguards: $100/tx · $500/day",
  "",
  "$ solobank balance",
  "SOL:   0.05 SOL",
  "USDC:  $148.91 USDC",
  "",
  "$ solobank send 10 9pFr...2kLx",
  "✓ Sent 10.00 USDC → 9pFr...2kLx",
  "  TX: 4vGh...8mKp  confirmed (420ms)",
  "",
  "$ solobank lend 80 USDC",
  "✓ Deposited 80.00 USDC to Kamino",
  "  APY: 4.21%",
];
