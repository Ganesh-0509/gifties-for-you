/**
 * Gifties For You — central site config.
 *
 * SITE holds fixed, deploy-time facts. Settings holds everything the owner
 * can edit later from /admin (persisted as JSON in the `settings` D1 table).
 * publicSite() merges the two — every public page/component reads from
 * publicSite(), never from SITE or a hardcoded string directly.
 *
 * DEMO DATA NOTICE: most contact/business fields below are still placeholder
 * (see DEMO-DATA-README.md in phase1-demo/ for the full real-vs-demo map
 * this was ported from). pricesAreProvisional stays true until the client
 * confirms real prices — see lib/seo.ts for what that flag gates.
 */

export const SITE = {
  name: "Gifties For You",
  legalName: "",
  tagline: "Return gifts and celebration gifting, made easy to browse and easy to order.",
  shortDescription:
    "Curated return gifts, festive favors and bulk gifting collections for weddings, birthdays and celebrations.",

  // CONFIRMED
  instagramUrl: "https://www.instagram.com/gifties_for_you/",

  // FOUND on the client's own product hang-tag, not yet explicitly confirmed.
  whatsapp: "919042032327",
  phoneDisplay: "+91 90420 32327",

  // DEMO — placeholder, not yet confirmed.
  email: "hello@giftiesforyou.example",
  addressLine: "Serving customers across Chennai — exact address to be added",
  hours: "Mon–Sat, 10:00 AM – 7:00 PM",

  pricesAreProvisional: true,

  // Razorpay: only the public key_id lives here. key_secret and the webhook
  // secret are Worker secrets (wrangler secret put), never committed.
  razorpayKeyId: "",

  domain: "",
} as const;

export type Settings = {
  tagline: string;
  shortDescription: string;
  email: string;
  addressLine: string;
  hours: string;
  whatsapp: string;
  phoneDisplay: string;

  // DEMO placeholder flat delivery fee — confirm real delivery area/fee with
  // the client before go-live. 0 = pickup only until then is also valid.
  deliveryFeeChennai: number;
  pickupAvailable: boolean;

  gstPct: number;
  pricesAreProvisional: boolean;

  logo: string; // resolved data-URL image src, "" = no logo uploaded yet
  announcement: string;
  aboutStory: string;

  metaTitle: string;
  metaDescription: string;

  instagramUrl: string;
};

export const DEFAULT_SETTINGS: Settings = {
  tagline: SITE.tagline,
  shortDescription: SITE.shortDescription,
  email: SITE.email,
  addressLine: SITE.addressLine,
  hours: SITE.hours,
  whatsapp: SITE.whatsapp,
  phoneDisplay: SITE.phoneDisplay,
  deliveryFeeChennai: 0,
  pickupAvailable: true,
  gstPct: 0,
  pricesAreProvisional: SITE.pricesAreProvisional,
  logo: "",
  announcement: "",
  aboutStory: "",
  metaTitle: "Gifties For You | Return Gifts & Celebration Gifting",
  metaDescription: SITE.shortDescription,
  instagramUrl: SITE.instagramUrl,
};

export type PublicSite = ReturnType<typeof publicSite>;

export function publicSite(s: Settings) {
  return {
    name: SITE.name,
    legalName: SITE.legalName,
    domain: SITE.domain,
    ...s,
  };
}

// ---------- pure helpers ----------

export function money(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export function waLink(message: string): string {
  return waLinkTo(SITE.whatsapp, message);
}

export function waLinkTo(whatsapp: string, message: string): string {
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
}

export function telLink(): string {
  return telLinkTo(SITE.whatsapp);
}

export function telLinkTo(phone: string): string {
  return `tel:+${phone}`;
}

export function fillTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (m, key) => (key in vars ? vars[key] : m));
}

const SAFE_IMAGE_DATA_URL = /^data:image\/(png|jpe?g|webp|gif);base64,[A-Za-z0-9+/=]+$/;

export function isSafeImageDataUrl(v: unknown): v is string {
  return typeof v === "string" && v.length > 0 && v.length < 3_000_000 && SAFE_IMAGE_DATA_URL.test(v);
}
