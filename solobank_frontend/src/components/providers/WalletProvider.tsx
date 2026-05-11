"use client";

import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

const RPC_ENDPOINT =
  process.env["NEXT_PUBLIC_SOLANA_RPC_URL"] ??
  "https://api.mainnet-beta.solana.com";

interface WalletProviderProps {
  children: React.ReactNode;
}

export function WalletProvider({
  children,
}: WalletProviderProps): React.ReactElement {
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    []
  );

  return (
    <ConnectionProvider endpoint={RPC_ENDPOINT}>
      <SolanaWalletProvider wallets={wallets} autoConnect={false}>
        {children}
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}
