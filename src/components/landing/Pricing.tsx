"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { Check, X, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const plans = [
  {
    name: "Free",
    price: { monthly: 0, annual: 0 },
    description: "Perfect for getting started",
    features: [
      { text: "1 account per platform", included: true },
      { text: "Basic automation", included: true },
      { text: "Manual scheduling", included: true },
      { text: "Community support", included: true },
      { text: "Advanced fingerprinting", included: false },
      { text: "Unlimited accounts", included: false },
      { text: "Priority support", included: false },
      { text: "API access", included: false },
    ],
    cta: "Download Free",
    href: "/download",
    popular: false,
  },
  {
    name: "Pro",
    price: { monthly: 29, annual: 290 },
    description: "For serious automation",
    features: [
      { text: "Unlimited accounts", included: true },
      { text: "Advanced automation", included: true },
      { text: "24/7 scheduler", included: true },
      { text: "Advanced fingerprinting", included: true },
      { text: "Proxy support", included: true },
      { text: "Priority support", included: true },
      { text: "All future updates", included: true },
      { text: "API access", included: false },
    ],
    cta: "Get Pro",
    href: "/auth/register?plan=pro",
    popular: true,
  },
  {
    name: "Lifetime",
    price: { monthly: 199, annual: 199 },
    description: "One-time payment, forever",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Lifetime updates", included: true },
      { text: "API access", included: true },
      { text: "Custom integrations", included: true },
      { text: "1-on-1 onboarding", included: true },
      { text: "Priority feature requests", included: true },
      { text: "White-label option", included: true },
      { text: "No recurring fees", included: true },
    ],
    cta: "Get Lifetime",
    href: "/auth/register?plan=lifetime",
    popular: false,
    isLifetime: true,
  },
];

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted max-w-2xl mx-auto mb-8"
          >
            Choose the plan that fits your needs. Pay with card, PayPal, or
            crypto.
          </motion.p>

          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center bg-surface rounded-full p-1"
          >
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !isAnnual
                  ? "bg-info text-white"
                  : "text-muted hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isAnnual ? "bg-info text-white" : "text-muted hover:text-white"
              }`}
            >
              Annual
              <span className="ml-1 text-xs text-success">Save 20%</span>
            </button>
          </motion.div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-surface rounded-2xl p-8 border ${
                plan.popular
                  ? "border-info shadow-lg shadow-info/20"
                  : "border-border"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-info text-white text-xs font-medium">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-white">
                    $
                    {plan.isLifetime
                      ? plan.price.monthly
                      : isAnnual
                      ? Math.round(plan.price.annual / 12)
                      : plan.price.monthly}
                  </span>
                  {!plan.isLifetime && plan.price.monthly > 0 && (
                    <span className="text-muted ml-2">/month</span>
                  )}
                  {plan.isLifetime && (
                    <span className="text-muted ml-2">one-time</span>
                  )}
                </div>
                {isAnnual && !plan.isLifetime && plan.price.annual > 0 && (
                  <p className="text-xs text-muted mt-1">
                    Billed ${plan.price.annual}/year
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li
                    key={feature.text}
                    className="flex items-center text-sm"
                  >
                    {feature.included ? (
                      <Check className="w-4 h-4 text-success mr-2 flex-shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-muted mr-2 flex-shrink-0" />
                    )}
                    <span
                      className={
                        feature.included ? "text-white" : "text-muted"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href={plan.href}>
                <Button
                  variant={plan.popular ? "pro" : "outline"}
                  size="lg"
                  className="w-full"
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
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted mb-4">Accepted payment methods</p>
          <div className="flex items-center justify-center gap-4 text-muted">
            <span className="px-3 py-1 bg-surface rounded border border-border text-xs">
              Visa
            </span>
            <span className="px-3 py-1 bg-surface rounded border border-border text-xs">
              Mastercard
            </span>
            <span className="px-3 py-1 bg-surface rounded border border-border text-xs">
              PayPal
            </span>
            <span className="px-3 py-1 bg-surface rounded border border-border text-xs">
              Bitcoin
            </span>
            <span className="px-3 py-1 bg-surface rounded border border-border text-xs">
              Ethereum
            </span>
            <span className="px-3 py-1 bg-surface rounded border border-border text-xs">
              USDT
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
