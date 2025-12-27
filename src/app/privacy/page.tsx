"use client";

import { Navbar } from "@/components/layout";
import { Footer } from "@/components/landing";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Lock, Eye, Server, Bell, Trash2 } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: [
      "Account Information: When you create an account, we collect your email address and password (encrypted).",
      "Usage Data: We collect information about how you use our software, including features accessed and actions performed.",
      "Device Information: We may collect information about your device, including operating system, browser type, and IP address.",
      "Payment Information: Payment processing is handled by secure third-party providers. We do not store your full credit card details.",
    ],
  },
  {
    icon: Server,
    title: "How We Use Your Information",
    content: [
      "To provide and maintain our services",
      "To process transactions and send related information",
      "To send technical notices, updates, and support messages",
      "To respond to your comments, questions, and requests",
      "To monitor and analyze trends, usage, and activities",
      "To detect, investigate, and prevent fraudulent transactions",
    ],
  },
  {
    icon: Lock,
    title: "Data Security",
    content: [
      "We implement appropriate security measures to protect your personal information.",
      "All data transmission is encrypted using SSL/TLS protocols.",
      "Passwords are hashed using industry-standard algorithms.",
      "We regularly review and update our security practices.",
      "Access to personal data is restricted to authorized personnel only.",
    ],
  },
  {
    icon: Shield,
    title: "Data Sharing",
    content: [
      "We do not sell your personal information to third parties.",
      "We may share data with service providers who assist in our operations.",
      "We may disclose information if required by law or to protect our rights.",
      "In case of a business transfer, your information may be transferred to the new owner.",
    ],
  },
  {
    icon: Bell,
    title: "Cookies & Tracking",
    content: [
      "We use cookies to enhance your experience on our platform.",
      "Essential cookies are required for the site to function properly.",
      "Analytics cookies help us understand how visitors interact with our site.",
      "You can control cookie preferences through your browser settings.",
    ],
  },
  {
    icon: Trash2,
    title: "Your Rights",
    content: [
      "Access: You can request a copy of your personal data.",
      "Correction: You can request correction of inaccurate data.",
      "Deletion: You can request deletion of your personal data.",
      "Portability: You can request your data in a portable format.",
      "To exercise these rights, contact us at privacy@socialnetworkarmy.com",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-info/5 to-transparent pointer-events-none" />

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
            <div className="inline-flex items-center gap-2 bg-info/10 border border-info/30 rounded-full px-4 py-2 mb-6">
              <Shield className="w-4 h-4 text-info" />
              <span className="text-sm font-medium text-info">Legal</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted mb-4">
              Your privacy is important to us. This policy explains how we collect,
              use, and protect your personal information.
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
                  <div className="w-10 h-10 rounded-lg bg-info/20 flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-info" />
                  </div>
                  <h2 className="text-xl font-bold text-white">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-info mt-2 flex-shrink-0" />
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
            <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-muted mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-muted">
                Email:{" "}
                <a
                  href="mailto:privacy@socialnetworkarmy.com"
                  className="text-info hover:underline"
                >
                  privacy@socialnetworkarmy.com
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
