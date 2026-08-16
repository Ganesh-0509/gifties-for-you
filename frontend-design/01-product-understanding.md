# 01. Product Understanding

## Product Name
**Gifties For You** — CONFIRMED (client name as given).
Instagram handle: `@gifties_for_you` — CONFIRMED (URL provided).

## One-Line Definition
A gift shop offering return gifts and/or curated gift items, currently selling through Instagram, moving to a dedicated website. — INFERRED (from "gift shop" + Instagram-first presence + the return-gift market context the client pointed us at). The exact product mix (return gifts vs. general gifting vs. corporate gifting) is UNKNOWN — NEEDS CONFIRMATION.

## Product Category
Small/local gifting retail business (India, likely Tamil Nadu/Chennai region given the freelancer's client base) — INFERRED. Not confirmed to be return-gifts-specific; the client supplied return-gift-focused businesses (Thambulaaa, Tanu, Wedtree) and one general gift retailer (Pai by Lee) as references, which suggests return gifts are a meaningful part of the business, but this must be confirmed, not assumed.

## Problem Being Solved
Business currently sells via Instagram (DMs, comments) with no dedicated website. — INFERRED from context (client provided only an Instagram link, no website, and asked for a new frontend project).

**Current problem (inferred, not confirmed):**
- No catalogue customers can browse independently of Instagram
- No structured way to browse by occasion, price, or product type
- Enquiries likely happen via Instagram DM, with no structured enquiry/order flow
- No way to establish trust (reviews, business details, delivery/customization info) outside the Instagram bio

All of the above is INFERRED from the fact that a website is being commissioned at all — none of it has been directly confirmed by the client yet.

## Proposed Solution
A dedicated website that gives Gifties For You an independent, browsable, trustworthy storefront — product catalogue, clear occasion/price-based discovery, and a low-friction enquiry path (very likely WhatsApp-first, consistent with the scope decision already made: **simple catalog + WhatsApp enquiry site, no cart/checkout** — CONFIRMED, this was decided with Ganesh before this discovery stage started).

## Target Users
- **Primary:** People shopping for return gifts / gift items for an occasion (wedding, birthday, housewarming, corporate event, festival) — INFERRED from market category, NOT CONFIRMED for this specific business.
- **Secondary:** Repeat/bulk buyers (event planners, families planning a function) — INFERRED from market pattern (all 4 references emphasize bulk/return-gift ordering), NOT CONFIRMED.

## Product Context
- Business currently reachable at Instagram `@gifties_for_you` — CONFIRMED (handle exists).
- Bio text, follower count, highlights, product posts: **UNKNOWN — NEEDS CONFIRMATION.** Instagram could not be scraped (page requires login/JS; a first automated attempt returned fabricated-looking details that were verified against raw page HTML and found to not exist on the page — discarded entirely, not used anywhere in this documentation).
- No existing website. — INFERRED (only an Instagram link was provided as the business's digital presence).
- Location, service area, delivery/shipping model: UNKNOWN — NEEDS CONFIRMATION.
- Pricing tier the client is paying for: **Simple site, no cart/admin — Basic/Standard tier per Fresh Frame's pricing (₹3–15K)** — CONFIRMED (explicitly scoped with Ganesh before this stage).

## Primary Value Proposition
Cannot be finalized without confirming: what makes Gifties For You different from Thambulaaa/Tanu/Pai by Lee/Wedtree (price point, product range, customization, personal service, locality). This is flagged as an open question — see `14-design-differentiator.md`.

## Market Context (from reference businesses — for market understanding only, NOT for direct copying)
The 4 references the client supplied are all established players in the return-gift / curated-gifting space:
- **Tanu Return Gifts** — Chennai-based, storage/utility-item heavy, standard e-commerce cart, minimal trust signals, category-first browsing.
- **Pai by Lee Gifts** — price-bracket browsing (Under ₹50 / ₹51–100 / ₹101–200 / ₹200+), Shopify-based, occasion collections (e.g. Varalakshmi Pooja), no visible bulk/customization tooling.
- **Thambulaaa Return Gifts** — Chennai, hierarchical categories (Favor Bags / Organizers / Home Decor / Divine Collections), "Ready to Ship" section, wholesale-price positioning, WhatsApp + phone + email + contact form, established since 2016, physical showroom.
- **Wedtree** — the most mature/national player: 5000+ products, price-bracket AND occasion-based AND product-type browsing simultaneously, strong trust signals (3000+ reviews, "Made in India," secure payment badges), dedicated bulk/corporate gifting subsidiary (BliS), WhatsApp + phone + email, mega-menu navigation, 5 physical stores.

**Common pattern across the market:** occasion-based and price-based browsing are both standard; return gifts are typically sold as small, repeatable, low-unit-cost items bought in bulk; WhatsApp is a near-universal contact channel alongside (or instead of) a cart; trust is built through years-in-business, physical location, and reviews — most of which Gifties For You's actual details are still unknown.

**Do not assume Gifties For You matches this pattern exactly.** These are patterns in the *market*, not confirmed facts about this business. Section-by-section confirmation is required (see Open Questions in the final brief).
