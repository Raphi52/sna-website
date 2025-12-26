"use client";

import { Button } from "@/components/ui";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Zap, Shield, Clock, Users, Bot, TrendingUp } from "lucide-react";
import { useSession } from "next-auth/react";

// Platform icons with their brand colors
const floatingIcons = [
  { name: "Instagram", gradient: "from-purple-500 via-pink-500 to-orange-400", delay: 0 },
  { name: "TikTok", gradient: "from-cyan-400 to-pink-500", delay: 0.2 },
  { name: "Facebook", gradient: "from-blue-500 to-blue-600", delay: 0.4 },
  { name: "X", gradient: "from-gray-200 to-gray-400", delay: 0.6 },
  { name: "Reddit", gradient: "from-orange-500 to-orange-600", delay: 0.8 },
];

export function Hero() {
  const { data: session } = useSession();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-info/10 via-purple-500/5 to-transparent" />

      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-info/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Floating platform icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((icon, i) => (
          <motion.div
            key={icon.name}
            className={`absolute w-12 h-12 rounded-xl bg-gradient-to-br ${icon.gradient} opacity-20`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [0.8, 1, 0.8],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              delay: icon.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 2) * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Live indicator badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-surface/80 backdrop-blur border border-info/30 mb-8 shadow-lg shadow-info/10"
          >
            <span className="relative flex h-2 w-2 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            <span className="text-sm text-white font-medium">
              1,247 accounts created today
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
          >
            Grow on
            <span className="relative mx-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 animate-gradient bg-[length:200%_200%]">
                Autopilot
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl text-muted max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            The all-in-one automation tool for{" "}
            <span className="text-white font-medium">Instagram</span>,{" "}
            <span className="text-white font-medium">TikTok</span>,{" "}
            <span className="text-white font-medium">Facebook</span>,{" "}
            <span className="text-white font-medium">X</span> &{" "}
            <span className="text-white font-medium">Reddit</span>.
            <br className="hidden sm:block" />
            Create accounts, schedule content, and engage automatically.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href={session ? "/dashboard/downloads" : "/download"}>
              <Button variant="pro" size="lg" className="group text-lg px-8 py-6 shadow-lg shadow-info/25 hover:shadow-info/40 transition-shadow">
                {session ? "Go to Dashboard" : "Download Free"}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#platforms">
              <Button variant="outline" size="lg" className="group text-lg px-8 py-6">
                <Play className="mr-2 w-5 h-5" />
                See Features
              </Button>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted mb-20"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-success" />
              <span>Anti-detection built-in</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-warning" />
              <span>No coding required</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-info" />
              <span>24/7 automation</span>
            </div>
          </motion.div>

          {/* Stats cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            <div className="bg-surface/60 backdrop-blur border border-border rounded-2xl p-6 hover:border-info/50 transition-colors">
              <div className="text-4xl font-bold text-white mb-1">5</div>
              <div className="text-sm text-muted">Platforms</div>
            </div>
            <div className="bg-surface/60 backdrop-blur border border-border rounded-2xl p-6 hover:border-info/50 transition-colors">
              <div className="text-4xl font-bold text-white mb-1">∞</div>
              <div className="text-sm text-muted">Accounts</div>
            </div>
            <div className="bg-surface/60 backdrop-blur border border-border rounded-2xl p-6 hover:border-info/50 transition-colors">
              <div className="text-4xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-muted">Scheduler</div>
            </div>
            <div className="bg-surface/60 backdrop-blur border border-border rounded-2xl p-6 hover:border-info/50 transition-colors">
              <div className="text-4xl font-bold text-white mb-1">0%</div>
              <div className="text-sm text-muted">Ban Rate</div>
            </div>
          </motion.div>
        </div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="group bg-surface/50 backdrop-blur border border-border rounded-2xl p-8 hover:border-info/50 transition-all hover:-translate-y-1">
            <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-info/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bot className="w-7 h-7 text-info" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Account Creation
            </h3>
            <p className="text-muted leading-relaxed">
              Create unlimited accounts with unique fingerprints, proxies, and realistic profiles automatically.
            </p>
          </div>
          <div className="group bg-surface/50 backdrop-blur border border-border rounded-2xl p-8 hover:border-success/50 transition-all hover:-translate-y-1">
            <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-success/20 to-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-7 h-7 text-success" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Auto Engagement
            </h3>
            <p className="text-muted leading-relaxed">
              Like, follow, comment, and DM automatically. Grow your audience while you sleep.
            </p>
          </div>
          <div className="group bg-surface/50 backdrop-blur border border-border rounded-2xl p-8 hover:border-warning/50 transition-all hover:-translate-y-1">
            <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-warning/20 to-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="w-7 h-7 text-warning" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Smart Scheduler
            </h3>
            <p className="text-muted leading-relaxed">
              Schedule posts, reels, and stories. Run tasks 24/7 with human-like timing patterns.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
