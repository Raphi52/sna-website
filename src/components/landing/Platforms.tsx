"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Globe, Clock, Code } from "lucide-react";

const platforms = [
  {
    name: "Instagram",
    icon: "IG",
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
    icon: "TT",
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
    icon: "FB",
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
    icon: "X",
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
    icon: "R",
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
                  <span className={`text-2xl font-bold ${platform.textDark ? "text-gray-900" : "text-white"}`}>
                    {platform.icon}
                  </span>
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
