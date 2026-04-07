"use client";

import { Terminal } from "@/components/ui/Terminal";
import type { CliLine } from "./data";

interface TerminalWindowProps {
  lines: CliLine[];
  className?: string;
}

const MAX_LINES = 14; // Lend & Borrow is the longest scenario

export function TerminalWindow({ lines, className }: TerminalWindowProps) {
  const formatted = lines.map((line) => {
    switch (line.type) {
      case "command":
        return `$ ${line.text}`;
      case "success":
        return `\u2713 ${line.text}`;
      case "blank":
        return "";
      default:
        return line.text;
    }
  });

  // Pad to fixed height so terminal doesn't resize between tabs
  while (formatted.length < MAX_LINES) {
    formatted.push("");
  }

  return <Terminal lines={formatted} className={className} />;
}
