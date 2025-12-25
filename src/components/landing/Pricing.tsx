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
    features: [
      { text: "Unlimited accounts", included: true },
      { text: "Advanced automation", included: true },
      { text: "24/7 scheduler", included: true },
      { text: "Advanced fingerprinting", included: true },
      { text: "1 proxy included/month", included: true, highlight: true },
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
    features: [
      { text: "Everything in Pro", included: true },
      { text: "10 proxies included/month", included: true, highlight: true },
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
                    {plan.isLifetime
                      ? plan.price.monthly
                      : isAnnual
                      ? Math.round(plan.price.annual / 12)
                      : plan.price.monthly}€
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
                    Billed {plan.price.annual}€/year
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature: { text: string; included: boolean; highlight?: boolean }) => (
                  <li
                    key={feature.text}
                    className={`flex items-center text-sm ${feature.highlight ? "bg-info/10 -mx-2 px-2 py-1 rounded-lg" : ""}`}
                  >
                    {feature.included ? (
                      <Check className={`w-4 h-4 ${feature.highlight ? "text-info" : "text-success"} mr-2 flex-shrink-0`} />
                    ) : (
                      <X className="w-4 h-4 text-muted mr-2 flex-shrink-0" />
                    )}
                    <span
                      className={
                        feature.highlight ? "text-info font-medium" : feature.included ? "text-white" : "text-muted"
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
                  ? (isAnnual ? (plan as any).hrefAnnual : (plan as any).hrefMonthly)
                  : (plan as any).href || "/download"
              }>
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
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="px-3 py-2 bg-surface rounded border border-border text-xs flex items-center gap-2">
              <svg className="w-8 h-5" viewBox="0 0 48 32" fill="none">
                <rect width="48" height="32" rx="4" fill="#1A1F71"/>
                <path d="M18.5 21L21.5 11H24L21 21H18.5Z" fill="white"/>
                <path d="M30.5 11.2C30 11 29.2 10.8 28.2 10.8C25.3 10.8 23.3 12.3 23.3 14.4C23.3 16 24.7 16.9 25.8 17.4C26.9 17.9 27.3 18.3 27.3 18.8C27.3 19.6 26.3 19.9 25.5 19.9C24.3 19.9 23.7 19.7 22.7 19.3L22.3 19.1L21.9 21.6C22.6 21.9 23.9 22.2 25.2 22.2C28.3 22.2 30.3 20.7 30.3 18.5C30.3 17.2 29.5 16.2 27.8 15.4C26.8 14.9 26.2 14.5 26.2 14C26.2 13.5 26.7 13 27.8 13C28.7 13 29.4 13.2 29.9 13.4L30.2 13.5L30.5 11.2Z" fill="white"/>
                <path d="M35.5 11H33.3C32.6 11 32.1 11.2 31.8 12L27.5 21H30.6L31.2 19.3H35L35.4 21H38.1L35.5 11ZM32 17C32.2 16.4 33.2 13.8 33.2 13.8C33.2 13.8 33.5 13 33.6 12.5L33.9 13.6C33.9 13.6 34.5 16.2 34.6 17H32Z" fill="white"/>
                <path d="M16.3 11L13.4 18L13.1 16.5C12.5 14.7 10.8 12.8 9 11.9L11.6 21H14.8L19.5 11H16.3Z" fill="white"/>
                <path d="M11.2 11H6.5L6.5 11.2C10.2 12.2 12.6 14.5 13.1 16.5L12.4 12C12.3 11.2 11.9 11 11.2 11Z" fill="#F9A533"/>
              </svg>
              Visa
            </span>
            <span className="px-3 py-2 bg-surface rounded border border-border text-xs flex items-center gap-2">
              <svg className="w-6 h-4" viewBox="0 0 50 30" fill="none">
                <circle cx="18" cy="15" r="12" fill="#EB001B"/>
                <circle cx="32" cy="15" r="12" fill="#F79E1B"/>
                <path d="M25 6C27.5 8 29 11.5 29 15C29 18.5 27.5 22 25 24C22.5 22 21 18.5 21 15C21 11.5 22.5 8 25 6Z" fill="#FF5F00"/>
              </svg>
              Mastercard
            </span>
            <span className="px-3 py-2 bg-surface rounded border border-border text-xs flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#00457C">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.633h6.116c2.058 0 3.485.436 4.238 1.298.341.39.56.831.67 1.35.115.547.116 1.203.003 2.014l-.008.051v.473l.368.21c.31.164.558.353.748.567.318.36.524.824.612 1.378.091.57.063 1.248-.085 2.014-.172.89-.451 1.662-.833 2.298a4.728 4.728 0 0 1-1.313 1.458 5.103 5.103 0 0 1-1.7.819 8.036 8.036 0 0 1-2.017.239H11.57a.94.94 0 0 0-.93.795l-.041.225-.643 4.073-.031.161a.94.94 0 0 1-.928.795H7.076z"/>
              </svg>
              PayPal
            </span>
            <span className="px-3 py-2 bg-surface rounded border border-border text-xs flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#F7931A"/>
                <path d="M22.5 13.5c.3-2-1.2-3.1-3.3-3.8l.7-2.7-1.7-.4-.7 2.6c-.4-.1-.9-.2-1.4-.3l.7-2.7-1.7-.4-.7 2.7c-.4-.1-.7-.2-1-.2l-2.3-.6-.4 1.8s1.2.3 1.2.3c.7.2.8.6.8 1l-.8 3.2c0 0 .1 0 .2.1-.1 0-.1 0-.2 0l-1.2 4.7c-.1.2-.3.5-.8.4 0 0-1.2-.3-1.2-.3l-.8 1.9 2.2.6c.4.1.8.2 1.2.3l-.7 2.8 1.7.4.7-2.7c.5.1.9.2 1.4.3l-.7 2.7 1.7.4.7-2.7c3 .6 5.2.3 6.1-2.3.8-2.1 0-3.3-1.6-4.1 1.1-.3 2-1 2.2-2.5zm-4 5.5c-.6 2.3-4.4 1-5.6.7l1-4c1.3.3 5.2 1 4.6 3.3zm.6-5.6c-.5 2.1-3.7.9-4.7.7l.9-3.6c1 .2 4.4.7 3.8 2.9z" fill="white"/>
              </svg>
              Bitcoin
            </span>
            <span className="px-3 py-2 bg-surface rounded border border-border text-xs flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#627EEA">
                <path d="M12 0L4.5 12.3 12 16.5l7.5-4.2L12 0z"/>
                <path d="M4.5 13.5L12 24l7.5-10.5L12 17.7 4.5 13.5z" fillOpacity="0.6"/>
              </svg>
              Ethereum
            </span>
            <span className="px-3 py-2 bg-surface rounded border border-border text-xs flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#26A17B">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 7.5h-3v3h3v1.5h-3V18h-3v-6H7.5v-1.5h3v-3H7.5V6h9v1.5z"/>
              </svg>
              USDT
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
