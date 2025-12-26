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
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        "group border border-border rounded-xl overflow-hidden transition-all duration-300",
        isOpen ? "bg-surface border-info/30" : "bg-surface/50 hover:bg-surface hover:border-border-hover"
      )}
    >
      <button
        onClick={onClick}
        className="w-full p-5 flex items-center justify-between text-left"
      >
        <span className={cn(
          "font-medium transition-colors",
          isOpen ? "text-white" : "text-white/80 group-hover:text-white"
        )}>
          {question}
        </span>
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ml-4",
          isOpen ? "bg-info rotate-180" : "bg-surface-hover group-hover:bg-info/20"
        )}>
          <ChevronDown className={cn(
            "w-4 h-4 transition-colors",
            isOpen ? "text-white" : "text-muted group-hover:text-info"
          )} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-5 pb-5">
              <div className="h-px bg-border mb-4" />
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
    <section id="faq" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-surface/80 backdrop-blur border border-border rounded-full px-4 py-2 mb-6"
          >
            <HelpCircle className="w-4 h-4 text-info" />
            <span className="text-sm font-medium text-white">
              Got Questions?
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            Frequently Asked{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-info to-purple-500">
              Questions
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
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
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-surface/80 backdrop-blur border border-border rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-info/20 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-info" />
            </div>
            <div className="text-center sm:text-left">
              <p className="font-medium text-white mb-1">Still have questions?</p>
              <p className="text-sm text-muted">Our team is here to help you get started</p>
            </div>
            <Link href="mailto:support@socialnetworkarmy.com">
              <Button variant="outline" className="whitespace-nowrap">
                Contact Support
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
