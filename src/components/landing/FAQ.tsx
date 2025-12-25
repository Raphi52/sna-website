"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
      "Yes! Pro includes 1 premium proxy per month, and Lifetime includes 10 proxies per month. These are high-quality residential and mobile proxies optimized for social media. You can also use your own proxies or purchase additional proxy packages from our store.",
  },
  {
    question: "How does the scheduler work?",
    answer:
      "The 24/7 scheduler lets you automate tasks like posting content, engaging with followers, and warming up accounts. Set daily, weekly, or custom schedules. The bot runs in the background and executes tasks at the specified times with randomized delays for natural behavior.",
  },
  {
    question: "What's the difference between Free, Pro, and Lifetime?",
    answer:
      "Free: 1 account per platform, basic automation. Pro (29€/month): Unlimited accounts, advanced fingerprinting, scheduler, 1 proxy/month, priority support. Lifetime (299€ once): Everything in Pro forever, 10 proxies/month, 1-on-1 onboarding, priority feature requests.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept credit cards (Visa, Mastercard, Amex) via Stripe, PayPal, and cryptocurrencies (Bitcoin, Ethereum, USDT). All payments are secure and encrypted. Crypto payments are processed via NOWPayments.",
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
