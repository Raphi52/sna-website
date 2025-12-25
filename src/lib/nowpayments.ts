import crypto from "crypto";

const NOWPAYMENTS_API_URL = "https://api.nowpayments.io/v1";

export interface CreatePaymentParams {
  priceAmount: number;
  priceCurrency: string;
  payCurrency: "btc" | "eth";
  orderId: string;
  orderDescription: string;
}

export interface PaymentResponse {
  payment_id: string;
  payment_status: string;
  pay_address: string;
  price_amount: number;
  price_currency: string;
  pay_amount: number;
  pay_currency: string;
  order_id: string;
  order_description: string;
  created_at: string;
  updated_at: string;
  purchase_id: string;
}

export interface IPNPayload {
  payment_id: number;
  payment_status: string;
  pay_address: string;
  price_amount: number;
  price_currency: string;
  pay_amount: number;
  pay_currency: string;
  actually_paid: number;
  order_id: string;
  order_description: string;
  purchase_id: string;
  outcome_amount: number;
  outcome_currency: string;
}

/**
 * Create a new crypto payment
 */
export async function createCryptoPayment(
  params: CreatePaymentParams
): Promise<PaymentResponse> {
  const apiKey = process.env.NOWPAYMENTS_API_KEY;

  if (!apiKey) {
    throw new Error("NOWPAYMENTS_API_KEY is not configured");
  }

  const ipnCallbackUrl = `${process.env.NEXTAUTH_URL}/api/payments/crypto/webhook`;

  const response = await fetch(`${NOWPAYMENTS_API_URL}/payment`, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      price_amount: params.priceAmount,
      price_currency: params.priceCurrency,
      pay_currency: params.payCurrency,
      order_id: params.orderId,
      order_description: params.orderDescription,
      ipn_callback_url: ipnCallbackUrl,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`NOWPayments API error: ${error}`);
  }

  return response.json();
}

/**
 * Get payment status
 */
export async function getPaymentStatus(paymentId: string): Promise<IPNPayload> {
  const apiKey = process.env.NOWPAYMENTS_API_KEY;

  if (!apiKey) {
    throw new Error("NOWPAYMENTS_API_KEY is not configured");
  }

  const response = await fetch(`${NOWPAYMENTS_API_URL}/payment/${paymentId}`, {
    headers: {
      "x-api-key": apiKey,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`NOWPayments API error: ${error}`);
  }

  return response.json();
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string
): boolean {
  const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET;

  if (!ipnSecret) {
    console.warn("NOWPAYMENTS_IPN_SECRET not set, skipping verification");
    return true;
  }

  // Sort the payload keys alphabetically (NOWPayments requirement)
  const sortedPayload = JSON.stringify(
    Object.keys(JSON.parse(payload))
      .sort()
      .reduce((obj: Record<string, unknown>, key) => {
        obj[key] = JSON.parse(payload)[key];
        return obj;
      }, {})
  );

  const hmac = crypto.createHmac("sha512", ipnSecret);
  hmac.update(sortedPayload);
  const expectedSignature = hmac.digest("hex");

  return signature === expectedSignature;
}

/**
 * Get estimated crypto amount
 */
export async function getEstimatedAmount(
  amount: number,
  currencyFrom: string,
  currencyTo: string
): Promise<number> {
  const apiKey = process.env.NOWPAYMENTS_API_KEY;

  if (!apiKey) {
    throw new Error("NOWPAYMENTS_API_KEY is not configured");
  }

  const response = await fetch(
    `${NOWPAYMENTS_API_URL}/estimate?amount=${amount}&currency_from=${currencyFrom}&currency_to=${currencyTo}`,
    {
      headers: {
        "x-api-key": apiKey,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get estimate");
  }

  const data = await response.json();
  return data.estimated_amount;
}

// Crypto currency info
export const CRYPTO_CURRENCIES = {
  btc: { name: "Bitcoin", symbol: "BTC", color: "#F7931A" },
  eth: { name: "Ethereum", symbol: "ETH", color: "#627EEA" },
} as const;

export type CryptoCurrency = keyof typeof CRYPTO_CURRENCIES;
