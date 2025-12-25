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
                  ? (isAnnual ? plan.hrefAnnual : plan.hrefMonthly)
                  : plan.href
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
              <svg className="w-6 h-4" viewBox="0 0 50 16" fill="none">
                <path d="M19.5 1L16.5 15H13L16 1H19.5Z" fill="#1434CB"/>
                <path d="M32 1L28.5 15H25L28.5 1H32Z" fill="#1434CB"/>
                <path d="M10 1L6.5 10.5L6 8L4.5 2C4.5 2 4.3 1 3 1H0V1.5C0 1.5 1.5 1.8 3 2.5L6 15H9.5L14 1H10Z" fill="#1434CB"/>
                <path d="M42 1C41 1 40.5 1.5 40 2.5L34.5 15H38L38.7 13H43L43.4 15H46.5L43.5 1H42ZM39.5 10L41.5 4L42.5 10H39.5Z" fill="#1434CB"/>
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
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#F7931A">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 10.889c.076-.502-.307-.772-.83-.952l.17-.68-1.042-.26-.165.664c-.274-.068-.555-.132-.835-.196l.167-.67-1.042-.259-.17.68c-.227-.052-.45-.103-.665-.157l.001-.004-1.437-.359-.22.834s.772.177.756.188c.421.105.497.383.484.604l-.485 1.946c.029.007.066.018.108.035l-.11-.028-.68 2.727c-.052.128-.182.32-.476.248.01.015-.756-.189-.756-.189l-.517.894 1.357.338c.252.063.5.13.743.191l-.172.689 1.041.26.17-.682c.284.077.56.148.828.215l-.168.675 1.042.26.172-.69c1.413.268 2.476.16 2.923-.867.36-.828-.018-1.307-.613-1.618.436-.1.764-.387.852-.979zm-1.523 2.135c-.256 1.026-1.986.471-2.547.332l.454-1.822c.561.14 2.362.416 2.093 1.49zm.255-2.145c-.233.935-1.673.46-2.14.344l.412-1.653c.466.116 1.97.333 1.728 1.31z"/>
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
