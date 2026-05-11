"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GridSpotlightProps {
  children: React.ReactNode;
  className?: string;
}

export function GridSpotlight({
  children,
  className,
}: GridSpotlightProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    const handleMouseMove = (e: MouseEvent): void => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      });
    };

    const handleMouseLeave = (): void => {
      el.style.setProperty("--mouse-x", "-9999px");
      el.style.setProperty("--mouse-y", "-9999px");
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative bg-grid grid-spotlight", className)}
    >
      {children}
    </div>
  );
}
