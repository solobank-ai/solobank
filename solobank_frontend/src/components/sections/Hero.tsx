"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Terminal } from "@/components/ui/Terminal";
import { GridSpotlight } from "@/components/ui/GridSpotlight";
import { useTranslation } from "@/lib/i18n/context";

const INSTALL_CMD = "npm i -g @solobank/cli";

export function Hero(): React.ReactElement {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <GridSpotlight className="min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(153,69,255,0.12)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Badge */}
        <Badge variant="purple">{t.hero.badge}</Badge>

        {/* Headline */}
        <h1 className="mt-8 text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[1.1]">
          {t.hero.headline1}
          <br />
          <span className="gradient-text">
            {t.hero.headline2}
          </span>
        </h1>

        {/* Subline */}
        <p className="mt-6 text-muted text-lg md:text-xl max-w-2xl">
          {t.hero.subline}
        </p>

        {/* Single CTA */}
        <div className="mt-8">
          <Link href="/docs">
            <Button variant="primary" size="lg">
              {t.hero.cta} <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        {/* Install command */}
        <div className="mt-6 flex items-center gap-3 bg-surface/60 border border-border rounded-full px-5 py-2.5 font-mono text-sm">
          <span className="text-dim">$</span>
          <span className="text-foreground">{INSTALL_CMD}</span>
          <button
            onClick={handleCopy}
            className="text-muted hover:text-solana-green transition-colors ml-1"
            aria-label="Copy install command"
          >
            {copied ? <Check size={14} className="text-solana-green" /> : <Copy size={14} />}
          </button>
        </div>

        {/* Terminal */}
        <div className="mt-12 w-full max-w-xl h-[480px] shadow-[0_0_80px_rgba(153,69,255,0.1)]">
          <Terminal lines={t.terminal as unknown as string[]} className="h-full" />
        </div>
      </div>
    </GridSpotlight>
  );
}
