"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button, Card, Input } from "@/components/ui";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CreditCard,
  Shield,
  Lock,
  Check,
  Loader2,
  Sparkles,
  Globe,
  Smartphone,
  Zap,
  Copy,
  QrCode,
  RefreshCw,
  Crown,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

// Products configuration
const products = {
  pro_monthly: {
    id: "pro_monthly",
    type: "license",
    name: "Pro Monthly",
    description: "Full access to SocialNetworkArmy Pro",
    price: 29,
    period: "month",
    icon: Sparkles,
    gradient: "from-info to-accent",
    features: [
      "Unlimited accounts",
      "Advanced automation",
      "24/7 scheduler",
      "1 proxy included",
      "Priority support",
    ],
  },
  pro_annual: {
    id: "pro_annual",
    type: "license",
    name: "Pro Annual",
    description: "Full access to SocialNetworkArmy Pro",
    price: 278,
    period: "year",
    monthlyPrice: 23,
    savings: 70,
    icon: Sparkles,
    gradient: "from-info to-accent",
    features: [
      "Unlimited accounts",
      "Advanced automation",
      "24/7 scheduler",
      "1 proxy included",
      "Priority support",
    ],
  },
  lifetime: {
    id: "lifetime",
    type: "license",
    name: "Lifetime",
    description: "One-time payment, forever yours",
    price: 299,
    period: "once",
    icon: Crown,
    gradient: "from-warning to-orange-500",
    features: [
      "Everything in Pro",
      "10 proxies included",
      "Lifetime updates",
      "1-on-1 onboarding",
      "Priority feature requests",
    ],
  },
  proxy_starter: {
    id: "proxy_starter",
    type: "proxy",
    name: "Starter Proxies",
    description: "5 Static + 2GB Mobile",
    price: 29,
    period: "month",
    icon: Globe,
    gradient: "from-tiktok-cyan to-tiktok-pink",
    features: [
      "5 Static Residential Proxies",
      "2 GB Rotating Mobile Data",
      "US & EU locations",
      "24/7 Support",
    ],
  },
  proxy_growth: {
    id: "proxy_growth",
    type: "proxy",
    name: "Growth Proxies",
    description: "20 Static + 10GB Mobile",
    price: 79,
    period: "month",
    popular: true,
    icon: Globe,
    gradient: "from-tiktok-cyan to-tiktok-pink",
    features: [
      "20 Static Residential Proxies",
      "10 GB Rotating Mobile Data",
      "All locations available",
      "Priority support",
    ],
  },
  proxy_scale: {
    id: "proxy_scale",
    type: "proxy",
    name: "Scale Proxies",
    description: "50 Static + 30GB Mobile",
    price: 149,
    period: "month",
    icon: Globe,
    gradient: "from-tiktok-cyan to-tiktok-pink",
    features: [
      "50 Static Residential Proxies",
      "30 GB Rotating Mobile Data",
      "Premium locations",
      "Dedicated account manager",
    ],
  },
  proxy_enterprise: {
    id: "proxy_enterprise",
    type: "proxy",
    name: "Enterprise Proxies",
    description: "100 Static + Unlimited Mobile",
    price: 299,
    period: "month",
    icon: Globe,
    gradient: "from-tiktok-cyan to-tiktok-pink",
    features: [
      "100 Static Residential Proxies",
      "Unlimited Rotating Mobile Data",
      "All premium features",
      "SLA guarantee",
    ],
  },
};

type ProductKey = keyof typeof products;

const paymentMethods = [
  {
    id: "card",
    name: "Credit Card",
    icon: CreditCard,
    logos: ["VISA", "MC"],
    description: "Visa, Mastercard, Amex",
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: Smartphone,
    description: "Pay with your PayPal account",
  },
  {
    id: "crypto",
    name: "Cryptocurrency",
    icon: Zap,
    logos: ["BTC", "ETH"],
    description: "Bitcoin, Ethereum",
  },
];

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const { format } = useCurrency();

  const [selectedPayment, setSelectedPayment] = useState("card");
  const [selectedCrypto, setSelectedCrypto] = useState<"btc" | "eth" | null>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cryptoPayment, setCryptoPayment] = useState<{
    payAddress: string;
    payAmount: number;
    payCurrency: string;
    qrCodeUrl: string;
  } | null>(null);
  const [usdValue, setUsdValue] = useState<number | null>(null);
  const [refreshingUsd, setRefreshingUsd] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const productId = searchParams.get("product") as ProductKey;
  const product = productId ? products[productId] : null;

  useEffect(() => {
    if (status === "unauthenticated") {
      const callbackUrl = encodeURIComponent(`/checkout?product=${productId}`);
      router.push(`/auth/login?callbackUrl=${callbackUrl}`);
    }
  }, [status, router, productId]);

  const handlePayment = async () => {
    setProcessing(true);
    try {
      if (selectedPayment === "crypto" && selectedCrypto) {
        const response = await fetch("/api/payments/crypto/qr", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, currency: selectedCrypto }),
        });
        if (!response.ok) throw new Error("Failed to create payment");
        const data = await response.json();
        setCryptoPayment({
          payAddress: data.payAddress,
          payAmount: data.payAmount,
          payCurrency: data.payCurrency,
          qrCodeUrl: data.qrCodeUrl,
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setSuccess(true);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const fetchUsdValue = async () => {
    if (!cryptoPayment) return;
    setRefreshingUsd(true);
    try {
      const symbol = cryptoPayment.payCurrency.toLowerCase();
      const coinId = symbol.includes("btc") ? "bitcoin" : "ethereum";
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`
      );
      const data = await response.json();
      const price = data[coinId]?.usd;
      if (price) setUsdValue(cryptoPayment.payAmount * price);
    } catch (error) {
      console.error("Failed to fetch USD value:", error);
      if (product) setUsdValue(product.price * 1.05);
    } finally {
      setRefreshingUsd(false);
    }
  };

  useEffect(() => {
    if (cryptoPayment) fetchUsdValue();
  }, [cryptoPayment]);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) return v.substring(0, 2) + "/" + v.substring(2, 4);
    return v;
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-10 h-10 text-accent" />
        </motion.div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl p-10 text-center max-w-md relative border border-border/50"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-error/20 to-error/10 flex items-center justify-center">
            <Zap className="w-10 h-10 text-error" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Product not found</h1>
          <p className="text-muted mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/#pricing">
            <Button variant="pro" size="lg">View Pricing</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-success/20 rounded-full blur-[150px]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card rounded-3xl p-10 text-center max-w-md relative border border-success/30"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-success to-emerald-400 flex items-center justify-center shadow-2xl"
            style={{ boxShadow: "0 0 60px rgba(16, 185, 129, 0.4)" }}
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-white mb-3"
          >
            Payment Successful!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted mb-8"
          >
            Thank you for your purchase. Your {product.type === "license" ? "license" : "proxies"} have been activated.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-2xl p-6 mb-8 border border-border/30"
          >
            <p className="text-sm text-muted mb-2">Order Summary</p>
            <p className="text-xl font-semibold text-white mb-1">{product.name}</p>
            <p className="stat-value text-4xl font-bold">{format(product.price)}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-3"
          >
            <Link href="/dashboard">
              <Button variant="pro" size="lg" className="w-full group">
                Go to Dashboard
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg" className="w-full">
                Back to Home
              </Button>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xs text-muted mt-8"
          >
            A confirmation email has been sent to {session?.user?.email}
          </motion.p>
        </motion.div>
      </div>
    );
  }

  const ProductIcon = product.icon;

  return (
    <div className="min-h-screen bg-background py-12 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="orb orb-1 opacity-20" />
      <div className="orb orb-2 opacity-20" />

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <Link
            href="/#pricing"
            className="inline-flex items-center text-muted hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to pricing
          </Link>
          <h1 className="text-4xl font-bold text-white">Checkout</h1>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Demo Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-5 flex items-start gap-4 border border-warning/30"
            >
              <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="font-semibold text-warning mb-1">Demo Mode</p>
                <p className="text-sm text-warning/80">
                  This is a demo checkout. No real payment will be processed.
                </p>
              </div>
            </motion.div>

            {/* Payment Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-3xl p-8 border border-border/50"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Payment Method</h2>
              <div className="space-y-4">
                {paymentMethods.map((method, i) => (
                  <motion.button
                    key={method.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 ${
                      selectedPayment === method.id
                        ? "border-accent/50 bg-accent/10"
                        : "border-border/50 hover:border-white/20 glass-card"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedPayment === method.id ? "border-accent" : "border-muted"
                      }`}
                    >
                      {selectedPayment === method.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 rounded-full bg-gradient-to-br from-info to-accent"
                        />
                      )}
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      selectedPayment === method.id ? "bg-gradient-to-br from-info to-accent" : "bg-surface-hover"
                    }`}>
                      <method.icon className={`w-6 h-6 ${selectedPayment === method.id ? "text-white" : "text-muted"}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-white">{method.name}</p>
                      <p className="text-sm text-muted">{method.description}</p>
                    </div>
                    {"logos" in method && method.logos && (
                      <div className="flex gap-2">
                        {method.logos.map((logo) => (
                          <span key={logo} className="px-2 py-1 rounded bg-surface-hover text-xs font-bold text-muted">
                            {logo}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Card Details */}
            <AnimatePresence mode="wait">
              {selectedPayment === "card" && (
                <motion.div
                  key="card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass-card rounded-3xl p-8 border border-border/50"
                >
                  <h2 className="text-xl font-semibold text-white mb-6">Card Details</h2>
                  <div className="space-y-5">
                    <Input
                      label="Cardholder Name"
                      placeholder="John Doe"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                    />
                    <Input
                      label="Card Number"
                      placeholder="4242 4242 4242 4242"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: formatCardNumber(e.target.value) })}
                      maxLength={19}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Expiry Date"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: formatExpiry(e.target.value) })}
                        maxLength={5}
                      />
                      <Input
                        label="CVC"
                        placeholder="123"
                        value={cardDetails.cvc}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                        maxLength={4}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedPayment === "paypal" && (
                <motion.div
                  key="paypal"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass-card rounded-3xl p-8 border border-border/50"
                >
                  <div className="text-center py-8">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#003087]/20 flex items-center justify-center">
                      <span className="text-3xl font-bold text-[#003087]">P</span>
                    </div>
                    <p className="text-muted">You will be redirected to PayPal to complete your payment</p>
                  </div>
                </motion.div>
              )}

              {selectedPayment === "crypto" && !cryptoPayment && (
                <motion.div
                  key="crypto-select"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass-card rounded-3xl p-8 border border-border/50"
                >
                  <h2 className="text-xl font-semibold text-white mb-6">Select Cryptocurrency</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: "btc", name: "Bitcoin", symbol: "BTC", color: "#F7931A" },
                      { id: "eth", name: "Ethereum", symbol: "ETH", color: "#627EEA" },
                    ].map((crypto) => (
                      <motion.button
                        key={crypto.id}
                        whileHover={{ y: -4 }}
                        onClick={() => setSelectedCrypto(crypto.id as "btc" | "eth")}
                        className={`p-6 rounded-2xl border transition-all ${
                          selectedCrypto === crypto.id
                            ? "border-accent/50 bg-accent/10"
                            : "border-border/50 glass-card hover:border-white/20"
                        }`}
                      >
                        <div
                          className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                          style={{ backgroundColor: `${crypto.color}20` }}
                        >
                          <span className="text-2xl font-bold" style={{ color: crypto.color }}>
                            {crypto.symbol.charAt(0) === "B" ? "₿" : "Ξ"}
                          </span>
                        </div>
                        <p className="font-semibold text-white">{crypto.symbol}</p>
                        <p className="text-sm text-muted">{crypto.name}</p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {selectedPayment === "crypto" && cryptoPayment && (
                <motion.div
                  key="crypto-qr"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass-card rounded-3xl p-8 border border-border/50"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                      <QrCode className="w-6 h-6 text-accent" />
                      Scan to Pay
                    </h2>
                    <button
                      onClick={() => {
                        setCryptoPayment(null);
                        setSelectedCrypto(null);
                        setUsdValue(null);
                      }}
                      className="text-sm text-muted hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Change
                    </button>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-white p-4 rounded-2xl mb-6 shadow-2xl">
                      <img src={cryptoPayment.qrCodeUrl} alt="Payment QR Code" className="w-52 h-52" />
                    </div>
                    <div className="text-center mb-6">
                      <p className="text-sm text-muted mb-2">Send exactly:</p>
                      <p className="stat-value text-3xl font-bold">
                        {cryptoPayment.payAmount} {cryptoPayment.payCurrency.toUpperCase()}
                      </p>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <span className="text-sm text-muted">≈ ${usdValue ? usdValue.toFixed(2) : "..."} USD</span>
                        <button
                          onClick={fetchUsdValue}
                          disabled={refreshingUsd}
                          className="p-1.5 rounded-lg hover:bg-surface-hover transition-colors"
                        >
                          <RefreshCw className={`w-4 h-4 text-muted ${refreshingUsd ? "animate-spin" : ""}`} />
                        </button>
                      </div>
                    </div>
                    <div className="w-full glass-card p-4 rounded-2xl border border-border/30">
                      <p className="text-xs text-muted mb-2">To this address:</p>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 text-sm text-info break-all font-mono">{cryptoPayment.payAddress}</code>
                        <button
                          onClick={() => navigator.clipboard.writeText(cryptoPayment.payAddress)}
                          className="p-2.5 rounded-xl glass-card hover:bg-surface-hover transition-colors flex-shrink-0"
                        >
                          <Copy className="w-5 h-5 text-muted" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-6 p-4 rounded-2xl bg-warning/10 border border-warning/30 w-full">
                      <p className="text-sm text-warning text-center">
                        Your order will be activated automatically once payment is confirmed (10-30 min)
                      </p>
                    </div>
                    <Link href="/dashboard/billing" className="mt-6">
                      <Button variant="outline">Check Order Status</Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pay Button */}
            {!cryptoPayment && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  variant="pro"
                  size="lg"
                  className="w-full text-lg py-7 animate-pulse-glow"
                  onClick={handlePayment}
                  disabled={processing || (selectedPayment === "crypto" && !selectedCrypto)}
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : selectedPayment === "crypto" ? (
                    <>
                      <QrCode className="w-5 h-5 mr-2" />
                      Generate QR Code
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Pay {format(product.price)}
                    </>
                  )}
                </Button>
              </motion.div>
            )}

            {/* Security badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-8 text-muted"
            >
              <div className="flex items-center gap-2 text-sm">
                <Lock className="w-4 h-4 text-success" />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-success" />
                <span>Secure Payment</span>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="glass-card rounded-3xl p-8 sticky top-8 border border-border/50">
              <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>

              {/* Product */}
              <div className="flex items-start gap-4 pb-6 border-b border-border/30">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${product.gradient} shadow-2xl`}
                >
                  <ProductIcon className="w-8 h-8 text-white" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-lg">{product.name}</h3>
                  <p className="text-sm text-muted">{product.description}</p>
                </div>
              </div>

              {/* Features */}
              <ul className="py-6 space-y-3 border-b border-border/30">
                {product.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    className="flex items-center text-sm"
                  >
                    <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center mr-3 flex-shrink-0">
                      <Check className="w-3 h-3 text-success" />
                    </div>
                    <span className="text-white/80">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Pricing */}
              <div className="py-6 space-y-3 border-b border-border/30">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="text-white">{format(product.price)}</span>
                </div>
                {"savings" in product && (product as { savings?: number }).savings && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Annual savings</span>
                    <span className="text-success">-{format((product as { savings?: number }).savings || 0)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Tax</span>
                  <span className="text-white">{format(0)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="pt-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <div className="text-right">
                    <span className="stat-value text-4xl font-bold">{format(product.price)}</span>
                    {product.period !== "once" && (
                      <span className="text-muted text-sm ml-1">/{product.period}</span>
                    )}
                  </div>
                </div>
                {"monthlyPrice" in product && (product as { monthlyPrice?: number }).monthlyPrice && (
                  <p className="text-xs text-muted text-right mt-1">
                    ({format((product as { monthlyPrice?: number }).monthlyPrice || 0)}/month billed annually)
                  </p>
                )}
              </div>

              {/* Guarantee */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 p-4 rounded-2xl bg-success/10 border border-success/30 flex items-start gap-3"
              >
                <Shield className="w-6 h-6 text-success flex-shrink-0" />
                <div>
                  <p className="font-semibold text-success">7-Day Money Back Guarantee</p>
                  <p className="text-sm text-success/80">Not satisfied? Get a full refund within 7 days.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-10 h-10 text-accent" />
          </motion.div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
