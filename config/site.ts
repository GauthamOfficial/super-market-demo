/**
 * White-label site config — edit this file to rebrand for another supermarket.
 *
 * To customize for a new store (about 5 minutes):
 * 1. Set name, tagline, and optionally logoUrl, faviconUrl.
 * 2. Set contact (email, phone, address) for footer and SEO.
 * 3. Set currency (e.g. "LKR", "USD", "EUR").
 * 4. Set branchesMode: "single" (one branch, no picker) or "multi" (user picks branch).
 * 5. Optionally set colors.primary / accent (HSL: "H S% L%" e.g. "262 83% 58%").
 * 6. If logo or favicon is from a new domain, add it in next.config.js → images.remotePatterns.
 */

export const siteConfig = {
  /** Store name shown in header, footer, meta titles, and across the site */
  name: "Muli Super",

  /** Short tagline or description for meta and footer */
  tagline: "Your supermarket — visit once feel the difference",

  /** Logo image URL. If set, header shows logo instead of text name. Currently using grey placeholder. */
  logoUrl: null as string | null,

  /** Favicon URL (optional). Otherwise browser uses default. */
  faviconUrl: null as string | null,

  /** Contact shown in footer, contact page, and used as fallback for WhatsApp on order success */
  contact: {
    email: "hello.diffindo@gmail.com",
    phone: "+94 70 446 2999",
    address: "Kandy Road, Kurnegala, Sri Lanka",
  },

  /** Social media URLs (footer icons). Set when you have the links. */
  socials: {
    whatsapp: null as string | null,
    facebook: null as string | null,
    instagram: null as string | null,
    tiktok: null as string | null,
  },

  /** Footer: establishment year (e.g. "2021"), shown under logo */
  establishedYear: null as string | null,

  /** Footer: short company description under logo (optional; falls back to tagline) */
  footerDescription: "Muli Super is a supermarket network committed to excellence and customer satisfaction, offering convenience and quality products.",

  /** Footer: QR code image URL (e.g. WhatsApp QR). Optional. */
  footerQrCodeUrl: null as string | null,

  /** Currency code for prices (ISO 4217, e.g. LKR, USD, EUR) */
  currency: "LKR",

  /**
   * Branches mode:
   * - "multi": user picks a branch (select-branch), can change branch on home.
   * - "single": only one branch; branch picker is skipped and "Change branch" is hidden.
   */
  branchesMode: "multi" as "single" | "multi",

  /**
   * Branch names and order for the landing page (hero carousel + Find a store).
   * Must match image filenames in public: theliyagonna.jpg, mallawapitiya.jpg, etc.
   */
  branchNames: ["Theliyagonna", "Mallawapitiya", "Kurunegala", "Paragahadeniya"] as const,

  /**
   * Theme colors (HSL for CSS variables).
   * Muli Super: Primary White, Brand #fa1212 (red) & #e4e30d (yellow), Black.
   * Format: "H S% L%" e.g. "222 47% 11%".
   */
  colors: {
    primary: "0 96% 53%" as string | null,         // #fa1212 brand red
    primaryForeground: "0 0% 100%" as string | null,
    accent: "60 91% 47%" as string | null,          // #e4e30d brand yellow
    accentForeground: "0 0% 9%" as string | null,
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Build page title: "Checkout | Super Market" */
export function pageTitle(page: string): string {
  return `${page} | ${siteConfig.name}`;
}
