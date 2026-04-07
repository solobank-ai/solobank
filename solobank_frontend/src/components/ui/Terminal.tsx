"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TerminalProps {
  lines: string[];
  className?: string;
}

export function Terminal({ lines, className }: TerminalProps): React.ReactElement {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isTyping || done) return;
    if (currentLineIndex >= lines.length) {
      // All lines done — stop, no replay
      setDone(true);
      return;
    }

    const line = lines[currentLineIndex] ?? "";

    if (line === "") {
      // Empty line — short pause then advance
      timeoutRef.current = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, ""]);
        setCurrentLineIndex((i) => i + 1);
        setCurrentText("");
      }, 200);
      return;
    }

    // Type character by character
    let charIndex = 0;
    intervalRef.current = setInterval(() => {
      charIndex++;
      setCurrentText(line.slice(0, charIndex));
      if (charIndex >= line.length) {
        clearInterval(intervalRef.current!);
        // Pause between lines
        timeoutRef.current = setTimeout(() => {
          setDisplayedLines((prev) => [...prev, line]);
          setCurrentLineIndex((i) => i + 1);
          setCurrentText("");
        }, 180);
      }
    }, 28);

    return () => {
      clearInterval(intervalRef.current!);
      clearTimeout(timeoutRef.current!);
    };
  }, [currentLineIndex, isTyping, lines]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current!);
      clearTimeout(timeoutRef.current!);
    };
  }, []);

  const isCommand = (line: string): boolean => line.startsWith("$");
  const isConfirmed = (line: string): boolean => line.startsWith("✓");

  /* Wallet-like addresses: 4+ alphanum, "...", 2+ alphanum */
  const walletRegex = /\b([A-Za-z0-9]{2,}\.{3}[A-Za-z0-9]{2,})\b/g;

  /** Colorize a finished line with inline highlights */
  function renderLine(line: string): React.ReactNode {
    if (line === "") return "\u00A0";

    /* Commands & confirmed lines use their own base color, but still
       highlight wallet addresses in purple */
    const hasColon = !isCommand(line) && !isConfirmed(line) && line.includes(":");

    if (hasColon) {
      const colonIdx = line.indexOf(":");
      const label = line.slice(0, colonIdx + 1);
      const value = line.slice(colonIdx + 1);

      /* Within the value part, highlight wallet addresses in purple */
      const valueParts = value.split(walletRegex);
      return (
        <>
          <span className="text-muted">{label}</span>
          {valueParts.map((part, j) =>
            walletRegex.test(part) ? (
              <span key={j} className="text-solana-purple">{part}</span>
            ) : (
              <span key={j} className="text-solana-green">{part}</span>
            )
          )}
        </>
      );
    }

    /* For commands / confirmed / other lines, still highlight wallet addresses */
    const parts = line.split(walletRegex);
    if (parts.length <= 1) return line;

    return (
      <>
        {parts.map((part, j) =>
          walletRegex.test(part) ? (
            <span key={j} className="text-solana-purple">{part}</span>
          ) : (
            <span key={j}>{part}</span>
          )
        )}
      </>
    );
  }

  return (
    <div
      className={cn(
        "bg-[#0D0D0F] border border-border rounded-2xl overflow-hidden flex flex-col",
        className
      )}
    >
      {/* Title bar */}
      <div className="h-10 flex items-center px-4 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <span className="text-xs text-dim font-mono mx-auto">solobank — terminal</span>
      </div>

      {/* Content */}
      <div className="font-mono text-[13px] p-6 leading-relaxed text-left flex-1 overflow-y-auto">
        {displayedLines.map((line, i) => (
          <div key={i} className={cn(
            "whitespace-pre",
            isCommand(line) && "text-foreground",
            isConfirmed(line) && "text-solana-green",
            !isCommand(line) && !isConfirmed(line) && line !== "" && "text-muted"
          )}>
            {renderLine(line)}
          </div>
        ))}

        {/* Currently typing line — only shown while actively typing */}
        {!done && currentLineIndex < lines.length && (
          <div className={cn(
            "whitespace-pre",
            isCommand(currentText) && "text-foreground",
            isConfirmed(currentText) && "text-solana-green",
            !isCommand(currentText) && !isConfirmed(currentText) && "text-muted"
          )}>
            {renderLine(currentText)}
            <span className="animate-pulse text-solana-green">█</span>
          </div>
        )}
      </div>
    </div>
  );
}
