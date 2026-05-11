import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security — Solobank",
};

export default function SecurityPage() {
  return (
    <main className="min-h-screen pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-2">Security</h1>
        <p className="text-muted text-sm mb-12">Last updated: March 29, 2026</p>

        <div className="prose-custom space-y-8 text-muted text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Architecture</h2>
            <p>
              Solobank is fully non-custodial. The architecture is designed so that no server, API,
              or third party ever has access to your private keys or the ability to move your funds.
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>
                <strong className="text-foreground">Local key generation</strong> —{" "}
                <code>solobank init</code> generates a Solana keypair and stores it as a JSON file on
                your machine. The key never leaves your device.
              </li>
              <li>
                <strong className="text-foreground">Direct RPC</strong> — all blockchain interactions
                go directly from your machine to the Solana RPC endpoint. No proxy or relay server.
              </li>
              <li>
                <strong className="text-foreground">Local MCP server</strong> — the{" "}
                <code>@solobank/mcp</code> server runs as a local stdio process, not a network service.
                It is only accessible to the MCP client on your machine.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Agent safeguards</h2>
            <p>
              When an AI agent operates a wallet, spending controls are critical. Solobank provides
              configurable safeguards set during <code>solobank init</code>:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>
                <strong className="text-foreground">Per-transaction limit</strong> — maximum amount
                for a single send or swap operation.
              </li>
              <li>
                <strong className="text-foreground">Daily spending limit</strong> — cumulative cap on
                outgoing transactions within a 24-hour window.
              </li>
            </ul>
            <p className="mt-3">
              These limits are enforced locally by the SDK before signing any transaction. They are
              a safety net, not a replacement for proper key management.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">DeFi protocol risks</h2>
            <p>
              Solobank integrates with established DeFi protocols on Solana:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>
                <strong className="text-foreground">Jupiter</strong> — for token swaps and routing
              </li>
              <li>
                <strong className="text-foreground">Kamino</strong> — for lending and yield
              </li>
              <li>
                <strong className="text-foreground">marginfi</strong> — for lending, borrowing, and
                yield
              </li>
            </ul>
            <p className="mt-3">
              These protocols carry inherent risks including smart contract bugs, oracle failures,
              and liquidity crises. Solobank does not audit these protocols. The{" "}
              <code>protocol: &apos;auto&apos;</code> routing in the SDK selects by APY, not by risk
              profile. Users should assess protocol risks independently.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">MPP payments</h2>
            <p>
              The <code>solobank</code> package implements the Machine Payments Protocol (MPP) for
              agent-to-API payments. The server-side verifies Solana transaction signatures directly
              against RPC token balance deltas — no trust assumptions beyond the blockchain itself.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Open source</h2>
            <p>
              All Solobank code is open source and available on{" "}
              <a
                href="https://github.com/decentrathon/package"
                target="_blank"
                rel="noopener noreferrer"
                className="text-solana-green hover:underline"
              >
                GitHub
              </a>
              . You can audit every line of code that touches your keys, builds transactions, or
              interacts with protocols. We encourage security review from the community.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Best practices</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Keep your keypair file permissions restricted (<code>chmod 600</code>)</li>
              <li>Use a dedicated wallet for agent operations — don&apos;t reuse your main wallet</li>
              <li>Set conservative spending limits, especially during initial testing</li>
              <li>Use a private or rate-limited RPC endpoint in production</li>
              <li>Regularly monitor your wallet balance and transaction history on-chain</li>
              <li>Keep Solobank packages updated to the latest version</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Reporting vulnerabilities</h2>
            <p>
              If you discover a security vulnerability in any Solobank package, please report it
              responsibly via{" "}
              <a
                href="https://github.com/decentrathon/package/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-solana-green hover:underline"
              >
                GitHub Issues
              </a>{" "}
              or contact the maintainers directly. Do not disclose vulnerabilities publicly until a
              fix is available.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
            &larr; Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
