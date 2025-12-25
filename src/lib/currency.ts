// Currency configuration based on country
export type CurrencyCode = "EUR" | "USD" | "GBP";

export const CURRENCIES: Record<CurrencyCode, { symbol: string; name: string }> = {
  EUR: { symbol: "€", name: "Euro" },
  USD: { symbol: "$", name: "US Dollar" },
  GBP: { symbol: "£", name: "British Pound" },
};

// Country to currency mapping
const COUNTRY_CURRENCY: Record<string, CurrencyCode> = {
  // USD countries
  US: "USD",
  CA: "USD", // Canada - show USD for simplicity
  // GBP countries
  GB: "GBP",
  // EUR countries (Eurozone)
  AT: "EUR", // Austria
  BE: "EUR", // Belgium
  CY: "EUR", // Cyprus
  EE: "EUR", // Estonia
  FI: "EUR", // Finland
  FR: "EUR", // France
  DE: "EUR", // Germany
  GR: "EUR", // Greece
  IE: "EUR", // Ireland
  IT: "EUR", // Italy
  LV: "EUR", // Latvia
  LT: "EUR", // Lithuania
  LU: "EUR", // Luxembourg
  MT: "EUR", // Malta
  NL: "EUR", // Netherlands
  PT: "EUR", // Portugal
  SK: "EUR", // Slovakia
  SI: "EUR", // Slovenia
  ES: "EUR", // Spain
};

// Exchange rates (EUR as base) - updated periodically
// In production, you'd fetch these from an API
const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  EUR: 1,
  USD: 1.05, // 1 EUR = 1.05 USD
  GBP: 0.85, // 1 EUR = 0.85 GBP
};

export function getCurrencyFromCountry(countryCode: string): CurrencyCode {
  return COUNTRY_CURRENCY[countryCode.toUpperCase()] || "USD";
}

export function convertPrice(priceInEur: number, toCurrency: CurrencyCode): number {
  const rate = EXCHANGE_RATES[toCurrency];
  return Math.round(priceInEur * rate * 100) / 100;
}

export function formatPrice(price: number, currency: CurrencyCode): string {
  const { symbol } = CURRENCIES[currency];

  // Format based on currency
  if (currency === "EUR") {
    return `${price}${symbol}`;
  }
  return `${symbol}${price}`;
}

// Detect country from IP using free API
export async function detectCountry(): Promise<string> {
  try {
    const response = await fetch("https://ipapi.co/json/", {
      cache: "force-cache", // Cache the result
    });
    const data = await response.json();
    return data.country_code || "US"; // Default to US
  } catch (error) {
    console.error("Failed to detect country:", error);
    return "US"; // Default to US (USD)
  }
}
