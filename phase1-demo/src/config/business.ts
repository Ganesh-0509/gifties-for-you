/**
 * Gifties For You — central business configuration.
 *
 * ============================================================================
 * DEMO DATA NOTICE
 * ----------------------------------------------------------------------------
 * Every value in this file is V1 placeholder/demo content, not a confirmed
 * business fact. Nothing here should be treated as real by anyone reading
 * the live site. Fields are intentionally written in an obviously-placeholder
 * style (e.g. the WhatsApp number is all round digits) so they read as
 * "to be replaced," not as a real business detail.
 *
 * Replace every `// DEMO —` value below with the real one once Ganesh /
 * the client supplies it (see clients/gifties-for-you/frontend-design/
 * 13-assets-and-content.md for the exact list of what's still needed).
 * Nothing else in the app needs to change — every screen reads from here.
 * ============================================================================
 */

export const business = {
  name: "Gifties For You",

  // DEMO — replace with the client's real tagline/positioning once confirmed.
  tagline: "Return gifts and celebration gifting, made easy to browse and easy to ask about.",

  // DEMO — short descriptive line used in hero/meta contexts.
  shortDescription:
    "Curated return gifts, festive favors and bulk gifting collections for weddings, birthdays and celebrations.",

  // CONFIRMED — the only real, verifiable detail we have as of V1.
  instagramUrl: "https://www.instagram.com/gifties_for_you/",

  // FOUND, NOT YET EXPLICITLY CONFIRMED — this number is printed on Gifties
  // For You's own product hang-tags, visible in two real photos the client
  // supplied 2026-08-15 (not something guessed or sourced elsewhere). High
  // confidence, but flag to the client before treating it as fully final —
  // real customer messages will go here once live.
  // Format: country code + number, no spaces, no plus — required by the wa.me link format.
  whatsappNumber: "919042032327",

  // Same number, formatted for display on the Contact page.
  phoneDisplay: "+91 90420 32327",

  // DEMO — placeholder email, obviously not a real inbox.
  email: "hello@giftiesforyou.example",

  // DEMO — deliberately vague until a real service area is confirmed.
  // Do NOT replace this with a fabricated street address.
  location: "Serving customers across Chennai — exact address to be added",

  // DEMO — placeholder hours, to be confirmed.
  hours: "Mon–Sat, 10:00 AM – 7:00 PM",

  // Business age is NOT confirmed (discovery notes ~2 years, unverified).
  // Deliberately not surfaced as a number anywhere in the UI — use neutral,
  // undated trust language instead (see AboutPage).
  foundedYear: null as number | null,

  // DEMO — no real testimonials exist yet; keep this false until the client
  // supplies real ones. Never fabricate reviews.
  hasRealTestimonials: false,
} as const;
