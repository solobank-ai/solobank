"use client";

import { RefreshCw, PiggyBank, CreditCard, TrendingUp, ArrowLeftRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { useTranslation } from "@/lib/i18n/context";

interface AccountCardData {
  type: string;
  titleKey: keyof typeof import("@/lib/i18n/translations/en").en.accounts;
  command: string;
  hero?: { label: string; value: string };
  stats?: { label: string; value: string }[];
  tags?: string[];
}

const ACCOUNT_CARDS: AccountCardData[] = [
  {
    type: "checking",
    titleKey: "checking",
    command: "solobank send 10 9pFr...2kLx",
    hero: { label: "AVAILABLE", value: "2,401.00" },
  },
  {
    type: "savings",
    titleKey: "savings",
    command: "solobank lend 80 USDC",
    hero: { label: "APY", value: "8.2%" },
    stats: [
      { label: "LOCKED", value: "0.00" },
      { label: "LIQUID", value: "4,102.42" },
    ],
  },
  {
    type: "credit",
    titleKey: "credit",
    command: "solobank borrow 20 USDC",
    stats: [
      { label: "UTILIZATION", value: "25%" },
      { label: "LIMIT", value: "5,000" },
    ],
  },
  {
    type: "invest",
    titleKey: "invest",
    command: "solobank swap 200 USDC SOL",
    tags: ["JUPITER", "BEST ROUTE"],
  },
  {
    type: "swap",
    titleKey: "swap",
    command: "solobank swap 5 USDC SOL",
    stats: [
      { label: "SLIPPAGE", value: "0.1%" },
    ],
  },
];

const CARD_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  checking: RefreshCw,
  savings: PiggyBank,
  credit: CreditCard,
  invest: TrendingUp,
  swap: ArrowLeftRight,
};

function CardIcon({ type }: { type: string }) {
  const Icon = CARD_ICONS[type];
  if (!Icon) return null;
  return (
    <div className="w-7 h-7 rounded-lg bg-[rgba(153,69,255,0.1)] flex items-center justify-center">
      <Icon size={14} className="text-solana-purple" />
    </div>
  );
}

export function Accounts(): React.ReactElement {
  const { t } = useTranslation();
  const featured = ACCOUNT_CARDS.slice(0, 2);
  const rest = ACCOUNT_CARDS.slice(2);

  const getCard = (card: AccountCardData) => {
    const acct = t.accounts[card.titleKey as keyof typeof t.accounts];
    if (typeof acct === "string") return { title: acct, description: "" };
    return acct;
  };

  return (
    <section id="accounts" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            {t.accounts.title1}{" "}
            <span className="gradient-text">{t.accounts.title2}</span>
          </h2>
          <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
            {t.accounts.subtitle}
          </p>
        </div>

        {/* Featured cards — Checking & Savings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {featured.map((card, i) => {
            const { title, description } = getCard(card);
            return (
              <AnimateIn key={card.type} delay={i * 80}>
                <div className="card-gradient-border group hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(153,69,255,0.08)] transition-all duration-200 h-full">
                  <div className="card-inner p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <CardIcon type={card.type} />
                        <span className="text-xs font-bold tracking-widest text-foreground uppercase">
                          {title}
                        </span>
                      </div>
                      {card.hero && (
                        <div className="text-right">
                          <div className="text-[10px] tracking-widest text-dim uppercase">
                            {card.hero.label}
                          </div>
                          <div className="text-3xl font-bold text-solana-green leading-tight">
                            {card.hero.value}
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-muted text-sm leading-relaxed mb-5">
                      {description}
                    </p>
                    <div className="bg-background/60 rounded-lg px-4 py-3 font-mono text-xs text-solana-green overflow-x-auto whitespace-nowrap mb-4">
                      $ {card.command} <span className="animate-pulse">_</span>
                    </div>
                    {card.stats && (
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        {card.stats.map((stat) => (
                          <div key={stat.label}>
                            <span className="text-[10px] tracking-widest text-dim uppercase">{stat.label}:</span>{" "}
                            <span className="text-xs font-medium text-muted">{stat.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>

        {/* Bottom row — Credit, Invest, Swap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rest.map((card, i) => {
            const { title, description } = getCard(card);
            return (
              <AnimateIn key={card.type} delay={(i + 2) * 80}>
                <div className="card-gradient-border group hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(153,69,255,0.08)] transition-all duration-200 h-full">
                  <div className="card-inner p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <CardIcon type={card.type} />
                      <span className="text-xs font-bold tracking-widest text-foreground uppercase">
                        {title}
                      </span>
                    </div>
                    <p className="text-muted text-sm leading-relaxed mb-4">
                      {description}
                    </p>
                    <div className="bg-background/60 rounded-lg px-4 py-3 font-mono text-xs text-solana-green overflow-x-auto whitespace-nowrap mb-3">
                      $ {card.command}
                    </div>
                    {card.stats && (
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        {card.stats.map((stat) => (
                          <div key={stat.label}>
                            <span className="text-[10px] tracking-widest text-dim uppercase">{stat.label}:</span>{" "}
                            <span className="text-xs font-medium text-muted">{stat.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {card.tags && (
                      <div className="flex items-center gap-2 pt-3 border-t border-border">
                        {card.tags.map((tag) => (
                          <Badge key={tag} variant="accent">{tag}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
