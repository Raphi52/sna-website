"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from "@/components/ui";
import {
  Globe,
  Smartphone,
  Copy,
  Check,
  RefreshCw,
  Clock,
  Zap,
  MapPin,
  ArrowRight,
  Eye,
  EyeOff,
  Download,
  RotateCcw,
  Loader2,
} from "lucide-react";
import Link from "next/link";

interface ProxySubscription {
  id: string;
  packageName: string;
  packageSlug: string;
  status: string;
  startDate: string;
  expiresAt: string;
  daysRemaining: number;
  staticProxies: Array<{
    id: string;
    host: string;
    port: number;
    username: string;
    password: string;
    country: string;
    city: string;
  }>;
  rotatingEndpoint: {
    host: string;
    port: number;
    username: string;
    password: string;
  } | null;
  rotatingUsedGB: number;
  rotatingTotalGB: number;
  unlimitedRotating: boolean;
}

const packages = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    staticCount: 5,
    rotatingGB: 2,
  },
  {
    id: "growth",
    name: "Growth",
    price: 79,
    staticCount: 20,
    rotatingGB: 10,
    popular: true,
  },
  {
    id: "scale",
    name: "Scale",
    price: 149,
    staticCount: 50,
    rotatingGB: 30,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 299,
    staticCount: 100,
    rotatingGB: -1,
  },
];

export default function ProxiesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<ProxySubscription[]>([]);

  useEffect(() => {
    fetchProxies();
  }, []);

  const fetchProxies = async () => {
    try {
      const res = await fetch("/api/proxies");
      if (res.ok) {
        const data = await res.json();
        setSubscriptions(data.subscriptions || []);
      }
    } catch (error) {
      console.error("Error fetching proxies:", error);
    } finally {
      setLoading(false);
    }
  };

  const activeOrder = subscriptions.length > 0 ? subscriptions[0] : null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const togglePassword = (id: string) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const formatProxyString = (proxy: { host: string; port: number; username: string; password: string }) => {
    return `${proxy.host}:${proxy.port}:${proxy.username}:${proxy.password}`;
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-muted" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Proxies</h1>
        <p className="text-muted">
          Manage your compatible proxies for SocialNetworkArmy.
        </p>
      </div>

      {activeOrder ? (
        <>
          {/* Active Subscription Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Active Subscription
                </span>
                <Badge variant="success">{activeOrder.status}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted mb-1">Package</p>
                  <p className="text-lg font-semibold text-white">
                    {activeOrder.packageName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Static Proxies</p>
                  <p className="text-lg font-semibold text-white">
                    {activeOrder.staticProxies.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Rotating Data</p>
                  <p className="text-lg font-semibold text-white">
                    {activeOrder.unlimitedRotating
                      ? "Unlimited"
                      : `${activeOrder.rotatingUsedGB.toFixed(2)} / ${activeOrder.rotatingTotalGB} GB`}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Expires</p>
                  <p className="text-lg font-semibold text-white flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-muted" />
                    {activeOrder.daysRemaining} days
                  </p>
                </div>
              </div>

              {/* Rotating data progress bar */}
              {!activeOrder.unlimitedRotating && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted">Mobile Data Usage</span>
                    <span className="text-white">
                      {((activeOrder.rotatingUsedGB / activeOrder.rotatingTotalGB) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-2 bg-surface-hover rounded-full overflow-hidden">
                    <div
                      className="h-full bg-tiktok-cyan rounded-full transition-all"
                      style={{
                        width: `${Math.min(
                          (activeOrder.rotatingUsedGB / activeOrder.rotatingTotalGB) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Rotating Mobile Proxy */}
          {activeOrder.rotatingEndpoint && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="w-5 h-5 mr-2 text-tiktok-cyan" />
                  Rotating Mobile Proxy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted text-sm mb-4">
                  Use this endpoint for account creation. IP rotates with every request.
                </p>
                <div className="bg-black/50 p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-muted">Connection String</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePassword("rotating")}
                        className="text-muted hover:text-white transition-colors"
                      >
                        {showPasswords["rotating"] ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          handleCopy(
                            formatProxyString(activeOrder.rotatingEndpoint!),
                            "rotating"
                          )
                        }
                        className="text-muted hover:text-white transition-colors"
                      >
                        {copiedId === "rotating" ? (
                          <Check className="w-4 h-4 text-success" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <code className="text-sm text-white font-mono break-all">
                    {showPasswords["rotating"]
                      ? formatProxyString(activeOrder.rotatingEndpoint)
                      : `${activeOrder.rotatingEndpoint.host}:${activeOrder.rotatingEndpoint.port}:${activeOrder.rotatingEndpoint.username}:********`}
                  </code>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted">
                  <RotateCcw className="w-3 h-3 animate-spin" style={{ animationDuration: "3s" }} />
                  <span>IP rotates automatically with every account created</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Static Residential Proxies */}
          {activeOrder.staticProxies.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-instagram-violet" />
                    Static Residential Proxies
                  </span>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted text-sm mb-4">
                  Use these dedicated IPs for running your accounts. Each proxy maintains the same IP.
                </p>
                <div className="space-y-3">
                  {activeOrder.staticProxies.map((proxy) => (
                    <div
                      key={proxy.id}
                      className="bg-black/50 p-4 rounded-lg border border-border"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted" />
                          <span className="text-sm text-white">
                            {proxy.city}, {proxy.country}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => togglePassword(proxy.id)}
                            className="text-muted hover:text-white transition-colors"
                          >
                            {showPasswords[proxy.id] ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() =>
                              handleCopy(formatProxyString(proxy), proxy.id)
                            }
                            className="text-muted hover:text-white transition-colors"
                          >
                            {copiedId === proxy.id ? (
                              <Check className="w-4 h-4 text-success" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      <code className="text-xs text-muted font-mono">
                        {showPasswords[proxy.id]
                          ? formatProxyString(proxy)
                          : `${proxy.host}:${proxy.port}:${proxy.username}:********`}
                      </code>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Renew/Upgrade */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RefreshCw className="w-5 h-5 mr-2" />
                Renew or Upgrade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted text-sm mb-4">
                Need more proxies or data? Upgrade your package or renew early.
              </p>
              <div className="flex gap-3">
                <Link href={`/checkout?product=proxy_${activeOrder.packageSlug}`}>
                  <Button variant="outline">Renew Current Package</Button>
                </Link>
                <Link href="/#proxies">
                  <Button variant="pro">
                    <Zap className="w-4 h-4 mr-2" />
                    Upgrade Package
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          {/* No Active Subscription */}
          <Card className="mb-8">
            <CardContent className="py-12">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/20 flex items-center justify-center">
                  <Globe className="w-10 h-10 text-muted" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No Active Proxy Subscription
                </h3>
                <p className="text-muted mb-6 max-w-md mx-auto">
                  Get premium proxies fully compatible with SocialNetworkArmy.
                  We are the only provider offering proxies optimized for maximum success rate.
                </p>
                <Link href="/#proxies">
                  <Button variant="pro" size="lg">
                    <Zap className="w-5 h-5 mr-2" />
                    View Proxy Packages
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Package Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Available Packages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`p-4 rounded-lg border ${
                      pkg.popular
                        ? "border-info bg-info/5"
                        : "border-border hover:border-border-hover"
                    } transition-colors`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{pkg.name}</h4>
                      {pkg.popular && (
                        <Badge variant="info">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-white mb-3">
                      ${pkg.price}
                      <span className="text-sm text-muted font-normal">/mo</span>
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted">
                        <Globe className="w-4 h-4 text-instagram-violet" />
                        <span>{pkg.staticCount} Static IPs</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted">
                        <Smartphone className="w-4 h-4 text-tiktok-cyan" />
                        <span>
                          {pkg.rotatingGB === -1
                            ? "Unlimited Mobile"
                            : `${pkg.rotatingGB} GB Mobile`}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link href="/#proxies">
                  <Button variant="default">
                    Compare All Features
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
