import { Pricing } from "@/components/landing/Pricing";
import { Proxies } from "@/components/landing/Proxies";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Pricing - SocialNetworkArmy",
  description: "Choose the plan that fits your needs. Get access to unlimited accounts, advanced automation, and premium proxies.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero section */}
      <section className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-muted hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Pricing
          </h1>
          <p className="text-xl text-muted max-w-2xl">
            Simple pricing, no hidden fees. Choose the plan that works best for you.
          </p>
        </div>
      </section>

      {/* Pricing section */}
      <Pricing />

      {/* Proxies section */}
      <Proxies />

      <Footer />
    </div>
  );
}
