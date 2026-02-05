"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
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
  ChevronDown,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────
interface CursorStep {
  target: string; // ref name to move to
  action: "move" | "click" | "drag";
  delay: number; // ms to wait BEFORE this step
}

// ─── Animated Cursor with glow ──────────────────────────────────
function AnimatedCursor({ x, y, clicking }: { x: number; y: number; clicking: boolean }) {
  return (
    <motion.div
      className="absolute z-50 pointer-events-none"
      animate={{ x, y }}
      transition={{ type: "spring", damping: 18, stiffness: 120, mass: 0.8 }}
    >
      {/* Click ripple */}
      <AnimatePresence>
        {clicking && (
          <motion.div
            key="ripple"
            className="absolute top-0 left-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Cursor */}
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        className="filter drop-shadow-[0_0_10px_rgba(139,92,246,0.7)]"
        animate={{ scale: clicking ? 0.75 : 1 }}
        transition={{ duration: 0.08 }}
      >
        <path d="M5 3L19 12L13 14L9 21L5 3Z" fill="white" stroke="rgba(139,92,246,0.9)" strokeWidth="1.5" />
      </motion.svg>
    </motion.div>
  );
}

// ─── Highlight ring when cursor targets an element ──────────────
function TargetHighlight({ active, children, className = "" }: { active: boolean; children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {children}
      <AnimatePresence>
        {active && (
          <motion.div
            className="absolute -inset-[3px] rounded-[inherit] border-2 border-accent/60 pointer-events-none z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute -inset-1 rounded-[inherit] bg-accent/10 blur-sm"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Sidebar ────────────────────────────────────────────────────
const sidebarItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "profiles", icon: Users, label: "Profiles" },
  { id: "scheduler", icon: Calendar, label: "Scheduler" },
  { id: "bot", icon: Bot, label: "Bot" },
  { id: "media", icon: Image, label: "Media" },
];

function Sidebar({ activeScene, hoveredNav }: { activeScene: number; hoveredNav: string | null }) {
  const sceneToNav = ["profiles", "scheduler", "bot", "media"];
  const activeId = sceneToNav[activeScene];

  return (
    <div className="w-[140px] border-r border-border/30 p-2.5 flex flex-col gap-0.5 shrink-0">
      {sidebarItems.map((item) => {
        const isActive = item.id === activeId;
        const isHovered = item.id === hoveredNav;
        return (
          <motion.div
            key={item.id}
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] transition-all ${
              isActive
                ? "bg-accent/20 text-white border border-accent/30"
                : isHovered
                ? "bg-white/5 text-white/80"
                : "text-muted"
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

// ═══════════════════════════════════════════════════════════════════
// SCENE 1 : Account Creation
// ═══════════════════════════════════════════════════════════════════
function AccountScene({ step, hovered }: { step: number; hovered: string | null }) {
  const profiles = [
    { name: "luna_style", platform: "Instagram", status: "active" },
    { name: "tech_guru99", platform: "TikTok", status: "active" },
    { name: "james.d", platform: "Facebook", status: "idle" },
  ];

  return (
    <div className="p-3.5 h-full flex flex-col relative">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-white">Profile Manager</h3>
        <TargetHighlight active={hovered === "create-btn"} className="rounded-lg">
          <motion.div
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium cursor-pointer transition-all ${
              step >= 1
                ? "bg-accent text-white shadow-lg shadow-accent/40"
                : "bg-accent/20 text-accent border border-accent/30"
            }`}
            animate={step === 1 ? { scale: [1, 0.92, 1] } : {}}
            transition={{ duration: 0.15 }}
          >
            <Plus className="w-3 h-3" />
            Create Account
          </motion.div>
        </TargetHighlight>
      </div>

      {/* Profile list */}
      <div className="space-y-1.5 flex-1">
        {profiles.map((p) => (
          <div key={p.name} className="flex items-center justify-between p-2 rounded-lg bg-surface-hover/40 border border-border/15">
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${p.status === "active" ? "bg-success" : "bg-muted"}`} />
              <span className="text-[10px] text-white/90">{p.name}</span>
            </div>
            <span className="text-[9px] text-muted">{p.platform}</span>
          </div>
        ))}

        {/* New account row */}
        <AnimatePresence>
          {step >= 5 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              className="flex items-center justify-between p-2 rounded-lg bg-success/10 border border-success/30"
            >
              <div className="flex items-center gap-2">
                <motion.div className="w-1.5 h-1.5 rounded-full bg-success" animate={{ scale: [1, 1.8, 1] }} transition={{ duration: 0.4, repeat: 3 }} />
                <span className="text-[10px] text-white font-semibold">sarah_beauty</span>
              </div>
              <span className="text-[9px] text-success flex items-center gap-0.5">
                <Check className="w-2.5 h-2.5" /> Instagram
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal overlay */}
      <AnimatePresence>
        {step >= 2 && step <= 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute inset-3 bg-surface/95 backdrop-blur-xl rounded-xl border border-border/50 p-4 flex flex-col justify-center z-10 shadow-2xl"
          >
            <h4 className="text-xs font-semibold text-white mb-3">New Account</h4>

            {/* Platform select */}
            <div className="mb-2.5">
              <label className="text-[9px] text-muted mb-1 block">Platform</label>
              <TargetHighlight active={hovered === "platform-select"} className="rounded-lg">
                <motion.div
                  className={`px-2.5 py-1.5 rounded-lg border text-[10px] flex items-center justify-between cursor-pointer transition-all ${
                    step >= 3
                      ? "border-accent/50 bg-accent/10 text-white"
                      : "border-border/30 text-muted bg-surface-hover/30"
                  }`}
                  animate={step === 3 ? { borderColor: "rgba(139,92,246,0.7)" } : {}}
                >
                  <div className="flex items-center gap-2">
                    {step >= 3 ? (
                      <>
                        <div className="w-3.5 h-3.5 rounded-sm bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400" />
                        <span className="text-white">Instagram</span>
                      </>
                    ) : (
                      <span>Select platform...</span>
                    )}
                  </div>
                  <ChevronDown className="w-3 h-3" />
                </motion.div>
              </TargetHighlight>
            </div>

            {/* Username */}
            <div className="mb-3">
              <label className="text-[9px] text-muted mb-1 block">Username</label>
              <div className="px-2.5 py-1.5 rounded-lg border border-border/30 bg-surface-hover/30 text-[10px]">
                {step >= 3 ? (
                  <motion.span className="text-white" initial={{ width: 0 }} animate={{ width: "auto" }}>
                    sarah_beauty
                  </motion.span>
                ) : (
                  <span className="text-muted">auto-generated...</span>
                )}
              </div>
            </div>

            {/* Create button */}
            <TargetHighlight active={hovered === "confirm-create"} className="rounded-lg">
              <motion.div
                className={`w-full py-1.5 rounded-lg text-[10px] font-semibold text-center cursor-pointer transition-all ${
                  step >= 4
                    ? "bg-accent text-white shadow-lg shadow-accent/40"
                    : "bg-accent/15 text-accent/40"
                }`}
                animate={step === 4 ? { scale: [1, 0.95, 1] } : {}}
                transition={{ duration: 0.12 }}
              >
                {step === 4 ? (
                  <motion.span className="flex items-center justify-center gap-1.5">
                    <motion.div
                      className="w-2.5 h-2.5 border-2 border-white/60 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                    />
                    Creating...
                  </motion.span>
                ) : (
                  "Create Account"
                )}
              </motion.div>
            </TargetHighlight>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {step >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-2 right-2 flex items-center gap-1.5 px-2.5 py-1.5 bg-success/20 border border-success/40 rounded-lg z-20 shadow-lg"
          >
            <Check className="w-3 h-3 text-success" />
            <span className="text-[9px] text-success font-semibold">Account created!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCENE 2 : Task Scheduling
// ═══════════════════════════════════════════════════════════════════
function SchedulerScene({ step, hovered }: { step: number; hovered: string | null }) {
  const existingTasks = [
    { name: "HOME", color: "from-pink-500 to-pink-600", left: "6%", width: "10%" },
    { name: "PUBLISH", color: "from-yellow-500 to-yellow-600", left: "20%", width: "13%" },
    { name: "TARGET", color: "from-green-500 to-green-600", left: "52%", width: "12%" },
    { name: "DM", color: "from-blue-500 to-blue-600", left: "68%", width: "8%" },
  ];

  const taskCount = step >= 4 ? 10 : step >= 2 ? 9 : 8;

  return (
    <div className="p-3.5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-white">Task Scheduler</h3>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] text-muted">Tasks:</span>
          <motion.span
            key={taskCount}
            className="text-[11px] font-bold text-accent"
            initial={{ scale: 1.4, color: "rgb(16,185,129)" }}
            animate={{ scale: 1, color: "rgb(139,92,246)" }}
            transition={{ duration: 0.4 }}
          >
            {taskCount}
          </motion.span>
        </div>
      </div>

      {/* Task palette */}
      <div className="flex gap-1.5 mb-3">
        {[
          { name: "REELS", color: "from-orange-500 to-orange-600", id: "reels-chip", used: step >= 1 },
          { name: "STORY", color: "from-purple-500 to-purple-600", id: "story-chip", used: step >= 3 },
          { name: "LIKE", color: "from-red-500 to-red-600", id: "like-chip", used: false },
          { name: "FOLLOW", color: "from-blue-400 to-blue-500", id: "follow-chip", used: false },
        ].map((task) => (
          <TargetHighlight key={task.name} active={hovered === task.id} className="rounded-md">
            <motion.div
              className={`px-2 py-1 rounded-md bg-gradient-to-r ${task.color} text-[8px] text-white font-bold`}
              animate={{ opacity: task.used ? 0.3 : 1, scale: task.used ? 0.9 : 1 }}
            >
              {task.name}
            </motion.div>
          </TargetHighlight>
        ))}
      </div>

      {/* Timeline */}
      <div>
        <div className="flex justify-between text-[8px] text-muted/70 mb-1">
          <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
        </div>
        <TargetHighlight active={hovered === "timeline"} className="rounded-xl">
          <div className="h-11 bg-surface-hover/40 rounded-xl relative overflow-hidden border border-border/20">
            <div className="absolute inset-0 flex">
              {[0, 1, 2, 3].map((i) => <div key={i} className="flex-1 border-r border-border/10" />)}
            </div>

            {existingTasks.map((task) => (
              <div
                key={task.name}
                className={`absolute top-1.5 bottom-1.5 bg-gradient-to-r ${task.color} rounded-md flex items-center justify-center`}
                style={{ left: task.left, width: task.width }}
              >
                <span className="text-[7px] text-white font-bold">{task.name}</span>
              </div>
            ))}

            {/* Dragged REELS task */}
            <AnimatePresence>
              {step >= 1 && (
                <motion.div
                  initial={step === 1 ? { opacity: 0.8, left: "6%", width: "0%" } : undefined}
                  animate={{
                    opacity: 1,
                    left: "36%",
                    width: "12%",
                  }}
                  transition={{ type: "spring", damping: 20, stiffness: 150 }}
                  className="absolute top-1.5 bottom-1.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-md flex items-center justify-center shadow-lg shadow-orange-500/40"
                >
                  <span className="text-[7px] text-white font-bold">REELS</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dragged STORY task */}
            <AnimatePresence>
              {step >= 3 && (
                <motion.div
                  initial={{ opacity: 0.8, left: "36%", width: "0%" }}
                  animate={{
                    opacity: 1,
                    left: "82%",
                    width: "12%",
                  }}
                  transition={{ type: "spring", damping: 20, stiffness: 150 }}
                  className="absolute top-1.5 bottom-1.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-md flex items-center justify-center shadow-lg shadow-purple-500/40"
                >
                  <span className="text-[7px] text-white font-bold">STORY</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </TargetHighlight>
      </div>

      {/* Profiles row */}
      <div className="flex gap-1.5 mt-3">
        {["lunachic_aa", "james.davis", "+12 more"].map((name) => (
          <div key={name} className="px-2 py-1 rounded-md bg-surface-hover/30 border border-border/15 text-[8px] text-white/60 flex items-center gap-1">
            {name !== "+12 more" && <div className="w-1.5 h-1.5 rounded-full bg-success" />}
            {name}
          </div>
        ))}
      </div>

      {/* Success indicator */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex items-center gap-1.5 text-[9px] text-success"
          >
            <Check className="w-3 h-3" />
            <span className="font-medium">Schedule saved</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCENE 3 : Bot Execution
// ═══════════════════════════════════════════════════════════════════
function BotScene({ step, hovered }: { step: number; hovered: string | null }) {
  const actionButtons = [
    { icon: Heart, label: "Like", id: "bot-like" },
    { icon: UserPlus, label: "Follow", id: "bot-follow" },
    { icon: MessageCircle, label: "Comment", id: "bot-comment" },
    { icon: Play, label: "Reels", id: "bot-reels" },
  ];

  const logs = [
    { text: "Liked @fashion_daily post", icon: Heart, color: "text-pink-400" },
    { text: "Followed @style_maven", icon: UserPlus, color: "text-blue-400" },
    { text: "Liked @beauty_tips reel", icon: Heart, color: "text-pink-400" },
    { text: "Followed @travel_inspo", icon: UserPlus, color: "text-blue-400" },
    { text: "Commented on @food_lovers", icon: MessageCircle, color: "text-green-400" },
  ];

  return (
    <div className="p-3.5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400" />
          <h3 className="text-xs font-semibold text-white">Instagram Bot</h3>
        </div>
        <TargetHighlight active={hovered === "start-btn"} className="rounded-lg">
          <motion.div
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium cursor-pointer transition-all ${
              step >= 1
                ? "bg-success/20 text-success border border-success/40 shadow-lg shadow-success/20"
                : "bg-surface-hover text-muted border border-border/30"
            }`}
            animate={step === 1 ? { scale: [1, 0.92, 1] } : {}}
          >
            <motion.div
              className={`w-2 h-2 rounded-full ${step >= 1 ? "bg-success" : "bg-muted"}`}
              animate={step >= 2 ? { scale: [1, 1.4, 1], opacity: [1, 0.4, 1] } : {}}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
            {step >= 1 ? "Running" : "Start Bot"}
          </motion.div>
        </TargetHighlight>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-4 gap-1.5 mb-3">
        {actionButtons.map((action, i) => (
          <TargetHighlight key={action.label} active={hovered === action.id} className="rounded-lg">
            <motion.div
              className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg border cursor-pointer transition-all ${
                step >= 2 + i && step >= 2
                  ? "border-accent/50 bg-accent/15"
                  : "border-border/15 bg-surface-hover/20"
              }`}
              animate={hovered === action.id ? { scale: 1.05 } : { scale: 1 }}
            >
              <action.icon className={`w-3 h-3 ${step >= 2 + i && step >= 2 ? "text-accent" : "text-muted"}`} />
              <span className={`text-[8px] ${step >= 2 + i && step >= 2 ? "text-white" : "text-muted"}`}>{action.label}</span>
            </motion.div>
          </TargetHighlight>
        ))}
      </div>

      {/* Live log */}
      <div className="flex-1 overflow-hidden">
        <div className="text-[9px] text-muted/70 mb-1">Live Activity</div>
        <div className="space-y-1">
          <AnimatePresence>
            {step >= 3 &&
              logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  transition={{ delay: i * 0.25, duration: 0.3, ease: "easeOut" }}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-hover/20 border border-border/10"
                >
                  <log.icon className={`w-2.5 h-2.5 ${log.color} flex-shrink-0`} />
                  <span className="text-[8px] text-white/70 truncate">{log.text}</span>
                  <span className="text-[7px] text-muted ml-auto flex-shrink-0">now</span>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Stats */}
      <motion.div
        className="flex gap-2 pt-2.5 mt-2 border-t border-border/15"
        animate={step >= 3 ? { opacity: 1 } : { opacity: 0.4 }}
      >
        {[
          { label: "Actions", value: step >= 3 ? "47" : "0" },
          { label: "Engage", value: step >= 3 ? "89%" : "0%", highlight: true },
          { label: "Session", value: step >= 3 ? "12m" : "0m" },
        ].map((s) => (
          <div key={s.label} className="text-center flex-1">
            <motion.div
              className={`text-xs font-bold ${s.highlight && step >= 3 ? "text-success" : "text-white"}`}
              key={s.value}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {s.value}
            </motion.div>
            <div className="text-[8px] text-muted">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCENE 4 : Media Processing
// ═══════════════════════════════════════════════════════════════════
function MediaScene({ step, hovered }: { step: number; hovered: string | null }) {
  const toggles = [
    { label: "Crop 1%", icon: Crop, id: "toggle-crop", active: step >= 1 },
    { label: "Add Caption", icon: Type, id: "toggle-caption", active: step >= 2 },
    { label: "Change Audio", icon: Music, id: "toggle-audio", active: step >= 3 },
  ];

  return (
    <div className="p-3.5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-white">Media Processor</h3>
        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              className="flex items-center gap-1 px-2 py-1 bg-success/20 border border-success/40 rounded-full"
            >
              <Sparkles className="w-2.5 h-2.5 text-success" />
              <span className="text-[9px] text-success font-semibold">Unique Signature</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-3 flex-1 min-h-0">
        {/* Video preview */}
        <div className="w-[100px] shrink-0">
          <div className="aspect-[9/14] rounded-lg bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden shadow-lg">
            {/* Crop overlay */}
            <AnimatePresence>
              {step >= 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-[2px] border-2 border-dashed border-white/50 rounded-md"
                />
              )}
            </AnimatePresence>

            {/* Caption */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-x-1 top-1/2 -translate-y-1/2"
                >
                  <div className="bg-black/80 rounded px-1.5 py-0.5 mx-auto w-fit">
                    <p className="text-[8px] text-white font-bold">Check this out!</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Audio */}
            <AnimatePresence>
              {step >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-1.5 left-1 right-1 bg-black/70 rounded-full px-1.5 py-0.5 flex items-center gap-1"
                >
                  <Music className="w-2 h-2 text-tiktok-cyan" />
                  <span className="text-[7px] text-white">Trending</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Done check */}
            <AnimatePresence>
              {step >= 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="absolute top-1.5 right-1.5 w-4 h-4 bg-success rounded-full flex items-center justify-center shadow-lg shadow-success/40"
                >
                  <Check className="w-2.5 h-2.5 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          <div className="text-[9px] text-muted/70">Processing Options</div>

          {toggles.map((toggle, i) => (
            <TargetHighlight key={toggle.label} active={hovered === toggle.id} className="rounded-lg">
              <motion.div
                className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-all ${
                  toggle.active
                    ? "border-accent/50 bg-accent/10"
                    : "border-border/15 bg-surface-hover/20"
                }`}
                animate={
                  toggle.active && i === step - 1
                    ? { borderColor: ["rgba(139,92,246,0.3)", "rgba(139,92,246,0.8)", "rgba(139,92,246,0.3)"] }
                    : {}
                }
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-1.5">
                  <toggle.icon className={`w-3 h-3 ${toggle.active ? "text-accent" : "text-muted"}`} />
                  <span className={`text-[9px] ${toggle.active ? "text-white" : "text-muted"}`}>{toggle.label}</span>
                </div>
                <div className={`w-6 h-3.5 rounded-full relative transition-colors ${toggle.active ? "bg-accent" : "bg-surface-hover"}`}>
                  <motion.div
                    className="absolute top-[2px] w-2.5 h-2.5 rounded-full bg-white shadow-sm"
                    animate={{ left: toggle.active ? 11 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </div>
              </motion.div>
            </TargetHighlight>
          ))}

          {/* EXIF */}
          <div className="p-1.5 rounded-md bg-surface-hover/20 border border-border/10 mt-auto">
            <div className="text-[8px] text-muted">EXIF Metadata</div>
            <div className="text-[9px] mt-0.5">
              {step >= 4 ? (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-success font-semibold">
                  Rewritten
                </motion.span>
              ) : (
                <span className="text-white/40">Pending...</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCENE CONFIGS - cursor targets elements by name
// ═══════════════════════════════════════════════════════════════════
type SceneComponent = React.FC<{ step: number; hovered: string | null }>;

interface SceneConfig {
  label: string;
  component: SceneComponent;
  navId: string;
  totalDuration: number;
  // Each cursor action: [delay_ms, target_element, action, step_to_set]
  timeline: [number, string, "move" | "click", number][];
}

const scenes: SceneConfig[] = [
  {
    label: "Account Creation",
    component: AccountScene,
    navId: "profiles",
    totalDuration: 7500,
    timeline: [
      [0, "create-btn", "move", 0],
      [800, "create-btn", "click", 1],       // click Create Account → button lights up, modal opens
      [2000, "platform-select", "click", 3],  // click platform → Instagram selected
      [3500, "confirm-create", "move", 3],    // move to Create button
      [4200, "confirm-create", "click", 4],   // click Create → spinner
      [5500, "confirm-create", "move", 5],    // account appears + toast
      [7000, "create-btn", "move", 5],        // cursor moves away
    ],
  },
  {
    label: "Task Scheduling",
    component: SchedulerScene,
    navId: "scheduler",
    totalDuration: 7000,
    timeline: [
      [0, "reels-chip", "move", 0],
      [600, "reels-chip", "click", 1],        // grab REELS chip
      [1200, "timeline", "move", 1],           // drag to timeline
      [1800, "timeline", "click", 2],          // drop REELS → appears on timeline
      [2800, "story-chip", "move", 2],
      [3400, "story-chip", "click", 3],        // grab STORY chip
      [4000, "timeline", "move", 3],
      [4600, "timeline", "click", 4],          // drop STORY → appears + "Schedule saved"
      [6500, "reels-chip", "move", 4],
    ],
  },
  {
    label: "Bot Execution",
    component: BotScene,
    navId: "bot",
    totalDuration: 7000,
    timeline: [
      [0, "start-btn", "move", 0],
      [700, "start-btn", "click", 1],         // click Start → turns green
      [1500, "bot-like", "click", 2],          // click Like
      [2200, "bot-follow", "click", 3],        // click Follow → logs start
      [3000, "bot-comment", "click", 4],       // click Comment
      [3800, "bot-reels", "click", 5],         // click Reels
      [4800, "start-btn", "move", 5],          // watch stats fill
      [6500, "start-btn", "move", 5],
    ],
  },
  {
    label: "Media Processing",
    component: MediaScene,
    navId: "media",
    totalDuration: 7000,
    timeline: [
      [0, "toggle-crop", "move", 0],
      [700, "toggle-crop", "click", 1],        // toggle crop → border appears on video
      [1800, "toggle-caption", "click", 2],    // toggle caption → text appears
      [3000, "toggle-audio", "click", 3],       // toggle audio → music bar appears
      [4200, "toggle-audio", "move", 4],        // unique signature badge + check
      [6500, "toggle-crop", "move", 4],
    ],
  },
];

// ─── Cursor position calculator ─────────────────────────────────
// We use a fixed-size container so positions are predictable.
// Target positions are pre-calculated based on layout.
function getTargetPosition(target: string): { x: number; y: number } {
  const positions: Record<string, { x: number; y: number }> = {
    // Scene 1: Account Creation
    "create-btn": { x: 310, y: 26 },
    "platform-select": { x: 180, y: 145 },
    "confirm-create": { x: 180, y: 225 },

    // Scene 2: Scheduler
    "reels-chip": { x: 22, y: 62 },
    "story-chip": { x: 74, y: 62 },
    "timeline": { x: 180, y: 102 },
    "like-chip": { x: 122, y: 62 },
    "follow-chip": { x: 170, y: 62 },

    // Scene 3: Bot
    "start-btn": { x: 310, y: 22 },
    "bot-like": { x: 42, y: 72 },
    "bot-follow": { x: 120, y: 72 },
    "bot-comment": { x: 198, y: 72 },
    "bot-reels": { x: 276, y: 72 },

    // Scene 4: Media
    "toggle-crop": { x: 270, y: 72 },
    "toggle-caption": { x: 270, y: 112 },
    "toggle-audio": { x: 270, y: 152 },
  };

  return positions[target] || { x: 180, y: 150 };
}

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════
export function InteractiveDemo() {
  const [activeScene, setActiveScene] = useState(0);
  const [step, setStep] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 180, y: 150 });
  const [clicking, setClicking] = useState(false);
  const [hoveredTarget, setHoveredTarget] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const advanceScene = useCallback(() => {
    setActiveScene((prev) => (prev + 1) % scenes.length);
    setStep(0);
    setClicking(false);
    setHoveredTarget(null);
  }, []);

  // Run scene timeline
  useEffect(() => {
    if (isPaused) return;

    const scene = scenes[activeScene];
    const timers: ReturnType<typeof setTimeout>[] = [];

    scene.timeline.forEach(([delay, target, action, stepVal]) => {
      // Move cursor to target (with hover highlight slightly before)
      timers.push(
        setTimeout(() => {
          const pos = getTargetPosition(target);
          setCursorPos(pos);
          setHoveredTarget(target);
        }, Math.max(0, delay - 150)) // hover highlight 150ms before arrival
      );

      if (action === "click") {
        timers.push(
          setTimeout(() => {
            setClicking(true);
            setStep(stepVal);
            setTimeout(() => setClicking(false), 180);
          }, delay)
        );
      } else {
        timers.push(
          setTimeout(() => setStep(stepVal), delay)
        );
      }
    });

    // Clear hover after last action
    const lastAction = scene.timeline[scene.timeline.length - 1];
    timers.push(
      setTimeout(() => setHoveredTarget(null), lastAction[0] + 300)
    );

    // Advance scene
    timers.push(setTimeout(advanceScene, scene.totalDuration));

    return () => timers.forEach(clearTimeout);
  }, [activeScene, isPaused, advanceScene]);

  const scene = scenes[activeScene];
  const SceneComp = scene.component;

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient opacity-20" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 mb-5"
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

        {/* App Window */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-info/20 via-accent/30 to-pink-500/20 rounded-3xl blur-2xl opacity-40" />

          <div className="relative glass-card rounded-2xl border border-border/50 overflow-hidden shadow-2xl">
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/30 bg-surface/60">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <span className="text-[10px] text-muted ml-2 font-medium hidden sm:inline">SocialNetworkArmy v2.0</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                <span className="text-[9px] text-success font-medium">Connected</span>
              </div>
            </div>

            {/* Body */}
            <div className="flex h-[300px] sm:h-[340px] relative">
              {/* Sidebar */}
              <div className="hidden sm:block">
                <Sidebar activeScene={activeScene} hoveredNav={null} />
              </div>

              {/* Content */}
              <div className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScene}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25 }}
                    className="h-full"
                  >
                    <SceneComp step={step} hovered={hoveredTarget} />
                  </motion.div>
                </AnimatePresence>

                {/* Cursor */}
                <div className="hidden sm:block">
                  <AnimatedCursor x={cursorPos.x} y={cursorPos.y} clicking={clicking} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scene dots */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {scenes.map((s, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveScene(i);
                setStep(0);
                setClicking(false);
                setHoveredTarget(null);
              }}
              className="group flex items-center gap-2"
            >
              <motion.div
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeScene ? "bg-accent w-8" : "bg-border w-2 group-hover:bg-muted"
                }`}
                layout
              />
              {i === activeScene && (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs text-muted font-medium"
                >
                  {s.label}
                </motion.span>
              )}
            </button>
          ))}
        </div>

        <p className="text-center text-[10px] text-muted/40 mt-4">Hover to pause</p>
      </div>
    </section>
  );
}
