"use client";

import {
  RefreshCw,
  PiggyBank,
  CreditCard,
  TrendingUp,
  ArrowLeftRight,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/context";

type AccountType = "checking" | "savings" | "credit" | "invest" | "swap";

interface AccountCardData {
  type: AccountType;
  titleKey: keyof typeof import("@/lib/i18n/translations/en").en.accounts;
  command: string;
  hero?: { label: string; value: string };
  stats?: { label: string; value: string }[];
  tags?: string[];
}

// ── Semantic colour palette ──────────────────────────────────────────────────
// Each account gets its own accent so the eye learns the vocabulary instantly.
// The values map to tailwind v4 CSS vars defined in globals.css.
interface AccountTheme {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconClass: string;
  iconBg: string;
  valueClass: string;
  glow: string;
  gradient: string;
  ring: string;
}

const ACCOUNT_THEMES: Record<AccountType, AccountTheme> = {
  checking: {
    icon: RefreshCw,
    iconClass: "text-solana-green",
    iconBg: "bg-[rgba(20,241,149,0.12)]",
    valueClass: "text-solana-green",
    glow: "shadow-[0_0_60px_rgba(20,241,149,0.12)] group-hover:shadow-[0_0_80px_rgba(20,241,149,0.22)]",
    gradient: "from-[rgba(20,241,149,0.35)] to-[rgba(20,241,149,0.05)]",
    ring: "group-hover:border-[rgba(20,241,149,0.4)]",
  },
  savings: {
    icon: PiggyBank,
    iconClass: "text-solana-purple",
    iconBg: "bg-[rgba(153,69,255,0.15)]",
    valueClass: "gradient-text",
    glow: "shadow-[0_0_80px_rgba(153,69,255,0.18)] group-hover:shadow-[0_0_120px_rgba(153,69,255,0.3)]",
    gradient: "from-[rgba(153,69,255,0.45)] via-[rgba(203,156,255,0.2)] to-[rgba(20,241,149,0.15)]",
    ring: "group-hover:border-[rgba(153,69,255,0.5)]",
  },
  credit: {
    icon: CreditCard,
    iconClass: "text-yellow",
    iconBg: "bg-[rgba(249,209,0,0.12)]",
    valueClass: "text-yellow",
    glow: "shadow-[0_0_60px_rgba(249,209,0,0.10)] group-hover:shadow-[0_0_80px_rgba(249,209,0,0.18)]",
    gradient: "from-[rgba(249,209,0,0.3)] to-[rgba(255,107,26,0.05)]",
    ring: "group-hover:border-[rgba(249,209,0,0.35)]",
  },
  invest: {
    icon: TrendingUp,
    iconClass: "text-blue",
    iconBg: "bg-[rgba(0,163,255,0.12)]",
    valueClass: "text-blue",
    glow: "shadow-[0_0_60px_rgba(0,163,255,0.12)] group-hover:shadow-[0_0_80px_rgba(0,163,255,0.22)]",
    gradient: "from-[rgba(0,163,255,0.35)] to-[rgba(67,180,202,0.05)]",
    ring: "group-hover:border-[rgba(0,163,255,0.4)]",
  },
  swap: {
    icon: ArrowLeftRight,
    iconClass: "text-pink",
    iconBg: "bg-[rgba(232,77,152,0.12)]",
    valueClass: "text-pink",
    glow: "shadow-[0_0_60px_rgba(232,77,152,0.12)] group-hover:shadow-[0_0_80px_rgba(232,77,152,0.22)]",
    gradient: "from-[rgba(232,77,152,0.35)] to-[rgba(232,77,152,0.05)]",
    ring: "group-hover:border-[rgba(232,77,152,0.4)]",
  },
};

const ACCOUNT_CARDS: AccountCardData[] = [
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
    type: "checking",
    titleKey: "checking",
    command: "solobank send 10 9pFr...2kLx",
    hero: { label: "AVAILABLE", value: "2,401.00" },
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
    stats: [{ label: "SLIPPAGE", value: "0.1%" }],
  },
];

// ── Card shell ──────────────────────────────────────────────────────────────

interface CardShellProps {
  theme: AccountTheme;
  className?: string;
  children: React.ReactNode;
}

function CardShell({
  theme,
  className,
  children,
}: CardShellProps): React.ReactElement {
  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-border bg-surface/40 backdrop-blur-sm",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1",
        theme.glow,
        theme.ring,
        className,
      )}
    >
      {/* Subtle corner gradient — reveals on hover */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          "bg-gradient-to-br",
          theme.gradient,
          "mix-blend-soft-light",
        )}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

function AccountIcon({
  type,
  size = "sm",
}: {
  type: AccountType;
  size?: "sm" | "lg";
}): React.ReactElement {
  const theme = ACCOUNT_THEMES[type];
  const Icon = theme.icon;
  const sz = size === "lg" ? 18 : 14;
  const box = size === "lg" ? "w-9 h-9" : "w-7 h-7";
  return (
    <div
      className={cn(
        "rounded-lg flex items-center justify-center",
        box,
        theme.iconBg,
      )}
    >
      <Icon size={sz} className={theme.iconClass} />
    </div>
  );
}

// ── Section ─────────────────────────────────────────────────────────────────

export function Accounts(): React.ReactElement {
  const { t } = useTranslation();

  const getCard = (
    card: AccountCardData,
  ): { title: string; description: string } => {
    const acct = t.accounts[card.titleKey as keyof typeof t.accounts];
    if (typeof acct === "string") return { title: acct, description: "" };
    return acct;
  };

  const savings = ACCOUNT_CARDS.find((c) => c.type === "savings")!;
  const rest = ACCOUNT_CARDS.filter((c) => c.type !== "savings");

  const savingsTheme = ACCOUNT_THEMES.savings;
  const savingsContent = getCard(savings);

  return (
    <section
      id="accounts"
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Background aura — tied into the hero's dotted surface aesthetic */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(153,69,255,0.08)_0%,transparent_60%)]"
      />

      <div className="relative max-w-7xl mx-auto px-6">
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

        {/* ── Hero card: Savings ──────────────────────────────────────── */}
        <AnimateIn>
          <CardShell theme={savingsTheme} className="mb-6">
            <div className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                {/* Left side — title + copy + command */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <AccountIcon type="savings" size="lg" />
                    <span className="text-xs font-bold tracking-[0.2em] text-foreground uppercase">
                      {savingsContent.title}
                    </span>
                  </div>
                  <p className="text-muted text-base md:text-lg leading-relaxed max-w-xl mb-6">
                    {savingsContent.description}
                  </p>
                  <div className="inline-flex items-center gap-2 bg-background/60 backdrop-blur-sm rounded-lg px-4 py-2.5 font-mono text-sm text-solana-green">
                    <span className="text-dim">$</span>
                    {savings.command}
                    <span className="inline-block w-2 h-4 bg-solana-green/60 animate-pulse ml-1" />
                  </div>
                </div>

                {/* Right side — hero APY */}
                <div className="md:text-right md:ml-auto">
                  <div className="text-[10px] tracking-[0.25em] text-dim uppercase mb-1">
                    {savings.hero!.label}
                  </div>
                  <div className="text-6xl md:text-7xl font-bold leading-none">
                    <span className="gradient-text drop-shadow-[0_0_30px_rgba(153,69,255,0.3)]">
                      {savings.hero!.value}
                    </span>
                  </div>
                  {savings.stats && (
                    <div className="flex gap-6 mt-5 justify-start md:justify-end">
                      {savings.stats.map((stat) => (
                        <div key={stat.label} className="text-left">
                          <div className="text-[10px] tracking-[0.2em] text-dim uppercase">
                            {stat.label}
                          </div>
                          <div className="text-sm font-medium text-foreground/80 font-mono">
                            {stat.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardShell>
        </AnimateIn>

        {/* ── Satellite cards: Checking, Credit, Invest, Swap ──────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rest.map((card, i) => {
            const theme = ACCOUNT_THEMES[card.type];
            const { title, description } = getCard(card);
            return (
              <AnimateIn key={card.type} delay={(i + 1) * 80}>
                <CardShell theme={theme} className="h-full">
                  <div className="p-5 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <AccountIcon type={card.type} />
                      <span className="text-[11px] font-bold tracking-[0.18em] text-foreground uppercase">
                        {title}
                      </span>
                    </div>

                    {card.hero && (
                      <div className="mb-4">
                        <div className="text-[10px] tracking-[0.2em] text-dim uppercase">
                          {card.hero.label}
                        </div>
                        <div
                          className={cn(
                            "text-3xl font-bold leading-tight",
                            theme.valueClass,
                          )}
                        >
                          {card.hero.value}
                        </div>
                      </div>
                    )}

                    <p className="text-muted text-xs leading-relaxed mb-4 flex-1">
                      {description}
                    </p>

                    <div className="bg-background/60 backdrop-blur-sm rounded-lg px-3 py-2 font-mono text-[11px] text-solana-green overflow-x-auto whitespace-nowrap">
                      $ {card.command}
                    </div>

                    {card.stats && (
                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-border">
                        {card.stats.map((stat) => (
                          <div key={stat.label}>
                            <span className="text-[9px] tracking-[0.2em] text-dim uppercase">
                              {stat.label}
                            </span>
                            <div className="text-xs font-medium text-foreground/80 font-mono">
                              {stat.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {card.tags && (
                      <div className="flex items-center gap-2 pt-3 mt-3 border-t border-border">
                        {card.tags.map((tag) => (
                          <Badge key={tag} variant="accent">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardShell>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
