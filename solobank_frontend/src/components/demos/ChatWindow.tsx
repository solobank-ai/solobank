"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "./data";

interface ChatWindowProps {
  messages: ChatMessage[];
  className?: string;
}

export function ChatWindow({ messages, className }: ChatWindowProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // All shown — stop, no replay
    if (visibleCount >= messages.length) return;

    const delay = messages[visibleCount]?.role === "tool" ? 400 : 800;
    timeoutRef.current = setTimeout(() => setVisibleCount((c) => c + 1), delay);

    return () => clearTimeout(timeoutRef.current!);
  }, [visibleCount, messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [visibleCount]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current!);
  }, []);

  const visible = messages.slice(0, visibleCount);

  return (
    <div className={cn("bg-[#0D0D0F] border border-border rounded-2xl overflow-hidden flex flex-col", className)}>
      {/* Title bar */}
      <div className="h-10 flex items-center px-4 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <span className="text-xs text-dim font-mono mx-auto">solobank — ai chat</span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {visible.map((msg, i) => (
          <div
            key={`${i}-${visibleCount}`}
            className="animate-[fadeInUp_0.4s_ease_forwards]"
          >
            {msg.role === "user" && (
              <div className="flex justify-end">
                <div className="bg-solana-green/15 border border-solana-green/20 text-foreground rounded-2xl rounded-br-md px-5 py-3 max-w-[80%] text-sm">
                  {msg.content}
                </div>
              </div>
            )}

            {msg.role === "assistant" && (
              <div className="flex flex-col gap-1.5 max-w-[85%]">
                {msg.toolCall && (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-solana-purple/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-solana-purple text-[10px] font-bold">s</span>
                    </div>
                    <span className="text-[11px] font-mono text-solana-purple bg-solana-purple/10 border border-solana-purple/20 rounded-full px-2.5 py-0.5">
                      {msg.toolCall}
                    </span>
                  </div>
                )}
                <div className="text-muted text-sm leading-relaxed pl-8">
                  {msg.content}
                </div>
              </div>
            )}

            {msg.role === "tool" && (
              <div className="ml-8 bg-surface/60 border border-border rounded-lg px-4 py-3 font-mono text-xs text-solana-green whitespace-pre leading-relaxed">
                {msg.content}
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator when not all messages shown */}
        {visibleCount > 0 && visibleCount < messages.length && messages[visibleCount]?.role !== "user" && (
          <div className="flex items-center gap-2 pl-8">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-solana-purple/60 animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-solana-purple/60 animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-solana-purple/60 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
