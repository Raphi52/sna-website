import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createCryptoPayment } from "@/lib/nowpayments";
import { prisma } from "@/lib/prisma";

const PRICES = {
  PRO_MONTHLY: { price: 29, name: "Pro Monthly" },
  PRO_ANNUAL: { price: 290, name: "Pro Annual" },
  PRO_LIFETIME: { price: 199, name: "Pro Lifetime" },
};

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productType, currency } = await request.json();

    if (!productType || !PRICES[productType as keyof typeof PRICES]) {
      return NextResponse.json(
        { error: "Invalid product type" },
        { status: 400 }
      );
    }

    if (!["btc", "eth", "usdttrc20"].includes(currency)) {
      return NextResponse.json(
        { error: "Invalid cryptocurrency" },
        { status: 400 }
      );
    }

    const { price, name } = PRICES[productType as keyof typeof PRICES];
    const userId = (session.user as any).id;

    // Create pending payment record
    const payment = await prisma.payment.create({
      data: {
        userId,
        amount: price,
        currency: "USD",
        provider: "NOWPAYMENTS",
        status: "PENDING",
        productType: productType as any,
        productName: name,
      },
    });

    // Create crypto invoice
    const invoice = await createCryptoPayment({
      priceAmount: price,
      priceCurrency: "usd",
      payCurrency: currency,
      orderId: payment.id,
      orderDescription: `SocialNetworkArmy ${name}`,
      ipnCallbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/crypto/webhook`,
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/license?success=true`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/license?canceled=true`,
    });

    // Update payment with invoice URL
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        providerTxId: invoice.id,
        invoiceUrl: invoice.invoice_url,
      },
    });

    return NextResponse.json({ url: invoice.invoice_url });
  } catch (error) {
    console.error("Crypto payment error:", error);
    return NextResponse.json(
      { error: "Failed to create crypto payment" },
      { status: 500 }
    );
  }
}
