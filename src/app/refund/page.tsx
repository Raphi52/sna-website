"use client";

import { Navbar } from "@/components/layout";
import { Footer } from "@/components/landing";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw, CheckCircle, XCircle, Clock, Mail, HelpCircle } from "lucide-react";
import Link from "next/link";

const eligibleItems = [
  "First-time Pro subscription purchases within 7 days",
  "Technical issues preventing software from functioning",
  "Significant discrepancy between advertised and actual features",
  "Unauthorized charges on your account",
];

const nonEligibleItems = [
  "Subscription renewals (monthly or yearly)",
  "Proxy purchases after allocation",
  "Accounts suspended for Terms of Service violations",
  "Requests made after the 7-day period",
  "Change of mind or no longer needing the service",
  "Dissatisfaction with results (we don't guarantee outcomes)",
];

const processSteps = [
  {
    step: "1",
    title: "Submit Request",
    description: "Email our support team with your account email and reason for refund",
  },
  {
    step: "2",
    title: "Review",
    description: "Our team will review your request within 24-48 hours",
  },
  {
    step: "3",
    title: "Resolution",
    description: "If approved, refund is processed within 5-7 business days",
  },
];

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-warning/5 to-transparent pointer-events-none" />

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
            <div className="inline-flex items-center gap-2 bg-warning/10 border border-warning/30 rounded-full px-4 py-2 mb-6">
              <RefreshCw className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium text-warning">Legal</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Refund Policy
            </h1>
            <p className="text-xl text-muted mb-4">
              We want you to be satisfied with your purchase. Here's everything you
              need to know about our refund policy.
            </p>
            <p className="text-sm text-muted">
              Last updated: December 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Money Back Guarantee */}
      <section className="py-16 bg-surface/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="gradient-pro rounded-2xl p-8 sm:p-12 text-center"
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              7-Day Money-Back Guarantee
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Try SocialNetworkArmy risk-free. If you're not satisfied with your
              first Pro subscription purchase, we'll give you a full refund within
              7 days - no questions asked.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Eligible / Not Eligible */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Eligible */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-surface border border-success/30 rounded-xl p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <h2 className="text-xl font-bold text-white">Eligible for Refund</h2>
              </div>
              <ul className="space-y-3">
                {eligibleItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Not Eligible */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-surface border border-error/30 rounded-xl p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-error/20 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-error" />
                </div>
                <h2 className="text-xl font-bold text-white">Not Eligible</h2>
              </div>
              <ul className="space-y-3">
                {nonEligibleItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-surface/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Refund Process</h2>
            <p className="text-muted">How to request a refund in 3 simple steps</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface border border-border rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 gradient-pro rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-muted">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface border border-border rounded-xl p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-info/20 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-info" />
              </div>
              <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-white font-medium mb-2">How long does a refund take?</h3>
                <p className="text-muted text-sm">
                  Once approved, refunds are processed within 5-7 business days. The time
                  it takes to appear in your account depends on your payment method and bank.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Can I get a partial refund?</h3>
                <p className="text-muted text-sm">
                  We only offer full refunds within the 7-day period. Partial refunds for
                  unused time are not available.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">What happens to my account after a refund?</h3>
                <p className="text-muted text-sm">
                  Your account will be downgraded to the free tier. You can continue using
                  basic features or upgrade again at any time.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-surface/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Mail className="w-12 h-12 text-info mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Need a Refund?</h2>
            <p className="text-muted mb-6">
              Contact our support team with your account email and reason for the refund.
            </p>
            <a
              href="mailto:support@socialnetworkarmy.com?subject=Refund Request"
              className="inline-flex items-center gap-2 bg-info hover:bg-info/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <Mail className="w-5 h-5" />
              support@socialnetworkarmy.com
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
