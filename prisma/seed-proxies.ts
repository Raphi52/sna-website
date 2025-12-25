import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const proxyPackages = [
  {
    name: "Starter",
    slug: "starter",
    description: "Perfect for beginners getting started with automation",
    staticResidentialCount: 5,
    rotatingMobileGB: 2,
    unlimitedRotating: false,
    price: 29,
    currency: "USD",
    billingPeriod: "monthly",
    isPopular: false,
    features: [
      "5 Static Residential Proxies",
      "2 GB Rotating Mobile Data",
      "US & EU locations",
      "24/7 Support",
      "Dashboard access",
    ],
    sortOrder: 1,
  },
  {
    name: "Growth",
    slug: "growth",
    description: "Most popular choice for growing accounts",
    staticResidentialCount: 20,
    rotatingMobileGB: 10,
    unlimitedRotating: false,
    price: 79,
    currency: "USD",
    billingPeriod: "monthly",
    isPopular: true,
    features: [
      "20 Static Residential Proxies",
      "10 GB Rotating Mobile Data",
      "All locations available",
      "Priority support",
      "API access",
      "Usage analytics",
    ],
    sortOrder: 2,
  },
  {
    name: "Scale",
    slug: "scale",
    description: "For power users managing multiple accounts",
    staticResidentialCount: 50,
    rotatingMobileGB: 30,
    unlimitedRotating: false,
    price: 149,
    currency: "USD",
    billingPeriod: "monthly",
    isPopular: false,
    features: [
      "50 Static Residential Proxies",
      "30 GB Rotating Mobile Data",
      "Premium locations",
      "Dedicated account manager",
      "Custom rotation settings",
      "Advanced analytics",
    ],
    sortOrder: 3,
  },
  {
    name: "Enterprise",
    slug: "enterprise",
    description: "Unlimited power for serious operations",
    staticResidentialCount: 100,
    rotatingMobileGB: 0, // Will use unlimitedRotating flag
    unlimitedRotating: true,
    price: 299,
    currency: "USD",
    billingPeriod: "monthly",
    isPopular: false,
    features: [
      "100 Static Residential Proxies",
      "Unlimited Rotating Mobile Data",
      "All premium features",
      "SLA guarantee",
      "Custom integrations",
      "White-glove onboarding",
    ],
    sortOrder: 4,
  },
];

async function main() {
  console.log("Seeding proxy packages...");

  for (const pkg of proxyPackages) {
    await prisma.proxyPackage.upsert({
      where: { slug: pkg.slug },
      update: pkg,
      create: pkg,
    });
    console.log(`Created/updated package: ${pkg.name}`);
  }

  console.log("Proxy packages seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
