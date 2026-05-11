"use client";

import {
  Send,
  PiggyBank,
  CreditCard,
  ArrowLeftRight,
  TrendingUp,
  Zap,
  Cpu,
  Shield,
  Layers,
  Monitor,
} from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { useTranslation } from "@/lib/i18n/context";

/* ------------------------------------------------------------------ */
/*  Hero cards                                                         */
/* ------------------------------------------------------------------ */

function HeroSend() {
  const { t } = useTranslation();
  return (
    <AnimateIn delay={0} className="h-full">
      <div className="group relative rounded-2xl border border-border bg-surface/40 p-8 h-full overflow-hidden hover:border-[rgba(20,241,149,0.3)] transition-all duration-300">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[radial-gradient(circle,rgba(20,241,149,0.08)_0%,transparent_70%)]" />
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-xl bg-[rgba(20,241,149,0.1)] flex items-center justify-center mb-5">
            <Send size={24} className="text-solana-green" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">{t.comparison.sendReceive.title}</h3>
          <p className="text-muted text-sm leading-relaxed mb-6">{t.comparison.sendReceive.description}</p>
          <div className="bg-background/60 rounded-lg px-4 py-3 font-mono text-xs border border-border">
            <span className="text-dim">$</span>{" "}
            <span className="text-foreground">solobank send</span>{" "}
            <span className="text-solana-green">10</span>{" "}
            <span className="text-solana-purple">9pFr...2kLx</span>
          </div>
        </div>
      </div>
    </AnimateIn>
  );
}

function HeroEarn() {
  const { t } = useTranslation();
  return (
    <AnimateIn delay={80} className="h-full">
      <div className="group relative rounded-2xl border border-border bg-surface/40 p-8 h-full overflow-hidden hover:border-[rgba(153,69,255,0.3)] transition-all duration-300">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-[radial-gradient(circle,rgba(153,69,255,0.08)_0%,transparent_70%)]" />
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-xl bg-[rgba(153,69,255,0.1)] flex items-center justify-center mb-5">
            <PiggyBank size={24} className="text-solana-purple" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">{t.comparison.earnApy.title}</h3>
          <p className="text-muted text-sm leading-relaxed mb-6">{t.comparison.earnApy.description}</p>
          <div className="space-y-2">
            {[
              { label: "Kamino", value: "6.2%", width: "75%" },
              { label: "marginfi", value: "8.1%", width: "95%" },
            ].map((p) => (
              <div key={p.label} className="flex items-center gap-3">
                <span className="text-xs text-dim w-16 font-mono">{p.label}</span>
                <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-solana-purple to-solana-green" style={{ width: p.width }} />
                </div>
                <span className="text-xs font-mono text-solana-green w-10 text-right">{p.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimateIn>
  );
}

function HeroMCP() {
  const { t } = useTranslation();
  return (
    <AnimateIn delay={160} className="h-full">
      <div className="group relative rounded-2xl border border-border bg-surface/40 p-8 h-full overflow-hidden hover:border-[rgba(20,241,149,0.3)] transition-all duration-300">
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-[radial-gradient(circle,rgba(20,241,149,0.06)_0%,transparent_70%)]" />
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-xl bg-[rgba(20,241,149,0.1)] flex items-center justify-center mb-5">
            <Cpu size={24} className="text-solana-green" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">{t.comparison.mcpTools.title}</h3>
          <p className="text-muted text-sm leading-relaxed mb-6">{t.comparison.mcpTools.description}</p>
          <div className="grid grid-cols-2 gap-2">
            {["solobank_address", "solobank_balance", "solobank_send", "solobank_pay"].map((tool) => (
              <div key={tool} className="bg-background/60 rounded-lg px-3 py-2 font-mono text-xs text-solana-green border border-border">
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimateIn>
  );
}

/* ------------------------------------------------------------------ */
/*  Compact feature card                                               */
/* ------------------------------------------------------------------ */

interface CompactFeature {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  titleKey: string;
  descKey: string;
  accent: "purple" | "green";
}

function CompactCard({ feat, index, stretch }: { feat: CompactFeature; index: number; stretch?: boolean }) {
  const { t } = useTranslation();
  const title = (t.comparison as any)[feat.titleKey] as string;
  const description = (t.comparison as any)[feat.descKey] as string;

  return (
    <AnimateIn delay={(index + 3) * 60} className={stretch ? "flex-1" : undefined}>
      <div className={`group flex items-start gap-4 rounded-xl border border-border bg-surface/30 p-4 hover:border-[rgba(153,69,255,0.2)] hover:bg-surface/50 transition-all duration-300 ${stretch ? "h-full" : ""}`}>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
          feat.accent === "purple"
            ? "bg-[rgba(153,69,255,0.1)] text-solana-purple"
            : "bg-[rgba(20,241,149,0.1)] text-solana-green"
        }`}>
          <feat.icon size={16} />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-foreground">{title}</h4>
          <p className="text-xs text-muted mt-0.5">{description}</p>
        </div>
      </div>
    </AnimateIn>
  );
}

const COMPACT_FEATURES: CompactFeature[] = [
  { icon: CreditCard, titleKey: "borrowOnDemand", descKey: "borrowDesc", accent: "green" },
  { icon: ArrowLeftRight, titleKey: "jupiterSwaps", descKey: "jupiterDesc", accent: "purple" },
  { icon: TrendingUp, titleKey: "autoRebalance", descKey: "autoRebalanceDesc", accent: "green" },
  { icon: Zap, titleKey: "mppProtocol", descKey: "mppDesc", accent: "purple" },
  { icon: Shield, titleKey: "agentSafeguards", descKey: "safeguardsDesc", accent: "green" },
  { icon: Layers, titleKey: "defiProtocols", descKey: "defiDesc", accent: "purple" },
  { icon: Monitor, titleKey: "browserClient", descKey: "browserDesc", accent: "green" },
];

/* ------------------------------------------------------------------ */
/*  Bento layout                                                       */
/* ------------------------------------------------------------------ */

export function Comparison(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            {t.comparison.title}
          </h2>
          <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
            {t.comparison.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="md:col-span-1 lg:col-span-1"><HeroSend /></div>
          <div className="md:col-span-1 lg:col-span-2"><HeroEarn /></div>
          <div className="lg:col-span-2"><HeroMCP /></div>
          <div className="flex flex-col gap-3">
            {COMPACT_FEATURES.slice(0, 3).map((feat, i) => (
              <CompactCard key={feat.titleKey} feat={feat} index={i} stretch />
            ))}
          </div>
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {COMPACT_FEATURES.slice(3).map((feat, i) => (
              <CompactCard key={feat.titleKey} feat={feat} index={i + 3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
