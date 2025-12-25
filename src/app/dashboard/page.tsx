import { auth } from "@/lib/auth";
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from "@/components/ui";
import Link from "next/link";
import { Key, Download, CreditCard, Zap } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  const userName = session?.user?.name || session?.user?.email?.split("@")[0];

  // TODO: Fetch actual license data
  const license = null; // Will be fetched from database
  const isPro = false;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {userName}!
        </h1>
        <p className="text-muted">
          Manage your license, downloads, and account settings.
        </p>
      </div>

      {/* License status banner */}
      {!isPro && (
        <div className="mb-8 p-6 bg-gradient-to-r from-info/20 to-purple-500/20 border border-info/30 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">
                Upgrade to Pro
              </h2>
              <p className="text-muted">
                Unlock unlimited accounts, advanced features, and priority
                support.
              </p>
            </div>
            <Link href="/dashboard/license">
              <Button variant="pro" size="lg">
                <Zap className="w-4 h-4 mr-2" />
                Upgrade Now
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-lg bg-info/20 flex items-center justify-center mr-4">
                <Key className="w-6 h-6 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted">License Status</p>
                <div className="flex items-center mt-1">
                  <Badge variant={isPro ? "success" : "default"}>
                    {isPro ? "Pro" : "Free"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center mr-4">
                <Download className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted">Latest Version</p>
                <p className="text-xl font-semibold text-white">v1.1.1</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center mr-4">
                <CreditCard className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted">Next Billing</p>
                <p className="text-xl font-semibold text-white">
                  {isPro ? "Jan 15, 2025" : "-"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card hover>
          <Link href="/dashboard/downloads">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Download Software</CardTitle>
                  <p className="text-sm text-muted mt-1">
                    Get the latest version of SocialNetworkArmy
                  </p>
                </div>
                <Download className="w-8 h-8 text-muted" />
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card hover>
          <Link href="/dashboard/license">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Manage License</CardTitle>
                  <p className="text-sm text-muted mt-1">
                    View or upgrade your license key
                  </p>
                </div>
                <Key className="w-8 h-8 text-muted" />
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  );
}
