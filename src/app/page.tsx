import { Navbar } from "@/components/layout";
import { Hero, Platforms, Features, Proxies, Pricing, FAQ, Footer } from "@/components/landing";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Platforms />
      <Features />
      <Proxies />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
