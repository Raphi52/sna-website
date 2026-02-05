"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import {
  Users,
  Calendar,
  Bot,
  Image,
  LayoutDashboard,
  Plus,
  Check,
  Play,
  Heart,
  UserPlus,
  MessageCircle,
  Crop,
  Type,
  Music,
  Sparkles,
} from "lucide-react";

// ─── Animated Cursor ────────────────────────────────────────────
function AnimatedCursor({
  x,
  y,
  clicking,
}: {
  x: number;
  y: number;
  clicking: boolean;
}) {
  return (
    <motion.div
      className="absolute z-50 pointer-events-none"
      animate={{ x, y }}
      transition={{ type: "spring", damping: 20, stiffness: 150, mass: 0.5 }}
    >
      {/* Click ripple */}
      <AnimatePresence>
        {clicking && (
          <motion.div
            className="absolute top-0 left-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      {/* Cursor SVG */}
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]"
        animate={{ scale: clicking ? 0.8 : 1 }}
        transition={{ duration: 0.1 }}
      >
        <path
          d="M5 3L19 12L13 14L9 21L5 3Z"
          fill="white"
          stroke="rgba(139,92,246,0.8)"
          strokeWidth="1.5"
        />
      </motion.svg>

      {/* Glow trail */}
      <motion.div
        className="absolute top-1 left-1 w-3 h-3 rounded-full bg-accent/40 blur-sm"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.div>
  );
}

// ─── Sidebar Navigation ─────────────────────────────────────────
const sidebarItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "profiles", icon: Users, label: "Profiles" },
  { id: "scheduler", icon: Calendar, label: "Scheduler" },
  { id: "bot", icon: Bot, label: "Bot" },
  { id: "media", icon: Image, label: "Media" },
];

function Sidebar({ activeScene }: { activeScene: number }) {
  const sceneToNav = ["profiles", "scheduler", "bot", "media"];
  const activeId = sceneToNav[activeScene];

  return (
    <div className="w-44 border-r border-border/30 p-3 flex flex-col gap-1">
      {sidebarItems.map((item) => {
        const isActive = item.id === activeId;
        return (
          <motion.div
            key={item.id}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all ${
              isActive
                ? "bg-accent/20 text-white border border-accent/30"
                : "text-muted hover:text-white/70"
            }`}
            animate={isActive ? { x: [0, 2, 0] } : {}}
            transition={{ duration: 0.3 }}
          >
            <item.icon className={`w-3.5 h-3.5 ${isActive ? "text-accent" : ""}`} />
            <span className="font-medium">{item.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Scene 1: Account Creation ──────────────────────────────────
function AccountCreationScene({ step }: { step: number }) {
  const profiles = [
    { name: "luna_style", platform: "Instagram", status: "active" },
    { name: "tech_guru99", platform: "TikTok", status: "active" },
    { name: "james.d", platform: "Facebook", status: "idle" },
  ];

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Profile Manager</h3>
        <motion.button
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            step >= 1
              ? "bg-accent text-white shadow-lg shadow-accent/30"
              : "bg-accent/20 text-accent border border-accent/30"
          }`}
          animate={step === 1 ? { scale: [1, 0.95, 1] } : {}}
          transition={{ duration: 0.2 }}
        >
          <Plus className="w-3 h-3" />
          Create Account
        </motion.button>
      </div>

      {/* Existing profiles */}
      <div className="space-y-2 flex-1">
        {profiles.map((p, i) => (
          <div
            key={p.name}
            className="flex items-center justify-between p-2.5 rounded-lg bg-surface-hover/50 border border-border/20"
          >
            <div className="flex items-center gap-2.5">
              <div className={`w-2 h-2 rounded-full ${p.status === "active" ? "bg-success" : "bg-muted"}`} />
              <span className="text-xs text-white">{p.name}</span>
            </div>
            <span className="text-[10px] text-muted">{p.platform}</span>
          </div>
        ))}

        {/* New account appearing */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              className="flex items-center justify-between p-2.5 rounded-lg bg-success/10 border border-success/30"
            >
              <div className="flex items-center gap-2.5">
                <motion.div
                  className="w-2 h-2 rounded-full bg-success"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                />
                <span className="text-xs text-white font-medium">sarah_beauty</span>
              </div>
              <span className="text-[10px] text-success flex items-center gap-1">
                <Check className="w-3 h-3" /> Instagram
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Creation modal */}
      <AnimatePresence>
        {step >= 2 && step < 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute inset-4 bg-surface/95 backdrop-blur-xl rounded-xl border border-border/50 p-4 flex flex-col justify-center z-10"
          >
            <h4 className="text-sm font-semibold text-white mb-4">Create New Account</h4>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-muted mb-1 block">Platform</label>
                <motion.div
                  className={`px-3 py-2 rounded-lg border text-xs flex items-center gap-2 ${
                    step >= 2
                      ? "border-accent/50 bg-accent/10 text-white"
                      : "border-border/30 text-muted"
                  }`}
                  animate={step === 2 ? { borderColor: ["rgba(139,92,246,0.3)", "rgba(139,92,246,0.7)", "rgba(139,92,246,0.3)"] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-4 h-4 rounded bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400" />
                  Instagram
                </motion.div>
              </div>

              <div>
                <label className="text-[10px] text-muted mb-1 block">Username</label>
                <div className="px-3 py-2 rounded-lg border border-border/30 text-xs text-white">
                  {step >= 3 ? (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      sarah_beauty
                    </motion.span>
                  ) : (
                    <span className="text-muted">auto-generated...</span>
                  )}
                </div>
              </div>

              <motion.button
                className={`w-full py-2 rounded-lg text-xs font-medium transition-all ${
                  step >= 3
                    ? "bg-accent text-white shadow-lg shadow-accent/30"
                    : "bg-accent/20 text-accent/50"
                }`}
                animate={step === 3 ? { scale: [1, 0.97, 1] } : {}}
                transition={{ duration: 0.15 }}
              >
                {step >= 3 ? "Creating..." : "Create Account"}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success toast */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-2 bg-success/20 border border-success/30 rounded-lg z-20"
          >
            <Check className="w-3.5 h-3.5 text-success" />
            <span className="text-[10px] text-success font-medium">Account created successfully</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Scene 2: Task Scheduling ───────────────────────────────────
function SchedulingScene({ step }: { step: number }) {
  const existingTasks = [
    { name: "HOME", color: "from-pink-500 to-pink-600", left: "8%", width: "10%" },
    { name: "PUBLISH", color: "from-yellow-500 to-yellow-600", left: "22%", width: "14%" },
    { name: "TARGET", color: "from-green-500 to-green-600", left: "55%", width: "12%" },
    { name: "DM", color: "from-blue-500 to-blue-600", left: "72%", width: "8%" },
  ];

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Task Scheduler</h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted">Tasks:</span>
          <motion.span
            className="text-xs font-bold text-accent"
            key={step >= 4 ? "updated" : "initial"}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.3 }}
          >
            {step >= 4 ? "10" : step >= 2 ? "9" : "8"}
          </motion.span>
        </div>
      </div>

      {/* Task palette */}
      <div className="flex gap-1.5 mb-4">
        {[
          { name: "REELS", color: "from-orange-500 to-orange-600", dragged: step >= 1 },
          { name: "STORY", color: "from-purple-500 to-purple-600", dragged: step >= 3 },
          { name: "LIKE", color: "from-red-500 to-red-600", dragged: false },
          { name: "FOLLOW", color: "from-blue-400 to-blue-500", dragged: false },
        ].map((task) => (
          <motion.div
            key={task.name}
            className={`px-2.5 py-1 rounded-md bg-gradient-to-r ${task.color} text-[9px] text-white font-bold cursor-grab ${
              task.dragged ? "opacity-30" : "opacity-100"
            }`}
            animate={task.dragged ? { opacity: 0.3, scale: 0.9 } : { opacity: 1, scale: 1 }}
          >
            {task.name}
          </motion.div>
        ))}
      </div>

      {/* Timeline */}
      <div className="flex-1">
        <div className="flex justify-between text-[9px] text-muted mb-1.5">
          <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
        </div>
        <div className="h-12 bg-surface-hover/50 rounded-xl relative overflow-hidden border border-border/30">
          {/* Grid lines */}
          <div className="absolute inset-0 flex">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex-1 border-r border-border/15" />
            ))}
          </div>

          {/* Existing tasks */}
          {existingTasks.map((task) => (
            <div
              key={task.name}
              className={`absolute top-1.5 bottom-1.5 bg-gradient-to-r ${task.color} rounded-md flex items-center justify-center shadow-lg`}
              style={{ left: task.left, width: task.width }}
            >
              <span className="text-[8px] text-white font-bold">{task.name}</span>
            </div>
          ))}

          {/* New REELS task being placed */}
          <AnimatePresence>
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0, left: "38%" }}
                animate={{ opacity: 1, scaleX: 1, left: "38%" }}
                className="absolute top-1.5 bottom-1.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-md flex items-center justify-center shadow-lg shadow-orange-500/30"
                style={{ width: "12%" }}
              >
                <span className="text-[8px] text-white font-bold">REELS</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* New STORY task being placed */}
          <AnimatePresence>
            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0, left: "84%" }}
                animate={{ opacity: 1, scaleX: 1, left: "84%" }}
                className="absolute top-1.5 bottom-1.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-md flex items-center justify-center shadow-lg shadow-purple-500/30"
                style={{ width: "12%" }}
              >
                <span className="text-[8px] text-white font-bold">STORY</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profiles */}
        <div className="flex gap-1.5 mt-3">
          {["lunachic_aa", "james.davis", "+12 more"].map((name) => (
            <div key={name} className="px-2 py-1 glass-card rounded-md text-[9px] text-white/70 flex items-center gap-1.5">
              {name !== "+12 more" && <div className="w-1.5 h-1.5 rounded-full bg-success" />}
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Scene 3: Bot Execution ─────────────────────────────────────
function BotScene({ step }: { step: number }) {
  const actions = [
    { icon: Heart, label: "Like", active: step >= 2 },
    { icon: UserPlus, label: "Follow", active: step >= 2 },
    { icon: MessageCircle, label: "Comment", active: false },
    { icon: Play, label: "Reels", active: false },
  ];

  const logs = [
    { text: "Liked @fashion_daily post", icon: Heart, delay: 0 },
    { text: "Followed @style_maven", icon: UserPlus, delay: 0.3 },
    { text: "Liked @beauty_tips reel", icon: Heart, delay: 0.6 },
    { text: "Followed @travel_inspo", icon: UserPlus, delay: 0.9 },
    { text: "Commented on @food_lovers", icon: MessageCircle, delay: 1.2 },
  ];

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400" />
          <h3 className="text-sm font-semibold text-white">Instagram Bot</h3>
        </div>
        <motion.button
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
            step >= 1
              ? "bg-success/20 text-success border border-success/30"
              : "bg-surface-hover text-muted border border-border/30"
          }`}
          animate={step === 1 ? { scale: [1, 0.95, 1] } : {}}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            className={`w-2 h-2 rounded-full ${step >= 1 ? "bg-success" : "bg-muted"}`}
            animate={step >= 1 ? { scale: [1, 1.3, 1], opacity: [1, 0.5, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
          {step >= 1 ? "Running" : "Start"}
        </motion.button>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-4 gap-1.5 mb-4">
        {actions.map((action) => (
          <div
            key={action.label}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
              action.active
                ? "border-accent/40 bg-accent/10"
                : "border-border/20 bg-surface-hover/30"
            }`}
          >
            <action.icon className={`w-3.5 h-3.5 ${action.active ? "text-accent" : "text-muted"}`} />
            <span className={`text-[9px] ${action.active ? "text-white" : "text-muted"}`}>{action.label}</span>
          </div>
        ))}
      </div>

      {/* Live action log */}
      <div className="flex-1 space-y-1.5 overflow-hidden">
        <div className="text-[10px] text-muted mb-1">Live Activity</div>
        <AnimatePresence>
          {step >= 2 &&
            logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                transition={{ delay: log.delay, duration: 0.3 }}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-surface-hover/30"
              >
                <log.icon className="w-3 h-3 text-accent flex-shrink-0" />
                <span className="text-[9px] text-white/80 truncate">{log.text}</span>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Stats bar */}
      <div className="flex gap-3 mt-3 pt-3 border-t border-border/20">
        <div className="text-center flex-1">
          <motion.div
            className="text-sm font-bold text-white"
            key={step >= 2 ? "active" : "idle"}
          >
            {step >= 2 ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                47
              </motion.span>
            ) : (
              "0"
            )}
          </motion.div>
          <div className="text-[9px] text-muted">Actions</div>
        </div>
        <div className="text-center flex-1">
          <motion.div className="text-sm font-bold text-white">
            {step >= 2 ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-success"
              >
                89%
              </motion.span>
            ) : (
              "0%"
            )}
          </motion.div>
          <div className="text-[9px] text-muted">Engage</div>
        </div>
        <div className="text-center flex-1">
          <div className="text-sm font-bold text-white">
            {step >= 2 ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                12m
              </motion.span>
            ) : (
              "0m"
            )}
          </div>
          <div className="text-[9px] text-muted">Session</div>
        </div>
      </div>
    </div>
  );
}

// ─── Scene 4: Media Processing ──────────────────────────────────
function MediaScene({ step }: { step: number }) {
  const toggles = [
    { label: "Crop 1%", icon: Crop, active: step >= 1 },
    { label: "Add Caption", icon: Type, active: step >= 2 },
    { label: "Change Audio", icon: Music, active: step >= 3 },
  ];

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Media Processor</h3>
        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-success/20 border border-success/30 rounded-full"
            >
              <Sparkles className="w-3 h-3 text-success" />
              <span className="text-[10px] text-success font-medium">Unique Signature</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-4 flex-1">
        {/* Video preview */}
        <div className="flex-1 relative">
          <div className="aspect-[9/14] rounded-xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden">
            {/* Crop indicator */}
            <AnimatePresence>
              {step >= 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-[2px] border-2 border-dashed border-white/40 rounded-lg"
                />
              )}
            </AnimatePresence>

            {/* Caption overlay */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-x-2 top-1/2 -translate-y-1/2"
                >
                  <div className="bg-black/80 rounded px-2 py-1 mx-auto w-fit">
                    <p className="text-[9px] text-white font-bold">Check this out!</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Audio bar */}
            <AnimatePresence>
              {step >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-2 left-2 right-2 bg-black/70 rounded-full px-2 py-1 flex items-center gap-1.5"
                >
                  <Music className="w-2.5 h-2.5 text-tiktok-cyan" />
                  <span className="text-[8px] text-white truncate">Trending Sound</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success check */}
            <AnimatePresence>
              {step >= 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-2 right-2 w-5 h-5 bg-success rounded-full flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Toggle controls */}
        <div className="flex-1 space-y-2.5">
          <div className="text-[10px] text-muted mb-2">Processing Options</div>
          {toggles.map((toggle, i) => (
            <motion.div
              key={toggle.label}
              className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                toggle.active
                  ? "border-accent/40 bg-accent/10"
                  : "border-border/20 bg-surface-hover/30"
              }`}
              animate={
                toggle.active && i === step - 1
                  ? { borderColor: ["rgba(139,92,246,0.3)", "rgba(139,92,246,0.7)", "rgba(139,92,246,0.3)"] }
                  : {}
              }
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <toggle.icon className={`w-3.5 h-3.5 ${toggle.active ? "text-accent" : "text-muted"}`} />
                <span className={`text-[10px] ${toggle.active ? "text-white" : "text-muted"}`}>
                  {toggle.label}
                </span>
              </div>

              {/* Toggle switch */}
              <div className={`w-7 h-4 rounded-full relative transition-all ${
                toggle.active ? "bg-accent" : "bg-surface-hover"
              }`}>
                <motion.div
                  className="absolute top-0.5 w-3 h-3 rounded-full bg-white shadow"
                  animate={{ left: toggle.active ? 14 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </div>
            </motion.div>
          ))}

          {/* Metadata info */}
          <div className="mt-3 p-2 rounded-lg bg-surface-hover/30 border border-border/20">
            <div className="text-[9px] text-muted">EXIF Metadata</div>
            <div className="text-[10px] text-white/60 mt-1">
              {step >= 4 ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-success"
                >
                  Rewritten
                </motion.span>
              ) : (
                "Pending..."
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Scene definitions with cursor keyframes ────────────────────
interface CursorKeyframe {
  x: number;
  y: number;
  click: boolean;
  delay: number; // ms before moving to this position
}

const sceneConfigs = [
  {
    label: "Account Creation",
    totalDuration: 6000,
    steps: 5, // 0..4
    stepTimings: [0, 800, 1800, 3200, 4500],
    cursorKeyframes: [
      { x: 340, y: 30, click: false, delay: 0 },
      { x: 340, y: 30, click: true, delay: 600 },
      { x: 200, y: 140, click: true, delay: 1600 },
      { x: 200, y: 220, click: true, delay: 3000 },
      { x: 200, y: 260, click: false, delay: 4300 },
    ],
  },
  {
    label: "Task Scheduling",
    totalDuration: 6000,
    steps: 5,
    stepTimings: [0, 800, 2000, 3200, 4500],
    cursorKeyframes: [
      { x: 50, y: 90, click: false, delay: 0 },
      { x: 170, y: 120, click: true, delay: 600 },
      { x: 170, y: 120, click: false, delay: 1800 },
      { x: 100, y: 90, click: true, delay: 3000 },
      { x: 330, y: 120, click: false, delay: 4300 },
    ],
  },
  {
    label: "Bot Execution",
    totalDuration: 5500,
    steps: 3,
    stepTimings: [0, 800, 2200],
    cursorKeyframes: [
      { x: 330, y: 30, click: false, delay: 0 },
      { x: 330, y: 30, click: true, delay: 600 },
      { x: 200, y: 150, click: false, delay: 2000 },
    ],
  },
  {
    label: "Media Processing",
    totalDuration: 6500,
    steps: 5,
    stepTimings: [0, 1000, 2200, 3500, 5000],
    cursorKeyframes: [
      { x: 310, y: 110, click: false, delay: 0 },
      { x: 310, y: 110, click: true, delay: 800 },
      { x: 310, y: 148, click: true, delay: 2000 },
      { x: 310, y: 186, click: true, delay: 3300 },
      { x: 250, y: 60, click: false, delay: 4800 },
    ],
  },
];

// ─── Main Component ─────────────────────────────────────────────
export function InteractiveDemo() {
  const [activeScene, setActiveScene] = useState(0);
  const [step, setStep] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 200, y: 150 });
  const [clicking, setClicking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const sceneCount = sceneConfigs.length;

  const advanceScene = useCallback(() => {
    setActiveScene((prev) => (prev + 1) % sceneCount);
    setStep(0);
    setClicking(false);
  }, [sceneCount]);

  // Scene auto-cycle
  useEffect(() => {
    if (isPaused) return;

    const config = sceneConfigs[activeScene];
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Schedule step transitions
    config.stepTimings.forEach((timing, i) => {
      timers.push(
        setTimeout(() => setStep(i), timing)
      );
    });

    // Schedule cursor movements
    config.cursorKeyframes.forEach((kf) => {
      timers.push(
        setTimeout(() => {
          setCursorPos({ x: kf.x, y: kf.y });
          if (kf.click) {
            setClicking(true);
            setTimeout(() => setClicking(false), 200);
          }
        }, kf.delay)
      );
    });

    // Advance to next scene
    timers.push(
      setTimeout(advanceScene, config.totalDuration)
    );

    return () => timers.forEach(clearTimeout);
  }, [activeScene, isPaused, advanceScene]);

  const SceneComponents = [AccountCreationScene, SchedulingScene, BotScene, MediaScene];
  const ActiveSceneComponent = SceneComponents[activeScene];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient opacity-20" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2.5 mb-6"
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-success"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-white">Live Demo</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            See It in{" "}
            <span className="gradient-text-animated">Action</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted max-w-xl mx-auto"
          >
            Watch how SNA automates everything. No setup, no coding.
          </motion.p>
        </div>

        {/* App window */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Outer glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-info/20 via-accent/20 to-pink-500/20 rounded-2xl blur-xl opacity-50" />

          {/* Main window */}
          <div className="relative glass-card rounded-2xl border border-border/50 overflow-hidden shadow-2xl">
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/30 bg-surface/50">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[11px] text-muted ml-2 font-medium">SocialNetworkArmy v2.0</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-[10px] text-success">Connected</span>
              </div>
            </div>

            {/* App body */}
            <div className="flex h-[340px] sm:h-[380px] relative">
              {/* Sidebar - hidden on very small screens */}
              <div className="hidden sm:block">
                <Sidebar activeScene={activeScene} />
              </div>

              {/* Main content */}
              <div className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScene}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <ActiveSceneComponent step={step} />
                  </motion.div>
                </AnimatePresence>

                {/* Animated cursor - hidden on mobile */}
                <div className="hidden sm:block">
                  <AnimatedCursor x={cursorPos.x} y={cursorPos.y} clicking={clicking} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scene indicator dots */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {sceneConfigs.map((scene, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveScene(i);
                setStep(0);
                setClicking(false);
              }}
              className="group flex items-center gap-2"
            >
              <motion.div
                className={`h-2 rounded-full transition-all ${
                  i === activeScene
                    ? "bg-accent w-8"
                    : "bg-border w-2 group-hover:bg-muted"
                }`}
                layout
              />
              {i === activeScene && (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs text-muted font-medium"
                >
                  {scene.label}
                </motion.span>
              )}
            </button>
          ))}
        </div>

        {/* Pause hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="text-center text-[11px] text-muted/50 mt-4"
        >
          Hover to pause
        </motion.p>
      </div>
    </section>
  );
}
