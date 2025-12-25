import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const releases = await prisma.softwareRelease.findMany({
      orderBy: [
        { isLatest: "desc" },
        { releasedAt: "desc" },
      ],
      select: {
        id: true,
        version: true,
        releaseNotes: true,
        fileSize: true,
        isLatest: true,
        isBeta: true,
        minLicense: true,
        downloadCount: true,
        releasedAt: true,
      },
    });

    // Format file size for display
    const formattedReleases = releases.map((release) => ({
      ...release,
      fileSizeFormatted: formatFileSize(release.fileSize),
    }));

    return NextResponse.json({ releases: formattedReleases });
  } catch (error) {
    console.error("Error fetching releases:", error);
    return NextResponse.json(
      { error: "Failed to fetch releases" },
      { status: 500 }
    );
  }
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  return (bytes / (1024 * 1024 * 1024)).toFixed(1) + " GB";
}
