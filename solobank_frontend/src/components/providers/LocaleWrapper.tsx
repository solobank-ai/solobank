"use client";

import { LocaleProvider } from "@/lib/i18n/context";

export function LocaleWrapper({ children }: { children: React.ReactNode }) {
  return <LocaleProvider>{children}</LocaleProvider>;
}
