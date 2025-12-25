import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SocialNetworkArmy - Social Media Automation",
  description:
    "Automate your social media presence across Instagram, TikTok, Facebook, X, and Reddit with advanced fingerprinting and anti-detection.",
  keywords: [
    "social media automation",
    "instagram bot",
    "tiktok automation",
    "facebook automation",
    "twitter automation",
    "reddit automation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark overflow-x-hidden">
      <body className={`${inter.variable} antialiased min-h-screen overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
