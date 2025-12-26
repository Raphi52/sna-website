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
        {[
          { name: "IG", gradient: "from-purple-500 via-pink-500 to-orange-400", x: "10%", y: "20%", delay: 0 },
          { name: "TT", gradient: "from-cyan-400 to-pink-500", x: "85%", y: "25%", delay: 0.2 },
          { name: "FB", gradient: "from-blue-500 to-blue-600", x: "15%", y: "70%", delay: 0.4 },
          { name: "X", gradient: "from-gray-300 to-gray-500", x: "88%", y: "65%", delay: 0.6 },
          { name: "R", gradient: "from-orange-500 to-red-500", x: "5%", y: "45%", delay: 0.8 },
        ].map((icon, i) => (
          <motion.div
            key={icon.name}
            className={`absolute w-14 h-14 rounded-2xl bg-gradient-to-br ${icon.gradient} flex items-center justify-center text-white font-bold text-lg shadow-2xl`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [0.9, 1.1, 0.9],
              y: [0, -15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              delay: icon.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: icon.x,
              top: icon.y,
              boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)",
            }}
          >
            {icon.name}
          </motion.div>
        ))}
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
