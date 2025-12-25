import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { license: { type: "FREE", status: "ACTIVE" } }
      );
    }

    const userId = (session.user as any).id;

    // Find the user's best active license
    const license = await prisma.license.findFirst({
      where: {
        userId,
        status: "ACTIVE",
        OR: [
          { expiresAt: null }, // Lifetime
          { expiresAt: { gt: new Date() } }, // Not expired
        ],
      },
      orderBy: {
        type: "desc", // LIFETIME > PRO > FREE
      },
      select: {
        id: true,
        key: true,
        type: true,
        status: true,
        activatedAt: true,
        expiresAt: true,
      },
    });

    if (!license) {
      return NextResponse.json({
        license: { type: "FREE", status: "ACTIVE" }
      });
    }

    return NextResponse.json({ license });
  } catch (error) {
    console.error("Error fetching license:", error);
    return NextResponse.json(
      { license: { type: "FREE", status: "ACTIVE" } }
    );
  }
}
