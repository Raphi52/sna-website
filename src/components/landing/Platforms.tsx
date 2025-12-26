"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const platforms = [
  {
    name: "Instagram",
    icon: "IG",
    gradient: "from-purple-500 via-pink-500 to-orange-400",
    shadowColor: "shadow-pink-500/20",
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
    shadowColor: "shadow-cyan-500/20",
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
    shadowColor: "shadow-blue-500/20",
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
    gradient: "from-gray-100 to-gray-300",
    shadowColor: "shadow-gray-400/20",
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
    shadowColor: "shadow-orange-500/20",
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

export function Platforms() {
  return (
    <section id="platforms" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-info/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-surface/80 backdrop-blur border border-border rounded-full px-4 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-info" />
            <span className="text-sm font-medium text-white">
              5 Platforms, One Tool
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            Dominate{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400">
              Every Platform
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-muted max-w-2xl mx-auto"
          >
            Create accounts, automate engagement, and grow your presence across all major social networks.
          </motion.p>
        </div>

        {/* Platform cards - Bento grid style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative bg-surface/80 backdrop-blur border border-border rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 ${platform.shadowColor} hover:shadow-xl`}
            >
              {/* Gradient glow on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

              {/* Platform header */}
              <div className="flex items-center gap-4 mb-6 relative">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${platform.gradient} flex items-center justify-center shadow-lg ${platform.shadowColor}`}>
                  <span className={`text-xl font-bold ${platform.textDark ? "text-gray-900" : "text-white"}`}>
                    {platform.icon}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {platform.name}
                  </h3>
                  <p className="text-sm text-muted">Full automation</p>
                </div>
              </div>

              {/* Features list */}
              <ul className="space-y-3 relative">
                {platform.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center text-sm text-white/80 group-hover:text-white transition-colors"
                  >
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${platform.gradient} flex items-center justify-center mr-3 flex-shrink-0`}>
                      <Check className={`w-3 h-3 ${platform.textDark ? "text-gray-900" : "text-white"}`} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover indicator */}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 rounded-full bg-gradient-to-r ${platform.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </motion.div>
          ))}

          {/* Coming soon card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative bg-surface/40 backdrop-blur border border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[300px]"
          >
            <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <span className="text-3xl">+</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              More Coming
            </h3>
            <p className="text-sm text-muted max-w-[200px]">
              LinkedIn, Pinterest, YouTube, Threads and more platforms coming soon
            </p>
            <div className="mt-4 px-3 py-1 rounded-full bg-info/10 border border-info/20">
              <span className="text-xs text-info font-medium">2025 Roadmap</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "50+", label: "Automation Actions" },
            { value: "100%", label: "Platform Coverage" },
            { value: "24/7", label: "Background Running" },
            { value: "0", label: "Coding Required" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 rounded-xl bg-surface/50 border border-border">
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
