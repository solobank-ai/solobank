"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Copy, Check, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const NAV_SECTIONS = [
  { id: "quickstart", label: "Quickstart" },
  { id: "cli", label: "CLI" },
  { id: "sdk", label: "SDK" },
  { id: "mcp", label: "MCP Server" },
  { id: "payments", label: "Payments" },
  { id: "env", label: "Environment" },
];

const CLI_COMMANDS = [
  {
    command: "solobank init",
    flags: "--force",
    description: "Generate a new Solana Ed25519 keypair and save it to ~/.config/solobank/id.json.",
    example: "solobank init",
  },
  {
    command: "solobank address",
    flags: "",
    description: "Print the wallet's base58 public key.",
    example: "solobank address",
  },
  {
    command: "solobank balance",
    flags: "",
    description: "Show SOL and USDC balances for the current wallet.",
    example: "solobank balance",
  },
  {
    command: "solobank send <amount> <to>",
    flags: "--asset <SOL|USDC|USDT|JUP>",
    description: "Transfer SOL or SPL tokens to any Solana address. Defaults to USDC.",
    example: "solobank send 10 9pFr...2kLx --asset USDC",
  },
  {
    command: "solobank pay <url>",
    flags: "--method --data --max-price",
    description: "Pay an MPP-protected HTTP endpoint. Handles 402 negotiation automatically.",
    example: "solobank pay https://api.example.com/data --method POST --data '{\"q\":\"hello\"}'",
  },
  {
    command: "solobank swap-quote <amount> <from> <to>",
    flags: "--slippage-bps <50>",
    description: "Get a Jupiter swap quote without executing.",
    example: "solobank swap-quote 100 USDC SOL",
  },
  {
    command: "solobank swap <amount> <from> <to>",
    flags: "--slippage-bps <50>",
    description: "Execute a token swap via Jupiter best route.",
    example: "solobank swap 100 USDC SOL",
  },
  {
    command: "solobank lend-rates <asset>",
    flags: "--protocol <auto|kamino|marginfi>",
    description: "List current lending APYs across Kamino and marginfi.",
    example: "solobank lend-rates USDC",
  },
  {
    command: "solobank lend <amount> <asset>",
    flags: "--protocol",
    description: "Deposit to the best lending venue. Auto-routes to highest APY.",
    example: "solobank lend 80 USDC",
  },
  {
    command: "solobank borrow <amount> <asset>",
    flags: "--protocol --market --bank --reserve",
    description: "Borrow against deposited collateral.",
    example: "solobank borrow 20 USDC --protocol kamino",
  },
  {
    command: "solobank withdraw <amount> <asset>",
    flags: "--protocol --market --bank --reserve --all",
    description: "Withdraw from a lending position. Use --all for full withdrawal.",
    example: "solobank withdraw 50 USDC --all",
  },
  {
    command: "solobank repay <amount> <asset>",
    flags: "--protocol --market --bank --reserve --all",
    description: "Repay an outstanding borrow position. Use --all to clear debt.",
    example: "solobank repay 20 USDC --all",
  },
  {
    command: "solobank rebalance <amount> <asset>",
    flags: "--protocol --target-protocol --min-apy-delta",
    description: "Move funds from one lending venue to a higher-APY venue.",
    example: "solobank rebalance 80 USDC --min-apy-delta 0.5",
  },
  {
    command: "solobank mcp",
    flags: "",
    description: "Print MCP stdio configuration JSON for Claude / Cursor integration.",
    example: "solobank mcp",
  },
];

const SDK_METHODS = [
  {
    category: "Wallet",
    methods: [
      { name: "Solobank.init(options?)", returns: "Promise<{address, keypairPath, rpcUrl}>", description: "Generate a new keypair and save to disk. Options: { configDir?, force?, rpcUrl?, keypairPath? }." },
      { name: "Solobank.create(options?)", returns: "Promise<Solobank>", description: "Load existing wallet or create if createIfMissing: true." },
      { name: "Solobank.load(options?)", returns: "Promise<Solobank>", description: "Alias for create()." },
      { name: "Solobank.fromSecretKey(key, opts?)", returns: "Solobank", description: "Instantiate from raw secret key (Uint8Array, base64, or JSON array)." },
      { name: ".address()", returns: "string", description: "Returns the wallet's base58 public key." },
      { name: ".balance()", returns: "Promise<BalanceSnapshot>", description: "SOL + USDC balances with raw bigint values." },
    ],
  },
  {
    category: "Transfers",
    methods: [
      { name: ".send(options)", returns: "Promise<SendResult>", description: "Transfer SOL or SPL tokens. Options: { amount, to, asset?, mint?, dryRun? }." },
      { name: ".pay(options)", returns: "Promise<PayResult>", description: "Pay an MPP endpoint. Options: { url, method?, headers?, body?, maxPrice? }." },
    ],
  },
  {
    category: "Swaps",
    methods: [
      { name: ".getSwapQuote(options)", returns: "Promise<SwapQuoteResult>", description: "Get Jupiter quote. Options: { fromAsset, toAsset, amount, slippageBps?, swapMode?, onlyDirectRoutes? }." },
      { name: ".swap(options)", returns: "Promise<SwapExecutionResult>", description: "Execute Jupiter swap. Returns quote fields + signature + explorerUrl." },
    ],
  },
  {
    category: "Lending",
    methods: [
      { name: ".getLendingRates(options)", returns: "Promise<LendingRate[]>", description: "APYs across Kamino + marginfi. Options: { asset, protocol? }." },
      { name: ".lend(options)", returns: "Promise<LendResult>", description: "Deposit to best venue. Options: { asset, amount, protocol?, dryRun? }." },
      { name: ".borrow(options)", returns: "Promise<LendingActionResult>", description: "Borrow from lending protocol. Options: { asset, amount, protocol?, marketAddress?, bankAddress?, reserveAddress?, dryRun? }." },
      { name: ".withdraw(options)", returns: "Promise<LendingActionResult>", description: "Withdraw from position. Options: { asset, amount, withdrawAll?, protocol?, dryRun? }." },
      { name: ".repay(options)", returns: "Promise<LendingActionResult>", description: "Repay a borrow. Options: { asset, amount, repayAll?, protocol?, dryRun? }." },
      { name: ".rebalance(options)", returns: "Promise<RebalanceResult>", description: "Move funds to higher-APY venue. Options: { asset, amount, targetProtocol?, minApyDelta?, dryRun? }." },
    ],
  },
];

const MCP_TOOLS = [
  {
    tool: "solobank_address",
    params: "none",
    description: "Returns the current Solana wallet address.",
  },
  {
    tool: "solobank_balance",
    params: "none",
    description: "Returns wallet balance snapshot — SOL + USDC with raw values.",
  },
  {
    tool: "solobank_send",
    params: "to, amount, asset?, dryRun?",
    description: "Send SOL or SPL tokens. Validates address format. Enforces per-tx spending cap (maxAmountPerTx, default 1.0).",
  },
  {
    tool: "solobank_pay",
    params: "url, method?, body?, maxPrice?, headers?",
    description: "Pay an MPP-protected HTTP endpoint. Handles 402 negotiation. Blocks internal/private network URLs.",
  },
];

const ENV_VARS = [
  { name: "SOLOBANK_CONFIG_DIR", default: "~/.config/solobank", description: "Wallet config directory." },
  { name: "SOLOBANK_KEYPAIR_PATH", default: "id.json", description: "Keypair filename within config dir." },
  { name: "SOLOBANK_RPC_URL", default: "devnet RPC", description: "Solana RPC endpoint." },
  { name: "SOLOBANK_JUP_BASE_URL", default: "https://lite-api.jup.ag", description: "Jupiter API base URL." },
  { name: "SOLOBANK_JUP_API_KEY", default: "none", description: "Jupiter Pro API key for higher rate limits." },
];

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

function CodeBlock({ children, copyable = true }: { children: string; copyable?: boolean }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    void navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="relative group bg-background/60 border border-border rounded-lg px-4 py-3 font-mono text-xs text-solana-green overflow-x-auto whitespace-pre-wrap break-words">
      {children}
      {copyable && (
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-1.5 rounded-md border border-border text-dim hover:text-foreground hover:border-border-hover transition-all opacity-0 group-hover:opacity-100"
          aria-label="Copy"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
        </button>
      )}
    </div>
  );
}

function SectionAnchor({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-24">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function DocsPage(): React.ReactElement {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6 flex gap-12">
        {/* Sidebar */}
        <aside className="hidden lg:block w-48 flex-shrink-0">
          <nav className="sticky top-28 space-y-1">
            {NAV_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block text-sm text-muted hover:text-foreground transition-colors py-1.5"
              >
                {s.label}
              </a>
            ))}
            <div className="border-t border-border mt-4 pt-4">
              <a
                href="https://github.com/decentrathon/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
              >
                GitHub <ExternalLink size={12} />
              </a>
            </div>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>

          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Documentation
            </h1>
            <p className="mt-4 text-muted text-lg max-w-2xl">
              Complete reference for the Solobank SDK, CLI, and MCP server — everything you need to give AI agents a bank account on Solana.
            </p>
          </div>

          {/* Architecture */}
          <div className="mb-16 bg-surface border border-border rounded-2xl p-6">
            <h3 className="text-sm font-bold tracking-widest text-dim uppercase mb-4">Architecture</h3>
            <div className="font-mono text-xs text-muted leading-loose">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-solana-purple">@solobank/mcp</span>
                <span className="text-dim">&rarr;</span>
                <span className="text-solana-purple">@solobank/cli</span>
                <span className="text-dim">&rarr;</span>
                <span className="text-solana-green">@solobank/sdk</span>
                <span className="text-dim">&rarr;</span>
                <span className="text-solana-green">@solobank/mpp-solana</span>
                <span className="text-dim">&rarr;</span>
                <span className="text-muted">mppx</span>
              </div>
              <div className="mt-3 text-dim">
                SDK integrates: Solana web3.js &middot; SPL Token &middot; Jupiter &middot; Kamino &middot; marginfi
              </div>
            </div>
          </div>

          {/* ── Quickstart ── */}
          <SectionAnchor id="quickstart">
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-2 gradient-text">Quickstart</h2>
              <p className="text-muted text-sm mb-6">Up and running in 30 seconds.</p>

              <div className="space-y-3">
                <CodeBlock>npm i -g @solobank/cli</CodeBlock>
                <CodeBlock>solobank init</CodeBlock>
                <CodeBlock>solobank balance</CodeBlock>
              </div>

              <div className="mt-6 bg-surface border border-border rounded-xl p-5">
                <h4 className="text-sm font-bold mb-3">Using with Claude / Cursor</h4>
                <p className="text-sm text-muted mb-3">Add to your MCP config:</p>
                <CodeBlock>{`{
  "mcpServers": {
    "solobank": {
      "command": "npx",
      "args": ["-y", "@solobank/mcp"]
    }
  }
}`}</CodeBlock>
              </div>

              <div className="mt-6 bg-surface border border-border rounded-xl p-5">
                <h4 className="text-sm font-bold mb-3">Using as a library</h4>
                <CodeBlock>npm i @solobank/sdk</CodeBlock>
                <div className="mt-3">
                  <CodeBlock>{`import { Solobank } from "@solobank/sdk";

const agent = await Solobank.create();
const balance = await agent.balance();
await agent.send({ amount: 10, to: "9pFr...2kLx" });
await agent.lend({ asset: "USDC", amount: 80 });
await agent.swap({ fromAsset: "USDC", toAsset: "SOL", amount: 50 });`}</CodeBlock>
                </div>
              </div>
            </div>
          </SectionAnchor>

          {/* ── CLI Reference ── */}
          <SectionAnchor id="cli">
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-2 gradient-text">CLI Reference</h2>
              <p className="text-muted text-sm mb-6">
                <code className="text-solana-green">@solobank/cli</code> — 14 commands wrapping the SDK. Binary: <code className="text-solana-green">solobank</code>.
              </p>

              <div className="space-y-3">
                {CLI_COMMANDS.map((cmd) => (
                  <div
                    key={cmd.command}
                    className="bg-surface border border-border rounded-xl p-4 hover:border-border-hover transition-colors"
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <code className="font-mono text-sm font-bold text-foreground">
                        {cmd.command}
                      </code>
                      {cmd.flags && (
                        <span className="text-xs text-dim font-mono">{cmd.flags}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted leading-relaxed mb-3">
                      {cmd.description}
                    </p>
                    <CodeBlock>{`$ ${cmd.example}`}</CodeBlock>
                  </div>
                ))}
              </div>
            </div>
          </SectionAnchor>

          {/* ── SDK Reference ── */}
          <SectionAnchor id="sdk">
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-2 gradient-text">SDK Reference</h2>
              <p className="text-muted text-sm mb-6">
                <code className="text-solana-green">@solobank/sdk</code> — full TypeScript SDK. Exports: <code className="text-dim">&quot;.&quot;</code>, <code className="text-dim">&quot;./browser&quot;</code>, <code className="text-dim">&quot;./adapters&quot;</code>.
              </p>

              {SDK_METHODS.map((group) => (
                <div key={group.category} className="mb-8">
                  <h3 className="text-lg font-bold mb-4 gradient-text">
                    {group.category}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 pr-4 text-muted font-medium whitespace-nowrap">Method</th>
                          <th className="text-left py-3 pr-4 text-muted font-medium whitespace-nowrap">Returns</th>
                          <th className="text-left py-3 text-muted font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.methods.map((m) => (
                          <tr key={m.name} className="border-b border-border/50">
                            <td className="py-3 pr-4 font-mono text-xs text-solana-green whitespace-nowrap">
                              {m.name}
                            </td>
                            <td className="py-3 pr-4 font-mono text-xs text-dim whitespace-nowrap">
                              {m.returns}
                            </td>
                            <td className="py-3 text-muted text-xs">
                              {m.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}

              {/* Key types */}
              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4 gradient-text">Key Types</h3>
                <CodeBlock>{`interface BalanceSnapshot {
  address: string;
  sol: number; solRaw: bigint;
  usdc: number; usdcRaw: bigint;
  rpcUrl: string;
}

interface SendOptions {
  amount: number;
  to: string;
  asset?: "SOL" | "USDC" | "USDT" | "JUP";
  mint?: string;       // custom mint address
  dryRun?: boolean;
}

interface PayOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown;
  maxPrice?: number;
}

interface SwapQuoteOptions {
  fromAsset: string;
  toAsset: string;
  amount: number;
  slippageBps?: number;       // default 50
  swapMode?: "ExactIn" | "ExactOut";
  onlyDirectRoutes?: boolean;
}

interface SwapExecutionResult extends SwapQuoteResult {
  signature: string;
  explorerUrl: string;
}

interface LendOptions {
  asset: string;
  amount: number;
  protocol?: "auto" | "kamino" | "marginfi";
  dryRun?: boolean;
}

interface BorrowOptions {
  asset: string;
  amount: number;
  protocol?: "auto" | "kamino" | "marginfi";
  marketAddress?: string;
  bankAddress?: string;     // marginfi
  reserveAddress?: string;  // Kamino
  dryRun?: boolean;
}

interface WithdrawOptions extends BorrowOptions {
  withdrawAll?: boolean;
}

interface RepayOptions extends BorrowOptions {
  repayAll?: boolean;
}

interface RebalanceOptions extends BorrowOptions {
  targetProtocol?: "auto" | "kamino" | "marginfi";
  minApyDelta?: number;
}

interface RebalanceResult {
  status: "rebalanced" | "skipped";
  asset: string; amount: number;
  from: LendingRate; to: LendingRate;
  apyDelta: number;
  withdrawSignature?: string;
  lendSignature?: string;
}`}</CodeBlock>
              </div>

              {/* Browser export */}
              <div className="mt-8 bg-surface border border-border rounded-xl p-5">
                <h4 className="text-sm font-bold mb-3">Browser Client</h4>
                <p className="text-sm text-muted mb-3">
                  Lightweight MPP client for wallet-adapter integration:
                </p>
                <CodeBlock>{`import { createBrowserClient } from "@solobank/sdk/browser";

const client = createBrowserClient({
  connection,
  signer: walletAdapter,  // { publicKey, signTransaction }
});

const response = await client.pay({ url, maxPrice: 0.01 });`}</CodeBlock>
              </div>

              {/* Utility functions */}
              <div className="mt-8 bg-surface border border-border rounded-xl p-5">
                <h4 className="text-sm font-bold mb-3">Utility Functions</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 pr-4 text-muted font-medium">Function</th>
                        <th className="text-left py-3 text-muted font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["resolveAsset(input)", "Resolve asset symbol or mint to { symbol, mint, decimals }"],
                        ["truncateAddress(addr, prefix?, suffix?)", "Truncate address: 7xKp...3mNq"],
                        ["formatUsd(amount)", "Format number as $1,234.56"],
                        ["formatAssetAmount(amount, asset)", "Format with asset-specific decimals"],
                        ["formatPercent(value, digits?)", "Format as percentage string"],
                        ["walletExists(configDir?, keypairPath?)", "Check if wallet file exists on disk"],
                        ["keypairFromPrivateKey(key)", "Parse base64, JSON array, or Uint8Array to Keypair"],
                      ].map(([fn, desc]) => (
                        <tr key={fn} className="border-b border-border/50">
                          <td className="py-3 pr-4 font-mono text-xs text-solana-green whitespace-nowrap">{fn}</td>
                          <td className="py-3 text-muted text-xs">{desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </SectionAnchor>

          {/* ── MCP Server ── */}
          <SectionAnchor id="mcp">
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-2 gradient-text">MCP Server</h2>
              <p className="text-muted text-sm mb-6">
                <code className="text-solana-green">@solobank/mcp</code> — Model Context Protocol server for Claude, Cursor, Windsurf, and other MCP-compatible AI platforms.
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-4 gradient-text">Tools</h3>
                <div className="space-y-3">
                  {MCP_TOOLS.map((t) => (
                    <div
                      key={t.tool}
                      className="bg-surface border border-border rounded-xl p-4 hover:border-border-hover transition-colors"
                    >
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <code className="font-mono text-sm font-bold text-foreground">
                          {t.tool}
                        </code>
                        <span className="text-xs text-dim font-mono">
                          {t.params}
                        </span>
                      </div>
                      <p className="text-sm text-muted">{t.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface border border-border rounded-xl p-5">
                <h4 className="text-sm font-bold mb-3">Programmatic Usage</h4>
                <CodeBlock>{`import { startMcpServer, createMcpServer } from "@solobank/mcp";

// Start with stdio transport:
await startMcpServer({ rpcUrl: "https://..." });

// Or get server instance for custom transport:
const server = await createMcpServer({
  agent: myAgent,
  maxAmountPerTx: 5.0,  // spending cap per call (default 1.0)
});`}</CodeBlock>
              </div>
            </div>
          </SectionAnchor>

          {/* ── Payments (@solobank/mpp-solana) ── */}
          <SectionAnchor id="payments">
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-2 gradient-text">Payments</h2>
              <p className="text-muted text-sm mb-6">
                <code className="text-solana-green">@solobank/mpp-solana</code> — Solana USDC payment method for the Machine Payments Protocol (MPP). Handles 402 negotiation, multi-account transfers, and on-chain verification.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-surface border border-border rounded-xl p-5">
                  <h4 className="text-sm font-bold mb-3">Client (payer)</h4>
                  <CodeBlock>{`import { solanaClient } from "@solobank/mpp-solana/client";

const handler = solanaClient({
  connection,
  signer,  // { publicKey, signTransaction }
  commitment: "confirmed",
});`}</CodeBlock>
                </div>
                <div className="bg-surface border border-border rounded-xl p-5">
                  <h4 className="text-sm font-bold mb-3">Server (verifier)</h4>
                  <CodeBlock>{`import { solanaServer } from "@solobank/mpp-solana/server";

const handler = solanaServer({
  recipient: "Abcd...wxyz",
  rpcUrl: "https://...",
  commitment: "finalized",  // default
  tryConsumeReference: async (sig) => {
    // atomic check-and-mark (e.g. Redis SETNX)
    return redis.set(sig, "1", "NX");
  },
});`}</CodeBlock>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 gradient-text">Utility Functions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 pr-4 text-muted font-medium">Function</th>
                        <th className="text-left py-3 text-muted font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["fetchTokenAccounts(conn, owner, mint)", "Fetch SPL token accounts sorted by balance"],
                        ["buildTransferPlan(accounts, amount)", "Greedy multi-account spend plan"],
                        ["sumReceivedTokenAmount(pre, post, mint, owner)", "Compute token delta for verification"],
                        ["parseAmountToRaw(amount, decimals)", 'Convert decimal string to bigint (e.g. "1.50" \u2192 1500000n)'],
                      ].map(([fn, desc]) => (
                        <tr key={fn} className="border-b border-border/50">
                          <td className="py-3 pr-4 font-mono text-xs text-solana-green whitespace-nowrap">{fn}</td>
                          <td className="py-3 text-muted text-xs">{desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 bg-surface border border-border rounded-xl p-5">
                <h4 className="text-sm font-bold mb-3">Constants</h4>
                <div className="font-mono text-xs space-y-1">
                  <div><span className="text-muted">SOLANA_USDC_MINT:</span> <span className="text-solana-green">EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v</span></div>
                  <div><span className="text-muted">USDC_DECIMALS:</span> <span className="text-solana-green">6</span></div>
                </div>
              </div>
            </div>
          </SectionAnchor>

          {/* ── Environment Variables ── */}
          <SectionAnchor id="env">
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-2 gradient-text">Environment Variables</h2>
              <p className="text-muted text-sm mb-6">
                Optional configuration via environment variables.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 pr-4 text-muted font-medium">Variable</th>
                      <th className="text-left py-3 pr-4 text-muted font-medium">Default</th>
                      <th className="text-left py-3 text-muted font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ENV_VARS.map((v) => (
                      <tr key={v.name} className="border-b border-border/50">
                        <td className="py-3 pr-4 font-mono text-xs text-solana-green whitespace-nowrap">{v.name}</td>
                        <td className="py-3 pr-4 font-mono text-xs text-dim whitespace-nowrap">{v.default}</td>
                        <td className="py-3 text-muted text-xs">{v.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </SectionAnchor>

          {/* CTA */}
          <div className="mt-8 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft size={14} /> Back to home
            </Link>
            <a
              href="https://github.com/decentrathon/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-solana-green hover:brightness-110 transition-all"
            >
              View on GitHub <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
