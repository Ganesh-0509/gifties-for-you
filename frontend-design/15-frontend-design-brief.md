# FRONTEND DESIGN BRIEF — Gifties For You

> Single source of truth for Stage 2 (Design + Implementation). Consolidates `01`–`14`. Status labels used throughout: **CONFIRMED**, **INFERRED**, **UNKNOWN — NEEDS CONFIRMATION**.

---

# 01. PROJECT OVERVIEW

## Product / Business Name
**Gifties For You** — CONFIRMED

## One-Line Definition
A gift shop currently selling through Instagram (`@gifties_for_you`), commissioning a simple, no-cart, WhatsApp-first catalogue website. — INFERRED (product category/mix beyond "gift shop" is UNKNOWN)

## Product Type
Business/catalogue website (not e-commerce/marketplace) — CONFIRMED by explicit scope decision.

## Current Digital Presence
Instagram only. Content of that Instagram (bio, products, follower count) is **UNKNOWN — NEEDS CONFIRMATION**; an automated fetch attempt failed and a fabricated-looking result was discarded (see `13-assets-and-content.md` for the full account of what happened and why it can't be trusted).

## Problem Being Solved
No independent, browsable, trustworthy storefront outside Instagram DMs — INFERRED.

## Proposed Digital Solution
Simple catalogue site with occasion/price-based browsing and a WhatsApp-first enquiry flow — CONFIRMED scope, structure TBD pending real product data.

## Primary Value Proposition
Not finalized — depends on confirming what makes Gifties For You different from the 4 reference businesses. Candidate differentiator proposed in `14-design-differentiator.md`, not yet validated with client.

---

# 02. BUSINESS / PRODUCT CONTEXT

## Business Model
Retail gift sales, likely with a return-gift/bulk-order component (INFERRED from the reference businesses the client chose) — not confirmed.

## Current Customer Acquisition
Instagram — CONFIRMED (only channel we know of).

## Current Customer Journey
Presumed: discover on Instagram → DM to ask price/availability → arrange purchase informally. INFERRED, not confirmed.

## Current Digital Problems (inferred)
- No structured browsing (occasion/price/type)
- No visible pricing without DMing
- No independent trust-building beyond the Instagram profile itself

## Website Opportunity
Give customers a self-serve way to browse, understand pricing, and start a WhatsApp conversation with full context already established (which product, what for) — reduces back-and-forth for both sides.

---

# 03. TARGET USERS

## Primary User — Occasion Shopper
Shopping for a specific event (wedding, birthday, housewarming, festival, corporate) needing return gifts or curated gift items. Wants fast price/photo/customization clarity and a low-friction way to ask a question. **Primary action: WhatsApp enquiry.** — INFERRED from market category, not confirmed for this business.

## Secondary User — Bulk/Repeat Planner
Needs bulk pricing/quantity clarity, likely returns for future events. — INFERRED from market-wide bulk/return-gift emphasis.

---

# 04. USER JOBS

## Primary Jobs
1. Understand what Gifties For You sells and for what occasions
2. Browse products by occasion and/or price
3. Get enough product detail (photo, price, customization) to decide
4. Enquire via WhatsApp with context already attached

## Secondary Jobs
1. Learn about the shop (About) to build trust
2. Get bulk/quantity pricing clarity

## Highest-Value Action
**"Enquire on WhatsApp"** — this is the entire conversion model of the site (no cart/checkout exists). It should receive the strongest visual and interaction priority anywhere it can reasonably appear.

---

# 05. USER JOURNEYS

Full flows in `03-user-flows.md`. Summary:

```
ENTRY (Instagram bio link / shared link / search)
↓ sees what's sold + for what occasions
↓ browses catalogue by occasion/price
↓ opens a product → sees photo, price, customization notes
↓ taps "Enquire on WhatsApp" (pre-filled with product context)
↓ conversation continues on WhatsApp, off-site
```

---

# 06. INFORMATION ARCHITECTURE

**Shallow top navigation, mobile-first** — no account/cart icons (explicitly out of scope). Primary nav (draft, pending real categories): Home · Shop/Catalogue · About · Contact. Occasion/price filtering lives inside the Catalogue page rather than the header, keeping navigation shallow. Full reasoning in `04-information-architecture.md`.

---

# 07. SCREEN INVENTORY

| Priority | Screen | Purpose | Primary Action |
|---|---|---|---|
| P0 | Home | First impression, trust, orientation | Go to catalogue / WhatsApp |
| P0 | Catalogue/Shop | Browse by occasion/price | Open product |
| P0 | Product Detail | Photos, price, customization info | Enquire on WhatsApp |
| P0 | Contact | Fallback enquiry, location/hours | WhatsApp / call |
| P1 | About | Trust-building, shop story | Continue to catalogue |
| P2 | Testimonials | Social proof (only if real ones exist) | — |

Full specs in `05-screen-inventory.md`.

---

# 08. CONTENT MODEL

Product entries need: name, price (or "price on enquiry"), photo(s), occasion/category tag, description, customization notes. **All real values UNKNOWN — NEEDS CONFIRMATION.** No user-generated content, no system-generated content, no AI-generated content in this scope. Full detail in `06-content-model.md`.

---

# 09. PRODUCT PERSONALITY

Proposed (not yet validated with client):
- **Warm** — gifting is emotional, not utilitarian
- **Personal/approachable** — small shop, human-scale, WhatsApp-first
- **Trustworthy** — needs to compensate for no cart/reviews infrastructure with clarity and honesty
- **Occasion-aware** — tied to real celebrations, not abstract retail

---

# 10. VISUAL DIRECTION

Market references (Tanu, Pai by Lee, Thambulaaa, Wedtree) all read as fairly generic e-commerce catalogue sites — cart-driven, badge-heavy, mega-menu navigation. Gifties For You's confirmed no-cart, WhatsApp-first scope is a genuine structural difference and should be allowed to look and feel different: warmer, calmer, more personal, less "national retailer." This should NOT default to purple/blue SaaS gradients, glassmorphism, discount-badge-heavy e-commerce styling, or generic AI-default patterns. Full detail in `07-visual-direction.md`.

## Visual References / Inspiration
- **Tanu Return Gifts** — study: category-first browsing. Do not copy: generic Shopify template feel.
- **Pai by Lee Gifts** — study: price-bracket browsing pattern (Under ₹50 / ₹51–100 / etc.). Do not copy: branding, layout.
- **Thambulaaa Return Gifts** — study: hierarchical category structure, "Ready to Ship" concept, multi-channel contact (WhatsApp/phone/email/form). Do not copy: branding, hero carousel style, colors.
- **Wedtree** — study: combined occasion + price + type browsing, trust-signal patterns (reviews, "since 2011," secure-payment badges), bulk/corporate gifting as a distinct track. Do not copy: national-retailer scale/polish, mega-menu, branding.

---

# 11. VISUAL LANGUAGE

Not finalized in Stage 1 (per pipeline rules — no hex, no font selection). Direction: content-light, calm, photo-forward rather than dense e-commerce grid, given the small simple-site scope. Full detail in `07-visual-direction.md` and `08-typography-and-color-strategy.md`.

---

# 12. COLOR STRATEGY

Warm neutral base; primary accent should read as gift-appropriate/celebratory rather than generic SaaS blue/purple; minimal semantic-color need (no checkout states). Avoid dominant sale-badge red unless the client actually wants a promotions-driven storefront (UNKNOWN). Full detail in `08-typography-and-color-strategy.md`.

---

# 13. TYPOGRAPHY STRATEGY

Warm, personal character in headings; highly legible, mobile-first body text (bright outdoor lighting is a real constraint for this audience); prices need strong scannability given price-based browsing is a confirmed market pattern. No monospace need. Full detail in `08-typography-and-color-strategy.md`.

---

# 14. LAYOUT STRATEGY

Fluid, mobile-first, editorial/photo-forward rather than dense retail grid. Product grid steps from multi-column (desktop) to 1–2 columns (mobile). No sidebars, no dashboards, no tables.

---

# 15. COMPONENT REQUIREMENTS

Core: header nav, product grid/cards, occasion/price filter chips, product detail view with photo gallery, WhatsApp deep-link CTA (the most important component in the product), occasion/category entry tiles, optional fallback enquiry form, optional testimonial cards (real only). Full list with rationale in `09-component-requirements.md`.

---

# 16. INTERACTION DESIGN

Primary: tap product → detail; tap "Enquire on WhatsApp" → pre-filled `wa.me` deep link; filter/select occasion or price. All interactive elements need visible keyboard focus states. Reduced-motion respected for any animation. Full detail in `10-interaction-and-states.md`.

---

# 17. SYSTEM STATES

Mostly static content. Key states needed: catalogue empty-filter-result (with WhatsApp fallback, not a dead end), and fallback-form loading/success/error states if that form is built. Full detail in `10-interaction-and-states.md`.

---

# 18. RESPONSIVE STRATEGY

Mobile-first by necessity (Instagram/WhatsApp audience is overwhelmingly mobile). WhatsApp CTA should be persistently reachable on mobile (sticky/floating). Filters collapse to chips or a bottom-sheet, not a sidebar. Full detail in `11-responsive-accessibility.md`.

---

# 19. ACCESSIBILITY

Keyboard navigation and visible focus states across all interactive elements; sufficient contrast for text over photo backgrounds (real risk area once photography is added); meaningful alt text on product photos; accessible label on the WhatsApp CTA (not icon-only). Full detail in `11-responsive-accessibility.md`.

---

# 20. ASSET REQUIREMENTS

## Existing Assets
Business name, Instagram handle, 4 market reference sites (analyzed).

## Assets Required From Owner
Instagram screenshots (bio, highlights, grid), real product photos, real pricing, contact/WhatsApp number, location/service area, logo (if any), occasion/customization/bulk-policy details, real testimonials (if any). Full checklist in `13-assets-and-content.md`.

## Assets To Create
Logo/wordmark if none exists; occasion/category iconography (Stage 2 decision).

---

# 21. CONTENT REQUIREMENTS

## Confirmed Content
Business name "Gifties For You," Instagram handle, the CONFIRMED scope decision (simple site, no cart/admin).

## Missing Content
Everything product/pricing/contact/story-related — see `13-assets-and-content.md` for the full list.

## Content That Must NOT Be Invented
Prices, product photos, testimonials/reviews, years-in-business/founding story, delivery claims, any Instagram-sourced detail (the discarded fabricated fetch result must never resurface).

---

# 22. BUSINESS INFORMATION STATUS

| Information | Status | Importance |
|---|---|---|
| Business name | CONFIRMED | — |
| Instagram handle | CONFIRMED | — |
| Simple site, no cart/admin scope | CONFIRMED | — |
| Instagram bio/followers/highlights/posts | UNKNOWN | Required |
| Real product catalogue (names, photos, prices) | UNKNOWN | Required |
| Occasions served (return gifts / general / corporate) | UNKNOWN | Required |
| Customization/personalization capability | UNKNOWN | Required |
| Bulk order / minimum quantity policy | UNKNOWN | Required |
| Contact number (WhatsApp/phone) | UNKNOWN | Required |
| Location / service area / delivery | UNKNOWN | Required |
| Logo / brand color | UNKNOWN | Optional (can be designed if absent) |
| Real testimonials | UNKNOWN | Optional |
| Founding story / years in business | UNKNOWN | Optional |

---

# 23. TECHNICAL REQUIREMENTS

Not yet decided for this project. Fresh Frame precedent for similar-scope clients (Cafe By Cassette, Hana, Al-Taj) is static HTML/CSS/JS with no backend, hosted via Netlify Drop or GitHub Pages. This fits the confirmed no-cart/no-admin scope better than a Next.js + database build, but has not been explicitly confirmed with Ganesh for this project. Full detail in `12-frontend-technical-requirements.md`.

---

# 24. IMPLEMENTATION CONSTRAINTS

## Must Use
Real, client-supplied product/business content only — no fabricated data of any kind.

## Must Avoid
Copying any branding/colors/typography/layout/text/images from the 4 reference sites; defaulting to generic e-commerce/SaaS visual patterns; building cart/checkout/account features (explicitly out of scope).

---

# 25. DESIGN DIFFERENTIATOR

**Candidate (not yet validated with client): structural simplicity as trust.** A small, honest, WhatsApp-first catalogue that leans into "talk to a real person about your gift" rather than a checkout flow — a genuine structural difference from every reference site, not an invented brand gimmick. Must be validated with the client before Stage 2 commits to it. Full detail in `14-design-differentiator.md`.

---

# 26. ASSUMPTIONS

- Gifties For You sells some mix of return gifts and/or general curated gifts — not confirmed which.
- Primary audience is India-based, mobile-first, Instagram/WhatsApp-native.
- WhatsApp is an appropriate and available primary contact channel for this client (not yet explicitly confirmed, but consistent with the already-agreed "simple site + WhatsApp enquiry" scope).
- Location is likely Chennai/Tamil Nadu given Fresh Frame's existing client base and lead-generation area — NOT confirmed for this specific client.

Assumptions must be validated, not treated as facts, before Stage 2 visual/implementation work locks them in.

---

# 27. OPEN QUESTIONS (materially affect the frontend)

1. What does Gifties For You actually sell — return gifts specifically, general gifts, corporate gifts, or a mix? What are the real product categories?
2. What's the real pricing? Can items be shown with actual prices, or does the site need a "price on enquiry" pattern?
3. Do they offer customization/personalization? If so, what does it look like (name printing, packaging choice, colors)?
4. Is there a bulk-order / minimum-quantity policy?
5. What's the real WhatsApp/phone number and location/service area?
6. Do they have a logo or any existing brand color, or does one need to be designed?
7. Do they want a fallback enquiry form for desktop/non-WhatsApp users, or should the site be WhatsApp-only?
8. Do they have any real testimonials they want featured?
9. Which stack should this be built on — the static-site pattern used for Cafe By Cassette/Hana/Al-Taj, or something else? (Not strictly a design question, but affects what Stage 2/3 can assume.)
10. Does the proposed "small, personal, WhatsApp-first" differentiator match how the client wants to be perceived, or are they trying to look more established/larger-scale?

---

# 28. FINAL DESIGN DIRECTION

## Design Statement
A small, warm, mobile-first gift catalogue that gets a shopper from "what do you sell" to a WhatsApp conversation as quickly and honestly as possible — deliberately not a scaled-down e-commerce site.

## Experience Statement
The user should feel like they're looking at a real, trustworthy small shop's offerings — not filling out a generic online-store checkout.

## Visual Statement
Warm, calm, photo-forward, occasion-aware — distinct from the generic e-commerce template feel of every market reference. Cannot be finalized until real product photography and any existing brand assets are supplied.

## Interaction Statement
Fast, low-friction, WhatsApp-centered. Every path through the site should make it easy to arrive at "Enquire on WhatsApp" with the right context already attached.

---

# 29. IMPLEMENTATION PRIORITY (for Stage 2/3 planning — not started yet)

## Phase 1 — Foundation
Confirm all UNKNOWN items in section 22; lock IA and screen list against real product categories.

## Phase 2 — Core Experience
Home, Catalogue, Product Detail, WhatsApp CTA flow.

## Phase 3 — Supporting Experience
About, Contact/fallback form (if wanted), Testimonials (if real ones exist).

## Phase 4 — Polish
Responsive refinement, accessibility pass, motion/interaction polish.

---

# 30. FINAL QUALITY GATE

| Check | Status |
|---|---|
| Product Fit | PASS (scope is clear and consistent) |
| User Fit | PARTIAL — user profiles are inferred from market, not confirmed for this business |
| Information Hierarchy | PASS at structural level; blocked on real content |
| Visual Identity | NOT YET ESTABLISHED — correctly deferred to Stage 2, pending brand/photo assets |
| Design Differentiation | PROPOSED, not validated |
| Responsive Strategy | PASS (mobile-first direction is clear and justified) |
| Accessibility | PASS at requirements level |
| Content Completeness | **FAIL** — most business-specific content is UNKNOWN — NEEDS CONFIRMATION |
| Technical Readiness | PARTIAL — stack choice not yet confirmed |

**This brief is intentionally incomplete where real client information is missing — that information gap is the primary blocker to Stage 2, not a documentation gap.** See section 27 (Open Questions) and `13-assets-and-content.md` for exactly what's needed next.
