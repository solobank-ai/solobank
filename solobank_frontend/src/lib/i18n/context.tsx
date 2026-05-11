"use client";

import { createContext, useContext } from "react";
import { en, type Translations } from "./translations/en";

interface LocaleContextValue {
  t: Translations;
}

const LocaleContext = createContext<LocaleContextValue>({ t: en });

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  return (
    <LocaleContext.Provider value={{ t: en }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LocaleContext);
}
