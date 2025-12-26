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
  Wifi,
  Server,
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
    gradient: "from-tiktok-cyan to-tiktok-pink",
    glowColor: "rgba(37, 244, 238, 0.3)",
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
    color: "text-accent",
    bgColor: "bg-accent/20",
    gradient: "from-accent to-pink-500",
    glowColor: "rgba(139, 92, 246, 0.3)",
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
    features: ["US & EU locations", "24/7 Support", "Dashboard access"],
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
    features: ["All locations", "Priority support", "Usage analytics"],
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
    features: ["Premium locations", "Dedicated manager", "Advanced analytics"],
    popular: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Unlimited power",
    price: 299,
    period: "month",
    staticCount: 100,
    rotatingGB: -1,
    features: ["SLA guarantee", "Custom integrations", "White-glove support"],
    popular: false,
  },
];

export function Proxies() {
  return (
    <section id="proxies" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 hero-gradient opacity-30" />
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2.5 mb-8 border border-warning/30"
          >
            <Shield className="w-4 h-4 text-warning" />
            <span className="text-sm font-medium text-white">
              Exclusive Compatible Proxies
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Premium Proxies for{" "}
            <span className="gradient-text-animated">Maximum Stealth</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted max-w-3xl mx-auto"
          >
            We are the only provider of proxies fully compatible with
            SocialNetworkArmy. Pre-configured for maximum success rate.
          </motion.p>
        </div>

        {/* Proxy Types */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {proxyTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group glass-card rounded-3xl p-8 border border-border/50 hover:border-white/20 transition-all duration-500"
              style={{ boxShadow: `0 0 60px ${type.glowColor}` }}
            >
              {/* Top gradient line */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 rounded-b-full bg-gradient-to-r ${type.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500`} />

              <div className="flex items-start gap-4 mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${type.gradient} flex items-center justify-center shadow-2xl`}
                >
                  <type.icon className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{type.title}</h3>
                  <p className={`text-sm font-medium ${type.color}`}>
                    {type.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-muted mb-8 leading-relaxed">{type.description}</p>

              <ul className="space-y-4">
                {type.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${type.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Visual indicator */}
              <div className="mt-8 pt-6 border-t border-border/30">
                <div className="flex items-center gap-3">
                  {type.id === "rotating-mobile" ? (
                    <>
                      <RotateCcw className="w-5 h-5 text-tiktok-cyan animate-spin" style={{ animationDuration: "3s" }} />
                      <span className="text-sm text-muted">
                        IP rotates with every account created
                      </span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-5 h-5 text-accent" />
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
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white text-center mb-4"
          >
            Choose Your Package
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted text-center mb-16 text-lg"
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
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative glass-card rounded-3xl p-6 border transition-all duration-500 ${
                  pkg.popular
                    ? "border-accent/50 pricing-card-popular"
                    : "border-border/50 hover:border-white/20"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-accent to-pink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-6 pt-2">
                  <h4 className="text-xl font-bold text-white mb-1">
                    {pkg.name}
                  </h4>
                  <p className="text-sm text-muted">{pkg.description}</p>
                </div>

                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="stat-value text-5xl font-bold">
                      {pkg.price}€
                    </span>
                    <span className="text-muted">/{pkg.period}</span>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="glass-card rounded-xl p-3 text-center border border-border/30">
                    <Server className="w-5 h-5 text-accent mx-auto mb-1" />
                    <div className="text-lg font-bold text-white">
                      {pkg.staticCount}
                    </div>
                    <div className="text-[10px] text-muted">Static IPs</div>
                  </div>
                  <div className="glass-card rounded-xl p-3 text-center border border-border/30">
                    <Wifi className="w-5 h-5 text-tiktok-cyan mx-auto mb-1" />
                    <div className="text-lg font-bold text-white">
                      {pkg.rotatingGB === -1 ? "∞" : `${pkg.rotatingGB}GB`}
                    </div>
                    <div className="text-[10px] text-muted">Mobile Data</div>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={`/checkout?product=proxy_${pkg.id}`}>
                  <Button
                    variant={pkg.popular ? "pro" : "outline"}
                    className={`w-full ${pkg.popular ? "animate-pulse-glow" : ""}`}
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
          className="flex flex-wrap justify-center gap-8 pt-12"
        >
          {[
            { icon: Shield, text: "100% Compatible" },
            { icon: Zap, text: "Instant Activation" },
            { icon: Globe, text: "190+ Countries" },
            { icon: RotateCcw, text: "7-Day Refund" },
          ].map((item, i) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-border/30"
            >
              <item.icon className="w-5 h-5 text-accent" />
              <span className="text-sm text-white/80">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
