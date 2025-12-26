"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Twitter, Github, Mail, ArrowRight, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Platforms", href: "#platforms" },
    { label: "Pricing", href: "#pricing" },
    { label: "Download", href: "/download" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "FAQ", href: "#faq" },
    { label: "Changelog", href: "/changelog" },
    { label: "API", href: "/api-docs" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "mailto:support@socialnetworkarmy.com" },
    { label: "Discord", href: "#" },
    { label: "Twitter", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Mail, href: "mailto:support@socialnetworkarmy.com", label: "Email" },
];

export function Footer() {
  return (
    <>
      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-info/20 via-accent/20 to-pink-500/20 rounded-full blur-[150px]" />
        <div className="section-divider absolute top-0 left-0 right-0" />

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-accent/40"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2.5 mb-10 border border-accent/30"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-white">
              Start growing today
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8"
          >
            Ready to{" "}
            <span className="gradient-text-animated">automate</span>?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Join thousands of marketers, agencies, and creators who are growing their social presence on autopilot.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/download">
              <Button variant="pro" size="lg" className="group text-lg px-10 py-7 shadow-2xl animate-pulse-glow btn-shimmer">
                Download Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#pricing">
              <Button variant="outline" size="lg" className="text-lg px-10 py-7 border-white/20 hover:border-accent/50">
                View Pricing
              </Button>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8"
          >
            {[
              "Free tier available",
              "No credit card required",
              "7-day money-back guarantee",
            ].map((text, i) => (
              <motion.span
                key={text}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-2 text-sm text-muted"
              >
                <span className="w-2 h-2 rounded-full bg-success" />
                {text}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-card border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">
            {/* Brand */}
            <div className="col-span-2">
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 bg-gradient-to-br from-info to-accent rounded-2xl shadow-2xl flex items-center justify-center"
                >
                  <span className="text-white font-bold text-xl">S</span>
                </motion.div>
                <span className="text-2xl font-bold text-white">
                  SocialNetwork<span className="text-accent">Army</span>
                </span>
              </Link>
              <p className="text-muted mb-8 max-w-xs leading-relaxed">
                The most powerful automation tool for social media growth. Create, schedule, and engage across 5 platforms.
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ y: -4 }}
                    className="w-12 h-12 rounded-xl glass-card border border-border/30 flex items-center justify-center text-muted hover:text-white hover:border-accent/50 transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">
                  {category}
                </h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="pt-10 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted">
              &copy; {new Date().getFullYear()} SocialNetworkArmy. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-sm text-muted flex items-center gap-2">
                Made with
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-red-500"
                >
                  ❤
                </motion.span>
                for automation
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
