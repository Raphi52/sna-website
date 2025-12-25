"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Smartphone,
  Image,
  BarChart3,
  Clock,
  Repeat,
  Palette,
  TrendingUp,
  Target,
  Layers,
  Cpu,
  Activity,
  Users,
  MousePointer,
  GripVertical,
  Copy,
  Play,
  FileDown,
  PieChart,
  Timer,
  Music,
  Move,
  Type,
  Maximize2,
} from "lucide-react";

const features = [
  {
    id: "scheduler",
    title: "Visual Task Scheduler",
    description:
      "Plan your entire automation strategy with a drag-and-drop 24-hour timeline. Schedule 148+ tasks across 15 accounts in minutes.",
    icon: Calendar,
    color: "text-info",
    bgColor: "bg-info/20",
    highlights: [
      {
        icon: GripVertical,
        title: "Drag & Drop Timeline",
        description: "Visual 24h calendar - drag tasks directly onto the schedule",
      },
      {
        icon: Users,
        title: "Profile Groups",
        description: "Organize accounts into groups: warmup, publish-everyday, reel-boosters",
      },
      {
        icon: Copy,
        title: "Presets & Copy",
        description: "Save presets, copy schedules between days and accounts",
      },
      {
        icon: Layers,
        title: "15+ Task Types",
        description: "Publish, Reels, Stories, Target, DM, Bio, ProfilePic and more",
      },
    ],
  },
  {
    id: "bot",
    title: "Multi-Platform Bot",
    description:
      "Embedded browser with 14+ automated actions per platform. Real proxy integration with live status monitoring.",
    icon: MousePointer,
    color: "text-tiktok-cyan",
    bgColor: "bg-tiktok-cyan/20",
    highlights: [
      {
        icon: Play,
        title: "14+ Actions",
        description: "Follow, Scroll Reels, Watch Stories, Publish, DM, Edit Bio...",
      },
      {
        icon: Target,
        title: "Targeted Engagement",
        description: "Extract followers, clean following, ban opponents",
      },
      {
        icon: Activity,
        title: "Live Proxy Status",
        description: "See active IP and location in real-time (Los Angeles, US)",
      },
      {
        icon: FileDown,
        title: "Content Download",
        description: "Download posts, reels, and stories from any account",
      },
    ],
  },
  {
    id: "profiles",
    title: "Profile Manager",
    description:
      "Manage unlimited accounts across 5 platforms with dedicated proxies, fingerprints, and group organization.",
    icon: Users,
    color: "text-instagram-rose",
    bgColor: "bg-instagram-rose/20",
    highlights: [
      {
        icon: Smartphone,
        title: "5 Platforms",
        description: "Instagram, Facebook, TikTok, X/Twitter, Reddit",
      },
      {
        icon: Cpu,
        title: "Unique Fingerprints",
        description: "Each profile gets unique browser fingerprint and cookies",
      },
      {
        icon: Layers,
        title: "Proxy Assignment",
        description: "Assign static residential proxy per account",
      },
      {
        icon: Users,
        title: "Group Management",
        description: "Organize profiles by niche, strategy, or client",
      },
    ],
  },
  {
    id: "media",
    title: "Media Processor",
    description:
      "Create a unique digital signature for every post. Slight crop, captions, music, and metadata changes bypass all duplicate detection.",
    icon: Image,
    color: "text-instagram-rose",
    bgColor: "bg-instagram-rose/20",
    highlights: [
      {
        icon: Maximize2,
        title: "1% Edge Crop",
        description: "Subtle crop removes 1% from edges - undetectable change",
      },
      {
        icon: Type,
        title: "Captions Overlay",
        description: "Burn text captions directly into images and videos",
      },
      {
        icon: Music,
        title: "Music & Audio",
        description: "Attach trending audio tracks to your reels",
      },
      {
        icon: Cpu,
        title: "Metadata Rewrite",
        description: "New EXIF + pixel format = unique digital fingerprint",
      },
    ],
  },
  {
    id: "metrics",
    title: "Statistics & Analytics",
    description:
      "Track every action with detailed metrics. Session time, engagement rates, and per-profile breakdowns.",
    icon: BarChart3,
    color: "text-success",
    bgColor: "bg-success/20",
    highlights: [
      {
        icon: PieChart,
        title: "Time by Activity",
        description: "See how time is spent: reels, targeting, content editing",
      },
      {
        icon: TrendingUp,
        title: "Actions Breakdown",
        description: "Likes, Comments, Follows, Shares, DMs - all tracked",
      },
      {
        icon: Timer,
        title: "Session Tracking",
        description: "Total actions, session time, engagement % per profile",
      },
      {
        icon: FileDown,
        title: "Export Reports",
        description: "Export detailed analytics to CSV for reporting",
      },
    ],
  },
];

export function Features() {
  return (
    <section id="features" className="py-20">
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
            Powerful Features for{" "}
            <span className="bg-clip-text text-transparent gradient-pro">
              Serious Growth
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted max-w-2xl mx-auto"
          >
            Everything you need to automate, scale, and dominate social media.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="space-y-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col ${
                index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-12 items-center`}
            >
              {/* Feature info */}
              <div className="flex-1">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${feature.bgColor} mb-6`}
                >
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-muted mb-8">{feature.description}</p>

                {/* Highlights grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {feature.highlights.map((highlight) => (
                    <div
                      key={highlight.title}
                      className="flex items-start gap-3"
                    >
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-lg ${feature.bgColor} flex items-center justify-center`}
                      >
                        <highlight.icon
                          className={`w-5 h-5 ${feature.color}`}
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">
                          {highlight.title}
                        </h4>
                        <p className="text-sm text-muted">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature visual */}
              <div className="flex-1">
                <div
                  className={`relative bg-surface border border-border rounded-2xl p-6 ${
                    feature.id === "scheduler"
                      ? "scheduler-visual"
                      : feature.id === "bot"
                      ? "bot-visual"
                      : feature.id === "profiles"
                      ? "profiles-visual"
                      : feature.id === "media"
                      ? "media-visual"
                      : "metrics-visual"
                  }`}
                >
                  {feature.id === "scheduler" && <SchedulerVisual />}
                  {feature.id === "bot" && <BotVisual />}
                  {feature.id === "profiles" && <ProfilesVisual />}
                  {feature.id === "media" && <MediaVisual />}
                  {feature.id === "metrics" && <MetricsVisual />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Scheduler Visual Component - Clean calendar grid style
function SchedulerVisual() {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 gradient-instagram rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-sm font-medium text-white">Monday Schedule</span>
            <div className="text-[10px] text-muted">12 tasks planned</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="px-2 py-1 bg-success/20 text-success text-[10px] rounded">Active</div>
        </div>
      </div>

      {/* 24h Grid */}
      <div className="relative">
        {/* Hour markers */}
        <div className="flex justify-between text-[9px] text-muted mb-1 px-1">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>24:00</span>
        </div>

        {/* Timeline bar */}
        <div className="h-12 bg-surface-hover rounded-lg relative overflow-hidden">
          {/* Grid lines */}
          <div className="absolute inset-0 flex">
            {[0, 6, 12, 18].map((h) => (
              <div key={h} className="flex-1 border-r border-border/30" />
            ))}
            <div className="flex-1" />
          </div>

          {/* Task blocks */}
          <div className="absolute top-1 bottom-1 left-[8%] w-[6%] bg-gradient-to-r from-orange-500 to-orange-600 rounded flex items-center justify-center">
            <span className="text-[8px] text-white font-medium">REELS</span>
          </div>
          <div className="absolute top-1 bottom-1 left-[15%] w-[4%] bg-gradient-to-r from-pink-500 to-pink-600 rounded flex items-center justify-center">
            <span className="text-[8px] text-white font-medium">HOME</span>
          </div>
          <div className="absolute top-1 bottom-1 left-[35%] w-[8%] bg-gradient-to-r from-yellow-500 to-yellow-600 rounded flex items-center justify-center">
            <span className="text-[8px] text-white font-medium">PUBLISH</span>
          </div>
          <div className="absolute top-1 bottom-1 left-[50%] w-[5%] bg-gradient-to-r from-purple-500 to-purple-600 rounded flex items-center justify-center">
            <span className="text-[8px] text-white font-medium">STORY</span>
          </div>
          <div className="absolute top-1 bottom-1 left-[70%] w-[10%] bg-gradient-to-r from-green-500 to-green-600 rounded flex items-center justify-center">
            <span className="text-[8px] text-white font-medium">TARGET</span>
          </div>
          <div className="absolute top-1 bottom-1 left-[85%] w-[6%] bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center">
            <span className="text-[8px] text-white font-medium">DM</span>
          </div>
        </div>
      </div>

      {/* Profiles list */}
      <div className="space-y-2">
        <div className="text-[10px] text-muted">Profiles in group</div>
        <div className="flex flex-wrap gap-2">
          {["lunachic_aa", "james.davis", "mia_costa", "+12 more"].map((name) => (
            <div
              key={name}
              className="px-2 py-1 bg-surface-hover rounded text-[10px] text-white/70 flex items-center gap-1"
            >
              {name !== "+12 more" && <div className="w-1.5 h-1.5 rounded-full bg-success" />}
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* Task legend */}
      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-border">
        <span className="flex items-center gap-1.5 text-[10px] text-muted">
          <span className="w-3 h-3 rounded bg-gradient-to-r from-orange-500 to-orange-600"></span> Reels
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-muted">
          <span className="w-3 h-3 rounded bg-gradient-to-r from-yellow-500 to-yellow-600"></span> Publish
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-muted">
          <span className="w-3 h-3 rounded bg-gradient-to-r from-green-500 to-green-600"></span> Target
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-muted">
          <span className="w-3 h-3 rounded bg-gradient-to-r from-blue-500 to-blue-600"></span> DM
        </span>
      </div>
    </div>
  );
}

// Bot Visual Component - Matches real app bot interface
function BotVisual() {
  const actions = [
    { name: "Follow", gradient: "gradient-instagram" },
    { name: "Scroll Reels", gradient: "gradient-instagram" },
    { name: "Scroll Home", gradient: "gradient-instagram" },
    { name: "Publish Stories", gradient: "gradient-instagram" },
    { name: "Publish", gradient: "gradient-instagram" },
    { name: "Messages", gradient: "gradient-instagram" },
    { name: "Ban Opponent", gradient: "gradient-instagram" },
    { name: "Extract Following", gradient: "gradient-instagram" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-white">Instagram Bot</span>
        <div className="w-6 h-6 gradient-instagram rounded" />
      </div>
      {/* Action buttons grid */}
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <div
            key={action.name}
            className="relative bg-surface-hover rounded-lg p-2 text-center border-2 border-transparent"
            style={{
              borderImage: "linear-gradient(45deg, rgb(150,40,200), rgb(225,48,108), rgb(247,119,55)) 1",
            }}
          >
            <span className="text-xs text-white">{action.name}</span>
          </div>
        ))}
      </div>
      {/* Proxy status */}
      <div className="flex items-center gap-2 pt-3 border-t border-border">
        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span className="text-[10px] text-success">
          Proxy Active - 163.123.202.79 (Los Angeles, US)
        </span>
      </div>
      {/* Log preview */}
      <div className="bg-black/50 rounded p-2 font-mono text-[9px] text-muted space-y-0.5">
        <div>[COMPLETE] Reels processing stopped.</div>
        <div className="text-success">Script stopped successfully.</div>
      </div>
    </div>
  );
}

// Media Visual Component - Before/After with captions, music, 1% crop
function MediaVisual() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-white">Media Processor</span>
        <span className="text-xs text-success">Unique Signature</span>
      </div>

      {/* Before/After comparison */}
      <div className="grid grid-cols-2 gap-4">
        {/* Before */}
        <div className="space-y-2">
          <div className="text-xs text-muted text-center">Original</div>
          <div className="relative aspect-[9/16] bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
            <Image className="w-10 h-10 text-gray-500" />
            <div className="absolute bottom-2 left-2 right-2 text-[8px] text-gray-500">
              No caption
            </div>
          </div>
        </div>

        {/* After */}
        <div className="space-y-2">
          <div className="text-xs text-muted text-center">Processed</div>
          <div className="relative aspect-[9/16] bg-gradient-to-br from-instagram-violet via-instagram-rose to-instagram-orange rounded-lg overflow-hidden">
            {/* 1% crop indicator - dotted lines showing cropped edges */}
            <div className="absolute inset-0 border-2 border-dashed border-white/30 m-[2px]" />

            {/* Crop indicator badge */}
            <div className="absolute top-2 right-2 bg-black/60 rounded px-1.5 py-0.5 flex items-center gap-1">
              <Maximize2 className="w-3 h-3 text-white" />
              <span className="text-[8px] text-white">-1%</span>
            </div>

            {/* Center content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image className="w-10 h-10 text-white/80" />
            </div>

            {/* Music indicator */}
            <div className="absolute top-2 left-2 bg-black/60 rounded-full p-1.5 flex items-center gap-1">
              <Music className="w-3 h-3 text-tiktok-cyan" />
            </div>

            {/* Caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
              <div className="flex items-center gap-1 mb-1">
                <Type className="w-3 h-3 text-white" />
                <span className="text-[8px] text-white/60">Caption</span>
              </div>
              <p className="text-[10px] text-white font-medium leading-tight">
                Check out this amazing content!
              </p>
            </div>

            {/* Success badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-success/90 rounded-full p-2">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Processing info */}
      <div className="grid grid-cols-4 gap-2 pt-2">
        <div className="text-center p-2 bg-surface-hover rounded-lg">
          <Maximize2 className="w-4 h-4 text-info mx-auto mb-1" />
          <div className="text-[9px] text-muted">1% Crop</div>
        </div>
        <div className="text-center p-2 bg-surface-hover rounded-lg">
          <Type className="w-4 h-4 text-warning mx-auto mb-1" />
          <div className="text-[9px] text-muted">Caption</div>
        </div>
        <div className="text-center p-2 bg-surface-hover rounded-lg">
          <Music className="w-4 h-4 text-tiktok-cyan mx-auto mb-1" />
          <div className="text-[9px] text-muted">Music</div>
        </div>
        <div className="text-center p-2 bg-surface-hover rounded-lg">
          <Cpu className="w-4 h-4 text-success mx-auto mb-1" />
          <div className="text-[9px] text-muted">Metadata</div>
        </div>
      </div>

      {/* Unique signature note */}
      <div className="flex items-center gap-2 pt-2 border-t border-border text-[10px] text-muted">
        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span>Unique digital signature - bypasses duplicate detection</span>
      </div>
    </div>
  );
}

// Profiles Visual Component - Matches real app profile manager
function ProfilesVisual() {
  const profiles = [
    { name: "lunachic_aa", platform: "Instagram", group: "lunachica", proxy: "207.135.196.203:7118" },
    { name: "m_jacosta", platform: "Instagram", group: "miacosta", proxy: "45.56.150.235:7155" },
    { name: "Facebook", platform: "Facebook", group: "facebook", proxy: "-" },
    { name: "Instagram", platform: "Instagram", group: "warmup", proxy: "-" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-white">Profile Manager</span>
        <span className="text-xs text-success">Pro Active - 360 days</span>
      </div>
      {/* Platform filters */}
      <div className="flex gap-1">
        <div className="w-6 h-6 gradient-instagram rounded flex items-center justify-center text-[10px] text-white">IG</div>
        <div className="w-6 h-6 gradient-facebook rounded flex items-center justify-center text-[10px] text-white">FB</div>
        <div className="w-6 h-6 gradient-twitter rounded flex items-center justify-center text-[10px] text-white">X</div>
        <div className="w-6 h-6 gradient-tiktok rounded flex items-center justify-center text-[10px] text-white">TT</div>
        <div className="w-6 h-6 gradient-reddit rounded flex items-center justify-center text-[10px] text-white">R</div>
      </div>
      {/* Profile table */}
      <div className="bg-black/50 rounded overflow-hidden">
        <div className="grid grid-cols-4 gap-2 p-2 text-[9px] text-muted border-b border-border">
          <span>Profile</span>
          <span>Platform</span>
          <span>Group</span>
          <span>Proxy</span>
        </div>
        {profiles.map((p, i) => (
          <div
            key={i}
            className={`grid grid-cols-4 gap-2 p-2 text-[9px] ${
              i === 0 ? "bg-info/20 text-info" : "text-white/70"
            }`}
          >
            <span className="truncate">{p.name}</span>
            <span>{p.platform}</span>
            <span className="truncate">{p.group}</span>
            <span className="font-mono truncate">{p.proxy}</span>
          </div>
        ))}
      </div>
      {/* Bottom stats */}
      <div className="flex items-center gap-4 text-[10px] text-muted">
        <span>STATIC PROXIES (25)</span>
        <span className="text-success">IP Scan OK</span>
      </div>
    </div>
  );
}

// Metrics Visual Component - Matches real app analytics
function MetricsVisual() {
  const actionsData = [
    { name: "Likes", value: 1, color: "bg-red-500", pct: "6.2%" },
    { name: "Comments", value: 3, color: "bg-green-500", pct: "18.8%" },
    { name: "Follows", value: 1, color: "bg-orange-500", pct: "6.2%" },
    { name: "Shares", value: 0, color: "bg-blue-500", pct: "0.0%" },
    { name: "DMs", value: 0, color: "bg-purple-500", pct: "0.0%" },
  ];

  return (
    <div className="space-y-3">
      {/* Top stats cards */}
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-blue-900/50 rounded p-2">
          <div className="text-[9px] text-blue-300">Total Actions</div>
          <div className="text-lg font-bold text-white">13</div>
        </div>
        <div className="bg-cyan-900/50 rounded p-2">
          <div className="text-[9px] text-cyan-300">Session Time</div>
          <div className="text-sm font-bold text-white">12m 19s</div>
        </div>
        <div className="bg-green-900/50 rounded p-2">
          <div className="text-[9px] text-green-300">Engagement</div>
          <div className="text-lg font-bold text-white">25%</div>
        </div>
        <div className="bg-purple-900/50 rounded p-2">
          <div className="text-[9px] text-purple-300">Publications</div>
          <div className="text-lg font-bold text-white">0</div>
        </div>
      </div>

      {/* Time by Activity - Pie chart representation */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="text-[10px] text-muted mb-2">Time by Activity</div>
          <div className="relative w-20 h-20 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="transparent" stroke="#f97316" strokeWidth="6" strokeDasharray="46 100" />
              <circle cx="18" cy="18" r="15" fill="transparent" stroke="#3b82f6" strokeWidth="6" strokeDasharray="23 100" strokeDashoffset="-46" />
              <circle cx="18" cy="18" r="15" fill="transparent" stroke="#6b7280" strokeWidth="6" strokeDasharray="31 100" strokeDashoffset="-69" />
            </svg>
          </div>
          <div className="flex justify-center gap-2 mt-2 text-[8px]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-orange-500 rounded"></span>target</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded"></span>reels</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-gray-500 rounded"></span>edit</span>
          </div>
        </div>

        {/* Actions by Type - Bar chart */}
        <div className="flex-1">
          <div className="text-[10px] text-muted mb-2">Actions by Type</div>
          <div className="space-y-1">
            {actionsData.map((action) => (
              <div key={action.name} className="flex items-center gap-2">
                <span className="text-[9px] text-muted w-14">{action.name}</span>
                <div className="flex-1 h-3 bg-surface-hover rounded overflow-hidden">
                  <div
                    className={`h-full ${action.color}`}
                    style={{ width: `${Math.min(action.value * 30, 100)}%` }}
                  />
                </div>
                <span className="text-[9px] text-white w-4">{action.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-[9px] text-muted pt-2 border-t border-border">
        Last updated: Auto-refresh ON | 1 profile(s)
      </div>
    </div>
  );
}
