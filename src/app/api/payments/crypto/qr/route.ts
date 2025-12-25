import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createCryptoPayment, CryptoCurrency } from "@/lib/nowpayments";
import { prisma } from "@/lib/prisma";
import { ProductType } from "@prisma/client";

// Product configuration
const PRODUCTS: Record<string, { price: number; name: string; type: ProductType }> = {
  // Licenses
  pro_monthly: { price: 29, name: "Pro Monthly", type: "PRO_MONTHLY" },
  pro_annual: { price: 278, name: "Pro Annual", type: "PRO_ANNUAL" },
  lifetime: { price: 299, name: "Lifetime", type: "PRO_LIFETIME" },
  // Proxies
  proxy_starter: { price: 29, name: "Starter Proxies", type: "PROXY_STARTER" },
  proxy_growth: { price: 79, name: "Growth Proxies", type: "PROXY_GROWTH" },
  proxy_scale: { price: 149, name: "Scale Proxies", type: "PROXY_SCALE" },
  proxy_enterprise: { price: 299, name: "Enterprise Proxies", type: "PROXY_ENTERPRISE" },
};

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, currency } = await request.json();

    // Validate product
    const product = PRODUCTS[productId];
    if (!product) {
      return NextResponse.json(
        { error: "Invalid product" },
        { status: 400 }
      );
    }

    // Validate currency
    if (!["btc", "eth"].includes(currency)) {
      return NextResponse.json(
        { error: "Invalid cryptocurrency" },
        { status: 400 }
      );
    }

    const userId = (session.user as { id: string }).id;

    // Create pending payment record
    const payment = await prisma.payment.create({
      data: {
        userId,
        amount: product.price,
        currency: "EUR",
        provider: "NOWPAYMENTS",
        status: "PENDING",
        productType: product.type,
        productName: product.name,
        metadata: {
          productId,
          cryptoCurrency: currency,
        },
      },
    });

    // Create crypto payment via NOWPayments (direct address)
    const cryptoPayment = await createCryptoPayment({
      priceAmount: product.price,
      priceCurrency: "eur",
      payCurrency: currency as CryptoCurrency,
      orderId: payment.id,
      orderDescription: `SocialNetworkArmy - ${product.name}`,
    });

    // Update payment with provider transaction ID
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        providerTxId: cryptoPayment.payment_id,
        metadata: {
          productId,
          cryptoCurrency: currency,
          payAddress: cryptoPayment.pay_address,
          payAmount: cryptoPayment.pay_amount,
        },
      },
    });

    // Generate QR code URL (using free QR code API)
    const qrData = currency === "btc"
      ? `bitcoin:${cryptoPayment.pay_address}?amount=${cryptoPayment.pay_amount}`
      : `ethereum:${cryptoPayment.pay_address}?value=${cryptoPayment.pay_amount}`;

    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;

    return NextResponse.json({
      paymentId: payment.id,
      payAddress: cryptoPayment.pay_address,
      payAmount: cryptoPayment.pay_amount,
      payCurrency: cryptoPayment.pay_currency,
      qrCodeUrl,
    });
  } catch (error) {
    console.error("Crypto QR payment error:", error);
    return NextResponse.json(
      { error: "Failed to create crypto payment" },
      { status: 500 }
    );
  }
}
