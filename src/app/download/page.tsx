import { Navbar } from "@/components/layout";
import { Footer } from "@/components/landing";
import { Card, CardContent, Badge, Button } from "@/components/ui";
import { Download, Shield, Cpu, HardDrive, Monitor, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getLatestRelease() {
  const release = await prisma.softwareRelease.findFirst({
    where: { isLatest: true, isBeta: false },
    select: {
      version: true,
      releaseNotes: true,
      fileSize: true,
      releasedAt: true,
      downloadCount: true,
    },
  });
  return release;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default async function DownloadPage() {
  const latestRelease = await getLatestRelease();

  const features = [
    "Instagram, TikTok, Facebook, X & Reddit automation",
    "Advanced anti-detection technology",
    "Multi-account management",
    "Smart scheduling system",
    "Proxy integration",
    "Regular updates & support",
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="info" className="mb-4">Windows Application</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Download{" "}
              <span className="bg-clip-text text-transparent gradient-pro">
                SocialNetworkArmy
              </span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              The most powerful social media automation tool.
              Grow your accounts on autopilot with advanced anti-detection.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Download Card */}
            <Card className="border-info">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Latest Release
                    </h2>
                    {latestRelease && (
                      <p className="text-muted">
                        Version {latestRelease.version} • {formatFileSize(latestRelease.fileSize)}
                      </p>
                    )}
                  </div>
                  <Badge variant="success">Stable</Badge>
                </div>

                {latestRelease && (
                  <div className="mb-6 p-4 bg-surface rounded-lg">
                    <h3 className="text-sm font-medium text-white mb-2">What's new:</h3>
                    <ul className="space-y-1">
                      {latestRelease.releaseNotes.split("\n").slice(0, 4).map((note, i) => (
                        <li key={i} className="text-sm text-muted flex items-start">
                          <CheckCircle className="w-4 h-4 mr-2 text-success flex-shrink-0 mt-0.5" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link href="/auth/register">
                  <Button variant="pro" size="lg" className="w-full group">
                    <Download className="w-5 h-5 mr-2" />
                    Download Free
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <p className="text-center text-sm text-muted mt-4">
                  Free account required to download
                </p>

                {latestRelease && (
                  <p className="text-center text-xs text-muted mt-2">
                    {latestRelease.downloadCount.toLocaleString()}+ downloads
                  </p>
                )}
              </CardContent>
            </Card>

            {/* System Requirements */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-info" />
                    System Requirements
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-info/20 flex items-center justify-center">
                        <Monitor className="w-5 h-5 text-info" />
                      </div>
                      <div>
                        <p className="text-sm text-muted">Operating System</p>
                        <p className="text-white font-medium">Windows 10 / 11</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-info/20 flex items-center justify-center">
                        <Cpu className="w-5 h-5 text-info" />
                      </div>
                      <div>
                        <p className="text-sm text-muted">Framework</p>
                        <p className="text-white font-medium">.NET 9.0 Runtime</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-info/20 flex items-center justify-center">
                        <HardDrive className="w-5 h-5 text-info" />
                      </div>
                      <div>
                        <p className="text-sm text-muted">Storage & RAM</p>
                        <p className="text-white font-medium">100 MB free • 4 GB RAM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    What's included
                  </h3>
                  <ul className="space-y-3">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-muted">
                        <CheckCircle className="w-4 h-4 mr-3 text-success flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Pro CTA */}
          <div className="mt-16 text-center">
            <Card className="inline-block">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-white mb-2">
                  Want more features?
                </h3>
                <p className="text-muted mb-6 max-w-md">
                  Upgrade to Pro for unlimited accounts, beta access, priority support and more.
                </p>
                <Link href="/auth/register">
                  <Button variant="outline">
                    View Pro Plans
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
