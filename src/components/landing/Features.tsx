"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Smartphone,
  Image,
  BarChart3,
  Repeat,
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
  Type,
  Maximize2,
  Rocket,
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
    gradient: "from-info to-accent",
    highlights: [
      { icon: GripVertical, title: "Drag & Drop", desc: "Visual 24h calendar" },
      { icon: Users, title: "Profile Groups", desc: "Organize by strategy" },
      { icon: Copy, title: "Presets", desc: "Save & copy schedules" },
      { icon: Layers, title: "15+ Tasks", desc: "All automation types" },
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
    gradient: "from-tiktok-cyan to-tiktok-pink",
    highlights: [
      { icon: Play, title: "14+ Actions", desc: "Follow, DM, Publish..." },
      { icon: Target, title: "Targeting", desc: "Extract & engage" },
      { icon: Activity, title: "Live Proxy", desc: "Real-time status" },
      { icon: FileDown, title: "Download", desc: "Save any content" },
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
    gradient: "from-instagram-rose to-instagram-orange",
    highlights: [
      { icon: Smartphone, title: "5 Platforms", desc: "All social networks" },
      { icon: Cpu, title: "Fingerprints", desc: "Unique per profile" },
      { icon: Layers, title: "Proxy Assign", desc: "Static residential" },
      { icon: Users, title: "Groups", desc: "Organize by niche" },
    ],
  },
  {
    id: "media",
    title: "Media Processor",
    description:
      "Create a unique digital signature for every post. Subtle crop, captions, music, and metadata changes bypass duplicate detection.",
    icon: Image,
    color: "text-warning",
    bgColor: "bg-warning/20",
    gradient: "from-warning to-orange-500",
    highlights: [
      { icon: Maximize2, title: "0-2% Crop", desc: "Undetectable change" },
      { icon: Type, title: "Captions", desc: "Burn-in subtitles" },
      { icon: Music, title: "Audio", desc: "Trending sounds" },
      { icon: Cpu, title: "Metadata", desc: "EXIF rewrite" },
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
    gradient: "from-success to-emerald-400",
    highlights: [
      { icon: PieChart, title: "Activity", desc: "Time breakdown" },
      { icon: Activity, title: "Actions", desc: "Full tracking" },
      { icon: Timer, title: "Sessions", desc: "Per-profile stats" },
      { icon: FileDown, title: "Export", desc: "CSV reports" },
    ],
  },
];

// Feature visual components
function SchedulerVisual() {
  const tasks = [
    { name: "REELS", color: "from-orange-500 to-orange-600", left: "8%", width: "12%" },
    { name: "HOME", color: "from-pink-500 to-pink-600", left: "22%", width: "8%" },
    { name: "PUBLISH", color: "from-yellow-500 to-yellow-600", left: "35%", width: "15%" },
    { name: "STORY", color: "from-purple-500 to-purple-600", left: "55%", width: "10%" },
    { name: "TARGET", color: "from-green-500 to-green-600", left: "70%", width: "15%" },
    { name: "DM", color: "from-blue-500 to-blue-600", left: "88%", width: "10%" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-instagram rounded-xl flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-sm font-semibold text-white">Monday Schedule</span>
            <div className="text-xs text-muted">12 tasks planned</div>
          </div>
        </div>
        <div className="px-3 py-1 bg-success/20 text-success text-xs rounded-full font-medium">Active</div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="flex justify-between text-xs text-muted mb-2">
          <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
        </div>
        <div className="h-14 bg-surface-hover/50 rounded-xl relative overflow-hidden border border-border/30">
          {/* Grid lines */}
          <div className="absolute inset-0 flex">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex-1 border-r border-border/20" />
            ))}
          </div>
          {/* Task blocks */}
          {tasks.map((task, i) => (
            <motion.div
              key={task.name}
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={`absolute top-2 bottom-2 bg-gradient-to-r ${task.color} rounded-lg flex items-center justify-center shadow-lg`}
              style={{ left: task.left, width: task.width }}
            >
              <span className="text-[10px] text-white font-bold">{task.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Profiles */}
      <div className="flex flex-wrap gap-2">
        {["lunachic_aa", "james.davis", "mia_costa", "+12 more"].map((name) => (
          <div key={name} className="px-3 py-1.5 glass-card rounded-lg text-xs text-white/80 flex items-center gap-2">
            {name !== "+12 more" && <div className="w-2 h-2 rounded-full bg-success" />}
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

function BotVisual() {
  const actions = ["Follow", "Scroll Reels", "Publish", "Messages", "Target", "Extract", "Stories", "DM"];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-white">Instagram Bot</span>
        <div className="w-8 h-8 gradient-instagram rounded-lg" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {actions.map((action, i) => (
          <motion.div
            key={action}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="glass-card rounded-lg p-3 text-center border border-instagram-rose/30 hover:border-instagram-rose/60 transition-colors cursor-pointer"
          >
            <span className="text-xs text-white">{action}</span>
          </motion.div>
        ))}
      </div>
      <div className="flex items-center gap-2 pt-2 border-t border-border/30">
        <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
        <span className="text-xs text-success">Proxy Active - 163.123.202.79 (Los Angeles)</span>
      </div>
    </div>
  );
}

function ProfilesVisual() {
  const profiles = [
    { name: "lunachic_aa", platform: "Instagram", status: "active" },
    { name: "m_jacosta", platform: "Instagram", status: "active" },
    { name: "techguru", platform: "TikTok", status: "idle" },
    { name: "reddit_bot", platform: "Reddit", status: "active" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-white">Profile Manager</span>
        <span className="text-xs text-success">Pro Active</span>
      </div>
      <div className="flex gap-2 mb-4">
        {["IG", "FB", "X", "TT", "R"].map((p) => (
          <div key={p} className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white ${
            p === "IG" ? "gradient-instagram" :
            p === "FB" ? "gradient-facebook" :
            p === "X" ? "bg-gray-600" :
            p === "TT" ? "gradient-tiktok" : "gradient-reddit"
          }`}>{p}</div>
        ))}
      </div>
      <div className="space-y-2">
        {profiles.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center justify-between p-3 rounded-lg ${i === 0 ? "bg-accent/10 border border-accent/30" : "glass-card"}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${p.status === "active" ? "bg-success" : "bg-muted"}`} />
              <span className="text-sm text-white">{p.name}</span>
            </div>
            <span className="text-xs text-muted">{p.platform}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MediaVisual() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-white">Media Processor</span>
        <span className="text-xs text-success">Unique Signature</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-xs text-muted mb-2">Original</div>
          <div className="aspect-[9/16] rounded-xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur" />
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted mb-2">Processed</div>
          <div className="aspect-[9/16] rounded-xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden border-2 border-dashed border-white/30 m-[2px]">
            <div className="absolute top-2 right-2 bg-black/70 rounded px-2 py-1 flex items-center gap-1">
              <Maximize2 className="w-3 h-3 text-white" />
              <span className="text-[10px] text-white font-bold">1%</span>
            </div>
            <div className="absolute top-2 left-2 bg-success rounded-full p-1">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-2">
              <div className="bg-black/80 rounded px-2 py-1 mx-auto w-fit">
                <p className="text-[10px] text-white font-bold">Subtitle text</p>
              </div>
            </div>
            <div className="absolute bottom-2 left-2 right-2 bg-black/70 rounded-full px-2 py-1 flex items-center gap-2">
              <Music className="w-3 h-3 text-tiktok-cyan" />
              <span className="text-[9px] text-white truncate">Trending Audio</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricsVisual() {
  const stats = [
    { label: "Actions", value: "247", color: "bg-blue-500" },
    { label: "Session", value: "4h 32m", color: "bg-cyan-500" },
    { label: "Engage", value: "89%", color: "bg-green-500" },
    { label: "Posts", value: "12", color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-2">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`${stat.color}/20 rounded-xl p-3 text-center`}
          >
            <div className={`text-lg font-bold text-white`}>{stat.value}</div>
            <div className="text-[10px] text-muted">{stat.label}</div>
          </motion.div>
        ))}
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="text-xs text-muted mb-2">Time Distribution</div>
          <div className="relative w-20 h-20 mx-auto">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="14" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
              <circle cx="18" cy="18" r="14" fill="transparent" stroke="#f97316" strokeWidth="4" strokeDasharray="40 100" />
              <circle cx="18" cy="18" r="14" fill="transparent" stroke="#3b82f6" strokeWidth="4" strokeDasharray="25 100" strokeDashoffset="-40" />
              <circle cx="18" cy="18" r="14" fill="transparent" stroke="#10b981" strokeWidth="4" strokeDasharray="35 100" strokeDashoffset="-65" />
            </svg>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <div className="text-xs text-muted mb-2">Actions</div>
          {[
            { name: "Likes", w: "80%", color: "bg-red-500" },
            { name: "Follows", w: "60%", color: "bg-blue-500" },
            { name: "Comments", w: "40%", color: "bg-green-500" },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span className="text-[10px] text-muted w-14">{item.name}</span>
              <div className="flex-1 h-2 bg-surface-hover rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: item.w }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`h-full ${item.color} rounded-full`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const visualComponents: Record<string, React.FC> = {
  scheduler: SchedulerVisual,
  bot: BotVisual,
  profiles: ProfilesVisual,
  media: MediaVisual,
  metrics: MetricsVisual,
};

export function Features() {
  return (
    <section id="features" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient opacity-30" />
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
            <Rocket className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-white">Powerful Features</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Everything for{" "}
            <span className="gradient-text-animated">Serious Growth</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted max-w-2xl mx-auto"
          >
            Everything you need to automate, scale, and dominate social media.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="space-y-32">
          {features.map((feature, index) => {
            const VisualComponent = visualComponents[feature.id];
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-20 items-center`}
              >
                {/* Feature info */}
                <div className="flex-1 space-y-8">
                  <div>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-2xl`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-muted leading-relaxed">{feature.description}</p>
                  </div>

                  {/* Highlights */}
                  <div className="grid grid-cols-2 gap-4">
                    {feature.highlights.map((highlight, i) => (
                      <motion.div
                        key={highlight.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${feature.bgColor} flex items-center justify-center`}>
                          <highlight.icon className={`w-5 h-5 ${feature.color}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white text-sm">{highlight.title}</h4>
                          <p className="text-xs text-muted">{highlight.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Feature visual */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex-1 w-full"
                >
                  <div className="glass-card rounded-3xl p-6 border border-border/50 hover:border-accent/30 transition-all duration-500">
                    <VisualComponent />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
