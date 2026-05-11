"use client";

import { MessageSquare, TerminalSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMode } from "./data";

interface ModeToggleProps {
  mode: DemoMode;
  onChange: (mode: DemoMode) => void;
}

const modes: { key: DemoMode; label: string; icon: typeof MessageSquare }[] = [
  { key: "ai", label: "AI Conversations", icon: MessageSquare },
  { key: "cli", label: "CLI Commands", icon: TerminalSquare },
];

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-xl bg-surface/60 border border-border w-fit mx-auto">
      {modes.map((m) => (
        <button
          key={m.key}
          onClick={() => onChange(m.key)}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
            mode === m.key
              ? m.key === "ai"
                ? "bg-solana-purple/15 text-solana-purple border border-solana-purple/20"
                : "bg-solana-green/15 text-solana-green border border-solana-green/20"
              : "text-muted hover:text-foreground border border-transparent"
          )}
        >
          <m.icon size={16} />
          {m.label}
        </button>
      ))}
    </div>
  );
}
