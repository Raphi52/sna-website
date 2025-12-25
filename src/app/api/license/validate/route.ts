import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * License validation endpoint for desktop app
 * POST /api/license/validate
 */
export async function POST(request: NextRequest) {
  try {
    const { key, machineId } = await request.json();

    if (!key) {
      return NextResponse.json(
        { valid: false, error: "Missing license key" },
        { status: 400 }
      );
    }

    // Clean the key
    const cleanKey = key.replace(/\s/g, "").toUpperCase();

    // Validate format
    if (!cleanKey.includes("SNAPRO")) {
      return NextResponse.json(
        { valid: false, error: "Invalid key format" },
        { status: 400 }
      );
    }

    // Check database
    const license = await prisma.license.findUnique({
      where: { key: key.toUpperCase() },
      include: { user: true },
    });

    if (!license) {
      return NextResponse.json(
        { valid: false, error: "License not found" },
        { status: 404 }
      );
    }

    // Check status
    if (license.status === "REVOKED" || license.status === "SUSPENDED") {
      return NextResponse.json(
        {
          valid: false,
          error: `License ${license.status.toLowerCase()}`,
          status: license.status,
        },
        { status: 403 }
      );
    }

    // Check expiration
    if (
      license.status === "EXPIRED" ||
      (license.expiresAt && new Date() > license.expiresAt)
    ) {
      // Update status if needed
      if (license.status !== "EXPIRED") {
        await prisma.license.update({
          where: { id: license.id },
          data: { status: "EXPIRED" },
        });
      }

      return NextResponse.json(
        {
          valid: false,
          error: "License expired",
          expiresAt: license.expiresAt,
        },
        { status: 403 }
      );
    }

    // Update validation tracking
    await prisma.license.update({
      where: { id: license.id },
      data: {
        lastValidated: new Date(),
        validationCount: { increment: 1 },
        machineId: machineId || license.machineId,
        status: "ACTIVE",
        activatedAt: license.activatedAt || new Date(),
      },
    });

    // Calculate days remaining
    const daysRemaining = license.expiresAt
      ? Math.max(
          0,
          Math.ceil(
            (license.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
          )
        )
      : null;

    return NextResponse.json({
      valid: true,
      type: license.type,
      expiresAt: license.expiresAt,
      daysRemaining,
    });
  } catch (error) {
    console.error("License validation error:", error);
    return NextResponse.json(
      { valid: false, error: "Validation failed" },
      { status: 500 }
    );
  }
}
