import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/proxies - Get user's proxy subscriptions
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    // Get active proxy orders with proxies
    const orders = await prisma.proxyOrder.findMany({
      where: {
        userId,
        status: "ACTIVE",
      },
      include: {
        package: true,
        proxies: {
          orderBy: {
            type: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform data for frontend
    const subscriptions = orders.map((order) => {
      const staticProxies = order.proxies.filter(
        (p) => p.type === "STATIC_RESIDENTIAL"
      );
      const rotatingProxy = order.proxies.find(
        (p) => p.type === "ROTATING_MOBILE"
      );

      return {
        id: order.id,
        packageName: order.package.name,
        packageSlug: order.package.slug,
        status: order.status,
        startDate: order.startDate?.toISOString(),
        expiresAt: order.expiresAt?.toISOString(),
        daysRemaining: order.expiresAt
          ? Math.max(
              0,
              Math.ceil(
                (order.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
              )
            )
          : 0,
        staticProxies: staticProxies.map((p) => ({
          id: p.id,
          host: p.host,
          port: p.port,
          username: p.username,
          password: p.password,
          country: p.country,
          city: p.city,
        })),
        rotatingEndpoint: rotatingProxy
          ? {
              host: rotatingProxy.rotatingEndpoint || rotatingProxy.host,
              port: rotatingProxy.port,
              username: rotatingProxy.username,
              password: rotatingProxy.password,
            }
          : null,
        rotatingUsedGB: Number(order.rotatingDataUsedGB),
        rotatingTotalGB: Number(order.package.rotatingMobileGB),
        unlimitedRotating: order.package.unlimitedRotating,
      };
    });

    return NextResponse.json({ subscriptions });
  } catch (error) {
    console.error("Proxy fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch proxies" },
      { status: 500 }
    );
  }
}
