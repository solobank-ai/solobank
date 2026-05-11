"use client";

import { cn } from "@/lib/utils";
import type { DemoMode, Scenario } from "./data";

interface ScenarioTabsProps {
  scenarios: Scenario[];
  activeId: string;
  onSelect: (id: string) => void;
  mode: DemoMode;
}

export function ScenarioTabs({ scenarios, activeId, onSelect, mode }: ScenarioTabsProps) {
  const accentColor = mode === "ai" ? "border-solana-purple" : "border-solana-green";

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {scenarios.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          className={cn(
            "px-4 py-2 text-sm rounded-lg border whitespace-nowrap transition-all duration-200",
            activeId === s.id
              ? cn(
                  "text-foreground font-medium",
                  mode === "ai"
                    ? "bg-solana-purple/10 border-solana-purple/30"
                    : "bg-solana-green/10 border-solana-green/30"
                )
              : "text-muted border-border hover:text-foreground hover:border-border-hover"
          )}
        >
          {s.tabLabel}
        </button>
      ))}
    </div>
  );
}
