"use client";

import { QueryProvider } from './query-provider';
import { WalletProvider } from './wallet-provider';

import type { ReactNode } from 'react';

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <WalletProvider>
      <QueryProvider>{children}</QueryProvider>
    </WalletProvider>
  );
}

