import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createReadStream, existsSync, statSync } from "fs";
import { join } from "path";
import { Readable } from "stream";

// License hierarchy for access control
const LICENSE_HIERARCHY = {
  FREE: 0,
  PRO: 1,
  LIFETIME: 2,
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const userId = (session.user as any).id;

    // Get the release
    const release = await prisma.softwareRelease.findUnique({
      where: { id },
    });

    if (!release) {
      return NextResponse.json(
        { error: "Release not found" },
        { status: 404 }
      );
    }

    // Check user's license
    const userLicense = await prisma.license.findFirst({
      where: {
        userId,
        status: "ACTIVE",
        OR: [
          { expiresAt: null }, // Lifetime
          { expiresAt: { gt: new Date() } }, // Not expired
        ],
      },
      orderBy: {
        type: "desc", // Get the best license (LIFETIME > PRO > FREE)
      },
    });

    // Determine user's effective license level
    const userLicenseType = userLicense?.type || "FREE";
    const userLicenseLevel = LICENSE_HIERARCHY[userLicenseType];
    const requiredLevel = LICENSE_HIERARCHY[release.minLicense];

    if (userLicenseLevel < requiredLevel) {
      return NextResponse.json(
        {
          error: "License upgrade required",
          requiredLicense: release.minLicense,
          currentLicense: userLicenseType,
        },
        { status: 403 }
      );
    }

    // Get file path - files stored in /releases folder (outside public)
    const releasesDir = process.env.RELEASES_DIR || join(process.cwd(), "releases");
    const filePath = join(releasesDir, release.fileName);

    // Check if file exists
    if (!existsSync(filePath)) {
      console.error(`Release file not found: ${filePath}`);
      return NextResponse.json(
        { error: "Release file not available" },
        { status: 404 }
      );
    }

    // Log the download
    await prisma.$transaction([
      prisma.downloadLog.create({
        data: {
          userId,
          releaseId: release.id,
          ipAddress: request.headers.get("x-forwarded-for") ||
                     request.headers.get("x-real-ip") ||
                     "unknown",
          userAgent: request.headers.get("user-agent") || "unknown",
        },
      }),
      prisma.softwareRelease.update({
        where: { id: release.id },
        data: { downloadCount: { increment: 1 } },
      }),
    ]);

    // Get file stats
    const stats = statSync(filePath);

    // Create read stream and convert to web stream
    const nodeStream = createReadStream(filePath);
    const webStream = Readable.toWeb(nodeStream) as ReadableStream;

    // Return file as download
    return new NextResponse(webStream, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${release.fileName}"`,
        "Content-Length": stats.size.toString(),
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "private, no-cache",
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Download failed" },
      { status: 500 }
    );
  }
}
