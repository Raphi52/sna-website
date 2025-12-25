"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button, Card, Input } from "@/components/ui";
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
      "1 proxy included/month",
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
      "1 proxy included/month",
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
      "10 proxies included/month",
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
      <div className="flex gap-1">
        <svg className="w-8 h-5" viewBox="0 0 50 16" fill="none">
          <path d="M19.5 1L16.5 15H13L16 1H19.5Z" fill="#1434CB" />
          <path d="M32 1L28.5 15H25L28.5 1H32Z" fill="#1434CB" />
          <path
            d="M10 1L6.5 10.5L6 8L4.5 2C4.5 2 4.3 1 3 1H0V1.5C0 1.5 1.5 1.8 3 2.5L6 15H9.5L14 1H10Z"
            fill="#1434CB"
          />
          <path
            d="M42 1C41 1 40.5 1.5 40 2.5L34.5 15H38L38.7 13H43L43.4 15H46.5L43.5 1H42ZM39.5 10L41.5 4L42.5 10H39.5Z"
            fill="#1434CB"
          />
        </svg>
        <svg className="w-8 h-5" viewBox="0 0 50 30" fill="none">
          <circle cx="18" cy="15" r="12" fill="#EB001B" />
          <circle cx="32" cy="15" r="12" fill="#F79E1B" />
          <path
            d="M25 6C27.5 8 29 11.5 29 15C29 18.5 27.5 22 25 24C22.5 22 21 18.5 21 15C21 11.5 22.5 8 25 6Z"
            fill="#FF5F00"
          />
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
      <div className="flex gap-1">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#F7931A">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 10.889c.076-.502-.307-.772-.83-.952l.17-.68-1.042-.26-.165.664c-.274-.068-.555-.132-.835-.196l.167-.67-1.042-.259-.17.68c-.227-.052-.45-.103-.665-.157l.001-.004-1.437-.359-.22.834s.772.177.756.188c.421.105.497.383.484.604l-.485 1.946c.029.007.066.018.108.035l-.11-.028-.68 2.727c-.052.128-.182.32-.476.248.01.015-.756-.189-.756-.189l-.517.894 1.357.338c.252.063.5.13.743.191l-.172.689 1.041.26.17-.682c.284.077.56.148.828.215l-.168.675 1.042.26.172-.69c1.413.268 2.476.16 2.923-.867.36-.828-.018-1.307-.613-1.618.436-.1.764-.387.852-.979zm-1.523 2.135c-.256 1.026-1.986.471-2.547.332l.454-1.822c.561.14 2.362.416 2.093 1.49zm.255-2.145c-.233.935-1.673.46-2.14.344l.412-1.653c.466.116 1.97.333 1.728 1.31z" />
        </svg>
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#627EEA">
          <path d="M12 0L4.5 12.3 12 16.5l7.5-4.2L12 0z" />
          <path
            d="M4.5 13.5L12 24l7.5-10.5L12 17.7 4.5 13.5z"
            fillOpacity="0.6"
          />
        </svg>
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#26A17B">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 7.5h-3v3h3v1.5h-3V18h-3v-6H7.5v-1.5h3v-3H7.5V6h9v1.5z" />
        </svg>
      </div>
    ),
    description: "Bitcoin, Ethereum, USDT",
  },
];

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const [selectedPayment, setSelectedPayment] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
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
      router.push(`/auth/login?callbackUrl=/checkout?product=${productId}`);
    }
  }, [status, router, productId]);

  // Handle demo payment
  const handlePayment = async () => {
    setProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setProcessing(false);
    setSuccess(true);
  };

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
            <p className="text-2xl font-bold text-success">{product.price}€</p>
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

            {/* Crypto */}
            {selectedPayment === "crypto" && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-white mb-4">
                  Select Cryptocurrency
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "btc", name: "Bitcoin", symbol: "BTC", color: "#F7931A" },
                    { id: "eth", name: "Ethereum", symbol: "ETH", color: "#627EEA" },
                    { id: "usdt", name: "Tether", symbol: "USDT", color: "#26A17B" },
                  ].map((crypto) => (
                    <button
                      key={crypto.id}
                      className="p-4 rounded-lg border border-border hover:border-info transition-colors text-center"
                    >
                      <div
                        className="w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${crypto.color}20` }}
                      >
                        <span
                          className="text-lg font-bold"
                          style={{ color: crypto.color }}
                        >
                          {crypto.symbol.charAt(0)}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-white">
                        {crypto.symbol}
                      </p>
                      <p className="text-xs text-muted">{crypto.name}</p>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted mt-4 text-center">
                  Payment will be processed via NOWPayments
                </p>
              </Card>
            )}

            {/* Pay Button */}
            <Button
              variant="pro"
              size="lg"
              className="w-full"
              onClick={handlePayment}
              disabled={processing}
            >
              {processing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  Pay {product.price}€
                </>
              )}
            </Button>

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
                  <span className="text-white">{product.price}€</span>
                </div>
                {"savings" in product && product.savings && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Annual savings</span>
                    <span className="text-success">-{product.savings}€</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Tax</span>
                  <span className="text-white">0€</span>
                </div>
              </div>

              {/* Total */}
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-white">
                      {product.price}€
                    </span>
                    {product.period !== "once" && (
                      <span className="text-muted text-sm ml-1">
                        /{product.period}
                      </span>
                    )}
                  </div>
                </div>
                {"monthlyPrice" in product && product.monthlyPrice && (
                  <p className="text-xs text-muted text-right mt-1">
                    ({product.monthlyPrice}€/month billed annually)
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
