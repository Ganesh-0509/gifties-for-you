# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: someone shopping for return gifts or celebration favors for a specific
event (wedding, birthday, housewarming, festival/pooja, corporate) — wants to
browse by occasion or price, then enquire directly on WhatsApp with no account
or cart friction.

Secondary: a bulk/event planner needing quantity- and timeline-specific
quotes for a function, via the dedicated bulk-order enquiry flow.

## Product Purpose

Gifties For You sells return gifts, festive favors, and celebration hampers.
The site gives the shop an independent, browsable, trustworthy storefront
outside Instagram DMs — organized by occasion, category, and price — that
funnels every visitor to a real WhatsApp conversation with the owner.
Success is a visitor finding a relevant product quickly and sending a
WhatsApp enquiry with full context (product, quantity, customization request)
already attached.

## Positioning

A small, personal, WhatsApp-first gifting studio — explicitly not a checkout
queue. Every market reference the client pointed to (Thambulaaa Return
Gifts, Tanu Return Gifts, Pai by Lee Gifts, Wedtree) is a full e-commerce
operation with a cart, accounts, and checkout. This site's structural
absence of a cart is the actual differentiator, expressed as "talk to a real
person about your gift, not a checkout flow," and reinforced visually by a
recurring gift-tag punch-hole motif tied to the same idea.

## Operating Context

Mobile-first, India-based audience arriving primarily via Instagram/WhatsApp
referral — no desktop-first assumptions anywhere in the build. WhatsApp is
the near-universal contact channel in this actual market (confirmed across
all 4 reference sites studied in discovery). The shop owner manages
fulfillment and payment manually over WhatsApp after an enquiry lands —
there is no order-tracking or payment system in this build, by design.

## Capabilities and Constraints

- No cart, no checkout, no payment integration, no user accounts — WhatsApp
  enquiry is the only conversion path, by explicit decision (not a
  limitation to work around).
- No backend or database — the product catalogue is static data
  (`src/data/products.ts`), business config is static
  (`src/config/business.ts`).
- Real business data is partial as of 2026-08-15: 10 real photos of the
  client's own inventory, 3 licensed-stock placeholder photos, 4 products
  still fully placeholder (icon tile, no photo). Real logo in use. A
  WhatsApp number was found printed on the client's own product hang-tag in
  two supplied photos (high confidence, not yet an explicit "yes" from the
  client). Pricing, minimum order quantities, email, exact address, and
  testimonials are all still demo/placeholder values pending client
  confirmation — never presented as fact.
- Bulk/event order enquiry is a first-class flow (its own page and form),
  not an edge case — matches how this business actually takes large orders.

## Brand Commitments

- Name: Gifties For You. Real logo (pink script wordmark + blue bow ribbon
  mark) supplied by the client 2026-08-14, in production use
  (`public/logo.png`, `public/favicon.png`).
- Instagram: `@gifties_for_you` (confirmed handle; the profile's actual
  content — bio, follower count, posts — could not be accessed and is never
  fabricated anywhere in this project).
- No formal visual or tone brief exists from the end client directly. The
  current warm/personal/trustworthy direction and the gift-tag motif were
  proposed during Stage 1 discovery and carried through the build with the
  intermediary's (Ganesh's) approval, but have not been independently
  validated by the end client — treat as a working direction, not a locked
  brand system, until the client weighs in.

## Evidence on Hand

- 10 real photos of the client's actual inventory in `public/products/`,
  several visibly carrying the client's own "Gifties" paper hang-tag in
  frame, confirming authenticity.
- 3 generic Pexels-licensed stock photos used as placeholder upgrades where
  no real photo exists yet — never the client's own inventory, clearly
  commented in `src/data/products.ts` with source links.
- No real testimonials exist; none are fabricated
  (`src/data/testimonials.ts` is an empty array by design).
- No confirmed pricing exists — every price and MOQ in the catalogue is a
  placeholder number, explicitly flagged in code comments and docs.
- WhatsApp number `9042032327` — found printed on the client's own tag,
  not yet independently confirmed as current/correct.
- The full, itemized real-vs-demo record for every field lives in
  `DEMO-DATA-README.md` and `QA-AUDIT.md` at the project root — read those
  before treating anything in the UI as a confirmed fact.

## Product Principles

1. Never present demo or placeholder content as confirmed fact. Label
   everything (CONFIRMED / FOUND-not-yet-confirmed / DEMO) and never
   fabricate reviews, pricing, or business history to make the site look
   more finished than it is.
2. WhatsApp is the product's entire conversion mechanism. Every screen
   should make it easy to reach, with full relevant context (product,
   quantity, customization) attached automatically, not left for the
   customer to retype.
3. Design for the actual reference market — occasion- and price-based
   browsing, bulk-friendly framing — without copying any reference site's
   branding, layout, or photography.
4. Never use imagery the business doesn't hold rights to, even when readily
   available — not a competitor's product photos, not another business's
   watermarked photo, regardless of how visually similar the products are.
5. Mobile-first by necessity, not convention. This audience is
   overwhelmingly mobile, arriving via Instagram and WhatsApp.

## Accessibility & Inclusion

WCAG AA verified via both automated (axe-core, all WCAG2A/AA/21A/21AA
rules) and manual (real keyboard tab-through, not just ARIA inspection)
testing across every route — 0 violations as of the 2026-08-15 audit. No
product-specific accessibility requirement beyond general AA compliance has
been established with the client.
