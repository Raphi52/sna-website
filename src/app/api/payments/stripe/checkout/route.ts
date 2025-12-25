import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createCheckoutSession } from "@/lib/stripe";

const PRICES = {
  PRO_MONTHLY: { price: 2900, name: "Pro Monthly" },
  PRO_ANNUAL: { price: 29000, name: "Pro Annual" },
  PRO_LIFETIME: { price: 19900, name: "Pro Lifetime" },
};

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productType } = await request.json();

    if (!productType || !PRICES[productType as keyof typeof PRICES]) {
      return NextResponse.json(
        { error: "Invalid product type" },
        { status: 400 }
      );
    }

    const { price, name } = PRICES[productType as keyof typeof PRICES];

    const checkoutSession = await createCheckoutSession({
      userId: (session.user as any).id,
      userEmail: session.user.email,
      productType: productType as "PRO_MONTHLY" | "PRO_ANNUAL" | "PRO_LIFETIME",
      productName: name,
      priceInCents: price,
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/license?success=true`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/license?canceled=true`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
