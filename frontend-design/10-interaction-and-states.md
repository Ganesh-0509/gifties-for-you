# 10. Interaction and States

## Primary Interactions
- Tap/click product card → product detail
- Tap/click "Enquire on WhatsApp" → opens WhatsApp (app on mobile, web.whatsapp.com on desktop) with a pre-filled message
- Filter/select occasion or price bracket → catalogue re-renders (client-side filter, no page reload needed given small catalogue size)
- Tap phone number → initiates call on mobile

## Secondary Interactions
- Expand product photo (lightbox) — TBD Stage 2
- Scroll-based reveal on homepage sections — only if it supports content, not decoration (per anti-generic rule against unnecessary animation)

## Hover
Desktop-only consideration (secondary given mobile-first priority) — subtle product card lift/photo-swap on hover is a reasonable, low-risk pattern; not required.

## Focus
Every interactive element (nav links, filter chips, WhatsApp CTA, product cards) needs a visible keyboard focus state — this is a public-facing marketing/catalogue site, so basic keyboard accessibility is a baseline requirement, not optional.

## Active / Disabled
Minimal need for disabled states given no cart/checkout logic. A fallback enquiry form (if built) would need a disabled "Send" state while submitting and during validation errors.

## Drag / Drop
Not applicable.

## Search
Not committed — see `09-component-requirements.md`. If included, standard live-filter-as-you-type behavior against the catalogue.

## Filtering
Chip/tab-based occasion and price filters; should combine (AND logic) if multiple filters are supported — exact behavior is a Stage 2 detail once real category data exists.

## Sorting
Likely unnecessary given small catalogue size (UNKNOWN actual size) — price-low-to-high could be a reasonable default sort if the catalogue grows large enough to need it.

## Keyboard Shortcuts
Not applicable — this is a browsing/catalogue site, not a power-user tool.

## System States

### Initial
Homepage loads with real hero content once available; until real photos/copy exist, this cannot go live with fabricated content.

### Loading
Minimal — mostly static content; only a fallback enquiry form (if built) needs a loading/submitting state.

### Empty
Catalogue filter returns no results → friendly message + WhatsApp fallback CTA ("don't see what you're looking for? ask us"), not a dead-end blank page.

### Error
Fallback enquiry form (if built) needs field-level validation errors, clearly worded, not generic "error occurred" messaging.

### Success
Fallback enquiry form (if built) needs a clear "message sent" confirmation. WhatsApp CTA doesn't need an in-site success state since the user leaves the site into WhatsApp.

### Offline / Permission Restricted
Not applicable — no auth, no restricted content in this scope.

## Reduced Motion
Any animation used (scroll reveals, hover transitions) must respect `prefers-reduced-motion` and degrade to instant/no animation — standard baseline, not product-specific.
