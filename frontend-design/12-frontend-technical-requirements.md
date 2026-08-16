# 12. Frontend Technical Requirements

## Framework
**Not yet decided for this project — UNKNOWN.** Fresh Frame (the freelance studio) has used two patterns on past clients of similar scope:
- Static HTML/CSS/JS single-page demos (Cafe By Cassette, Hana Restaurant & Cafe, Al-Taj Party Hall) — used for simple catalogue/WhatsApp-enquiry sites with no backend needs.
- Next.js + Cloudflare Workers/D1 (Standard Fireworks) — used only when the client needed admin panels, order tracking, or inventory management.

Given the CONFIRMED scope for Gifties For You (simple catalogue + WhatsApp enquiry, **no cart/admin**), the static-site pattern is the closer fit precedent, but this has not been explicitly decided with Ganesh for this project — flag as an open question before Stage 2 implementation.

## Language
Follows framework choice above — plain HTML/CSS/JS if static, TypeScript/React if Next.js.

## Styling
Not yet decided. Past static-site builds used hand-written CSS; Next.js builds used Tailwind. No constraint from the client either way.

## Component Library
None required at this scope — no complex UI (no data tables, no dashboards).

## Routing
Simple multi-page or single-page-with-anchors, matching the small screen count (Home, Shop, Product Detail(s), About, Contact). No complex routing needs.

## State Management
Minimal — client-side filter state for the catalogue (occasion/price), nothing else. No global state management library needed.

## API
None required in this scope — no backend, no order processing, no payment (all out of scope per the confirmed "no cart" decision).

## Authentication
Not applicable — no accounts in this scope.

## Database
Not applicable — product data can live as static content (JSON/markdown/hardcoded) given the small, simple-site scope, unless real product count turns out to be large enough to warrant otherwise (UNKNOWN pending real data).

## Hosting
Not yet decided — Fresh Frame's past simple-site builds have used Netlify Drop or GitHub Pages. TBD with Ganesh.

## External Services
- WhatsApp click-to-chat (`wa.me` links) — no API/backend integration needed, just correctly formatted deep links once the real WhatsApp number is confirmed (UNKNOWN).

## Analytics
Not discussed — UNKNOWN whether the client wants visit/enquiry tracking.

## Do Not Over-Engineer
Given the confirmed simple scope, this should NOT become a Next.js + database + admin-panel build unless the client's actual needs turn out to require it. Default to the lightest stack that satisfies the confirmed requirements.
