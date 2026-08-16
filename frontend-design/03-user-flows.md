# 03. User Flows

> Flows are designed against the CONFIRMED scope (simple catalogue + WhatsApp enquiry, no cart/checkout) and INFERRED user behavior from the market. They will need revisiting once real product/pricing/contact data is confirmed.

## Primary Flow — Occasion Shopper, First Visit

```
ENTRY (Instagram bio link / WhatsApp share / search)
↓
Lands on homepage — sees what Gifties For You sells and for what occasions
↓
Understands value: curated gift options, clear pricing, easy to enquire
↓
Browses catalogue — by occasion or price (pattern to confirm against real product data)
↓
Opens a product to see photos, price, customization notes
↓
Decides quantity/occasion fit
↓
Taps "Enquire on WhatsApp" — pre-filled message with product name (+ quantity if selected)
↓
Result: conversation continues on WhatsApp, outside the site
```

## Secondary Flow — Bulk/Repeat Planner

```
ENTRY (returning visitor, or referred by a past customer)
↓
Goes directly to a category or price bracket relevant to their event
↓
Selects multiple products of interest (no cart — likely a lightweight "shortlist" or just repeated WhatsApp taps, TBD in design stage)
↓
Sends one WhatsApp enquiry referencing multiple items, or sends several
↓
Result: shop owner handles bulk quote conversation manually over WhatsApp
```

## First-Time Experience
Needs to communicate, within the first screen, what kind of gifts this is (return gifts? general gifts? both?), for what occasions, and that pricing is visible/transparent — directly addressing the "no clarity until you DM" gap common to Instagram-only shops. Exact product categories are UNKNOWN — NEEDS CONFIRMATION before this can be finalized.

## Returning Experience
Should let a repeat customer get back to browsing/enquiring quickly — clear category/price navigation from the homepage, no login/account required (no accounts in this scope).

## Failure / Recovery
- **No products match a filter/category:** show a friendly empty state, not a dead end — with a WhatsApp fallback ("don't see what you need? ask us").
- **WhatsApp not available on device (desktop browsing):** must have a fallback — phone number and/or a simple enquiry form, since WhatsApp click-to-chat behaves differently on desktop vs. mobile. Whether the client wants a fallback form at all is UNKNOWN — NEEDS CONFIRMATION (they may prefer WhatsApp-only).

## Important Edge Cases
- Product has no price yet (real pricing not yet confirmed) — must not show fabricated numbers; needs an explicit content-handling decision (e.g., "Price on enquiry") until real prices are supplied.
- Product has no photo yet — same issue; real product photos are UNKNOWN — NEEDS CONFIRMATION and must not be faked.
- Business has no confirmed delivery/service area yet — any location/delivery claims on the site must wait for confirmation.
