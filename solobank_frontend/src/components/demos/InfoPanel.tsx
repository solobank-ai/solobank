"use client";

import { cn } from "@/lib/utils";
import type { Scenario, AiScenario, CliScenario } from "./data";

interface InfoPanelProps {
  scenario: Scenario;
}

export function InfoPanel({ scenario }: InfoPanelProps) {
  const isAi = scenario.mode === "ai";
  const items = isAi
    ? (scenario as AiScenario).mcpTools
    : (scenario as CliScenario).commands;
  const label = isAi ? "MCP TOOLS USED" : "COMMANDS USED";

  return (
    <div className="card-gradient-border h-full">
      <div className="card-inner p-6 flex flex-col gap-5 h-full">
        {/* Title */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">{scenario.title}</h3>
          <p className="text-muted text-sm leading-relaxed">{scenario.description}</p>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Tools / Commands */}
        <div>
          <p className="text-[10px] tracking-widest text-dim uppercase mb-3">{label}</p>
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <div
                key={item}
                className={cn(
                  "px-4 py-2.5 rounded-lg font-mono text-xs border",
                  isAi
                    ? "bg-solana-purple/10 border-solana-purple/20 text-solana-purple"
                    : "bg-solana-green/10 border-solana-green/20 text-solana-green"
                )}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Compatibility */}
        <p className="text-dim text-xs mt-auto">
          Works with Claude Desktop, Cursor, Windsurf, or any MCP-compatible AI.
        </p>
      </div>
    </div>
  );
}
