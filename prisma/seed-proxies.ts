import { PrismaClient } from "@prisma/client";

// Use Neon production database if DATABASE_URL_PROD is set, otherwise use default
const databaseUrl = process.env.DATABASE_URL_PROD || process.env.DATABASE_URL;
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

console.log("Using database:", databaseUrl?.substring(0, 40) + "...");

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

  // Create proxy order for the first user
  const user = await prisma.user.findFirst({
    orderBy: { createdAt: "desc" },
  });

  if (!user) {
    console.log("No user found. Skip creating proxy order.");
    return;
  }

  console.log(`Found user: ${user.email}`);

  // Check if user already has an active order
  const existingOrder = await prisma.proxyOrder.findFirst({
    where: {
      userId: user.id,
      status: "ACTIVE",
    },
  });

  if (existingOrder) {
    console.log("User already has an active proxy order. Skipping.");
    return;
  }

  const growthPackage = await prisma.proxyPackage.findUnique({
    where: { slug: "growth" },
  });

  if (!growthPackage) {
    console.log("Growth package not found. Skip creating proxy order.");
    return;
  }

  // Create a proxy order for the user
  const order = await prisma.proxyOrder.create({
    data: {
      userId: user.id,
      packageId: growthPackage.id,
      status: "ACTIVE",
      startDate: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      amount: 79,
      currency: "USD",
      provider: "MANUAL",
      rotatingDataUsedGB: 2.5,
    },
  });

  console.log(`Created proxy order: ${order.id}`);

  // Create static residential proxies
  const locations = [
    { country: "United States", city: "New York" },
    { country: "United States", city: "Los Angeles" },
    { country: "United States", city: "Chicago" },
    { country: "United Kingdom", city: "London" },
    { country: "Germany", city: "Frankfurt" },
    { country: "France", city: "Paris" },
    { country: "Netherlands", city: "Amsterdam" },
    { country: "Canada", city: "Toronto" },
    { country: "Australia", city: "Sydney" },
    { country: "Japan", city: "Tokyo" },
  ];

  for (let i = 0; i < 10; i++) {
    const loc = locations[i % locations.length];
    await prisma.userProxy.create({
      data: {
        userId: user.id,
        orderId: order.id,
        type: "STATIC_RESIDENTIAL",
        host: `static-${i + 1}.proxy.socialnetworkarmy.com`,
        port: 10000 + i,
        username: `sna_${user.id.substring(0, 8)}_static${i + 1}`,
        password: `pass_${Math.random().toString(36).substring(2, 14)}`,
        country: loc.country,
        city: loc.city,
        isActive: true,
        expiresAt: order.expiresAt,
      },
    });
  }

  console.log("Created 10 static residential proxies");

  // Create rotating mobile proxy endpoint
  await prisma.userProxy.create({
    data: {
      userId: user.id,
      orderId: order.id,
      type: "ROTATING_MOBILE",
      host: "rotating.proxy.socialnetworkarmy.com",
      port: 20000,
      username: `sna_${user.id.substring(0, 8)}_rotating`,
      password: `rot_${Math.random().toString(36).substring(2, 14)}`,
      rotatingEndpoint: "mobile.proxy.socialnetworkarmy.com",
      country: "United States",
      city: "Multiple",
      isActive: true,
      expiresAt: order.expiresAt,
    },
  });

  console.log("Created rotating mobile proxy endpoint");
  console.log("\n✅ User now has Pro proxy access!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
