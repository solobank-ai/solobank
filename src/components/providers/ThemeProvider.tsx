"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode, ReactElement } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Thin wrapper around next-themes. Solobank is dark-only for now, so we
 * force `dark` and disable the system/light toggle. The wrapper is kept
 * separate from layout.tsx so it can become a real light/dark switch later
 * without ripping out the root layout.
 */
export function ThemeProvider({ children }: ThemeProviderProps): ReactElement {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
