"use client";

import { Navbar } from "@/components/layout";
import { Footer } from "@/components/landing";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Book,
  Download,
  Settings,
  Users,
  Zap,
  Shield,
  Globe,
  Play,
  ChevronRight,
  Search,
  MonitorSmartphone,
  Bot,
  Calendar,
  Lock,
} from "lucide-react";
import Link from "next/link";

const sections = [
  {
    title: "Getting Started",
    icon: Play,
    color: "text-success",
    bg: "bg-success/20",
    items: [
      { title: "Installation Guide", description: "Download and install SocialNetworkArmy on Windows" },
      { title: "Creating Your Account", description: "Sign up and activate your license" },
      { title: "First Steps", description: "Navigate the dashboard and basic setup" },
      { title: "System Requirements", description: "Hardware and software requirements" },
    ],
  },
  {
    title: "Account Management",
    icon: Users,
    color: "text-info",
    bg: "bg-info/20",
    items: [
      { title: "Adding Social Accounts", description: "Connect your Instagram, TikTok, Facebook, X, and Reddit accounts" },
      { title: "Account Profiles", description: "Manage multiple profiles and identities" },
      { title: "Browser Fingerprinting", description: "Advanced fingerprint customization" },
      { title: "Session Management", description: "Handle cookies and login sessions" },
    ],
  },
  {
    title: "Automation Features",
    icon: Bot,
    color: "text-accent",
    bg: "bg-accent/20",
    items: [
      { title: "Auto Follow/Unfollow", description: "Automate following and unfollowing users" },
      { title: "Auto Like & Comment", description: "Engage with content automatically" },
      { title: "Auto DM", description: "Send automated direct messages" },
      { title: "Story Viewer", description: "Automatically view stories" },
      { title: "Post Scheduler", description: "Schedule and publish content" },
    ],
  },
  {
    title: "Scheduling",
    icon: Calendar,
    color: "text-warning",
    bg: "bg-warning/20",
    items: [
      { title: "Task Scheduler", description: "Schedule automation tasks" },
      { title: "Time Zones", description: "Configure time zone settings" },
      { title: "Recurring Tasks", description: "Set up repeating automations" },
      { title: "Queue Management", description: "Manage pending tasks" },
    ],
  },
  {
    title: "Proxies & Security",
    icon: Shield,
    color: "text-error",
    bg: "bg-error/20",
    items: [
      { title: "Proxy Setup", description: "Configure HTTP, SOCKS4, and SOCKS5 proxies" },
      { title: "Proxy Rotation", description: "Automatic proxy rotation settings" },
      { title: "IP Management", description: "Monitor and manage IP addresses" },
      { title: "Anti-Detection", description: "Browser fingerprint protection" },
    ],
  },
  {
    title: "Platform Guides",
    icon: Globe,
    color: "text-purple-400",
    bg: "bg-purple-400/20",
    items: [
      { title: "Instagram Automation", description: "Complete guide for Instagram features" },
      { title: "TikTok Automation", description: "Complete guide for TikTok features" },
      { title: "Facebook Automation", description: "Complete guide for Facebook features" },
      { title: "X (Twitter) Automation", description: "Complete guide for X features" },
      { title: "Reddit Automation", description: "Complete guide for Reddit features" },
    ],
  },
];

const quickLinks = [
  { title: "Download", href: "/download", icon: Download },
  { title: "Pricing", href: "/pricing", icon: Zap },
  { title: "API Reference", href: "/api-docs", icon: Settings },
  { title: "Changelog", href: "/changelog", icon: Book },
];

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-info/5 to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-info/10 border border-info/30 rounded-full px-4 py-2 mb-6">
              <Book className="w-4 h-4 text-info" />
              <span className="text-sm font-medium text-info">Documentation</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Learn{" "}
              <span className="bg-clip-text text-transparent gradient-pro-text">
                SocialNetworkArmy
              </span>
            </h1>
            <p className="text-xl text-muted mb-8">
              Everything you need to master social media automation.
              From installation to advanced features.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full bg-surface border border-border rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-muted focus:outline-none focus:border-info/50 transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 bg-surface/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {quickLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="flex items-center gap-2 bg-surface border border-border rounded-lg px-4 py-2 text-muted hover:text-white hover:border-info/50 transition-colors"
              >
                <link.icon className="w-4 h-4" />
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-surface border border-border rounded-xl overflow-hidden"
              >
                <div className="p-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${section.bg} flex items-center justify-center`}>
                      <section.icon className={`w-5 h-5 ${section.color}`} />
                    </div>
                    <h2 className="text-lg font-bold text-white">{section.title}</h2>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {section.items.map((item) => (
                    <button
                      key={item.title}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-surface-hover transition-colors text-left"
                    >
                      <div>
                        <h3 className="text-sm font-medium text-white">{item.title}</h3>
                        <p className="text-xs text-muted mt-0.5">{item.description}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="py-16 bg-surface/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Video Tutorials</h2>
            <p className="text-muted">Learn visually with step-by-step video guides</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Getting Started Tutorial", duration: "5:32", views: "2.4K" },
              { title: "Setting Up Your First Bot", duration: "8:15", views: "1.8K" },
              { title: "Advanced Proxy Configuration", duration: "6:47", views: "1.2K" },
            ].map((video, i) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface border border-border rounded-xl overflow-hidden group cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-info/20 to-accent/20 flex items-center justify-center relative">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-white mb-1">{video.title}</h3>
                  <p className="text-sm text-muted">{video.views} views</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Need Help */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="gradient-pro rounded-2xl p-8 sm:p-12"
          >
            <Lock className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Help?
            </h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <a
              href="mailto:support@socialnetworkarmy.com"
              className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-100 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Contact Support
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
