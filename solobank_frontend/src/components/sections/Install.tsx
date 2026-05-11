"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/context";

const INSTALL_COMMAND = "npm i -g @solobank/cli && solobank init";

export function Install(): React.ReactElement {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const handleCopy = (): void => {
    void navigator.clipboard.writeText(INSTALL_COMMAND).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="install" className="relative py-16 md:py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(153,69,255,0.1)_0%,rgba(20,241,149,0.04)_50%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          {t.install.title1}{" "}
          <span className="gradient-text">
            {t.install.title2}
          </span>
        </h2>
        <p className="mt-4 text-muted text-lg">
          {t.install.subtitle}
        </p>

        {/* Command box */}
        <div className="mt-10 bg-surface border border-border rounded-xl p-4 flex items-center gap-4 max-w-xl mx-auto overflow-x-auto">
          <code className="font-mono text-solana-green text-sm flex-1 text-left whitespace-nowrap">
            {INSTALL_COMMAND}
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

        {/* Action links */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <a
            href="https://github.com/decentrathon/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="md">
              GitHub <ExternalLink size={14} />
            </Button>
          </a>
          <Link href="/demos">
            <Button variant="ghost" size="md">
              {t.install.liveDemos}
            </Button>
          </Link>
          <Link href="/docs">
            <Button variant="secondary" size="md">
              {t.nav.docs} <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
