"use client";

import Link from "next/link";
import { Instagram, Twitter, Github, Mail } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Download", href: "/download" },
    { label: "Changelog", href: "/changelog" },
  ],
  Support: [
    { label: "Documentation", href: "/docs" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "/contact" },
    { label: "Discord", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Mail, href: "mailto:support@socialnetworkarmy.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 gradient-pro rounded-lg" />
              <span className="text-xl font-bold text-white">
                SocialNetwork<span className="text-info">Army</span>
              </span>
            </Link>
            <p className="text-sm text-muted mb-4 max-w-xs">
              Automate your social media presence across multiple platforms with
              advanced anti-detection technology.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-muted hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} SocialNetworkArmy. All rights
            reserved.
          </p>
          <p className="text-sm text-muted mt-4 md:mt-0">
            Made with passion for automation
          </p>
        </div>
      </div>
    </footer>
  );
}
