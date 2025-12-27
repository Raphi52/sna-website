"use client";

import { Navbar } from "@/components/layout";
import { Footer } from "@/components/landing";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Code,
  Key,
  Zap,
  Server,
  Lock,
  Copy,
  Check,
  ChevronRight,
  Terminal,
  Globe,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const endpoints = [
  {
    category: "Authentication",
    icon: Key,
    color: "text-success",
    bg: "bg-success/20",
    items: [
      { method: "POST", path: "/api/auth/login", description: "Authenticate user and get access token" },
      { method: "POST", path: "/api/auth/register", description: "Create a new user account" },
      { method: "POST", path: "/api/auth/refresh", description: "Refresh access token" },
      { method: "POST", path: "/api/auth/logout", description: "Invalidate current session" },
    ],
  },
  {
    category: "License",
    icon: Lock,
    color: "text-info",
    bg: "bg-info/20",
    items: [
      { method: "GET", path: "/api/license/status", description: "Get current license status" },
      { method: "POST", path: "/api/license/activate", description: "Activate a license key" },
      { method: "POST", path: "/api/license/deactivate", description: "Deactivate license from device" },
    ],
  },
  {
    category: "Accounts",
    icon: Globe,
    color: "text-accent",
    bg: "bg-accent/20",
    items: [
      { method: "GET", path: "/api/accounts", description: "List all connected social accounts" },
      { method: "POST", path: "/api/accounts", description: "Add a new social account" },
      { method: "DELETE", path: "/api/accounts/:id", description: "Remove a social account" },
      { method: "GET", path: "/api/accounts/:id/stats", description: "Get account statistics" },
    ],
  },
  {
    category: "Tasks",
    icon: Zap,
    color: "text-warning",
    bg: "bg-warning/20",
    items: [
      { method: "GET", path: "/api/tasks", description: "List all automation tasks" },
      { method: "POST", path: "/api/tasks", description: "Create a new automation task" },
      { method: "PUT", path: "/api/tasks/:id", description: "Update task configuration" },
      { method: "DELETE", path: "/api/tasks/:id", description: "Delete a task" },
      { method: "POST", path: "/api/tasks/:id/run", description: "Execute a task immediately" },
    ],
  },
  {
    category: "Proxies",
    icon: Server,
    color: "text-purple-400",
    bg: "bg-purple-400/20",
    items: [
      { method: "GET", path: "/api/proxies", description: "List all configured proxies" },
      { method: "POST", path: "/api/proxies", description: "Add a new proxy" },
      { method: "DELETE", path: "/api/proxies/:id", description: "Remove a proxy" },
      { method: "POST", path: "/api/proxies/:id/test", description: "Test proxy connectivity" },
    ],
  },
];

const codeExamples = {
  authentication: `// Authenticate and get access token
const response = await fetch('https://api.socialnetworkarmy.com/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'your-password',
  }),
});

const { accessToken, refreshToken } = await response.json();`,

  createTask: `// Create an automation task
const response = await fetch('https://api.socialnetworkarmy.com/api/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${accessToken}\`,
  },
  body: JSON.stringify({
    type: 'auto_follow',
    platform: 'instagram',
    accountId: 'acc_123',
    config: {
      targetHashtags: ['marketing', 'business'],
      dailyLimit: 50,
      delayBetweenActions: [30, 60], // seconds
    },
  }),
});

const task = await response.json();`,
};

const methodColors: Record<string, string> = {
  GET: "bg-success/20 text-success",
  POST: "bg-info/20 text-info",
  PUT: "bg-warning/20 text-warning",
  DELETE: "bg-error/20 text-error",
};

export default function ApiDocsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-info/5 to-transparent pointer-events-none" />

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
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-info/10 border border-info/30 rounded-full px-4 py-2 mb-6">
              <Code className="w-4 h-4 text-info" />
              <span className="text-sm font-medium text-info">API Reference</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              API Documentation
            </h1>
            <p className="text-xl text-muted mb-8">
              Integrate SocialNetworkArmy into your applications with our
              comprehensive REST API.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-surface border border-border rounded-lg px-4 py-2">
                <Terminal className="w-4 h-4 text-info" />
                <span className="text-sm text-muted">Base URL:</span>
                <code className="text-sm text-white">api.socialnetworkarmy.com</code>
              </div>
              <div className="flex items-center gap-2 bg-surface border border-border rounded-lg px-4 py-2">
                <RefreshCw className="w-4 h-4 text-success" />
                <span className="text-sm text-muted">Version:</span>
                <code className="text-sm text-white">v1</code>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Authentication Overview */}
      <section className="py-16 bg-surface/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Key className="w-6 h-6 mr-3 text-success" />
                Authentication
              </h2>
              <p className="text-muted mb-6">
                All API requests require authentication using Bearer tokens. Include
                your access token in the Authorization header of each request.
              </p>
              <div className="space-y-4">
                <div className="bg-surface border border-border rounded-lg p-4">
                  <p className="text-sm text-muted mb-2">Request Header</p>
                  <code className="text-sm text-info">
                    Authorization: Bearer {"<"}your-access-token{">"}
                  </code>
                </div>
                <div className="bg-surface border border-border rounded-lg p-4">
                  <p className="text-sm text-muted mb-2">Token Expiry</p>
                  <p className="text-sm text-white">
                    Access tokens expire after 1 hour. Use the refresh token to get
                    a new access token.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-surface border border-border rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-surface-hover border-b border-border">
                  <span className="text-sm text-muted">JavaScript</span>
                  <button
                    onClick={() => copyToClipboard(codeExamples.authentication, "auth")}
                    className="p-1.5 hover:bg-white/10 rounded transition-colors"
                  >
                    {copied === "auth" ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted" />
                    )}
                  </button>
                </div>
                <pre className="p-4 overflow-x-auto">
                  <code className="text-sm text-muted">
                    {codeExamples.authentication}
                  </code>
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">API Endpoints</h2>
            <p className="text-muted">Explore all available endpoints organized by category</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {endpoints.map((category, i) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-surface border border-border rounded-xl overflow-hidden"
              >
                <div className="p-5 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${category.bg} flex items-center justify-center`}>
                      <category.icon className={`w-5 h-5 ${category.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-white">{category.category}</h3>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {category.items.map((endpoint) => (
                    <div
                      key={endpoint.path}
                      className="px-5 py-3 hover:bg-surface-hover transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-mono font-medium px-2 py-0.5 rounded ${methodColors[endpoint.method]}`}>
                          {endpoint.method}
                        </span>
                        <code className="text-sm text-white truncate">{endpoint.path}</code>
                      </div>
                      <p className="text-xs text-muted">{endpoint.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Example */}
      <section className="py-16 bg-surface/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Example: Create a Task</h2>
            <p className="text-muted">Here's how to create an automation task using the API</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-surface border border-border rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-surface-hover border-b border-border">
                <span className="text-sm text-muted">JavaScript</span>
                <button
                  onClick={() => copyToClipboard(codeExamples.createTask, "task")}
                  className="p-1.5 hover:bg-white/10 rounded transition-colors"
                >
                  {copied === "task" ? (
                    <Check className="w-4 h-4 text-success" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted" />
                  )}
                </button>
              </div>
              <pre className="p-6 overflow-x-auto">
                <code className="text-sm text-muted">
                  {codeExamples.createTask}
                </code>
              </pre>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rate Limits */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface border border-border rounded-xl p-6 sm:p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Rate Limits</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-info mb-2">100</div>
                <p className="text-sm text-muted">Requests per minute</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-info mb-2">5,000</div>
                <p className="text-sm text-muted">Requests per hour</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-info mb-2">50,000</div>
                <p className="text-sm text-muted">Requests per day</p>
              </div>
            </div>
            <p className="text-sm text-muted mt-6 text-center">
              Rate limit headers are included in all API responses. Contact support for higher limits.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-surface/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="gradient-pro rounded-2xl p-8 sm:p-12"
          >
            <Code className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Build?
            </h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              Get your API key and start integrating SocialNetworkArmy into your applications.
            </p>
            <Link href="/dashboard/settings">
              <button className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-100 font-semibold px-6 py-3 rounded-xl transition-colors">
                Get API Key
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
