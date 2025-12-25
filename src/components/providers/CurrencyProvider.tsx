"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  CurrencyCode,
  CURRENCIES,
  detectCountry,
  getCurrencyFromCountry,
  convertPrice,
  formatPrice,
} from "@/lib/currency";

interface CurrencyContextType {
  currency: CurrencyCode;
  symbol: string;
  convert: (priceInEur: number) => number;
  format: (priceInEur: number) => string;
  loading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  symbol: "$",
  convert: (price) => price * 1.05,
  format: (price) => `$${Math.round(price * 1.05 * 100) / 100}`,
  loading: true,
});

export function useCurrency() {
  return useContext(CurrencyContext);
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage first
    const savedCurrency = localStorage.getItem("currency") as CurrencyCode | null;
    if (savedCurrency && CURRENCIES[savedCurrency]) {
      setCurrency(savedCurrency);
      setLoading(false);
      return;
    }

    // Detect from IP
    detectCountry().then((countryCode) => {
      const detectedCurrency = getCurrencyFromCountry(countryCode);
      setCurrency(detectedCurrency);
      localStorage.setItem("currency", detectedCurrency);
      setLoading(false);
    });
  }, []);

  const value: CurrencyContextType = {
    currency,
    symbol: CURRENCIES[currency].symbol,
    convert: (priceInEur: number) => convertPrice(priceInEur, currency),
    format: (priceInEur: number) => formatPrice(convertPrice(priceInEur, currency), currency),
    loading,
  };

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}
