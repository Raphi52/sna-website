import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// POST /api/proxies/order - Create a new proxy order
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { packageSlug, paymentMethod } = await request.json();

    if (!packageSlug) {
      return NextResponse.json(
        { error: "Package slug is required" },
        { status: 400 }
      );
    }

    // Find the package
    const proxyPackage = await prisma.proxyPackage.findUnique({
      where: { slug: packageSlug, isActive: true },
    });

    if (!proxyPackage) {
      return NextResponse.json(
        { error: "Package not found or inactive" },
        { status: 404 }
      );
    }

    const userId = (session.user as any).id;
    const userEmail = session.user.email;

    if (paymentMethod === "stripe") {
      // Create Stripe checkout session
      const checkoutSession = await stripe.checkout.sessions.create({
        customer_email: userEmail,
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: proxyPackage.currency.toLowerCase(),
              product_data: {
                name: `${proxyPackage.name} Proxy Package`,
                description: `${proxyPackage.staticResidentialCount} Static Residential + ${
                  proxyPackage.unlimitedRotating
                    ? "Unlimited"
                    : `${proxyPackage.rotatingMobileGB}GB`
                } Rotating Mobile`,
              },
              unit_amount: Math.round(Number(proxyPackage.price) * 100),
              recurring:
                proxyPackage.billingPeriod === "monthly"
                  ? { interval: "month" }
                  : { interval: "year" },
            },
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/proxies?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/proxies?canceled=true`,
        metadata: {
          userId,
          packageId: proxyPackage.id,
          packageSlug: proxyPackage.slug,
          type: "proxy",
        },
      });

      return NextResponse.json({ url: checkoutSession.url });
    }

    // For other payment methods, create pending order
    const order = await prisma.proxyOrder.create({
      data: {
        userId,
        packageId: proxyPackage.id,
        status: "PENDING",
        amount: proxyPackage.price,
        currency: proxyPackage.currency,
        provider: paymentMethod === "crypto" ? "NOWPAYMENTS" : "PAYPAL",
      },
    });

    // Return order ID for other payment flows
    return NextResponse.json({
      orderId: order.id,
      amount: Number(proxyPackage.price),
      currency: proxyPackage.currency,
    });
  } catch (error) {
    console.error("Proxy order error:", error);
    return NextResponse.json(
      { error: "Failed to create proxy order" },
      { status: 500 }
    );
  }
}
