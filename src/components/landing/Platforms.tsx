"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Globe, Clock, Code } from "lucide-react";

// Platform SVG icons
const PlatformIcons = {
  Instagram: () => (
    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  TikTok: () => (
    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
    </svg>
  ),
  Facebook: () => (
    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  X: () => (
    <svg className="w-7 h-7 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Reddit: () => (
    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
    </svg>
  ),
};

const platforms = [
  {
    name: "Instagram",
    icon: PlatformIcons.Instagram,
    gradient: "from-purple-500 via-pink-500 to-orange-400",
    glowColor: "rgba(193, 53, 132, 0.4)",
    cardClass: "platform-card-instagram",
    features: [
      "Account creation",
      "Auto follow/unfollow",
      "Comment popular posts",
      "Post & Reel scheduling",
      "DM automation",
      "Story viewing",
    ],
  },
  {
    name: "TikTok",
    icon: PlatformIcons.TikTok,
    gradient: "from-cyan-400 to-pink-500",
    glowColor: "rgba(37, 244, 238, 0.4)",
    cardClass: "platform-card-tiktok",
    features: [
      "Account creation",
      "Video scheduling",
      "Auto engagement",
      "FYP scrolling",
      "Comment automation",
      "Duet & Stitch",
    ],
  },
  {
    name: "Facebook",
    icon: PlatformIcons.Facebook,
    gradient: "from-blue-500 to-blue-600",
    glowColor: "rgba(24, 119, 242, 0.4)",
    cardClass: "platform-card-facebook",
    features: [
      "Page management",
      "Post scheduling",
      "Group automation",
      "Auto reactions",
      "Messenger bots",
      "Event promotion",
    ],
  },
  {
    name: "X (Twitter)",
    icon: PlatformIcons.X,
    gradient: "from-gray-200 to-gray-400",
    glowColor: "rgba(200, 200, 200, 0.3)",
    cardClass: "platform-card-twitter",
    textDark: true,
    features: [
      "Account creation",
      "Tweet scheduling",
      "Auto retweet",
      "Follow automation",
      "DM campaigns",
      "Thread posting",
    ],
  },
  {
    name: "Reddit",
    icon: PlatformIcons.Reddit,
    gradient: "from-orange-500 to-red-500",
    glowColor: "rgba(255, 69, 0, 0.4)",
    cardClass: "platform-card-reddit",
    features: [
      "Account creation",
      "Post scheduling",
      "Karma farming",
      "Auto upvote",
      "Comment automation",
      "Subreddit targeting",
    ],
  },
];

const stats = [
  { value: "50+", label: "Automation Actions", icon: Zap },
  { value: "100%", label: "Platform Coverage", icon: Globe },
  { value: "24/7", label: "Background Running", icon: Clock },
  { value: "0", label: "Coding Required", icon: Code },
];

export function Platforms() {
  return (
    <section id="platforms" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 hero-gradient opacity-50" />
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2.5 mb-8"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-white">
              5 Platforms, One Tool
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Dominate{" "}
            <span className="gradient-text-animated">
              Every Platform
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted max-w-2xl mx-auto"
          >
            Create accounts, automate engagement, and grow your presence across all major social networks.
          </motion.p>
        </div>

        {/* Platform cards - Premium bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`group relative glass-card rounded-3xl p-8 border border-border/50 hover:border-white/20 transition-all duration-500 ${platform.cardClass}`}
            >
              {/* Gradient glow on hover */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              {/* Top gradient line */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 rounded-b-full bg-gradient-to-r ${platform.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500`} />

              {/* Platform header */}
              <div className="flex items-center gap-4 mb-8 relative">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${platform.gradient} flex items-center justify-center shadow-2xl`}
                  style={{ boxShadow: `0 10px 40px ${platform.glowColor}` }}
                >
                  <platform.icon />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {platform.name}
                  </h3>
                  <p className="text-sm text-muted">Full automation suite</p>
                </div>
              </div>

              {/* Features list */}
              <ul className="space-y-3 relative">
                {platform.features.map((feature, featureIndex) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                    className="flex items-center text-sm text-white/80 group-hover:text-white transition-colors"
                  >
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${platform.gradient} flex items-center justify-center mr-3 flex-shrink-0 shadow-lg`}>
                      <Check className={`w-3.5 h-3.5 ${platform.textDark ? "text-gray-900" : "text-white"}`} />
                    </div>
                    {feature}
                  </motion.li>
                ))}
              </ul>

              {/* Bottom gradient indicator */}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1 rounded-t-full bg-gradient-to-r ${platform.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-1/2`} />
            </motion.div>
          ))}

          {/* Coming soon card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative glass-card rounded-3xl p-8 border border-dashed border-border/50 flex flex-col items-center justify-center text-center min-h-[380px]"
          >
            {/* Animated border */}
            <div className="absolute inset-0 rounded-3xl animate-border-flow border border-transparent" style={{ borderWidth: "1px" }} />

            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 rounded-2xl glass-card border border-accent/30 flex items-center justify-center mb-6"
            >
              <span className="text-4xl">+</span>
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-3">
              More Coming
            </h3>
            <p className="text-muted max-w-[200px] mb-6">
              LinkedIn, Pinterest, YouTube, Threads and more platforms coming soon
            </p>
            <div className="px-4 py-2 rounded-full bg-accent/10 border border-accent/30">
              <span className="text-sm text-accent font-medium">2025 Roadmap</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-6 text-center border border-border/50 hover:border-accent/30 transition-all duration-300"
            >
              <stat.icon className="w-6 h-6 text-accent mx-auto mb-3" />
              <div className="stat-value text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
