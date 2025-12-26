"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui";
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#proxies", label: "Proxies" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/download", label: "Download" },
  { href: "/#faq", label: "FAQ" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll to anchor after navigation
  const scrollToAnchor = (hash: string) => {
    const element = document.querySelector(hash);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  // Handle hash scroll on page load/navigation
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && pathname === "/") {
      const timer = setTimeout(() => scrollToAnchor(hash), 150);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.includes("#")) return;

    e.preventDefault();
    setIsOpen(false);

    const hash = href.includes("#") ? "#" + href.split("#")[1] : "";
    const targetPath = href.split("#")[0] || "/";

    if (pathname === "/" || pathname === targetPath) {
      scrollToAnchor(hash);
      window.history.pushState(null, "", href);
    } else {
      router.push(href);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative rounded-2xl transition-all duration-300 ${
            scrolled
              ? "bg-surface/70 backdrop-blur-2xl shadow-2xl shadow-black/20 border border-white/[0.08]"
              : "bg-transparent"
          }`}
        >
          {/* Gradient border effect when scrolled */}
          {scrolled && (
            <div className="absolute inset-0 rounded-2xl p-[1px] -z-10">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-info/20 via-accent/20 to-pink-500/20 opacity-50" />
            </div>
          )}

          <div className="flex items-center justify-between h-16 px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-info to-accent flex items-center justify-center shadow-lg shadow-accent/25"
              >
                <span className="text-white font-bold text-lg">S</span>
              </motion.div>
              <span className="text-xl font-bold text-white group-hover:text-white/90 transition-colors">
                SocialNetwork<span className="bg-gradient-to-r from-info to-accent bg-clip-text text-transparent">Army</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center bg-white/[0.03] rounded-full px-2 py-1.5 border border-white/[0.05]">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative px-4 py-2 text-sm text-white/60 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/[0.05]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-3">
              {session ? (
                <div className="relative" ref={userMenuRef}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-3 pl-4 pr-3 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all"
                  >
                    <span className="text-sm text-white/80">
                      {session.user?.name?.split(" ")[0]}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-info to-accent flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <ChevronDown className={`w-4 h-4 text-white/50 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                  </motion.button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 rounded-2xl bg-surface/90 backdrop-blur-2xl border border-white/[0.08] shadow-2xl shadow-black/30 py-2 z-50 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-white/[0.05]">
                          <p className="text-sm font-medium text-white">{session.user?.name}</p>
                          <p className="text-xs text-white/50 truncate">{session.user?.email}</p>
                        </div>
                        <div className="py-1">
                          <Link
                            href="/dashboard"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.05] transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </Link>
                          <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.05] transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/[0.05]">
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button variant="pro" size="sm" className="shadow-lg shadow-accent/25">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
          >
            <div className="mx-4 mt-2 rounded-2xl bg-surface/90 backdrop-blur-2xl border border-white/[0.08] shadow-2xl">
              <div className="p-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/[0.05] rounded-xl transition-colors cursor-pointer"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              <div className="p-4 border-t border-white/[0.05] space-y-2">
                {session ? (
                  <>
                    <Link href="/dashboard" className="block" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full justify-center">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm text-white/60 hover:text-white transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" className="block" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-center">
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/register" className="block" onClick={() => setIsOpen(false)}>
                      <Button variant="pro" size="sm" className="w-full justify-center">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
