"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui";

const faqs = [
  {
    question: "Is SocialNetworkArmy safe to use?",
    answer:
      "Yes! We use advanced fingerprinting technology that generates unique browser fingerprints for each profile. Combined with human-like behavior simulation and our optimized proxies, your accounts stay under the radar. Each profile has its own cookies, timezone, and device characteristics.",
  },
  {
    question: "What platforms are supported?",
    answer:
      "We support Instagram, TikTok, Facebook, X (Twitter), and Reddit. Each platform has dedicated automation features: account creation, content publishing, engagement (likes, follows, comments), story viewing, DMs, and more. We update regularly to stay compatible with platform changes.",
  },
  {
    question: "Are proxies included in the plans?",
    answer:
      "Yes! Pro includes 1 premium proxy, and Lifetime includes 10 proxies. These are high-quality residential and mobile proxies optimized for social media. You can also use your own proxies or purchase additional proxy packages from our store.",
  },
  {
    question: "How does the scheduler work?",
    answer:
      "The 24/7 scheduler lets you automate tasks like posting content, engaging with followers, and warming up accounts. Set daily, weekly, or custom schedules. The bot runs in the background and executes tasks at the specified times with randomized delays for natural behavior.",
  },
  {
    question: "What's the difference between Free, Pro, and Lifetime?",
    answer:
      "Free: 1 account per platform, basic automation. Pro ($29/month): Unlimited accounts, scheduler, 1 proxy, priority support. Lifetime ($299 once): Everything in Pro forever, 10 proxies, 1-on-1 onboarding, priority feature requests.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept credit cards (Visa, Mastercard, Amex) via Stripe, PayPal, and cryptocurrencies (Bitcoin, Ethereum). All payments are secure and encrypted. Crypto payments are processed via NOWPayments.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Yes! We offer a 7-day money-back guarantee on all plans. If you're not satisfied, contact support within 7 days for a full refund, no questions asked.",
  },
  {
    question: "How do I install and use the software?",
    answer:
      "Download the installer from your dashboard after purchase. The software runs on Windows 10/11. After installation, log in with your license key, add your proxies, create profiles, and start automating. We provide video tutorials and documentation to get you started.",
  },
  {
    question: "Do you offer support?",
    answer:
      "Free users get community support via our Discord. Pro and Lifetime users get priority email support with faster response times. Lifetime users also get access to 1-on-1 onboarding calls to help you set up your automation strategy.",
  },
  {
    question: "Will my accounts get banned?",
    answer:
      "While no automation tool can guarantee 100% safety, our fingerprinting and proxy system significantly reduces detection risk. We recommend starting slow, warming up new accounts, and using quality proxies. Many users run hundreds of accounts without issues when following best practices.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn(
        "group glass-card rounded-2xl overflow-hidden transition-all duration-500 border",
        isOpen ? "border-accent/30" : "border-border/30 hover:border-white/10"
      )}
    >
      <button
        onClick={onClick}
        className="w-full p-6 flex items-center justify-between text-left"
      >
        <span className={cn(
          "font-medium text-lg transition-colors",
          isOpen ? "text-white" : "text-white/80 group-hover:text-white"
        )}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ml-4",
            isOpen ? "bg-gradient-to-br from-info to-accent" : "bg-surface-hover group-hover:bg-accent/20"
          )}
        >
          <ChevronDown className={cn(
            "w-5 h-5 transition-colors",
            isOpen ? "text-white" : "text-muted group-hover:text-accent"
          )} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 pb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4" />
              <p className="text-muted leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient opacity-30" />
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2.5 mb-8"
          >
            <HelpCircle className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-white">
              Got Questions?
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Frequently Asked{" "}
            <span className="gradient-text-animated">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted"
          >
            Everything you need to know about SocialNetworkArmy
          </motion.p>
        </div>

        {/* FAQ list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            />
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 glass-card rounded-3xl border border-border/30">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-info to-accent flex items-center justify-center shadow-2xl"
            >
              <MessageCircle className="w-8 h-8 text-white" />
            </motion.div>
            <div className="text-center sm:text-left">
              <p className="font-semibold text-white text-lg mb-1">Still have questions?</p>
              <p className="text-muted">Our team is here to help you get started</p>
            </div>
            <Link href="mailto:support@socialnetworkarmy.com">
              <Button variant="outline" size="lg" className="whitespace-nowrap">
                Contact Support
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
