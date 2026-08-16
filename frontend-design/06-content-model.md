# 06. Content Model

## Primary Content
- Product entries: name, price (or "price on enquiry"), photo(s), category/occasion tag(s), short description, customization notes. **All real values UNKNOWN — NEEDS CONFIRMATION.**
- Category/occasion labels — UNKNOWN, depends on real product range.
- Shop identity: name (CONFIRMED: "Gifties For You"), tagline/value proposition (UNKNOWN), logo (UNKNOWN).

## Supporting Content
- About/story content — UNKNOWN.
- Contact details: phone/WhatsApp, location, hours — UNKNOWN — NEEDS CONFIRMATION, required before Contact screen can be built with real data.
- Trust content: testimonials, years in business, delivery area — UNKNOWN, must not be fabricated.

## User-Generated Content
None in this scope (no accounts, no reviews submission, no cart) — CONFIRMED by scope decision.

## System-Generated Content
None — this is a static/CMS-light catalogue site, not a dynamic application (no orders, no inventory tracking in this scope).

## AI-Generated Content
None planned. Product descriptions should be real client-supplied copy or lightly drafted from real product facts the client provides — not invented specs, materials, or claims.

## Business Content
- Occasion coverage (wedding? birthday? corporate? festival/pooja?) — UNKNOWN.
- Customization/personalization capability — UNKNOWN. The 4 references vary here: Wedtree has a "Customized Gift Boxes" collection but limited visible tooling; none of the 4 show a rich in-browser personalization tool. Do not assume Gifties For You offers customization unless confirmed.
- Bulk/minimum order quantity policy — UNKNOWN.
- Delivery/shipping vs. local pickup only — UNKNOWN.

## Content That Must NOT Be Invented
- Prices
- Product photos
- Customer testimonials/reviews
- Years in business / founding story
- Delivery area or shipping claims
- Follower counts, business stats, or any Instagram-sourced detail (the earlier fabricated fetch result is discarded entirely and must not resurface anywhere downstream)

## Realistic Mock Data (only if needed for layout work in Stage 2)
If placeholder content is needed purely to test layout during design/implementation, it must be clearly marked as placeholder in the design docs (e.g., "Sample Return Gift — ₹XX — placeholder"), never presented as real product data, and never carried into the live site.
