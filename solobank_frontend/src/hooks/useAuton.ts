"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import type { AccountType } from "@/types";

export interface AutonHook {
  isConnected: boolean;
  publicKey: string | null;
  balance: number | null;
  accounts: Record<AccountType, number> | null;
  send: (amount: number, to: string) => Promise<string>;
  save: (amount: number) => Promise<string>;
  borrow: (amount: number) => Promise<string>;
  swap: (amount: number, from: string, to: string) => Promise<string>;
  invest: (strategy: string, amount: number) => Promise<string>;
}

export function useAuton(): AutonHook {
  const { connected, publicKey } = useWallet();

  const notImplemented = (method: string): never => {
    throw new Error(`useAuton.${method}: SDK not yet implemented`);
  };

  return {
    isConnected: connected,
    publicKey: publicKey?.toBase58() ?? null,
    balance: null,
    accounts: null,
    send: () => notImplemented("send"),
    save: () => notImplemented("save"),
    borrow: () => notImplemented("borrow"),
    swap: () => notImplemented("swap"),
    invest: () => notImplemented("invest"),
  };
}
