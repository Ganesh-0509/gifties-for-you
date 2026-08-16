# 11. Responsive and Accessibility Requirements

## Responsive Strategy

This product is **mobile-first by necessity, not just convention** — the client's current audience comes from Instagram, and enquiries are expected to funnel through WhatsApp, both of which are overwhelmingly mobile behaviors in this market. INFERRED, consistent with Fresh Frame's other local-business builds.

### Desktop
Secondary priority. Should still work well (multi-column catalogue grid, comfortable reading width for About/Contact), but no desktop-only features should be assumed necessary.

### Tablet
Catalogue grid steps down from desktop column count; navigation likely stays as a simple top bar.

### Mobile
Primary target. Catalogue grid to 1–2 columns, filters move into a compact control (chips row or bottom-sheet drawer, not a sidebar), WhatsApp CTA should be persistently reachable (e.g., sticky bottom bar or floating action button) — this is the highest-value interaction on the entire site and should never require scrolling to find.

### Navigation on Mobile
Collapses to a hamburger or simple bottom nav — final choice is a Stage 2 decision once screen count/content is confirmed.

### Forms on Mobile
If a fallback enquiry form exists, inputs need to be large-tap-target, single-column, with appropriate mobile keyboard types (tel, email).

### Primary Actions on Mobile
"Enquire on WhatsApp" is the single most important action in the product — it should be the easiest thing to find and tap on every relevant screen (product card, product detail, and ideally a persistent site-wide affordance).

## Accessibility

### Keyboard Navigation
All interactive elements (nav, filters, product cards, WhatsApp CTA, form fields if present) must be reachable and operable via keyboard.

### Focus States
Visible focus indicators on every interactive element — non-negotiable baseline for a public site.

### Color Contrast
Text over product-photo backgrounds (common in hero/category treatments) must maintain sufficient contrast — a real risk area once real photography is added, since photo-heavy gifting sites often sacrifice contrast for aesthetics. Flag for explicit checking in Stage 2/3.

### Semantic HTML
Proper heading hierarchy, landmark regions, and list semantics for product grids — standard baseline for a content/catalogue site.

### Screen Reader
Product cards need meaningful alt text per photo (real, specific — not generic "product image" — depends on having real product names/descriptions, currently UNKNOWN). WhatsApp CTA needs a clear accessible label (not just a WhatsApp icon with no text alternative).

### Form Accessibility
If a fallback enquiry form exists: proper `<label>` association, clear error messaging tied to fields via `aria-describedby` or equivalent.

### Error Communication
Any form errors must be communicated in text, not color alone.

### Reduced Motion
`prefers-reduced-motion` respected for any hover/scroll animation, per `10-interaction-and-states.md`.
