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
            {/* Visa */}
            <motion.div whileHover={{ y: -4 }} className="w-16 h-10 glass-card rounded-lg border border-border/30 flex items-center justify-center">
              <svg className="w-10 h-6" viewBox="0 0 50 32" fill="none">
                <rect width="50" height="32" rx="4" fill="#1A1F71"/>
                <text x="25" y="20" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontStyle="italic" fontFamily="Arial">VISA</text>
              </svg>
            </motion.div>
            {/* Mastercard */}
            <motion.div whileHover={{ y: -4 }} className="w-16 h-10 glass-card rounded-lg border border-border/30 flex items-center justify-center">
              <svg className="w-8 h-5" viewBox="0 0 50 30" fill="none">
                <circle cx="18" cy="15" r="12" fill="#EB001B"/>
                <circle cx="32" cy="15" r="12" fill="#F79E1B"/>
                <path d="M25 6C27.5 8 29 11.5 29 15C29 18.5 27.5 22 25 24C22.5 22 21 18.5 21 15C21 11.5 22.5 8 25 6Z" fill="#FF5F00"/>
              </svg>
            </motion.div>
            {/* PayPal */}
            <motion.div whileHover={{ y: -4 }} className="w-16 h-10 glass-card rounded-lg border border-border/30 flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#00457C">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.633h6.116c2.058 0 3.485.436 4.238 1.298.341.39.56.831.67 1.35.115.547.116 1.203.003 2.014l-.008.051v.473l.368.21c.31.164.558.353.748.567.318.36.524.824.612 1.378.091.57.063 1.248-.085 2.014-.172.89-.451 1.662-.833 2.298a4.728 4.728 0 0 1-1.313 1.458 5.103 5.103 0 0 1-1.7.819 8.036 8.036 0 0 1-2.017.239H11.57a.94.94 0 0 0-.93.795l-.041.225-.643 4.073-.031.161a.94.94 0 0 1-.928.795H7.076z"/>
              </svg>
            </motion.div>
            {/* Bitcoin */}
            <motion.div whileHover={{ y: -4 }} className="w-16 h-10 glass-card rounded-lg border border-border/30 flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#F7931A"/>
                <path d="M22.5 13.5c.3-2-1.2-3.1-3.3-3.8l.7-2.7-1.7-.4-.7 2.6c-.4-.1-.9-.2-1.4-.3l.7-2.7-1.7-.4-.7 2.7c-.4-.1-.7-.2-1-.2l-2.3-.6-.4 1.8s1.2.3 1.2.3c.7.2.8.6.8 1l-.8 3.2c0 0 .1 0 .2.1-.1 0-.1 0-.2 0l-1.2 4.7c-.1.2-.3.5-.8.4 0 0-1.2-.3-1.2-.3l-.8 1.9 2.2.6c.4.1.8.2 1.2.3l-.7 2.8 1.7.4.7-2.7c.5.1.9.2 1.4.3l-.7 2.7 1.7.4.7-2.7c3 .6 5.2.3 6.1-2.3.8-2.1 0-3.3-1.6-4.1 1.1-.3 2-1 2.2-2.5zm-4 5.5c-.6 2.3-4.4 1-5.6.7l1-4c1.3.3 5.2 1 4.6 3.3zm.6-5.6c-.5 2.1-3.7.9-4.7.7l.9-3.6c1 .2 4.4.7 3.8 2.9z" fill="white"/>
              </svg>
            </motion.div>
            {/* Ethereum */}
            <motion.div whileHover={{ y: -4 }} className="w-16 h-10 glass-card rounded-lg border border-border/30 flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#627EEA"/>
                <path d="M16 4L9 16.5 16 21l7-4.5L16 4z" fill="white" fillOpacity="0.6"/>
                <path d="M9 17.5L16 28l7-10.5L16 22l-7-4.5z" fill="white"/>
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
