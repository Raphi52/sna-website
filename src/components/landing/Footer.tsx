"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Twitter, Github, Mail, ArrowRight, Zap } from "lucide-react";
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
      <section className="py-24 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-info/10 via-purple-500/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-info/20 rounded-full blur-[150px]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-surface/80 backdrop-blur border border-info/30 rounded-full px-4 py-2 mb-8"
          >
            <Zap className="w-4 h-4 text-info" />
            <span className="text-sm font-medium text-white">
              Start growing today
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Ready to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-info via-purple-500 to-pink-500">
              automate
            </span>
            ?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted mb-10 max-w-2xl mx-auto"
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
              <Button variant="pro" size="lg" className="group text-lg px-8 py-6 shadow-lg shadow-info/25">
                Download Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#pricing">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
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
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success" />
              Free tier available
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success" />
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success" />
              7-day money-back guarantee
            </span>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface/80 backdrop-blur border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 gradient-pro rounded-xl shadow-lg shadow-info/20" />
                <span className="text-xl font-bold text-white">
                  SocialNetwork<span className="text-info">Army</span>
                </span>
              </Link>
              <p className="text-sm text-muted mb-6 max-w-xs leading-relaxed">
                The most powerful automation tool for social media growth. Create, schedule, and engage across 5 platforms.
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-surface-hover border border-border flex items-center justify-center text-muted hover:text-white hover:border-info/50 transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-sm font-semibold text-white mb-4">
                  {category}
                </h4>
                <ul className="space-y-3">
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
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted">
              &copy; {new Date().getFullYear()} SocialNetworkArmy. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-sm text-muted">
                Made with{" "}
                <span className="text-red-500">❤</span>
                {" "}for automation
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
