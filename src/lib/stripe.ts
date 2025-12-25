import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export interface CreateCheckoutParams {
  userId: string;
  userEmail: string;
  productType: "PRO_MONTHLY" | "PRO_ANNUAL" | "PRO_LIFETIME";
  productName: string;
  priceInCents: number;
  successUrl: string;
  cancelUrl: string;
}

export async function createCheckoutSession(params: CreateCheckoutParams) {
  const {
    userId,
    userEmail,
    productType,
    productName,
    priceInCents,
    successUrl,
    cancelUrl,
  } = params;

  return stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: userEmail,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: productName,
            description: `SocialNetworkArmy ${productName}`,
          },
          unit_amount: priceInCents,
        },
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId,
      productType,
      productName,
    },
  });
}
