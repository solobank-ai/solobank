import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Solobank",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted text-sm mb-12">Last updated: March 29, 2026</p>

        <div className="prose-custom space-y-8 text-muted text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">TL;DR</h2>
            <p>
              Solobank is non-custodial software that runs entirely on your machine. We do not
              collect, store, or transmit any personal data, wallet addresses, private keys, or
              transaction history.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">What we don&apos;t collect</h2>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Private keys or seed phrases</li>
              <li>Wallet addresses or balances</li>
              <li>Transaction history or signing requests</li>
              <li>Names, emails, or any personally identifiable information</li>
              <li>IP addresses or device fingerprints</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">How the software works</h2>
            <p>
              All four packages (<code>@solobank/sdk</code>, <code>@solobank/cli</code>,{" "}
              <code>@solobank/mcp</code>, <code>solobank</code>) run locally on your machine. The CLI
              generates a Solana keypair stored in a local file during <code>solobank init</code>.
              All RPC calls go directly from your machine to the Solana network — no proxy, no
              intermediary.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Third-party services</h2>
            <p>The software interacts directly with:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong className="text-foreground">Solana RPC</strong> — for blockchain queries and
                transaction submission. Your RPC provider may have its own privacy policy.
              </li>
              <li>
                <strong className="text-foreground">Jupiter API</strong> — for swap quotes and
                routing. See{" "}
                <a
                  href="https://jup.ag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-solana-green hover:underline"
                >
                  jup.ag
                </a>{" "}
                for their privacy practices.
              </li>
              <li>
                <strong className="text-foreground">Kamino &amp; marginfi</strong> — for lending and
                borrowing. These are on-chain DeFi protocols; interactions are public blockchain
                transactions.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Blockchain transparency</h2>
            <p>
              Solana is a public blockchain. All transactions submitted through Solobank are visible
              to anyone. Wallet addresses, transfer amounts, and protocol interactions are permanently
              recorded on-chain. This is inherent to blockchain technology and not controlled by
              Solobank.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">This website</h2>
            <p>
              The Solobank website (solobank.dev) is a static site hosted on Vercel. Vercel may
              collect standard web analytics (page views, country-level geography). No cookies are
              set by Solobank. No tracking scripts are loaded.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">MCP server</h2>
            <p>
              The <code>@solobank/mcp</code> server runs as a local stdio process. It communicates only
              with the MCP client (Claude Desktop, Cursor, etc.) on your machine and the Solana RPC
              endpoint. No data is sent to Solobank servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Changes</h2>
            <p>
              If our practices change, we will update this page. Since we don&apos;t collect data,
              meaningful changes are unlikely.
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
