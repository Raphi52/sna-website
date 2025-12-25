"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Is SocialNetworkArmy safe to use?",
    answer:
      "Yes! We use advanced fingerprinting and anti-detection technology to keep your accounts safe. Each profile has a unique browser fingerprint, and we simulate human-like behavior to avoid detection. However, like any automation tool, use it responsibly and follow each platform's terms of service.",
  },
  {
    question: "What platforms are supported?",
    answer:
      "Currently, we support Instagram, TikTok, Facebook, X (Twitter), and Reddit. Each platform has dedicated features optimized for its specific functionality. We're constantly working on adding more platforms.",
  },
  {
    question: "Can I use my own proxies?",
    answer:
      "Absolutely! The Pro version supports custom proxies in the format host:port:username:password. You can assign different proxies to different profiles for maximum security and geographic targeting.",
  },
  {
    question: "How does the licensing work?",
    answer:
      "The Free version allows 1 account per platform. Pro gives you unlimited accounts and advanced features. Lifetime is a one-time payment that includes all Pro features plus future updates forever. All licenses are tied to your account and can be used on any device.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, Mastercard, American Express via Stripe, PayPal, and cryptocurrencies including Bitcoin, Ethereum, and USDT. All payments are secure and processed by trusted payment providers.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Yes, we offer a 7-day money-back guarantee for Pro subscriptions. If you're not satisfied, contact our support team within 7 days of purchase for a full refund. Lifetime licenses have a 14-day refund policy.",
  },
  {
    question: "Do you offer updates?",
    answer:
      "Yes! Pro subscribers receive all updates during their subscription period. Lifetime license holders get updates forever at no additional cost. We regularly update the software to maintain compatibility with platform changes.",
  },
  {
    question: "Is there a trial period?",
    answer:
      "The Free version serves as a trial - you can test all basic features with 1 account per platform. This gives you a good feel for how the software works before upgrading to Pro.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onClick}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <span className="font-medium text-white">{question}</span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <p className="pb-4 text-muted">{answer}</p>
      </motion.div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-surface/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted"
          >
            Got questions? We&apos;ve got answers.
          </motion.p>
        </div>

        {/* FAQ list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-surface rounded-xl border border-border p-6"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
