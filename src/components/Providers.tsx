"use client";

import { SessionProvider } from "next-auth/react";
import { CurrencyProvider } from "@/components/providers/CurrencyProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchOnWindowFocus={true} refetchInterval={0}>
      <CurrencyProvider>{children}</CurrencyProvider>
    </SessionProvider>
  );
}
