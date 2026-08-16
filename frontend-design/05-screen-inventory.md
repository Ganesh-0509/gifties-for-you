# 05. Screen Inventory

> Scoped to the CONFIRMED simple-site (no cart/admin) build. Screen list is a draft based on IA — final structure depends on confirming real product categories/count.

| Priority | Screen | Purpose | Primary User | Primary Action |
|---|---|---|---|---|
| P0 | Home | Establish what Gifties For You sells, for what occasions, and build trust fast | Occasion Shopper (first visit) | Go to catalogue / enquire |
| P0 | Catalogue / Shop | Browse products by occasion/price/type | Occasion Shopper | Open a product |
| P0 | Product Detail | Show one product's photos, price, customization notes | Occasion Shopper | Enquire on WhatsApp |
| P0 | Contact / Enquire | Fallback for non-WhatsApp enquiry, shows location/hours/contact | Occasion Shopper (desktop, or no WhatsApp) | Send enquiry / call |
| P1 | About | Build trust — who runs the shop, what makes it different | Occasion Shopper (evaluating) | Continue to catalogue |
| P1 | Category listing (within Catalogue) | Narrow browsing by occasion/price/type | Occasion Shopper | Select a category |
| P2 | Testimonials/Reviews (if client has any) | Trust signal | Occasion Shopper (evaluating) | Continue browsing |

## Screen: Home
- **Priority:** P0
- **Purpose:** First impression — communicate what's sold, for whom, and why to trust this shop over Instagram DMs or a competitor.
- **User:** Occasion Shopper, first-time.
- **User Goal:** Understand in seconds if this shop has what they need.
- **Primary Information:** Hero statement of what's offered (return gifts? curated gifts? both? — UNKNOWN), a few product highlights, occasion categories.
- **Primary Action:** Go to catalogue.
- **Secondary Actions:** WhatsApp enquire directly, view About.
- **Data Required:** Real product photos, real category names — currently UNKNOWN, must not be fabricated.
- **Empty State:** N/A (static content page) — but if no real photos are supplied by launch, this needs an explicit placeholder decision, not fake product photos.
- **Edge Cases:** No confirmed logo yet — needs a text-based/typographic treatment as fallback until a logo is supplied or designed.

## Screen: Catalogue / Shop
- **Priority:** P0
- **Purpose:** Let users browse the actual product range by occasion and/or price.
- **User:** Occasion Shopper, Bulk Planner.
- **User Goal:** Find products relevant to their event and budget.
- **Primary Information:** Product photo, name, price (or "price on enquiry" if real prices aren't ready), category/occasion tags.
- **Primary Action:** Open a product.
- **Secondary Actions:** Filter by occasion/price, enquire directly from a listing card (recommended, pending design stage).
- **Data Required:** Full real product list — UNKNOWN, this is the single biggest blocker to building anything beyond a shell.
- **Empty State:** A filter with zero results needs a friendly message + WhatsApp fallback, not a blank page.
- **Mobile Behavior:** Grid collapses to fewer columns; filters likely become a bottom-sheet/drawer rather than a sidebar (sidebars don't suit a simple catalogue site at this scale).

## Screen: Product Detail
- **Priority:** P0
- **Purpose:** Give enough information to enquire confidently — photos, price, customization/personalization notes, minimum order quantity if any.
- **User:** Occasion Shopper.
- **User Goal:** Decide if this product fits their event and enquire.
- **Primary Action:** Enquire on WhatsApp (pre-filled with product name).
- **Secondary Actions:** View related products (if catalogue supports it), back to catalogue.
- **Data Required:** Real photos, real price/customization info per product — UNKNOWN.
- **Edge Cases:** Product with variants (color/size) — whether Gifties For You's products have variants is UNKNOWN.

## Screen: Contact / Enquire
- **Priority:** P0
- **Purpose:** Fallback enquiry path for desktop users or anyone who doesn't want to use WhatsApp, and the place to show location/hours/contact details.
- **Primary Action:** Send WhatsApp message or call.
- **Data Required:** Real phone/WhatsApp number, location, hours — all UNKNOWN — NEEDS CONFIRMATION.
- **Secondary Actions:** Simple enquiry form as a fallback — whether this is wanted at all is UNKNOWN (client may prefer WhatsApp-only, matching the "no admin" simplicity of the scope).

## Screen: About
- **Priority:** P1
- **Purpose:** Trust-building — every mature reference site (especially Wedtree, Thambulaaa) leans on "since [year]," physical presence, and a clear story. Gifties For You's story, founding year, and differentiator are UNKNOWN — NEEDS CONFIRMATION.
- **Primary Action:** Continue to catalogue or enquire.

## Screen: Testimonials/Reviews
- **Priority:** P2
- **Purpose:** Social proof, matching the market pattern (Wedtree: "3000+ 5-star reviews"; Instagram highlight named "Testimonials" was part of the discarded/unverified fetch and must NOT be treated as confirmed).
- **Status:** Include only if the client can supply real testimonials — do not fabricate reviews or ratings, per the hard rule against inventing customer information.
