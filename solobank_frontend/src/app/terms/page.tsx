import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Solobank",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted text-sm mb-12">Last updated: March 29, 2026</p>

        <div className="prose-custom space-y-8 text-muted text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. What Solobank is</h2>
            <p>
              Solobank is an open-source software toolkit consisting of four packages:{" "}
              <code>@solobank/sdk</code>, <code>@solobank/cli</code>, <code>@solobank/mcp</code>, and{" "}
              <code>solobank</code> (the MPP payment method). Together they allow AI agents to hold,
              send, earn, borrow, swap, and pay with digital assets on the Solana blockchain.
            </p>
            <p className="mt-3">
              Solobank is <strong className="text-foreground">not a bank</strong>, financial institution,
              money transmitter, or custodian. It is developer tooling. No entity holds, controls,
              or has access to your funds.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Non-custodial architecture</h2>
            <p>
              All private keys are generated and stored locally on your device via{" "}
              <code>solobank init</code>. Solobank never transmits, collects, or has access to your
              private keys. You are solely responsible for securing your key file and any backups.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. DeFi protocol interactions</h2>
            <p>
              The SDK integrates with third-party DeFi protocols including Kamino, marginfi, and
              Jupiter. These interactions carry inherent risks including but not limited to smart
              contract vulnerabilities, liquidity risks, and protocol governance changes. Solobank
              does not control these protocols and makes no guarantees about their safety or APY rates.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Agent safeguards</h2>
            <p>
              The CLI configures per-transaction and daily spending limits during{" "}
              <code>solobank init</code>. These safeguards are enforced locally and can be modified by
              anyone with access to the configuration file. They are a convenience feature, not a
              security guarantee.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. No warranties</h2>
            <p>
              The software is provided &ldquo;as is&rdquo; without warranty of any kind, express or
              implied. This includes no warranty of merchantability, fitness for a particular purpose,
              or non-infringement. Use at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Limitation of liability</h2>
            <p>
              In no event shall the Solobank contributors be liable for any loss of funds, data, or
              profits arising from the use of the software, including losses caused by bugs,
              third-party protocol failures, or blockchain network issues.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Open source license</h2>
            <p>
              Solobank packages are released under open-source licenses. See the{" "}
              <a
                href="https://github.com/decentrathon/package"
                target="_blank"
                rel="noopener noreferrer"
                className="text-solana-green hover:underline"
              >
                GitHub repository
              </a>{" "}
              for license details. You are free to use, modify, and distribute the code in
              accordance with its license.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">8. Changes to these terms</h2>
            <p>
              We may update these terms at any time. Continued use of the software constitutes
              acceptance of the revised terms.
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
