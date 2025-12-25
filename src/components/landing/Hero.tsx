"use client";

import { Button } from "@/components/ui";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Zap, Shield, Clock } from "lucide-react";
import { useSession } from "next-auth/react";

export function Hero() {
  const { data: session } = useSession();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-info/5 via-transparent to-transparent" />

      {/* Aurora Borealis Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="aurora-container">
          <div className="aurora aurora-1" />
          <div className="aurora aurora-2" />
          <div className="aurora aurora-3" />
          <div className="aurora aurora-4" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-surface border border-border mb-8"
          >
            <Zap className="w-4 h-4 text-info mr-2" />
            <span className="text-sm text-muted">
              Automate 5 platforms with one tool
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Social Media
            <br />
            <span className="bg-clip-text text-transparent gradient-pro bg-[length:200%_200%] animate-gradient">
              Automation
            </span>
            <br />
            Reimagined
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10"
          >
            Create accounts, grow your audience, and automate engagement across
            Instagram, TikTok, Facebook, X, and Reddit with advanced
            anti-detection technology.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href={session ? "/dashboard/downloads" : "/auth/register"}>
              <Button variant="pro" size="lg" className="group">
                {session ? "Go to Dashboard" : "Start Free Trial"}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#demo">
              <Button variant="outline" size="lg" className="group">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                5+
              </div>
              <div className="text-sm text-muted">Platforms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                10K+
              </div>
              <div className="text-sm text-muted">Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                99%
              </div>
              <div className="text-sm text-muted">Uptime</div>
            </div>
          </motion.div>
        </div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-surface/50 backdrop-blur border border-border rounded-xl p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-info/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-info" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Anti-Detection
            </h3>
            <p className="text-sm text-muted">
              Advanced fingerprinting to keep your accounts safe
            </p>
          </div>
          <div className="bg-surface/50 backdrop-blur border border-border rounded-xl p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-success/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Automation
            </h3>
            <p className="text-sm text-muted">
              Schedule posts, engage, and grow on autopilot
            </p>
          </div>
          <div className="bg-surface/50 backdrop-blur border border-border rounded-xl p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-warning/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-warning" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              24/7 Scheduler
            </h3>
            <p className="text-sm text-muted">
              Run tasks around the clock automatically
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
