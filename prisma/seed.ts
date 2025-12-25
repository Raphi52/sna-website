import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clear existing releases
  await prisma.downloadLog.deleteMany();
  await prisma.softwareRelease.deleteMany();

  // Seed releases
  const releases = [
    {
      version: "1.2.0-beta",
      releaseNotes: `Experimental AI-powered engagement
New proxy rotation system
Performance optimizations
Beta testing for upcoming features`,
      fileName: "SocialNetworkArmy-v1.2.0-beta.zip",
      fileSize: 48 * 1024 * 1024, // 48 MB
      checksum: "sha256:beta120placeholder",
      isLatest: false,
      isBeta: true,
      minLicense: "PRO" as const,
      releasedAt: new Date("2024-12-22"),
    },
    {
      version: "1.1.1",
      releaseNotes: `Fixed scheduler path increment
Improved profile picture handling
Bug fixes and performance improvements
Enhanced anti-detection measures`,
      fileName: "SocialNetworkArmy-v1.1.1.zip",
      fileSize: 45 * 1024 * 1024, // 45 MB
      checksum: "sha256:v111placeholder",
      isLatest: true,
      isBeta: false,
      minLicense: "FREE" as const,
      releasedAt: new Date("2024-12-20"),
    },
    {
      version: "1.1.0",
      releaseNotes: `Added Reddit automation
New scheduler features
UI improvements
Multi-account support enhancements`,
      fileName: "SocialNetworkArmy-v1.1.0.zip",
      fileSize: 44 * 1024 * 1024, // 44 MB
      checksum: "sha256:v110placeholder",
      isLatest: false,
      isBeta: false,
      minLicense: "FREE" as const,
      releasedAt: new Date("2024-12-15"),
    },
    {
      version: "1.0.0",
      releaseNotes: `Initial stable release
Instagram automation
TikTok automation
Facebook automation
X (Twitter) automation
Basic scheduling features`,
      fileName: "SocialNetworkArmy-v1.0.0.zip",
      fileSize: 42 * 1024 * 1024, // 42 MB
      checksum: "sha256:v100placeholder",
      isLatest: false,
      isBeta: false,
      minLicense: "FREE" as const,
      releasedAt: new Date("2024-12-01"),
    },
  ];

  for (const release of releases) {
    await prisma.softwareRelease.create({
      data: release,
    });
    console.log(`Created release v${release.version}`);
  }

  // Seed pricing plans
  await prisma.pricingPlan.deleteMany();

  const pricingPlans = [
    {
      name: "Pro Monthly",
      productType: "PRO_MONTHLY" as const,
      price: 29.99,
      currency: "USD",
      features: [
        "All platform automation",
        "Unlimited accounts",
        "Priority support",
        "Beta access",
        "Advanced scheduling",
      ],
      sortOrder: 1,
    },
    {
      name: "Pro Annual",
      productType: "PRO_ANNUAL" as const,
      price: 199.99,
      currency: "USD",
      features: [
        "All Pro Monthly features",
        "2 months free",
        "Priority updates",
        "Dedicated support",
      ],
      sortOrder: 2,
    },
    {
      name: "Pro Lifetime",
      productType: "PRO_LIFETIME" as const,
      price: 499.99,
      currency: "USD",
      features: [
        "All Pro features forever",
        "No recurring payments",
        "Lifetime updates",
        "VIP support",
        "Early access to new features",
      ],
      sortOrder: 3,
    },
  ];

  for (const plan of pricingPlans) {
    await prisma.pricingPlan.create({
      data: plan,
    });
    console.log(`Created pricing plan: ${plan.name}`);
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
