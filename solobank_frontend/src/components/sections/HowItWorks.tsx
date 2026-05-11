"use client";

import { useState } from "react";
import { Download, Wallet, Rocket, Copy, Check } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { GridSpotlight } from "@/components/ui/GridSpotlight";
import { useTranslation } from "@/lib/i18n/context";

function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-5 flex items-center gap-3 bg-surface/60 border border-border rounded-full px-5 py-2.5 font-mono text-xs whitespace-nowrap">
      <span className="text-dim">$</span>
      <span className="text-foreground">{command}</span>
      <button
        onClick={handleCopy}
        className="text-muted hover:text-solana-green transition-colors flex-shrink-0"
        aria-label="Copy command"
      >
        {copied ? <Check size={14} className="text-solana-green" /> : <Copy size={14} />}
      </button>
    </div>
  );
}

export function HowItWorks(): React.ReactElement {
  const { t } = useTranslation();

  const steps = [
    {
      step: 1,
      icon: Download,
      title: t.howItWorks.step1.title,
      duration: t.howItWorks.step1.duration,
      description: t.howItWorks.step1.description,
      command: "npm i -g @solobank/cli && solobank init",
    },
    {
      step: 2,
      icon: Wallet,
      title: t.howItWorks.step2.title,
      duration: t.howItWorks.step2.duration,
      description: t.howItWorks.step2.description,
    },
    {
      step: 3,
      icon: Rocket,
      title: t.howItWorks.step3.title,
      duration: t.howItWorks.step3.duration,
      description: t.howItWorks.step3.description,
    },
  ];

  return (
    <GridSpotlight className="overflow-hidden">
    <section id="how-it-works" className="py-16 md:py-24 overflow-hidden relative z-[1]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            {t.howItWorks.title}
          </h2>
          <p className="mt-4 text-muted text-lg">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <AnimateIn delay={0} className="hidden md:block absolute top-14 left-[15%] right-[15%] z-0">
            <div className="h-px bg-gradient-to-r from-solana-purple/40 via-solana-green/30 to-solana-purple/40" />
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, i) => (
              <AnimateIn key={step.step} delay={i * 150}>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="w-28 h-28 rounded-full bg-[#111116] border border-[rgba(153,69,255,0.2)] flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(153,69,255,0.15)] to-[rgba(20,241,149,0.08)]" />
                      <step.icon size={32} className="text-solana-green relative z-10" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-solana-green text-background text-sm font-bold flex items-center justify-center shadow-[0_0_16px_rgba(20,241,149,0.4)]">
                      {step.step}
                    </div>
                  </div>

                  <span className="text-xs text-dim tracking-widest uppercase mb-3">
                    {step.duration}
                  </span>

                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>

                  <p className="text-muted text-sm leading-relaxed max-w-[280px]">
                    {step.description}
                  </p>

                  {step.command && (
                    <CopyCommand command={step.command} />
                  )}
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
