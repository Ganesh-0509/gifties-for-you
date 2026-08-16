# 09. Component Requirements

> Scoped to the CONFIRMED simple-site build (no cart/account/admin). Listed for planning; not implemented in Stage 1.

## Navigation
- Header with shallow top nav (Home, Shop, About, Contact) — no account/cart icons (out of scope).
- Mobile nav collapses to a simple menu (hamburger or bottom nav — TBD Stage 2).
- Persistent/sticky WhatsApp contact affordance — recommended based on market pattern (Thambulaaa, Wedtree, Tanu all foreground direct contact), not yet confirmed with client.

## Search
Optional — only if catalogue size justifies it. UNKNOWN pending real product count.

## Product Grid / Cards
- Required — core of the Catalogue screen. Card needs: photo, name, price (or "price on enquiry"), category/occasion tag, and ideally a quick "Enquire" action directly on the card (reduces friction vs. requiring a full detail-page visit for every enquiry).

## Filters
- By occasion and/or price bracket — required per market pattern, but exact filter set depends on confirmed product data (UNKNOWN).
- Should be a lightweight control (chips/tabs or a mobile bottom-sheet) — not a dense sidebar filter panel, given small catalogue and no-cart scope.

## Product Detail View
- Photo gallery (multiple images per product — depends on how many real photos exist per product, UNKNOWN), price, description, customization notes, WhatsApp enquiry CTA.

## Forms
- Only needed if a fallback (non-WhatsApp) enquiry form is wanted — UNKNOWN, TBD with client. If included: name, contact, message, optionally referenced product — minimal fields, no account creation.

## Buttons
- Primary: "Enquire on WhatsApp" (the single highest-priority action across the whole site).
- Secondary: "Call," "View catalogue," "Learn more."
- No cart/checkout button variants — out of scope.

## Cards
- Product card (see above).
- Occasion/category card for homepage browsing entry points.
- Testimonial card — only if real testimonials are supplied (do not fabricate).

## Tables / Charts
Not applicable — no data-dense content in this product.

## Modals / Dialogs
Likely unnecessary at this scope; a lightbox for enlarging product photos may be useful (common, low-friction pattern) — TBD Stage 2.

## Drawers
Possible use: mobile filter drawer for the Catalogue screen (see Filters above).

## Notifications
Minimal — only a confirmation state if a fallback enquiry form exists ("Message sent").

## Specialized Components
- **WhatsApp deep-link CTA** with pre-filled message text (product name, and quantity if selected) — this is the single most important interactive component in the entire site, since it's the primary conversion action per the confirmed scope.
- **Occasion/category entry tiles** on the homepage (following the market pattern of occasion-based browsing entry points, seen in Wedtree and Thambulaaa) — exact set of occasions UNKNOWN.
