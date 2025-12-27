"use client";

import { Navbar } from "@/components/layout";
import { Footer } from "@/components/landing";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  History,
  Sparkles,
  Bug,
  Zap,
  Shield,
  Star,
  ArrowUp,
  Package,
} from "lucide-react";
import Link from "next/link";

type ChangeType = "feature" | "improvement" | "fix" | "security";

interface Change {
  type: ChangeType;
  text: string;
}

interface Release {
  version: string;
  date: string;
  tag?: string;
  tagColor?: string;
  changes: Change[];
}

const changeTypeConfig = {
  feature: { icon: Sparkles, color: "text-success", bg: "bg-success/20", label: "New" },
  improvement: { icon: Zap, color: "text-info", bg: "bg-info/20", label: "Improved" },
  fix: { icon: Bug, color: "text-warning", bg: "bg-warning/20", label: "Fixed" },
  security: { icon: Shield, color: "text-error", bg: "bg-error/20", label: "Security" },
};

const releases: Release[] = [
  {
    version: "1.2.0",
    date: "December 2024",
    tag: "Latest",
    tagColor: "bg-success",
    changes: [
      { type: "feature", text: "Added Reddit automation support with full feature set" },
      { type: "feature", text: "New 24/7 scheduler with timezone support" },
      { type: "improvement", text: "Improved browser fingerprinting for better stealth" },
      { type: "improvement", text: "Enhanced proxy rotation algorithm" },
      { type: "fix", text: "Fixed Instagram story viewer rate limiting issues" },
      { type: "fix", text: "Resolved TikTok login session persistence bug" },
      { type: "security", text: "Updated encryption for stored credentials" },
    ],
  },
  {
    version: "1.1.0",
    date: "November 2024",
    changes: [
      { type: "feature", text: "Added X (Twitter) platform support" },
      { type: "feature", text: "New auto-comment templates with AI suggestions" },
      { type: "feature", text: "Bulk account import from CSV files" },
      { type: "improvement", text: "Faster account switching between profiles" },
      { type: "improvement", text: "Reduced memory usage by 40%" },
      { type: "fix", text: "Fixed Facebook login detection issues" },
      { type: "fix", text: "Resolved proxy connection timeout errors" },
    ],
  },
  {
    version: "1.0.5",
    date: "October 2024",
    changes: [
      { type: "improvement", text: "Enhanced anti-detection measures" },
      { type: "improvement", text: "Better error handling and recovery" },
      { type: "fix", text: "Fixed Instagram DM sending failures" },
      { type: "fix", text: "Resolved scheduler not triggering at correct times" },
      { type: "fix", text: "Fixed license activation on fresh installs" },
    ],
  },
  {
    version: "1.0.0",
    date: "September 2024",
    tag: "Initial Release",
    tagColor: "bg-accent",
    changes: [
      { type: "feature", text: "Initial release of SocialNetworkArmy" },
      { type: "feature", text: "Instagram automation (follow, like, comment, DM)" },
      { type: "feature", text: "TikTok automation (follow, like, comment)" },
      { type: "feature", text: "Facebook automation (like, comment, friend requests)" },
      { type: "feature", text: "Advanced browser fingerprinting" },
      { type: "feature", text: "Proxy support (HTTP, SOCKS4, SOCKS5)" },
      { type: "feature", text: "Task scheduler with queue management" },
      { type: "feature", text: "Multi-account management" },
    ],
  },
];

export default function ChangelogPage() {
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
              <History className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Updates</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Changelog
            </h1>
            <p className="text-xl text-muted">
              Track all updates, new features, improvements, and bug fixes
              to SocialNetworkArmy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Legend */}
      <section className="py-8 bg-surface/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6">
            {Object.entries(changeTypeConfig).map(([key, config]) => (
              <div key={key} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded ${config.bg} flex items-center justify-center`}>
                  <config.icon className={`w-3 h-3 ${config.color}`} />
                </div>
                <span className="text-sm text-muted">{config.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Releases */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border hidden md:block" />

            <div className="space-y-12">
              {releases.map((release, i) => (
                <motion.div
                  key={release.version}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="relative md:pl-16"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-0 hidden md:flex">
                    <div className="w-10 h-10 rounded-full bg-surface border-2 border-border flex items-center justify-center">
                      <Package className="w-4 h-4 text-accent" />
                    </div>
                  </div>

                  <div className="bg-surface border border-border rounded-xl overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b border-border flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-bold text-white">v{release.version}</h2>
                        {release.tag && (
                          <span className={`${release.tagColor} text-white text-xs font-medium px-2.5 py-1 rounded-full`}>
                            {release.tag}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-muted">{release.date}</span>
                    </div>

                    {/* Changes */}
                    <div className="p-6">
                      <ul className="space-y-3">
                        {release.changes.map((change, j) => {
                          const config = changeTypeConfig[change.type];
                          return (
                            <li key={j} className="flex items-start gap-3">
                              <div className={`w-6 h-6 rounded ${config.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                <config.icon className={`w-3 h-3 ${config.color}`} />
                              </div>
                              <span className="text-muted">{change.text}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="py-16 bg-surface/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ArrowUp className="w-12 h-12 text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-muted mb-6">
              Get notified when we release new features and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-surface border border-border rounded-xl px-4 py-3 text-white placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
              />
              <button className="bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
