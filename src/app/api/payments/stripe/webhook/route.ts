import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import {
  generateLicenseKey,
  calculateExpirationDate,
  getLicenseType,
} from "@/lib/license";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const { userId, productType, productName } = session.metadata!;

    try {
      // Create payment record
      const payment = await prisma.payment.create({
        data: {
          userId,
          amount: (session.amount_total || 0) / 100,
          currency: (session.currency || "usd").toUpperCase(),
          provider: "STRIPE",
          providerTxId: session.payment_intent as string,
          status: "COMPLETED",
          productType: productType as any,
          productName,
          invoiceNumber: `INV-${Date.now()}`,
        },
      });

      // Generate license key
      const licenseKey = generateLicenseKey();
      const expiresAt = calculateExpirationDate(productType as any);
      const licenseType = getLicenseType(productType as any);

      // Create license
      await prisma.license.create({
        data: {
          key: licenseKey,
          type: licenseType,
          status: "PENDING",
          userId,
          paymentId: payment.id,
          durationMonths:
            productType === "PRO_ANNUAL"
              ? 12
              : productType === "PRO_LIFETIME"
              ? 999
              : 1,
          expiresAt,
        },
      });

      // TODO: Send email with license key
      console.log(`License created for user ${userId}: ${licenseKey}`);
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  }

  return NextResponse.json({ received: true });
}
