"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Input } from "@/components/ui";
import { Key, Copy, Check, Zap, Clock, AlertCircle } from "lucide-react";

export default function LicensePage() {
  const [copied, setCopied] = useState(false);

  // TODO: Fetch actual license data
  const license = null as {
    key: string;
    type: string;
    status: string;
    expiresAt: string;
    daysRemaining: number;
  } | null;

  const handleCopyKey = () => {
    if (license?.key) {
      navigator.clipboard.writeText(license.key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">License</h1>
        <p className="text-muted">Manage your SocialNetworkArmy license.</p>
      </div>

      {/* Current license */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="w-5 h-5 mr-2" />
            Current License
          </CardTitle>
        </CardHeader>
        <CardContent>
          {license ? (
            <div className="space-y-4">
              {/* License key */}
              <div>
                <label className="text-sm text-muted mb-2 block">
                  License Key
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 font-mono text-sm bg-black/50 p-3 rounded-lg border border-border">
                    {license.key}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyKey}
                    className="px-3"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm text-muted mb-1 block">Type</label>
                  <Badge
                    variant={license.type === "LIFETIME" ? "pro" : "success"}
                  >
                    {license.type}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm text-muted mb-1 block">
                    Status
                  </label>
                  <Badge
                    variant={
                      license.status === "ACTIVE"
                        ? "success"
                        : license.status === "EXPIRED"
                        ? "error"
                        : "warning"
                    }
                  >
                    {license.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm text-muted mb-1 block">
                    Expires
                  </label>
                  <div className="flex items-center text-white">
                    <Clock className="w-4 h-4 mr-1 text-muted" />
                    {license.expiresAt || "Never"}
                  </div>
                </div>
              </div>

              {/* Warning if expiring soon */}
              {license.daysRemaining <= 7 && license.daysRemaining > 0 && (
                <div className="p-3 bg-warning/20 border border-warning/30 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 text-warning mr-2" />
                  <span className="text-warning text-sm">
                    Your license expires in {license.daysRemaining} days. Renew
                    now to avoid interruption.
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
                <Key className="w-8 h-8 text-muted" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No License Found
              </h3>
              <p className="text-muted mb-4">
                You&apos;re using the free version. Upgrade to Pro to unlock all
                features.
              </p>
              <Button variant="pro">
                <Zap className="w-4 h-4 mr-2" />
                Upgrade to Pro
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Activate license */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Activate License Key</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted text-sm mb-4">
            If you purchased a license elsewhere, enter your key below to
            activate it.
          </p>
          <form className="flex gap-2">
            <Input
              placeholder="SNAPRO-XXXX-YYYY-ZZZZ"
              className="flex-1 font-mono"
            />
            <Button variant="default">Activate</Button>
          </form>
        </CardContent>
      </Card>

      {/* Upgrade options */}
      {!license && (
        <Card>
          <CardHeader>
            <CardTitle>Upgrade Your Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Pro Monthly */}
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold text-white mb-1">Pro Monthly</h3>
                <p className="text-2xl font-bold text-white mb-2">
                  $29<span className="text-sm text-muted">/mo</span>
                </p>
                <Button variant="outline" className="w-full">
                  Subscribe
                </Button>
              </div>

              {/* Pro Annual */}
              <div className="p-4 border border-info rounded-lg bg-info/5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-white">Pro Annual</h3>
                  <Badge variant="success">Save 20%</Badge>
                </div>
                <p className="text-2xl font-bold text-white mb-2">
                  $24<span className="text-sm text-muted">/mo</span>
                </p>
                <Button variant="pro" className="w-full">
                  Subscribe
                </Button>
              </div>

              {/* Lifetime */}
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold text-white mb-1">Lifetime</h3>
                <p className="text-2xl font-bold text-white mb-2">
                  $199<span className="text-sm text-muted"> once</span>
                </p>
                <Button variant="outline" className="w-full">
                  Buy Once
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
