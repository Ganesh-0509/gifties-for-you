# Demo data — what's real vs. placeholder

This started as a fully-demo V1 build and now has real client material mixed in
as it's arrived. Updated 2026-08-15 (verified against actual `products.ts`
contents via a script, not by memory — the count below had drifted stale
once before, see the completeness audit in conversation history). Nothing
marked DEMO below should be treated as a confirmed Gifties For You fact.

## Where everything lives (so replacement never means redesigning UI)

| What | File | Notes |
|---|---|---|
| Business name, WhatsApp/phone, email, location, hours | `src/config/business.ts` | See status table below — WhatsApp number is now real (found, not yet explicitly confirmed); email/location/hours are still DEMO. |
| Products, categories, occasions, prices | `src/data/products.ts` | 17 products across 5 categories / 5 occasions. 10 have real photos of Gifties For You's actual inventory, 3 more have licensed stock placeholder photos (13 total with a photo), and 4 are still fully demo (name + price + placeholder icon). **Every price and minimum-order-quantity is still a DEMO number** even on products with a real photo — the client hasn't confirmed real pricing yet. |
| Product photos | `src/data/products.ts` → each product's `images` array, files in `public/products/` | Empty `images: []` renders `MediaPlaceholder` (icon tile, not a fake photo). `ProductCard`/`ProductGallery` automatically switch to real photos and a working thumbnail gallery once `images` has entries — no component changes needed. |
| Logo | `public/logo.png` + `public/favicon.png` | **Real** — the client's actual logo, supplied 2026-08-14, background made transparent. Wired into `Header.tsx`/`Footer.tsx`/`index.html`. |

## Status of every field — CONFIRMED / FOUND / DEMO

| Field | Status | Notes |
|---|---|---|
| Business name "Gifties For You" | CONFIRMED | |
| Instagram `@gifties_for_you` | CONFIRMED | |
| Logo | CONFIRMED (real file) | Client-supplied 2026-08-14 |
| 10 product photos | CONFIRMED (real files) | Client-supplied 2026-08-15, see per-product list below |
| 3 more product photos | Licensed stock (not the client's own) | Pexels License, free for commercial use — see per-product list below |
| WhatsApp number `9042032327` | **FOUND, not explicitly confirmed** | Visible printed on Gifties For You's own hang-tag in 2 of the supplied photos — high confidence, but flag to the client before treating as fully final. Real customer messages route here once this goes live. |
| Product prices / MOQ | DEMO | Not confirmed by the client on ANY product, including ones with real photos |
| Email, exact address, hours | DEMO | |
| Business age | UNKNOWN — deliberately not surfaced as a number anywhere in the UI |
| Testimonials | NONE — `src/data/testimonials.ts` is an empty array; section auto-appears once real quotes are added |

## Products with real photos (2026-08-15)

Pichwai Print Kumkum Box · Brass Diya Flower Set · Silver Mesh Gift Basket ·
Pichwai Print Tin & Tray Set · Silver Lotus Pooja Dish Set · Kids' Panda Lunch
Box · Decorative Trinket Box · Floral Lid Ceramic Jar (4 photos, full gallery)
· Silk Potli-Style Gift Box · Meenakari Trinket Box · Mini Ceramic Planter
Favor (this one's a generic Pexels stock photo, not the client's own — see
inline comment in `products.ts`).

Product **names and descriptions** were rewritten to accurately match what
each real photo actually shows (e.g. "Hand-Painted Terracotta Diya Pair"
became "Brass Diya Flower Set" once the real photo showed a brass 7-piece
set, not a terracotta pair) — the goal was to keep every real photo paired
with an honest, accurate description, not force real photos to match the
original invented demo names.

Printed Cotton Tote and Wooden Photo Frame Keepsake also got generic
Pexels-licensed stock photos (same basis as the ceramic planter) — checked
3 additional stock candidates for the remaining placeholder products, only
these 2 were genuinely good/acceptable matches (one candidate for a photo
frame turned out to be an unrelated novelty message board and was discarded).

Still fully demo (placeholder icon + name + price, no real photo — stock
search didn't surface a usable match): Jute Potli Favor Bag, Personalized
Photo Keychain, Customized Name Plate Magnet, Marble Coaster Set.

## One real photo was deliberately excluded

The client's photo batch included a shot of a green potli-style bag carrying
a visible **"Yamini Enterprises"** watermark — that's a different business's
(likely a wholesale supplier's) product photography, not Gifties For You's
own. It was not used anywhere on the site; publishing a competitor/supplier's
watermarked photo would be using imagery Gifties For You doesn't have rights
to, the same issue as the earlier refused request to reuse market-reference
sites' product photos. Flagged to Ganesh, not silently dropped.

## Explicitly NOT fabricated

- **Business age** — discovery notes ~2 years but unconfirmed; not surfaced as a number anywhere in the UI.
- **Address** — `business.location` is a hedged sentence ("Serving customers across Chennai — exact address to be added"), not a fabricated street address.
- **Testimonials/reviews** — genuinely none in the UI (empty array, not fake quotes) until the client supplies real ones.
- **Competitor/supplier photos** — never used, including the Yamini Enterprises-watermarked one above and the market-reference sites' own product photos (explicitly declined, see conversation history / CLAUDE.md 2026-08-15 entries).
- **Follower counts / Instagram post content** — an earlier automated fetch attempt returned fabricated-looking Instagram data; verified against the raw page and discarded entirely. None of it appears anywhere in this codebase.

## Next steps to go from V1 → real site

1. **Confirm the WhatsApp number** (`9042032327`, found on their own tag) is correct and current before go-live.
2. Get real prices and MOQs for the 13 products that now have a photo (10 real, 3 stock).
3. Get real photos for the remaining 4 fully-demo products (Jute Potli Favor Bag, Personalized Photo Keychain, Customized Name Plate Magnet, Marble Coaster Set), ideally more angles per product for the gallery.
4. Real email, exact address/service area, hours.
5. Decide hosting (this project doesn't set a Vite `base` path yet — add one if deploying to a GitHub Pages subpath, per the pattern in `clients/sri-arumugam-party-hall/app/vite.config.ts`).
6. Remove the `noindex` meta tag + `robots.txt` disallow once real pricing is confirmed and this moves to a real domain (see `index.html`).
