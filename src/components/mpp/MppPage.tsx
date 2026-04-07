"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  Zap,
  Wallet,
  DollarSign,
  Globe,
  AlertCircle,
  CheckCircle,
  Bot,
  Shield,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { GridSpotlight } from "@/components/ui/GridSpotlight";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Copy button helper                                                 */
/* ------------------------------------------------------------------ */

const INSTALL_CMD = "npm install @solobank/sdk";

function CopyPill({ command, className }: { command: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("flex items-center gap-3 bg-surface/60 border border-border rounded-full px-5 py-2.5 font-mono text-sm", className)}>
      <span className="text-dim">$</span>
      <span className="text-foreground whitespace-nowrap">{command}</span>
      <button
        onClick={handleCopy}
        className="text-muted hover:text-solana-green transition-colors ml-1 flex-shrink-0"
        aria-label="Copy command"
      >
        {copied ? <Check size={14} className="text-solana-green" /> : <Copy size={14} />}
      </button>
    </div>
  );
}

function CopyBox({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-4 flex items-center gap-4 max-w-xl mx-auto overflow-x-auto">
      <code className="font-mono text-solana-green text-sm flex-1 text-left whitespace-nowrap">
        {command}
      </code>
      <button
        onClick={handleCopy}
        className={cn(
          "flex-shrink-0 p-2 rounded-lg border transition-all duration-200",
          copied
            ? "border-solana-green/30 text-solana-green"
            : "border-border text-muted hover:text-foreground hover:border-border-hover"
        )}
        aria-label="Copy command"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Code block with manual syntax highlighting                         */
/* ------------------------------------------------------------------ */

function CodeBlock({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-border bg-background/60 overflow-hidden flex flex-col", className)}>
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface/30">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs text-dim ml-2 font-mono">{label}</span>
      </div>
      <pre className="px-4 py-4 font-mono text-xs leading-relaxed overflow-x-auto flex-1 flex items-center">
        <code>{children}</code>
      </pre>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 1: Hero                                                    */
/* ------------------------------------------------------------------ */

function HeroSection() {
  return (
    <GridSpotlight className="min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(153,69,255,0.12)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
        <Badge variant="purple">Machine Payments Protocol</Badge>

        <h1 className="mt-8 text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[1.1]">
          Accept USDC
          <br />
          <span className="gradient-text">on Solana.</span>
        </h1>

        <p className="mt-6 text-muted text-lg md:text-xl max-w-2xl">
          Your AI agent pays automatically. No API keys. No credit cards. Just USDC.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/docs">
            <Button variant="primary" size="lg">
              Get started <ArrowRight size={16} />
            </Button>
          </Link>
          <a
            href="https://github.com/solobank-ai/mpp-solana"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" size="lg">
              View on GitHub <ExternalLink size={14} />
            </Button>
          </a>
        </div>

        <div className="mt-6">
          <CopyPill command={INSTALL_CMD} />
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full">
          {[
            { label: "Per transaction", value: "<$0.001" },
            { label: "Settlement", value: "Fast" },
            { label: "Open standard", value: "MIT" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-surface/40 border border-border rounded-xl px-4 py-3 text-center"
            >
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs text-dim mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </GridSpotlight>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 2: For API Developers                                      */
/* ------------------------------------------------------------------ */

function ForDevelopersSection() {
  const features = [
    {
      icon: Zap,
      title: "Fast settlement",
      description: "Payments confirm on Solana before the API response is sent.",
      accent: "green" as const,
    },
    {
      icon: Wallet,
      title: "Direct to wallet",
      description: "USDC goes straight to your Solana address. No intermediary, no custodian.",
      accent: "purple" as const,
    },
    {
      icon: DollarSign,
      title: "Minimal gas",
      description: "<$0.001 per transaction. Cheaper than a credit card swipe fee.",
      accent: "green" as const,
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              For <span className="gradient-text">API developers</span>
            </h2>
            <p className="mt-4 text-muted text-lg">
              Accept USDC payments on any HTTP endpoint. Five lines of code.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <AnimateIn delay={100} className="h-full">
            <CodeBlock label="server.ts" className="h-full">
              <span className="text-solana-purple">import</span>{" "}
              {"{ Mppx }"} <span className="text-solana-purple">from</span>{" "}
              <span className="text-solana-green">&apos;mppx&apos;</span>;{"\n"}
              <span className="text-solana-purple">import</span>{" "}
              {"{ solanaServer }"} <span className="text-solana-purple">from</span>{" "}
              <span className="text-solana-green">&apos;@solobank/sdk/mpp&apos;</span>;{"\n"}
              {"\n"}
              <span className="text-solana-purple">const</span> mppx = Mppx.
              <span className="text-foreground">create</span>({"{"}{"\n"}
              {"  "}methods: [{"\n"}
              {"    "}
              <span className="text-foreground">solanaServer</span>({"{"}{"\n"}
              {"      "}recipient:{" "}
              <span className="text-solana-green">&apos;YOUR_SOLANA_WALLET&apos;</span>,{"\n"}
              {"    "}
              {"}"}),{"\n"}
              {"  "}],{"\n"}
              {"}"});
            </CodeBlock>
          </AnimateIn>

          <div className="flex flex-col gap-4">
            {features.map((feat, i) => (
              <AnimateIn key={feat.title} delay={150 + i * 80} className="flex-1">
                <div className="group flex items-center gap-5 rounded-xl border border-border bg-surface/30 p-6 hover:border-[rgba(153,69,255,0.2)] hover:bg-surface/50 transition-all duration-300 h-full">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
                      feat.accent === "purple"
                        ? "bg-[rgba(153,69,255,0.1)] text-solana-purple"
                        : "bg-[rgba(20,241,149,0.1)] text-solana-green"
                    )}
                  >
                    <feat.icon size={22} />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-foreground">{feat.title}</h4>
                    <p className="text-sm text-muted mt-1.5 leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 3: For AI Agents                                           */
/* ------------------------------------------------------------------ */

function ForAgentsSection() {
  const props = [
    {
      icon: Bot,
      title: "Autonomous payments",
      description: "Agents pay APIs without human intervention. Just a wallet and USDC.",
    },
    {
      icon: Shield,
      title: "On-chain verification",
      description: "Every payment is cryptographically provable via Solana transaction signatures.",
    },
    {
      icon: Layers,
      title: "Multi-account support",
      description: "Aggregate balances across multiple SPL token accounts automatically.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              For <span className="gradient-text">AI agents</span>
            </h2>
            <p className="mt-4 text-muted text-lg">
              No API keys. No credit cards. Just money.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="flex flex-col gap-4 order-2 lg:order-1">
            {props.map((prop, i) => (
              <AnimateIn key={prop.title} delay={100 + i * 80} className="flex-1">
                <div className="group flex items-center gap-5 rounded-xl border border-border bg-surface/30 p-6 hover:border-[rgba(20,241,149,0.2)] hover:bg-surface/50 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-[rgba(20,241,149,0.1)] text-solana-green">
                    <prop.icon size={22} />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-foreground">{prop.title}</h4>
                    <p className="text-sm text-muted mt-1.5 leading-relaxed">{prop.description}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={100} className="order-1 lg:order-2 h-full">
            <CodeBlock label="client.ts" className="h-full">
              <span className="text-solana-purple">import</span>{" "}
              {"{ Connection, Keypair }"} <span className="text-solana-purple">from</span>{" "}
              <span className="text-solana-green">&apos;@solana/web3.js&apos;</span>;{"\n"}
              <span className="text-solana-purple">import</span>{" "}
              {"{ Mppx }"} <span className="text-solana-purple">from</span>{" "}
              <span className="text-solana-green">&apos;mppx/client&apos;</span>;{"\n"}
              <span className="text-solana-purple">import</span>{" "}
              {"{ solanaClient }"} <span className="text-solana-purple">from</span>{" "}
              <span className="text-solana-green">&apos;@solobank/sdk/mpp&apos;</span>;{"\n"}
              {"\n"}
              <span className="text-solana-purple">const</span> connection ={" "}
              <span className="text-solana-purple">new</span>{" "}
              <span className="text-foreground">Connection</span>(rpcUrl);{"\n"}
              <span className="text-solana-purple">const</span> signer = Keypair.
              <span className="text-foreground">generate</span>();{"\n"}
              {"\n"}
              <span className="text-solana-purple">const</span> mppx = Mppx.
              <span className="text-foreground">create</span>({"{"}{"\n"}
              {"  "}methods: [{"\n"}
              {"    "}
              <span className="text-foreground">solanaClient</span>({"{"}{"\n"}
              {"      "}connection,{"\n"}
              {"      "}signer: {"{"} publicKey, signTransaction {"}"},
              {"\n"}
              {"    "}
              {"}"}),{"\n"}
              {"  "}],{"\n"}
              {"}"});
            </CodeBlock>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 4: How It Works (402 flow)                                 */
/* ------------------------------------------------------------------ */

function HowItWorksSection() {
  const steps = [
    {
      step: 1,
      icon: Globe,
      title: "Request",
      description: "Agent calls a paid API endpoint.",
    },
    {
      step: 2,
      icon: AlertCircle,
      title: "402 Response",
      description: "Server responds with 402 Payment Required + payment challenge.",
    },
    {
      step: 3,
      icon: Wallet,
      title: "Pay on Solana",
      description: "Agent signs a USDC transfer on Solana.",
    },
    {
      step: 4,
      icon: CheckCircle,
      title: "Retry with proof",
      description: "Agent retries the request with the Solana signature as credential.",
    },
  ];

  return (
    <GridSpotlight className="overflow-hidden">
      <section className="py-16 md:py-24 overflow-hidden relative z-[1]">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateIn>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                How <span className="gradient-text">MPP</span> works
              </h2>
              <p className="mt-4 text-muted text-lg">
                The HTTP 402 Payment Required flow
              </p>
            </div>
          </AnimateIn>

          <div className="relative">
            <AnimateIn delay={0} className="hidden lg:block absolute top-14 left-[10%] right-[10%] z-0">
              <div className="h-px bg-gradient-to-r from-solana-purple/40 via-solana-green/30 to-solana-purple/40" />
            </AnimateIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6">
              {steps.map((step, i) => (
                <AnimateIn key={step.step} delay={i * 120}>
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <div className="w-24 h-24 rounded-full bg-[#111116] border border-[rgba(153,69,255,0.2)] flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(153,69,255,0.15)] to-[rgba(20,241,149,0.08)]" />
                        <step.icon size={28} className="text-solana-green relative z-10" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-solana-green text-background text-xs font-bold flex items-center justify-center shadow-[0_0_16px_rgba(20,241,149,0.4)]">
                        {step.step}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-muted text-sm leading-relaxed max-w-[240px]">
                      {step.description}
                    </p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </GridSpotlight>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 5: Why Solana                                              */
/* ------------------------------------------------------------------ */

function WhySolanaSection() {
  const metrics = [
    {
      value: "<1s",
      label: "Fast settlement",
      description: "Payments confirm in under a second. No waiting, no polling.",
    },
    {
      value: "<$0.001",
      label: "Average gas cost",
      description: "Thousands of payments for pennies. Cheaper than any card network.",
    },
    {
      value: "Native USDC",
      label: "Circle-issued",
      description: "Not bridged, not wrapped. Devnet USDC test mint today, mainnet-ready.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <AnimateIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Why <span className="gradient-text">Solana</span>
            </h2>
            <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
              The fastest, cheapest settlement layer for machine payments.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric, i) => (
            <AnimateIn key={metric.label} delay={i * 100}>
              <div className="group relative rounded-2xl border border-border bg-surface/40 p-8 text-center hover:border-[rgba(20,241,149,0.3)] transition-all duration-300 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[rgba(153,69,255,0.05)] to-[rgba(20,241,149,0.03)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm font-semibold text-foreground mb-3">
                    {metric.label}
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    {metric.description}
                  </p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 6: Open Standard                                           */
/* ------------------------------------------------------------------ */

function OpenStandardSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <AnimateIn>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Open <span className="gradient-text">standard</span>
          </h2>
          <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
            MPP is a non-proprietary protocol. Any client can pay any server. No vendor lock-in.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <a
              href="https://www.npmjs.com/package/@solobank/mpp-solana"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="md">
                npm <ExternalLink size={14} />
              </Button>
            </a>
            <a
              href="https://github.com/solobank-ai/mpp-solana"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="md">
                GitHub <ExternalLink size={14} />
              </Button>
            </a>
            <a
              href="https://mpp.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="md">
                MPP Spec <ExternalLink size={14} />
              </Button>
            </a>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 7: CTA Footer                                              */
/* ------------------------------------------------------------------ */

function CtaSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(153,69,255,0.1)_0%,rgba(20,241,149,0.04)_50%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Start accepting{" "}
          <span className="gradient-text">USDC payments</span>
        </h2>
        <p className="mt-4 text-muted text-lg">
          Add Solana payments to your API in minutes.
        </p>

        <div className="mt-10">
          <CopyBox command={INSTALL_CMD} />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <a
            href="https://github.com/solobank-ai/mpp-solana"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="md">
              GitHub <ExternalLink size={14} />
            </Button>
          </a>
          <a
            href="https://www.npmjs.com/package/@solobank/mpp-solana"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="md">
              npm <ExternalLink size={14} />
            </Button>
          </a>
          <Link href="/docs">
            <Button variant="primary" size="md">
              Read the docs <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page component                                                */
/* ------------------------------------------------------------------ */

export function MppPage(): React.ReactElement {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ForDevelopersSection />
      <ForAgentsSection />
      <HowItWorksSection />
      <WhySolanaSection />
      <CtaSection />
    </main>
  );
}
