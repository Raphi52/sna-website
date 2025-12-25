"use client";

import { motion } from "framer-motion";
import {
  Instagram,
  Facebook,
  Twitter,
  MessageCircle,
} from "lucide-react";

const platforms = [
  {
    name: "Instagram",
    icon: Instagram,
    gradient: "gradient-instagram",
    borderClass: "gradient-border-instagram",
    features: [
      "Account creation",
      "Auto follow/unfollow",
      "Comment popular posts",
      "Post scheduling",
      "DM automation",
    ],
  },
  {
    name: "TikTok",
    icon: MessageCircle, // Using as placeholder
    gradient: "gradient-tiktok",
    borderClass: "gradient-border-tiktok",
    features: [
      "Account creation",
      "Video scheduling",
      "Auto engagement",
      "FYP scrolling",
      "Comment automation",
    ],
  },
  {
    name: "Facebook",
    icon: Facebook,
    gradient: "gradient-facebook",
    borderClass: "gradient-border-facebook",
    features: [
      "Page management",
      "Post scheduling",
      "Group automation",
      "Auto reactions",
      "Messenger bots",
    ],
  },
  {
    name: "X (Twitter)",
    icon: Twitter,
    gradient: "gradient-twitter",
    borderClass: "gradient-border-twitter",
    features: [
      "Account creation",
      "Tweet scheduling",
      "Auto retweet",
      "Follow automation",
      "DM campaigns",
    ],
  },
  {
    name: "Reddit",
    icon: MessageCircle, // Using as placeholder
    gradient: "gradient-reddit",
    borderClass: "gradient-border-reddit",
    features: [
      "Account creation",
      "Post scheduling",
      "Karma farming",
      "Auto upvote",
      "Comment automation",
    ],
  },
];

export function Platforms() {
  return (
    <section id="features" className="py-20 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            One Tool, Five Platforms
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted max-w-2xl mx-auto"
          >
            Manage all your social media accounts from a single dashboard with
            platform-specific features and automation.
          </motion.p>
        </div>

        {/* Platform cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-black p-6 rounded-xl ${platform.borderClass}`}
            >
              {/* Platform header */}
              <div className="flex items-center mb-4">
                <div
                  className={`w-12 h-12 rounded-lg ${platform.gradient} flex items-center justify-center`}
                >
                  <platform.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="ml-4 text-xl font-semibold text-white">
                  {platform.name}
                </h3>
              </div>

              {/* Features list */}
              <ul className="space-y-2">
                {platform.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center text-sm text-muted"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-info mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* More platforms coming card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative bg-surface/50 p-6 rounded-xl border border-dashed border-border flex flex-col items-center justify-center text-center"
          >
            <div className="w-12 h-12 rounded-lg bg-muted/20 flex items-center justify-center mb-4">
              <span className="text-2xl">+</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              More Coming
            </h3>
            <p className="text-sm text-muted">
              LinkedIn, Pinterest, YouTube and more platforms coming soon
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
