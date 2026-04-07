"use client";

import { useState } from "react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { GridSpotlight } from "@/components/ui/GridSpotlight";
import { ModeToggle } from "./ModeToggle";
import { ScenarioTabs } from "./ScenarioTabs";
import { ChatWindow } from "./ChatWindow";
import { TerminalWindow } from "./TerminalWindow";
import { InfoPanel } from "./InfoPanel";
import { allScenarios, type DemoMode, type AiScenario, type CliScenario } from "./data";

export function DemosPage() {
  const [mode, setMode] = useState<DemoMode>("ai");
  const [activeId, setActiveId] = useState(allScenarios.ai[0]!.id);

  const scenarios = allScenarios[mode];
  const active = scenarios.find((s) => s.id === activeId) ?? scenarios[0]!;

  function handleModeChange(newMode: DemoMode) {
    setMode(newMode);
    setActiveId(allScenarios[newMode][0]!.id);
  }

  return (
    <GridSpotlight className="min-h-screen pt-28 pb-20">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(153,69,255,0.08)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <AnimateIn delay={0}>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Live <span className="gradient-text">Demos</span>
            </h1>
            <p className="text-muted text-lg max-w-xl mx-auto">
              Real commands. Real output. See how Solobank works with AI agents and the CLI.
            </p>
          </div>
        </AnimateIn>

        {/* Mode toggle */}
        <AnimateIn delay={80}>
          <div className="mb-8">
            <ModeToggle mode={mode} onChange={handleModeChange} />
          </div>
        </AnimateIn>

        {/* Scenario tabs */}
        <AnimateIn delay={160}>
          <div className="mb-8">
            <ScenarioTabs
              scenarios={scenarios}
              activeId={active.id}
              onSelect={setActiveId}
              mode={mode}
            />
          </div>
        </AnimateIn>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left panel — Chat or Terminal (fixed height, scrollable content) */}
          <div className="lg:col-span-3 h-[520px]">
            {mode === "ai" ? (
              <ChatWindow key={active.id} messages={(active as AiScenario).messages} className="h-full" />
            ) : (
              <TerminalWindow key={active.id} lines={(active as CliScenario).lines} className="h-full" />
            )}
          </div>

          {/* Right panel — Info */}
          <div className="lg:col-span-2">
            <InfoPanel scenario={active} />
          </div>
        </div>
      </div>
    </GridSpotlight>
  );
}
