"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Terminal } from "@/components/ui/Terminal";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { ParticleTextEffect } from "@/components/ui/particle-text-effect";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/context";

const INSTALL_CMD = "npx -y @solobank/cli@latest init";

// Phrases the particle headline cycles through. Keep each short enough to
// render legibly at the canvas size we give it (~8–12 chars per line).
const HEADLINE_PHRASES = [
  "A bank account\nfor AI agents",
  "Earn · Borrow\nInvest · Pay",
  "Built on\nSolana",
];

export function Hero(): React.ReactElement {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  // The particle text effect paints a single full-section canvas, but the
  // rasterised letters must land inside a specific slot in the flex layout
  // (above the CTA) so they don't overlap with other content on any
  // breakpoint. We render an invisible `textSlot` div where the text should
  // appear, measure its position on layout, and pass the resulting anchor
  // (as fractions of the canvas) to ParticleTextEffect.
  const sectionRef = useRef<HTMLElement>(null);
  const textSlotRef = useRef<HTMLDivElement>(null);
  const [textAnchor, setTextAnchor] = useState<{ x: number; y: number }>({
    x: 0.5,
    y: 0.25,
  });

  useLayoutEffect(() => {
    const compute = (): void => {
      const section = sectionRef.current;
      const slot = textSlotRef.current;
      if (!section || !slot) return;
      const s = section.getBoundingClientRect();
      const t = slot.getBoundingClientRect();
      if (s.width === 0 || s.height === 0) return;
      const x = (t.left + t.width / 2 - s.left) / s.width;
      const y = (t.top + t.height / 2 - s.top) / s.height;
      // Only trigger a state update if the anchor actually moved by a
      // meaningful amount — otherwise every frame of layout flux re-runs
      // the particle canvas' internal retarget logic for nothing.
      setTextAnchor((prev) => {
        if (Math.abs(prev.x - x) < 0.003 && Math.abs(prev.y - y) < 0.003) {
          return prev;
        }
        return { x, y };
      });
    };

    compute();

    const ro =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(compute) : null;
    if (ro && sectionRef.current) ro.observe(sectionRef.current);
    if (ro && textSlotRef.current) ro.observe(textSlotRef.current);

    window.addEventListener("resize", compute);

    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-28 pb-16 xl:pt-32 xl:pb-20 min-h-[640px] xl:min-h-[720px] flex items-center"
    >
      {/* Three.js dotted surface — primary atmospheric layer. Pinned to
          viewport height so the Three.js camera aspect ratio tracks the
          window, not the (possibly taller) section. */}
      <DottedSurface className="absolute inset-x-0 top-0 h-screen" />

      {/* Particle text effect — rasterised as a full-section backdrop
          layer. The canvas spans the entire hero so scatter particles can
          fly across the whole screen, but `textAnchor` is measured from
          an invisible slot in the flex flow below so the letters always
          land exactly in the slot regardless of viewport size. A radial
          CSS mask feathers the canvas edges into the surrounding
          atmosphere so the rectangular bounds are invisible. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 95% 90% at center, black 50%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 95% 90% at center, black 50%, transparent 100%)",
        }}
      >
        <ParticleTextEffect
          words={HEADLINE_PHRASES}
          maxFontSize={80}
          textAnchor={textAnchor}
          textAlign="center"
        />
      </div>

      {/* Radial glow */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "size-[900px] max-w-[90vw] max-h-[90vh]",
          "rounded-full blur-[60px]",
          "bg-[radial-gradient(ellipse_at_center,rgba(153,69,255,0.22)_0%,rgba(20,241,149,0.08)_35%,transparent_65%)]",
        )}
      />

      {/* Soft vignette fade to keep the edges readable */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(13,13,15,0.8)_100%)]"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="flex flex-col xl:flex-row xl:items-center gap-10 xl:gap-16">
          {/* ── Left column: particle text slot + CTA + install ────────── */}
          <div className="flex-1 min-w-0 flex flex-col items-center text-center">
            {/* Invisible slot that reserves space for the particle
                headline. Sized in real layout, measured on every resize
                so the particle canvas can aim its rasterised text at
                exactly this rectangle. */}
            <div
              ref={textSlotRef}
              aria-hidden="true"
              className="w-full max-w-[640px] h-[140px] sm:h-[160px] md:h-[180px]"
            />
            <div className="mt-8 flex flex-col items-center gap-6">
              <Link href="/docs">
                <Button variant="primary" size="lg">
                  {t.hero.cta} <ArrowRight size={16} />
                </Button>
              </Link>

              <div className="flex items-center gap-3 bg-surface/60 backdrop-blur-md border border-border rounded-full px-5 py-2.5 font-mono text-sm shadow-[0_0_40px_rgba(153,69,255,0.08)]">
                <span className="text-dim">$</span>
                <span className="text-foreground">{INSTALL_CMD}</span>
                <button
                  onClick={handleCopy}
                  className="text-muted hover:text-solana-green transition-colors ml-1"
                  aria-label="Copy install command"
                >
                  {copied ? (
                    <Check size={14} className="text-solana-green" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* ── Right column (xl+): Terminal, centred in its half ────── */}
          <div className="flex-1 min-w-0 w-full max-w-xl xl:max-w-[560px] mx-auto h-[420px] md:h-[460px] xl:h-[520px] shadow-[0_0_120px_rgba(153,69,255,0.18)]">
            <Terminal
              lines={t.terminal as unknown as string[]}
              className="h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
