import { createHash, randomBytes } from "crypto";

const SECRET_SALT = process.env.LICENSE_SECRET_SALT || "SNA_2025_SECRET_SALT";

/**
 * Generate a license key compatible with the desktop app
 * Format: SNAPRO-XXXX-YYYY-ZZZZ
 */
export function generateLicenseKey(prefix: string = "SNAPRO"): string {
  // Generate 8 random characters
  const random = randomBytes(4).toString("hex").toUpperCase();

  // Generate validation hash (4 chars)
  const hash = generateKeyHash(random).substring(0, 4);

  // Format: SNAPRO-XXXX-YYYY-ZZZZ
  return `${prefix}-${random.substring(0, 4)}-${random.substring(4, 8)}-${hash}`;
}

/**
 * Validate a license key format
 */
export function validateLicenseKeyFormat(key: string): boolean {
  if (!key) return false;

  const cleanKey = key.replace(/\s/g, "").replace(/-/g, "").toUpperCase();

  if (!cleanKey.startsWith("SNAPRO")) return false;
  if (cleanKey.length < 18) return false;

  const randomPart = cleanKey.substring(6, 14);
  const providedHash = cleanKey.substring(14, 18);
  const expectedHash = generateKeyHash(randomPart).substring(0, 4);

  return expectedHash === providedHash;
}

/**
 * Generate hash for key validation
 * Must match the desktop app's algorithm
 */
function generateKeyHash(input: string): string {
  const hash = createHash("sha256");
  hash.update(input + SECRET_SALT);
  return hash.digest("hex").toUpperCase();
}

/**
 * Calculate expiration date based on license type
 */
export function calculateExpirationDate(
  productType: "PRO_MONTHLY" | "PRO_ANNUAL" | "PRO_LIFETIME",
  startDate: Date = new Date()
): Date | null {
  switch (productType) {
    case "PRO_MONTHLY":
      return new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000);
    case "PRO_ANNUAL":
      return new Date(startDate.getTime() + 365 * 24 * 60 * 60 * 1000);
    case "PRO_LIFETIME":
      return null; // No expiration
  }
}

/**
 * Get license type from product type
 */
export function getLicenseType(
  productType: "PRO_MONTHLY" | "PRO_ANNUAL" | "PRO_LIFETIME"
): "PRO" | "LIFETIME" {
  return productType === "PRO_LIFETIME" ? "LIFETIME" : "PRO";
}
