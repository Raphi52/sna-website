const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY!;
const NOWPAYMENTS_API_URL = "https://api.nowpayments.io/v1";

export interface CreateCryptoPaymentParams {
  priceAmount: number;
  priceCurrency: string;
  payCurrency: "btc" | "eth" | "usdttrc20" | "ltc";
  orderId: string;
  orderDescription: string;
  ipnCallbackUrl: string;
  successUrl: string;
  cancelUrl: string;
}

export async function createCryptoPayment(params: CreateCryptoPaymentParams) {
  const response = await fetch(`${NOWPAYMENTS_API_URL}/invoice`, {
    method: "POST",
    headers: {
      "x-api-key": NOWPAYMENTS_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      price_amount: params.priceAmount,
      price_currency: params.priceCurrency,
      pay_currency: params.payCurrency,
      order_id: params.orderId,
      order_description: params.orderDescription,
      ipn_callback_url: params.ipnCallbackUrl,
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create crypto payment: ${error}`);
  }

  return response.json();
}

export function verifyCryptoWebhook(signature: string, body: string): boolean {
  const crypto = require("crypto");
  const hmac = crypto.createHmac("sha512", process.env.NOWPAYMENTS_IPN_SECRET!);
  const expectedSignature = hmac.update(body).digest("hex");
  return signature === expectedSignature;
}
