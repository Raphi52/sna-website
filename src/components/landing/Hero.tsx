"use client";

import { Button } from "@/components/ui";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Zap, Shield, Clock, Sparkles, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";

// Animated counter hook
function useAnimatedCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    setHasAnimated(true);

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [end, duration, hasAnimated]);

  return count;
}

// Floating 3D card component
function FloatingCard({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Particle component
function Particles() {
  return (
    <div className="particles">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
}

// Platform badge with glow
function PlatformBadge({ name, gradient, delay }: { name: string; gradient: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={`px-4 py-2 rounded-full bg-gradient-to-r ${gradient} text-white text-sm font-medium shadow-lg`}
      style={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" }}
    >
      {name}
    </motion.div>
  );
}

export function Hero() {
  const { data: session } = useSession();
  const accountsToday = useAnimatedCounter(2847, 2500);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set((e.clientX - centerX) / 50);
      mouseY.set((e.clientY - centerY) / 50);
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Premium background layers */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 hero-grid" />

      {/* Animated orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Aurora effect */}
      <div className="aurora-container">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
      </div>

      {/* Particles */}
      <Particles />

      {/* Floating platform icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Instagram */}
        <motion.div
          className="absolute w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow-2xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [0.9, 1.1, 0.9],
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 6, delay: 0, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: "10%", top: "20%", boxShadow: "0 0 30px rgba(236, 72, 153, 0.4)" }}
        >
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </motion.div>

        {/* TikTok */}
        <motion.div
          className="absolute w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 via-black to-pink-500 flex items-center justify-center shadow-2xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [0.9, 1.1, 0.9],
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 6, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: "85%", top: "25%", boxShadow: "0 0 30px rgba(0, 255, 255, 0.3)" }}
        >
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
          </svg>
        </motion.div>

        {/* Facebook */}
        <motion.div
          className="absolute w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-2xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [0.9, 1.1, 0.9],
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 6, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: "15%", top: "70%", boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)" }}
        >
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </motion.div>

        {/* X (Twitter) */}
        <motion.div
          className="absolute w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-700 to-black flex items-center justify-center shadow-2xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [0.9, 1.1, 0.9],
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 6, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: "88%", top: "65%", boxShadow: "0 0 30px rgba(255, 255, 255, 0.2)" }}
        >
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </motion.div>

        {/* Reddit */}
        <motion.div
          className="absolute w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-2xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [0.9, 1.1, 0.9],
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 6, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: "5%", top: "45%", boxShadow: "0 0 30px rgba(249, 115, 22, 0.4)" }}
        >
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
          </svg>
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="text-center">
          {/* Live indicator badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center px-5 py-2.5 rounded-full glass-card border border-accent/30 mb-8 shadow-xl"
          >
            <span className="relative flex h-2.5 w-2.5 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
            </span>
            <span className="text-sm text-white/90 font-medium">
              <span className="text-white font-bold">{accountsToday.toLocaleString()}</span> accounts created today
            </span>
            <Sparkles className="w-4 h-4 ml-2 text-warning" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight"
          >
            <span className="block">Grow on</span>
            <span className="relative inline-block mt-2">
              <span className="gradient-text-animated text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
                Autopilot
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-info via-accent to-pink-500 rounded-full"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Glow effect under text */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gradient-to-r from-info/40 via-accent/40 to-pink-500/40 blur-2xl" />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl sm:text-2xl text-muted max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            The all-in-one automation tool for{" "}
            <span className="text-white font-semibold">Instagram</span>,{" "}
            <span className="text-white font-semibold">TikTok</span>,{" "}
            <span className="text-white font-semibold">Facebook</span>,{" "}
            <span className="text-white font-semibold">X</span> &{" "}
            <span className="text-white font-semibold">Reddit</span>.
            <br className="hidden sm:block" />
            <span className="text-white/70">Create accounts, schedule content, and engage automatically.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href={session ? "/dashboard/downloads" : "/download"}>
              <Button
                variant="pro"
                size="lg"
                className="group text-lg px-10 py-7 shadow-2xl animate-pulse-glow btn-shimmer"
              >
                {session ? "Go to Dashboard" : "Download Free"}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#platforms">
              <Button
                variant="outline"
                size="lg"
                className="group text-lg px-10 py-7 border-white/20 hover:border-accent/50 hover:bg-accent/10 transition-all"
              >
                <Play className="mr-2 w-5 h-5 text-accent" />
                See Features
              </Button>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted mb-20"
          >
            {[
              { icon: Shield, text: "Anti-detection built-in", color: "text-success" },
              { icon: Zap, text: "No coding required", color: "text-warning" },
              { icon: Clock, text: "24/7 automation", color: "text-info" },
            ].map((badge, i) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 backdrop-blur border border-border/50"
              >
                <badge.icon className={`w-4 h-4 ${badge.color}`} />
                <span className="text-white/80">{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { value: "5", label: "Platforms", icon: "🌐" },
              { value: "∞", label: "Accounts", icon: "👥" },
              { value: "24/7", label: "Scheduler", icon: "⏰" },
              { value: "0%", label: "Ban Rate", icon: "🛡️" },
            ].map((stat, index) => (
              <FloatingCard key={stat.label} delay={0.6 + index * 0.1}>
                <div className="glass-card glass-card-hover rounded-2xl p-6 cursor-default transition-all duration-300 border border-border/50">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="stat-value text-4xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted">{stat.label}</div>
                </div>
              </FloatingCard>
            ))}
          </motion.div>
        </div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: "🤖",
              title: "Account Creation",
              description: "Create unlimited accounts with unique fingerprints, proxies, and realistic profiles automatically.",
              gradient: "from-info/20 to-accent/20",
              borderColor: "hover:border-info/50",
            },
            {
              icon: "📈",
              title: "Auto Engagement",
              description: "Like, follow, comment, and DM automatically. Grow your audience while you sleep.",
              gradient: "from-success/20 to-emerald-500/20",
              borderColor: "hover:border-success/50",
            },
            {
              icon: "📅",
              title: "Smart Scheduler",
              description: "Schedule posts, reels, and stories. Run tasks 24/7 with human-like timing patterns.",
              gradient: "from-warning/20 to-orange-500/20",
              borderColor: "hover:border-warning/50",
            },
          ].map((feature, index) => (
            <FloatingCard key={feature.title} delay={0.8 + index * 0.1}>
              <div className={`group glass-card rounded-2xl p-8 border border-border/50 ${feature.borderColor} transition-all duration-500 h-full`}>
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted leading-relaxed group-hover:text-white/80 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>
            </FloatingCard>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-white/60"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
