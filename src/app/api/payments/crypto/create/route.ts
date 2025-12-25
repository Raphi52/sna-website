import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createCryptoInvoice } from "@/lib/nowpayments";
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

    const { productId } = await request.json();

    // Validate product
    const product = PRODUCTS[productId];
    if (!product) {
      return NextResponse.json(
        { error: "Invalid product" },
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
        },
      },
    });

    // Create crypto invoice via NOWPayments (hosted payment page)
    const invoice = await createCryptoInvoice({
      priceAmount: product.price,
      priceCurrency: "eur",
      orderId: payment.id,
      orderDescription: `SocialNetworkArmy - ${product.name}`,
    });

    // Update payment with invoice ID
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        providerTxId: invoice.id,
        metadata: {
          productId,
          invoiceId: invoice.id,
          invoiceUrl: invoice.invoice_url,
        },
      },
    });

    return NextResponse.json({
      paymentId: payment.id,
      invoiceId: invoice.id,
      invoiceUrl: invoice.invoice_url,
    });
  } catch (error) {
    console.error("Crypto payment error:", error);
    return NextResponse.json(
      { error: "Failed to create crypto payment" },
      { status: 500 }
    );
  }
}
