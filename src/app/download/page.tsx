import { Navbar } from "@/components/layout";
import { Footer } from "@/components/landing";
import { Card, CardContent, Badge, Button } from "@/components/ui";
import {
  Download,
  Shield,
  Cpu,
  HardDrive,
  Monitor,
  ArrowRight,
  CheckCircle,
  Zap,
  Lock,
  RefreshCw,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getLatestRelease() {
  try {
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
  } catch {
    return null;
  }
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default async function DownloadPage() {
  const latestRelease = await getLatestRelease();

  const steps = [
    { step: "1", title: "Create Account", desc: "Sign up for free in 30 seconds" },
    { step: "2", title: "Download", desc: "Get the installer from your dashboard" },
    { step: "3", title: "Install & Run", desc: "Double-click and follow the wizard" },
    { step: "4", title: "Start Automating", desc: "Add profiles and launch your bots" },
  ];

  const platforms = [
    { name: "Instagram", gradient: "from-purple-500 via-pink-500 to-orange-400" },
    { name: "TikTok", gradient: "from-cyan-400 to-pink-500" },
    { name: "Facebook", gradient: "from-blue-600 to-blue-400" },
    { name: "X", gradient: "from-gray-100 to-gray-400" },
    { name: "Reddit", gradient: "from-orange-500 to-orange-600" },
  ];

  const freeVsPro = [
    { feature: "Accounts per platform", free: "1", pro: "Unlimited" },
    { feature: "Advanced fingerprinting", free: false, pro: true },
    { feature: "24/7 Scheduler", free: false, pro: true },
    { feature: "Proxies included", free: false, pro: "1/month" },
    { feature: "Priority support", free: false, pro: true },
    { feature: "Updates", free: "Basic", pro: "All + Beta" },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-info/5 to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-info/10 border border-info/30 rounded-full px-4 py-2 mb-6">
              <Monitor className="w-4 h-4 text-info" />
              <span className="text-sm font-medium text-info">Windows 10 / 11</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Download{" "}
              <span className="bg-clip-text text-transparent gradient-pro">
                SocialNetworkArmy
              </span>
            </h1>

            <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
              The most powerful social media automation tool.
              Manage all your accounts from one place.
            </p>

            {/* Platform badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {platforms.map((p) => (
                <div
                  key={p.name}
                  className={`px-4 py-2 rounded-full bg-gradient-to-r ${p.gradient} text-white text-sm font-medium`}
                >
                  {p.name}
                </div>
              ))}
            </div>
          </div>

          {/* Main Download Card */}
          <div className="max-w-2xl mx-auto">
            <Card className="border-info/50 bg-gradient-to-b from-surface to-surface/50 shadow-2xl shadow-info/10">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 gradient-pro rounded-2xl flex items-center justify-center">
                      <Download className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        SocialNetworkArmy
                      </h2>
                      <p className="text-muted">
                        {latestRelease ? `v${latestRelease.version}` : "v1.0.0"} •
                        {latestRelease ? ` ${formatFileSize(latestRelease.fileSize)}` : " ~85 MB"}
                      </p>
                    </div>
                  </div>
                  <Badge variant="success" className="text-sm">Stable</Badge>
                </div>

                {/* Release notes */}
                {latestRelease?.releaseNotes && (
                  <div className="mb-6 p-4 bg-black/30 rounded-xl border border-border">
                    <h3 className="text-sm font-medium text-white mb-3 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2 text-warning" />
                      What&apos;s new in {latestRelease.version}
                    </h3>
                    <ul className="space-y-2">
                      {latestRelease.releaseNotes.split("\n").slice(0, 4).map((note, i) => (
                        <li key={i} className="text-sm text-muted flex items-start">
                          <CheckCircle className="w-4 h-4 mr-2 text-success flex-shrink-0 mt-0.5" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Download button */}
                <Link href="/auth/register?redirect=/dashboard/downloads">
                  <Button variant="pro" size="lg" className="w-full text-lg h-14 group">
                    <Download className="w-6 h-6 mr-3" />
                    Download for Windows
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <p className="text-center text-sm text-muted mt-4">
                  Free account required • No credit card needed
                </p>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-muted text-xs">
                    <Shield className="w-4 h-4" />
                    <span>Virus-free</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted text-xs">
                    <Lock className="w-4 h-4" />
                    <span>Secure download</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted text-xs">
                    <RefreshCw className="w-4 h-4" />
                    <span>Auto-updates</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Installation Steps */}
      <section className="py-16 bg-surface/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            Get started in 4 simple steps
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                <div className="bg-surface border border-border rounded-xl p-6 h-full">
                  <div className="w-10 h-10 gradient-pro rounded-full flex items-center justify-center text-white font-bold mb-4">
                    {s.step}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-muted">{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-muted" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Requirements */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Cpu className="w-6 h-6 mr-3 text-info" />
                System Requirements
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-info/20 flex items-center justify-center">
                    <Monitor className="w-6 h-6 text-info" />
                  </div>
                  <div>
                    <p className="text-sm text-muted">Operating System</p>
                    <p className="text-white font-medium">Windows 10 / 11 (64-bit)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-info/20 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-info" />
                  </div>
                  <div>
                    <p className="text-sm text-muted">Processor & RAM</p>
                    <p className="text-white font-medium">2 GHz+ • 4 GB RAM minimum</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-info/20 flex items-center justify-center">
                    <HardDrive className="w-6 h-6 text-info" />
                  </div>
                  <div>
                    <p className="text-sm text-muted">Storage</p>
                    <p className="text-white font-medium">200 MB free space</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Free vs Pro */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Zap className="w-6 h-6 mr-3 text-warning" />
                Free vs Pro
              </h2>
              <div className="bg-surface rounded-xl border border-border overflow-hidden">
                <div className="grid grid-cols-3 gap-4 p-4 bg-surface-hover border-b border-border">
                  <div className="text-sm font-medium text-muted">Feature</div>
                  <div className="text-sm font-medium text-center text-muted">Free</div>
                  <div className="text-sm font-medium text-center text-info">Pro</div>
                </div>
                {freeVsPro.map((row, i) => (
                  <div key={i} className="grid grid-cols-3 gap-4 p-4 border-b border-border last:border-0">
                    <div className="text-sm text-white">{row.feature}</div>
                    <div className="text-sm text-center">
                      {typeof row.free === "boolean" ? (
                        row.free ? (
                          <CheckCircle className="w-5 h-5 text-success mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted mx-auto" />
                        )
                      ) : (
                        <span className="text-muted">{row.free}</span>
                      )}
                    </div>
                    <div className="text-sm text-center">
                      {typeof row.pro === "boolean" ? (
                        row.pro ? (
                          <CheckCircle className="w-5 h-5 text-success mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted mx-auto" />
                        )
                      ) : (
                        <span className="text-info font-medium">{row.pro}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link href="/pricing">
                  <Button variant="outline" size="sm">
                    Compare all features
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-surface/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="gradient-pro rounded-2xl p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to automate your growth?
            </h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              Join thousands of users growing their social media presence on autopilot.
            </p>
            <Link href="/auth/register?redirect=/dashboard/downloads">
              <Button variant="default" size="lg" className="bg-white text-black hover:bg-gray-100">
                <Download className="w-5 h-5 mr-2" />
                Download Free Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
