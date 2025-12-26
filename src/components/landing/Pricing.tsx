"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { Check, X, Sparkles, Crown, Zap, CreditCard } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCurrency } from "@/components/providers/CurrencyProvider";

const plans = [
  {
    name: "Free",
    price: { monthly: 0, annual: 0 },
    description: "Perfect for getting started",
    icon: Zap,
    gradient: "from-gray-500 to-gray-600",
    features: [
      { text: "1 account per platform", included: true },
      { text: "Basic automation", included: true },
      { text: "Manual scheduling", included: true },
      { text: "Community support", included: true },
      { text: "Unlimited accounts", included: false },
      { text: "24/7 scheduler", included: false },
      { text: "Proxies included", included: false },
    ],
    cta: "Download Free",
    href: "/download",
    popular: false,
  },
  {
    name: "Pro",
    price: { monthly: 29, annual: 278 },
    description: "For serious automation",
    icon: Sparkles,
    gradient: "from-info to-accent",
    features: [
      { text: "Unlimited accounts", included: true },
      { text: "Advanced automation", included: true },
      { text: "24/7 scheduler", included: true },
      { text: "1 proxy included", included: true, highlight: true },
      { text: "Priority support", included: true },
      { text: "All future updates", included: true },
    ],
    cta: "Get Pro",
    hrefMonthly: "/checkout?product=pro_monthly",
    hrefAnnual: "/checkout?product=pro_annual",
    popular: true,
  },
  {
    name: "Lifetime",
    price: { monthly: 299, annual: 299 },
    description: "One-time payment, forever",
    icon: Crown,
    gradient: "from-warning to-orange-500",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "10 proxies included", included: true, highlight: true },
      { text: "Lifetime updates", included: true },
      { text: "1-on-1 onboarding", included: true },
      { text: "Priority feature requests", included: true },
      { text: "No recurring fees", included: true },
    ],
    cta: "Get Lifetime",
    href: "/checkout?product=lifetime",
    popular: false,
    isLifetime: true,
  },
];

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const { format } = useCurrency();

  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient opacity-30" />
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2.5 mb-8"
          >
            <CreditCard className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-white">
              Simple Pricing
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Choose Your{" "}
            <span className="gradient-text-animated">Plan</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted max-w-2xl mx-auto mb-12"
          >
            Start free, upgrade when you need more power. Pay with card, PayPal, or crypto.
          </motion.p>

          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center glass-card rounded-full p-1.5"
          >
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                !isAnnual
                  ? "bg-gradient-to-r from-info to-accent text-white shadow-lg"
                  : "text-muted hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                isAnnual
                  ? "bg-gradient-to-r from-info to-accent text-white shadow-lg"
                  : "text-muted hover:text-white"
              }`}
            >
              Annual
              <span className="px-2 py-0.5 rounded-full bg-success/20 text-success text-xs font-bold">
                -20%
              </span>
            </button>
          </motion.div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative glass-card rounded-3xl p-8 border transition-all duration-500 ${
                plan.popular
                  ? "border-accent/50 pricing-card-popular md:scale-105 z-10"
                  : "border-border/50 hover:border-white/20"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-accent to-pink-500 text-white text-sm font-bold shadow-2xl"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Most Popular
                  </motion.span>
                </div>
              )}

              {/* Plan icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-16 h-16 rounded-2xl mb-8 flex items-center justify-center bg-gradient-to-br ${plan.gradient} shadow-2xl ${plan.popular ? "mt-4" : ""}`}
              >
                <plan.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Plan header */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-10">
                <div className="flex items-baseline">
                  <span className="stat-value text-6xl font-bold">
                    {format(plan.isLifetime
                      ? plan.price.monthly
                      : isAnnual
                      ? Math.round(plan.price.annual / 12)
                      : plan.price.monthly)}
                  </span>
                  {!plan.isLifetime && plan.price.monthly > 0 && (
                    <span className="text-muted ml-2 text-lg">/month</span>
                  )}
                  {plan.isLifetime && (
                    <span className="text-muted ml-2 text-lg">one-time</span>
                  )}
                </div>
                {isAnnual && !plan.isLifetime && plan.price.annual > 0 && (
                  <p className="text-sm text-muted mt-2">
                    Billed {format(plan.price.annual)}/year
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature: { text: string; included: boolean; highlight?: boolean }) => (
                  <li
                    key={feature.text}
                    className={`flex items-center text-sm ${feature.highlight ? "glass-card -mx-3 px-3 py-3 rounded-xl border border-accent/30" : ""}`}
                  >
                    {feature.included ? (
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                        feature.highlight ? "bg-gradient-to-br from-info to-accent" : "bg-success/20"
                      }`}>
                        <Check className={`w-3.5 h-3.5 ${feature.highlight ? "text-white" : "text-success"}`} />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-surface-hover flex items-center justify-center mr-3 flex-shrink-0">
                        <X className="w-3.5 h-3.5 text-muted" />
                      </div>
                    )}
                    <span
                      className={
                        feature.highlight ? "text-white font-medium" : feature.included ? "text-white/80" : "text-muted"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href={
                "hrefMonthly" in plan
                  ? (isAnnual ? (plan as { hrefAnnual: string }).hrefAnnual : (plan as { hrefMonthly: string }).hrefMonthly)
                  : (plan as { href: string }).href || "/download"
              }>
                <Button
                  variant={plan.popular ? "pro" : "outline"}
                  size="lg"
                  className={`w-full text-base ${plan.popular ? "animate-pulse-glow" : ""}`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Payment methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p className="text-sm text-muted mb-6">Accepted payment methods</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {[
              { name: "Visa", bg: "#1A1F71" },
              { name: "MC", bg: "#EB001B" },
              { name: "PayPal", bg: "#003087" },
              { name: "BTC", bg: "#F7931A" },
              { name: "ETH", bg: "#627EEA" },
            ].map((method) => (
              <motion.div
                key={method.name}
                whileHover={{ y: -4 }}
                className="w-16 h-10 glass-card rounded-lg border border-border/30 flex items-center justify-center"
              >
                <span className="text-xs font-bold text-white/70">{method.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
