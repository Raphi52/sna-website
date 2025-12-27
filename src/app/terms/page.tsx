"use client";

import { Navbar } from "@/components/layout";
import { Footer } from "@/components/landing";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, AlertTriangle, Ban, CreditCard, Scale, RefreshCw } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    icon: FileText,
    title: "1. Acceptance of Terms",
    content: [
      "By accessing or using SocialNetworkArmy, you agree to be bound by these Terms of Service.",
      "If you do not agree to these terms, you may not use our services.",
      "We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance.",
      "You must be at least 18 years old to use our services.",
    ],
  },
  {
    icon: Scale,
    title: "2. Use of Services",
    content: [
      "You are responsible for maintaining the confidentiality of your account credentials.",
      "You agree to use our services only for lawful purposes and in compliance with all applicable laws.",
      "You may not use our services to violate the terms of service of any third-party platform.",
      "You are solely responsible for the content you create and actions you take using our software.",
      "We reserve the right to suspend or terminate accounts that violate these terms.",
    ],
  },
  {
    icon: Ban,
    title: "3. Prohibited Activities",
    content: [
      "Using the software for illegal activities or to promote illegal content",
      "Attempting to reverse engineer, decompile, or disassemble the software",
      "Sharing, selling, or transferring your license to third parties",
      "Using the software to harass, abuse, or harm others",
      "Attempting to circumvent any security measures or access restrictions",
      "Creating multiple accounts to abuse free tier limitations",
    ],
  },
  {
    icon: CreditCard,
    title: "4. Payments & Subscriptions",
    content: [
      "Subscription fees are billed in advance on a recurring basis (monthly or yearly).",
      "All payments are processed securely through our payment providers.",
      "Prices are subject to change with 30 days notice for existing subscribers.",
      "You may cancel your subscription at any time from your account dashboard.",
      "Cancellation takes effect at the end of the current billing period.",
    ],
  },
  {
    icon: RefreshCw,
    title: "5. Refund Policy",
    content: [
      "We offer a 7-day money-back guarantee for first-time subscribers.",
      "Refund requests must be submitted within 7 days of the initial purchase.",
      "Refunds are not available for subscription renewals.",
      "Proxy purchases are non-refundable once allocated to your account.",
      "To request a refund, contact support@socialnetworkarmy.com",
    ],
  },
  {
    icon: AlertTriangle,
    title: "6. Disclaimer & Limitations",
    content: [
      "Our services are provided 'as is' without warranties of any kind.",
      "We do not guarantee that our services will be uninterrupted or error-free.",
      "We are not responsible for any actions taken by third-party platforms against your accounts.",
      "Our liability is limited to the amount paid for the service in the last 12 months.",
      "We do not guarantee specific results from using our automation tools.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link
            href="/"
            className="inline-flex items-center text-muted hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-2 mb-6">
              <FileText className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Legal</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-muted mb-4">
              Please read these terms carefully before using SocialNetworkArmy.
            </p>
            <p className="text-sm text-muted">
              Last updated: December 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-surface border border-border rounded-xl p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-xl font-bold text-white">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span className="text-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-surface border border-border rounded-xl p-6 sm:p-8"
          >
            <h2 className="text-xl font-bold text-white mb-4">Questions?</h2>
            <p className="text-muted mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-muted">
                Email:{" "}
                <a
                  href="mailto:legal@socialnetworkarmy.com"
                  className="text-accent hover:underline"
                >
                  legal@socialnetworkarmy.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
