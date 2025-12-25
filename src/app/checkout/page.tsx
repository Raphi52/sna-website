"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button, Card, Input } from "@/components/ui";
import { useCurrency } from "@/components/providers/CurrencyProvider";
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
} from "lucide-react";

// Products configuration
const products = {
  // Licenses
  pro_monthly: {
    id: "pro_monthly",
    type: "license",
    name: "Pro Monthly",
    description: "Full access to SocialNetworkArmy Pro",
    price: 29,
    period: "month",
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
    features: [
      "Everything in Pro",
      "10 proxies included",
      "Lifetime updates",
      "1-on-1 onboarding",
      "Priority feature requests",
    ],
  },
  // Proxy packages
  proxy_starter: {
    id: "proxy_starter",
    type: "proxy",
    name: "Starter Proxies",
    description: "5 Static + 2GB Mobile",
    price: 29,
    period: "month",
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
    icon: (
      <div className="flex gap-2">
        <svg className="w-10 h-6" viewBox="0 0 50 32" fill="none">
          <rect width="50" height="32" rx="4" fill="#1A1F71"/>
          <text x="25" y="20" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontStyle="italic" fontFamily="Arial">VISA</text>
        </svg>
        <svg className="w-10 h-6" viewBox="0 0 50 32" fill="none">
          <rect width="50" height="32" rx="4" fill="#000"/>
          <circle cx="19" cy="16" r="10" fill="#EB001B"/>
          <circle cx="31" cy="16" r="10" fill="#F79E1B"/>
          <path d="M25 8C27.5 10 29 12.8 29 16C29 19.2 27.5 22 25 24C22.5 22 21 19.2 21 16C21 12.8 22.5 10 25 8Z" fill="#FF5F00"/>
        </svg>
      </div>
    ),
    description: "Visa, Mastercard, Amex",
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#00457C">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.633h6.116c2.058 0 3.485.436 4.238 1.298.341.39.56.831.67 1.35.115.547.116 1.203.003 2.014l-.008.051v.473l.368.21c.31.164.558.353.748.567.318.36.524.824.612 1.378.091.57.063 1.248-.085 2.014-.172.89-.451 1.662-.833 2.298a4.728 4.728 0 0 1-1.313 1.458 5.103 5.103 0 0 1-1.7.819 8.036 8.036 0 0 1-2.017.239H11.57a.94.94 0 0 0-.93.795l-.041.225-.643 4.073-.031.161a.94.94 0 0 1-.928.795H7.076z" />
      </svg>
    ),
    description: "Pay with your PayPal account",
  },
  {
    id: "crypto",
    name: "Cryptocurrency",
    icon: (
      <div className="flex gap-2">
        <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="16" fill="#F7931A"/>
          <path d="M22.5 13.5c.3-2-1.2-3.1-3.3-3.8l.7-2.7-1.7-.4-.7 2.6c-.4-.1-.9-.2-1.4-.3l.7-2.7-1.7-.4-.7 2.7c-.4-.1-.7-.2-1-.2l-2.3-.6-.4 1.8s1.2.3 1.2.3c.7.2.8.6.8 1l-.8 3.2c0 0 .1 0 .2.1-.1 0-.1 0-.2 0l-1.2 4.7c-.1.2-.3.5-.8.4 0 0-1.2-.3-1.2-.3l-.8 1.9 2.2.6c.4.1.8.2 1.2.3l-.7 2.8 1.7.4.7-2.7c.5.1.9.2 1.4.3l-.7 2.7 1.7.4.7-2.7c3 .6 5.2.3 6.1-2.3.8-2.1 0-3.3-1.6-4.1 1.1-.3 2-1 2.2-2.5zm-4 5.5c-.6 2.3-4.4 1-5.6.7l1-4c1.3.3 5.2 1 4.6 3.3zm.6-5.6c-.5 2.1-3.7.9-4.7.7l.9-3.6c1 .2 4.4.7 3.8 2.9z" fill="white"/>
        </svg>
        <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="16" fill="#627EEA"/>
          <path d="M16 4L9 16.5 16 21l7-4.5L16 4z" fill="white" fillOpacity="0.6"/>
          <path d="M9 17.5L16 28l7-10.5L16 22l-7-4.5z" fill="white"/>
        </svg>
      </div>
    ),
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

  // Get product from URL
  const productId = searchParams.get("product") as ProductKey;
  const product = productId ? products[productId] : null;

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      const callbackUrl = encodeURIComponent(`/checkout?product=${productId}`);
      router.push(`/auth/login?callbackUrl=${callbackUrl}`);
    }
  }, [status, router, productId]);

  // Handle payment
  const handlePayment = async () => {
    setProcessing(true);

    try {
      if (selectedPayment === "crypto" && selectedCrypto) {
        // Create crypto payment with QR code
        const response = await fetch("/api/payments/crypto/qr", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, currency: selectedCrypto }),
        });

        if (!response.ok) {
          throw new Error("Failed to create payment");
        }

        const data = await response.json();
        setCryptoPayment({
          payAddress: data.payAddress,
          payAmount: data.payAmount,
          payCurrency: data.payCurrency,
          qrCodeUrl: data.qrCodeUrl,
        });
      } else {
        // Demo mode for card/paypal
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

  // Fetch USD value for crypto amount
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
      if (price) {
        setUsdValue(cryptoPayment.payAmount * price);
      }
    } catch (error) {
      console.error("Failed to fetch USD value:", error);
      // Fallback: use product price as USD estimate
      if (product) {
        setUsdValue(product.price * 1.05); // EUR to USD rough estimate
      }
    } finally {
      setRefreshingUsd(false);
    }
  };

  // Fetch USD value when crypto payment is created
  useEffect(() => {
    if (cryptoPayment) {
      fetchUsdValue();
    }
  }, [cryptoPayment]);

  // Format card number with spaces
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

  // Format expiry date
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <h1 className="text-xl font-bold text-white mb-4">
            Product not found
          </h1>
          <p className="text-muted mb-6">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/pricing">
            <Button variant="pro">View Pricing</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-success/20 flex items-center justify-center">
            <Check className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Payment Successful!
          </h1>
          <p className="text-muted mb-6">
            Thank you for your purchase. Your {product.type === "license" ? "license" : "proxies"} have been activated.
          </p>
          <div className="bg-surface-hover rounded-lg p-4 mb-6">
            <p className="text-sm text-muted mb-1">Order Summary</p>
            <p className="text-lg font-semibold text-white">{product.name}</p>
            <p className="text-2xl font-bold text-success">{format(product.price)}</p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/dashboard">
              <Button variant="pro" className="w-full">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
          <p className="text-xs text-muted mt-6">
            A confirmation email has been sent to {session?.user?.email}
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/pricing"
            className="inline-flex items-center text-muted hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to pricing
          </Link>
          <h1 className="text-3xl font-bold text-white">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Demo Banner */}
            <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 flex items-start gap-3">
              <Zap className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-warning">Demo Mode</p>
                <p className="text-xs text-warning/80">
                  This is a demo checkout. No real payment will be processed.
                </p>
              </div>
            </div>

            {/* Payment Methods */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                Payment Method
              </h2>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all ${
                      selectedPayment === method.id
                        ? "border-info bg-info/10"
                        : "border-border hover:border-border-hover"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPayment === method.id
                          ? "border-info"
                          : "border-muted"
                      }`}
                    >
                      {selectedPayment === method.id && (
                        <div className="w-2.5 h-2.5 rounded-full bg-info" />
                      )}
                    </div>
                    <div className="flex-shrink-0">{method.icon}</div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-white">{method.name}</p>
                      <p className="text-xs text-muted">{method.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Card Details (only for card payment) */}
            {selectedPayment === "card" && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-white mb-4">
                  Card Details
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Cardholder Name"
                    placeholder="John Doe"
                    value={cardDetails.name}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, name: e.target.value })
                    }
                  />
                  <Input
                    label="Card Number"
                    placeholder="4242 4242 4242 4242"
                    value={cardDetails.number}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        number: formatCardNumber(e.target.value),
                      })
                    }
                    maxLength={19}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          expiry: formatExpiry(e.target.value),
                        })
                      }
                      maxLength={5}
                    />
                    <Input
                      label="CVC"
                      placeholder="123"
                      value={cardDetails.cvc}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          cvc: e.target.value.replace(/\D/g, "").slice(0, 4),
                        })
                      }
                      maxLength={4}
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* PayPal */}
            {selectedPayment === "paypal" && (
              <Card className="p-6">
                <div className="text-center py-8">
                  <svg
                    className="w-16 h-16 mx-auto mb-4"
                    viewBox="0 0 24 24"
                    fill="#00457C"
                  >
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.633h6.116c2.058 0 3.485.436 4.238 1.298.341.39.56.831.67 1.35.115.547.116 1.203.003 2.014l-.008.051v.473l.368.21c.31.164.558.353.748.567.318.36.524.824.612 1.378.091.57.063 1.248-.085 2.014-.172.89-.451 1.662-.833 2.298a4.728 4.728 0 0 1-1.313 1.458 5.103 5.103 0 0 1-1.7.819 8.036 8.036 0 0 1-2.017.239H11.57a.94.94 0 0 0-.93.795l-.041.225-.643 4.073-.031.161a.94.94 0 0 1-.928.795H7.076z" />
                  </svg>
                  <p className="text-muted">
                    You will be redirected to PayPal to complete your payment
                  </p>
                </div>
              </Card>
            )}

            {/* Crypto selection */}
            {selectedPayment === "crypto" && !cryptoPayment && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-white mb-4">
                  Select Cryptocurrency
                </h2>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { id: "btc", name: "Bitcoin", symbol: "BTC", color: "#F7931A" },
                    { id: "eth", name: "Ethereum", symbol: "ETH", color: "#627EEA" },
                  ].map((crypto) => (
                    <button
                      key={crypto.id}
                      onClick={() => setSelectedCrypto(crypto.id as "btc" | "eth")}
                      className={`p-4 rounded-lg border transition-colors text-center ${
                        selectedCrypto === crypto.id
                          ? "border-info bg-info/10"
                          : "border-border hover:border-info"
                      }`}
                    >
                      <div
                        className="w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${crypto.color}20` }}
                      >
                        <span
                          className="text-lg font-bold"
                          style={{ color: crypto.color }}
                        >
                          {crypto.symbol.charAt(0) === "B" ? "₿" : "Ξ"}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-white">
                        {crypto.symbol}
                      </p>
                      <p className="text-xs text-muted">{crypto.name}</p>
                    </button>
                  ))}
                </div>
              </Card>
            )}

            {/* Crypto QR Code Payment */}
            {selectedPayment === "crypto" && cryptoPayment && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <QrCode className="w-5 h-5" />
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
                  {/* QR Code */}
                  <div className="bg-white p-3 rounded-lg mb-4">
                    <img
                      src={cryptoPayment.qrCodeUrl}
                      alt="Payment QR Code"
                      className="w-48 h-48"
                    />
                  </div>

                  {/* Amount */}
                  <div className="text-center mb-4">
                    <p className="text-sm text-muted mb-1">Send exactly:</p>
                    <p className="text-2xl font-bold text-white">
                      {cryptoPayment.payAmount} {cryptoPayment.payCurrency.toUpperCase()}
                    </p>
                    {/* USD Converter */}
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="text-sm text-muted">
                        ≈ ${usdValue ? usdValue.toFixed(2) : "..."} USD
                      </span>
                      <button
                        onClick={fetchUsdValue}
                        disabled={refreshingUsd}
                        className="p-1 hover:bg-surface-hover rounded transition-colors"
                        title="Refresh USD value"
                      >
                        <RefreshCw className={`w-3 h-3 text-muted ${refreshingUsd ? "animate-spin" : ""}`} />
                      </button>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="w-full bg-black/50 p-3 rounded-lg border border-border">
                    <p className="text-xs text-muted mb-2">To this address:</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-xs text-info break-all">
                        {cryptoPayment.payAddress}
                      </code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(cryptoPayment.payAddress);
                        }}
                        className="p-2 bg-surface hover:bg-surface-hover rounded transition-colors flex-shrink-0"
                        title="Copy address"
                      >
                        <Copy className="w-4 h-4 text-muted" />
                      </button>
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="mt-4 bg-warning/10 border border-warning/30 rounded-lg p-3 w-full">
                    <p className="text-xs text-warning text-center">
                      Your order will be activated automatically once payment is confirmed (10-30 min)
                    </p>
                  </div>

                  {/* Dashboard link */}
                  <Link href="/dashboard/billing" className="mt-4">
                    <Button variant="outline" size="sm">
                      Check Order Status
                    </Button>
                  </Link>
                </div>
              </Card>
            )}

            {/* Pay Button */}
            {!cryptoPayment && (
              <Button
                variant="pro"
                size="lg"
                className="w-full"
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
            )}

            {/* Security badges */}
            <div className="flex items-center justify-center gap-6 text-muted">
              <div className="flex items-center gap-2 text-xs">
                <Lock className="w-4 h-4" />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Shield className="w-4 h-4" />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card className="p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-white mb-4">
                Order Summary
              </h2>

              {/* Product */}
              <div className="flex items-start gap-4 pb-4 border-b border-border">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    product.type === "license"
                      ? "gradient-pro"
                      : "bg-info/20"
                  }`}
                >
                  {product.type === "license" ? (
                    <Sparkles className="w-6 h-6 text-white" />
                  ) : (
                    <Globe className="w-6 h-6 text-info" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{product.name}</h3>
                  <p className="text-sm text-muted">{product.description}</p>
                </div>
              </div>

              {/* Features */}
              <ul className="py-4 space-y-2 border-b border-border">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-success mr-2 flex-shrink-0" />
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Pricing */}
              <div className="py-4 space-y-2">
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
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-white">
                      {format(product.price)}
                    </span>
                    {product.period !== "once" && (
                      <span className="text-muted text-sm ml-1">
                        /{product.period}
                      </span>
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
              <div className="mt-6 p-3 bg-success/10 rounded-lg flex items-start gap-3">
                <Shield className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-success">
                    7-Day Money Back Guarantee
                  </p>
                  <p className="text-xs text-success/80">
                    Not satisfied? Get a full refund within 7 days.
                  </p>
                </div>
              </div>
            </Card>
          </div>
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
          <Loader2 className="w-8 h-8 animate-spin text-muted" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
