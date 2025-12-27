"use client";

import { Navbar } from "@/components/layout";
import { Footer } from "@/components/landing";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  Zap,
  Shield,
  ArrowLeft,
  Rocket,
  Heart,
  Globe,
  Award
} from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Active Users", value: "10K+", icon: Users },
  { label: "Accounts Managed", value: "50K+", icon: Globe },
  { label: "Actions Automated", value: "1M+", icon: Zap },
  { label: "Uptime", value: "99.9%", icon: Shield },
];

const values = [
  {
    icon: Rocket,
    title: "Innovation",
    description: "We constantly push the boundaries of automation technology to deliver cutting-edge solutions.",
  },
  {
    icon: Shield,
    title: "Security",
    description: "Your data and accounts are protected with enterprise-grade security measures.",
  },
  {
    icon: Heart,
    title: "User-Centric",
    description: "Every feature we build starts with understanding our users' needs and challenges.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from code quality to customer support.",
  },
];

const team = [
  { name: "Alex Chen", role: "Founder & CEO", avatar: "AC" },
  { name: "Sarah Miller", role: "Lead Developer", avatar: "SM" },
  { name: "James Wilson", role: "Product Manager", avatar: "JW" },
  { name: "Emma Davis", role: "Customer Success", avatar: "ED" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />

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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              About{" "}
              <span className="bg-clip-text text-transparent gradient-pro-text">
                SocialNetworkArmy
              </span>
            </h1>
            <p className="text-xl text-muted leading-relaxed">
              We're on a mission to democratize social media growth. Our powerful
              automation tools help businesses, creators, and marketers scale their
              online presence efficiently and safely.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-surface/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface border border-border rounded-xl p-6 text-center"
              >
                <stat.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-muted">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-muted">
                <p>
                  SocialNetworkArmy was born from a simple observation: managing multiple
                  social media accounts is incredibly time-consuming and repetitive.
                </p>
                <p>
                  Founded in 2024, we set out to build the most powerful yet user-friendly
                  automation tool in the market. Our platform combines advanced browser
                  fingerprinting, smart scheduling, and intuitive interfaces to help you
                  grow faster.
                </p>
                <p>
                  Today, thousands of users trust SocialNetworkArmy to manage their social
                  media presence across Instagram, TikTok, Facebook, X, and Reddit.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {values.map((value, i) => (
                <div
                  key={value.title}
                  className="bg-surface border border-border rounded-xl p-5"
                >
                  <value.icon className="w-8 h-8 text-info mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-muted">{value.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-surface/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-2 mb-6">
              <Target className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Our Mission</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Empowering Growth Through Automation
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              We believe everyone deserves the tools to grow their online presence
              without spending countless hours on repetitive tasks. Our mission is
              to provide powerful, safe, and accessible automation that levels the
              playing field for creators and businesses of all sizes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Meet the Team</h2>
            <p className="text-muted max-w-2xl mx-auto">
              A passionate team dedicated to building the best automation tools.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface border border-border rounded-xl p-6 text-center"
              >
                <div className="w-16 h-16 gradient-pro rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-sm text-muted">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-surface/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="gradient-pro rounded-2xl p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to join the army?
            </h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              Start automating your social media growth today.
            </p>
            <Link href="/download">
              <button className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl transition-colors">
                Get Started Free
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
