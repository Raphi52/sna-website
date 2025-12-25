"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Smartphone,
  Globe,
  Zap,
  Check,
  ArrowRight,
  RotateCcw,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const proxyTypes = [
  {
    id: "rotating-mobile",
    title: "Rotating Mobile Proxies",
    subtitle: "For Account Creation",
    description:
      "4G/5G mobile IPs that rotate automatically. Perfect for creating accounts without triggering detection systems.",
    icon: Smartphone,
    color: "text-tiktok-cyan",
    bgColor: "bg-tiktok-cyan/20",
    gradient: "gradient-tiktok",
    features: [
      "Real mobile carrier IPs (AT&T, Verizon, T-Mobile)",
      "Automatic rotation every request",
      "High trust score on all platforms",
      "Unlimited concurrent sessions",
      "99.9% uptime guarantee",
    ],
  },
  {
    id: "static-residential",
    title: "Static Residential Proxies",
    subtitle: "For Running Accounts",
    description:
      "Dedicated residential IPs that never change. Ideal for maintaining consistent identity across sessions.",
    icon: Globe,
    color: "text-instagram-violet",
    bgColor: "bg-instagram-violet/20",
    gradient: "gradient-instagram",
    features: [
      "Real ISP residential IPs",
      "Same IP for entire subscription",
      "Perfect for account warming",
      "Geographic targeting available",
      "Compatible with all platforms",
    ],
  },
];

const packages = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for beginners",
    price: 29,
    period: "month",
    staticCount: 5,
    rotatingGB: 2,
    features: [
      "5 Static Residential Proxies",
      "2 GB Rotating Mobile Data",
      "US & EU locations",
      "24/7 Support",
      "Dashboard access",
    ],
    popular: false,
  },
  {
    id: "growth",
    name: "Growth",
    description: "Most popular choice",
    price: 79,
    period: "month",
    staticCount: 20,
    rotatingGB: 10,
    features: [
      "20 Static Residential Proxies",
      "10 GB Rotating Mobile Data",
      "All locations available",
      "Priority support",
      "Usage analytics",
    ],
    popular: true,
  },
  {
    id: "scale",
    name: "Scale",
    description: "For power users",
    price: 149,
    period: "month",
    staticCount: 50,
    rotatingGB: 30,
    features: [
      "50 Static Residential Proxies",
      "30 GB Rotating Mobile Data",
      "Premium locations",
      "Dedicated account manager",
      "Custom rotation settings",
      "Advanced analytics",
    ],
    popular: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Unlimited power",
    price: 299,
    period: "month",
    staticCount: 100,
    rotatingGB: -1, // Unlimited
    features: [
      "100 Static Residential Proxies",
      "Unlimited Rotating Mobile Data",
      "All premium features",
      "SLA guarantee",
      "Custom integrations",
      "White-glove onboarding",
    ],
    popular: false,
  },
];

export function Proxies() {
  return (
    <section id="proxies" className="py-20 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-warning/10 border border-warning/30 rounded-full px-4 py-2 mb-6"
          >
            <Shield className="w-4 h-4 text-warning" />
            <span className="text-sm font-medium text-warning">
              Exclusive Compatible Proxies
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Premium Proxies for{" "}
            <span className="bg-clip-text text-transparent gradient-pro">
              Maximum Stealth
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted max-w-3xl mx-auto"
          >
            We are the only provider of proxies fully compatible with
            SocialNetworkArmy. Our proxies are pre-configured for each platform
            to ensure maximum success rate.
          </motion.p>
        </div>

        {/* Proxy Types */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {proxyTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface border border-border rounded-2xl p-8 hover:border-border-hover transition-colors"
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className={`flex-shrink-0 w-14 h-14 rounded-xl ${type.bgColor} flex items-center justify-center`}
                >
                  <type.icon className={`w-7 h-7 ${type.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{type.title}</h3>
                  <p className={`text-sm font-medium ${type.color}`}>
                    {type.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-muted mb-6">{type.description}</p>

              <ul className="space-y-3">
                {type.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 ${type.color} flex-shrink-0 mt-0.5`} />
                    <span className="text-sm text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Visual indicator */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-3">
                  {type.id === "rotating-mobile" ? (
                    <>
                      <RotateCcw className="w-5 h-5 text-muted animate-spin" style={{ animationDuration: "3s" }} />
                      <span className="text-sm text-muted">
                        IP rotates with every request
                      </span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-5 h-5 text-muted" />
                      <span className="text-sm text-muted">
                        Same IP throughout subscription
                      </span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Packages */}
        <div className="mb-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white text-center mb-2"
          >
            Choose Your Package
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted text-center mb-12"
          >
            All packages include both proxy types for complete coverage
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-surface border rounded-2xl p-6 ${
                  pkg.popular
                    ? "border-info shadow-lg shadow-info/20"
                    : "border-border hover:border-border-hover"
                } transition-all`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-info text-black text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h4 className="text-lg font-bold text-white mb-1">
                    {pkg.name}
                  </h4>
                  <p className="text-sm text-muted">{pkg.description}</p>
                </div>

                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-white">
                      {pkg.price}€
                    </span>
                    <span className="text-muted">/{pkg.period}</span>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-surface-hover rounded-lg p-3 text-center">
                    <Globe className="w-5 h-5 text-instagram-violet mx-auto mb-1" />
                    <div className="text-lg font-bold text-white">
                      {pkg.staticCount}
                    </div>
                    <div className="text-[10px] text-muted">Static IPs</div>
                  </div>
                  <div className="bg-surface-hover rounded-lg p-3 text-center">
                    <Smartphone className="w-5 h-5 text-tiktok-cyan mx-auto mb-1" />
                    <div className="text-lg font-bold text-white">
                      {pkg.rotatingGB === -1 ? "∞" : `${pkg.rotatingGB}GB`}
                    </div>
                    <div className="text-[10px] text-muted">Mobile Data</div>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {pkg.features.slice(2).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={`/checkout?product=proxy_${pkg.id}`}>
                  <Button
                    variant={pkg.popular ? "pro" : "default"}
                    className="w-full"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 pt-12 border-t border-border"
        >
          <div className="flex items-center gap-2 text-muted">
            <Shield className="w-5 h-5" />
            <span className="text-sm">100% Compatible</span>
          </div>
          <div className="flex items-center gap-2 text-muted">
            <Zap className="w-5 h-5" />
            <span className="text-sm">Instant Activation</span>
          </div>
          <div className="flex items-center gap-2 text-muted">
            <Globe className="w-5 h-5" />
            <span className="text-sm">190+ Countries</span>
          </div>
          <div className="flex items-center gap-2 text-muted">
            <RotateCcw className="w-5 h-5" />
            <span className="text-sm">7-Day Refund</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
