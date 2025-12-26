import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyWebhookSignature, IPNPayload } from "@/lib/nowpayments";
import { generateLicenseKey, calculateExpirationDate, getLicenseType } from "@/lib/license";
import { sendToAccounting, mapCryptoCurrency, mapPaymentStatus, mapProductType } from "@/lib/crypto-accounting";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-nowpayments-sig") || "";

    // Verify webhook signature
    if (!verifyWebhookSignature(body, signature)) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload: IPNPayload = JSON.parse(body);

    console.log("Received NOWPayments webhook:", {
      paymentId: payload.payment_id,
      status: payload.payment_status,
      orderId: payload.order_id,
    });

    // Find the payment by our order ID
    const payment = await prisma.payment.findUnique({
      where: { id: payload.order_id },
      include: { user: true },
    });

    if (!payment) {
      console.error("Payment not found:", payload.order_id);
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    // Handle different payment statuses
    switch (payload.payment_status) {
      case "waiting":
        // Payment created, waiting for transaction
        await prisma.payment.update({
          where: { id: payment.id },
          data: { status: "PENDING" },
        });
        break;

      case "confirming":
        // Transaction detected, waiting for confirmations
        await prisma.payment.update({
          where: { id: payment.id },
          data: { status: "PENDING" },
        });
        break;

      case "confirmed":
      case "finished":
        // Payment successful - activate the product
        await handleSuccessfulPayment(payment);
        break;

      case "failed":
      case "expired":
        await prisma.payment.update({
          where: { id: payment.id },
          data: { status: "FAILED" },
        });
        break;

      case "refunded":
        await prisma.payment.update({
          where: { id: payment.id },
          data: { status: "REFUNDED" },
        });
        // TODO: Revoke license if applicable
        break;

      default:
        console.log("Unknown payment status:", payload.payment_status);
    }

    // Send to accounting system
    await sendToAccounting({
      externalId: payment.id,
      amountUsd: Number(payload.price_amount),
      amountCrypto: payload.pay_amount,
      cryptoCurrency: mapCryptoCurrency(payload.pay_currency),
      productType: mapProductType(payment.productType),
      productName: payment.productName,
      status: mapPaymentStatus(payload.payment_status),
      paymentDate: new Date().toISOString(),
      userEmail: payment.user.email,
      userId: payment.userId,
      walletAddress: payload.pay_address,
      exchangeRate: payload.pay_amount > 0 ? payload.price_amount / payload.pay_amount : 0,
      nowPaymentsId: String(payload.payment_id),
      actuallyPaid: payload.actually_paid,
      metadata: {
        productType: payment.productType,
        purchaseId: payload.purchase_id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

async function handleSuccessfulPayment(payment: {
  id: string;
  userId: string;
  productType: string;
  productName: string;
  user: { email: string; name: string | null };
}) {
  // Update payment status
  await prisma.payment.update({
    where: { id: payment.id },
    data: { status: "COMPLETED" },
  });

  // Check if this is a license product
  if (
    payment.productType === "PRO_MONTHLY" ||
    payment.productType === "PRO_ANNUAL" ||
    payment.productType === "PRO_LIFETIME"
  ) {
    // Generate and create license
    const licenseKey = generateLicenseKey("SNAPRO");
    const licenseType = getLicenseType(payment.productType as "PRO_MONTHLY" | "PRO_ANNUAL" | "PRO_LIFETIME");
    const expiresAt = calculateExpirationDate(payment.productType as "PRO_MONTHLY" | "PRO_ANNUAL" | "PRO_LIFETIME");

    await prisma.license.create({
      data: {
        key: licenseKey,
        type: licenseType,
        status: "ACTIVE",
        userId: payment.userId,
        paymentId: payment.id,
        activatedAt: new Date(),
        expiresAt,
        durationMonths: payment.productType === "PRO_MONTHLY" ? 1 : payment.productType === "PRO_ANNUAL" ? 12 : 0,
      },
    });

    console.log(`License created: ${licenseKey} for user ${payment.userId}`);

    // TODO: Send confirmation email with license key
  }

  // Check if this is a proxy product
  if (payment.productType.startsWith("PROXY_")) {
    const packageSlug = payment.productType.toLowerCase().replace("proxy_", "");

    // Find the proxy package
    const proxyPackage = await prisma.proxyPackage.findUnique({
      where: { slug: packageSlug },
    });

    if (proxyPackage) {
      // Create proxy order
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + 1);

      await prisma.proxyOrder.create({
        data: {
          userId: payment.userId,
          packageId: proxyPackage.id,
          status: "ACTIVE",
          startDate: new Date(),
          expiresAt,
          amount: payment.productType === "PROXY_STARTER" ? 29 :
                  payment.productType === "PROXY_GROWTH" ? 79 :
                  payment.productType === "PROXY_SCALE" ? 149 : 299,
          currency: "EUR",
          provider: "NOWPAYMENTS",
          providerTxId: payment.id,
        },
      });

      console.log(`Proxy order created for user ${payment.userId}`);

      // TODO: Actually provision the proxies (integrate with proxy provider)
    }
  }
}
