# Gifties For You

E-commerce website for **Gifties For You**, a small, independent gifting shop in Chennai, India,
built and maintained by [Fresh Frame](https://github.com/Ganesh-0509).

**Instagram:** [@gifties_for_you](https://www.instagram.com/gifties_for_you/)

> This project has two phases in this repo. **Phase 2 (`app/`) is the current, active build** —
> a full cart-and-checkout store with Razorpay payments. **Phase 1 (`phase1-demo/`)** is the
> original static WhatsApp-enquiry demo, preserved as-is and still live on GitHub Pages at
> https://ganesh-0509.github.io/gifties-for-you/ — see [Phase history](#phase-history) below.

## What the business does

Gifties For You sells **return gifts, festive favors, and celebration hampers** — the small
gifts handed out at weddings, birthdays, housewarmings, festival poojas, and corporate events.
It's a small, personal shop that has run sales through **Instagram DMs**, without its own
storefront or online catalogue.

## What this site is (Phase 2)

A full online store: browse the catalogue by **occasion** or **category**, add items to a cart,
and pay online by card/UPI/netbanking via **Razorpay** — no back-and-forth needed for a standard
order. **Bulk and event orders stay a WhatsApp conversation** on purpose — that kind of order
(custom quantities, printing, an event timeline to plan around) is negotiated, not a fixed cart
price, so it gets its own page that hands off to WhatsApp instead of the checkout.

This is a deliberate pivot from Phase 1's original "no cart, talk to a real person" positioning —
see [Phase history](#phase-history) for why, and `DETAILS.md` in this repo for the full
build record (architecture decisions, what's verified vs. still open, real bugs hit and fixed).

## Tech stack

- **Next.js 16** (App Router, TypeScript, React 19) on **Cloudflare Workers** via
  `@opennextjs/cloudflare` — chosen because it's the exact proven architecture already shipped
  for another Fresh Frame client (see `templates/nextjs-cloudflare-business-site/BUILD-PROMPT.md`)
- **Cloudflare D1 + Drizzle ORM** for orders, catalog, and settings
- **Razorpay** (Orders API + Checkout.js) for payment — signature verification and webhook
  handling done with the platform's native Web Crypto, no SDK dependency
- **Tailwind CSS v4** — same "Blush Rose Garden" palette (Fraunces + Manrope) as Phase 1, ported
  into the new app's design tokens

## Project structure

```
app/                          Phase 2/4 — the active Next.js + Cloudflare Workers app
  migrations/                 D1 schema (orders, catalog, product photos, settings)
  src/
    app/
      (store)/                Public routes: home, shop, product/[slug], cart, checkout,
                               bulk-orders, about, contact, faq, legal/* — own layout (Header/
                               Footer/cart), kept separate so /admin doesn't inherit it
      admin/                  Owner panel: login, dashboard, orders (+ Razorpay refund),
                               products, categories, settings, help — own layout, no cart
      api/                    orders/*, webhooks/razorpay, product-photo/[id]
    components/                UI, grouped by area (layout, product, cart, checkout, bulk, legal, admin)
    lib/
      site.ts                  SITE (fixed) + Settings (admin-editable) + shared helpers
      schema.ts / db.ts        Drizzle schema + order queries/status enum
      admin-auth.ts             PBKDF2 password hash + HMAC-signed session cookie
      catalog.ts / catalog-types.ts   Catalog CRUD (server) + client-safe types
      seed-data.ts              First-run catalogue seed, ported from phase1-demo's products.ts
      cart.tsx                  Client cart (localStorage, no cached prices)
      order-totals.ts           Server-side total recomputation — the client never sets a price
      razorpay.ts                Orders/Payments/Refunds REST calls + HMAC verification
      image-file.ts              Client-side photo downscale/compress before upload

phase1-demo/                  Phase 1 — the original static demo, preserved unchanged
  (see phase1-demo/app/DEMO-DATA-README.md and QA-AUDIT.md for its own history)

DETAILS.md                    Full build history for both phases — read this for the "why"

frontend-design/              Stage 1 discovery docs (product understanding, visual direction,
                               etc.) — the reasoning behind the original site structure/design
```

## Local development

```bash
cd app
npm install
npm run dev            # next dev
```

Payments need Razorpay **test-mode** keys (free, no KYC) — copy `app/.dev.vars.example` to
`app/.dev.vars` and fill in your own test keys from https://dashboard.razorpay.com. Without
them, checkout still works end-to-end up to the payment step, which then shows a graceful
"payments are not configured yet" message instead of erroring.

The **admin panel** is at `/admin`. Set `ADMIN_PASSWORD` in `.dev.vars` (see
`.dev.vars.example`) to log in — it works as a permanent break-glass login alongside whatever
password you set for yourself from Settings once inside.

## Build & preview (the real Workers runtime, not `next dev`)

```bash
cd app
npm run build                        # next build --webpack (Turbopack breaks the OpenNext build)
npx opennextjs-cloudflare build       # bundles for Cloudflare Workers
npx wrangler dev --port 8787          # serves the actual Workers/D1 runtime locally
```

## Linting

```bash
cd app
npm run lint       # eslint
```

## Deploying

**Not yet deployed anywhere.** Per this project's standing rule (never put a client on the same
Cloudflare account as other clients/projects), Phase 2 needs its **own, client-owned Cloudflare
account** before going live — see `DETAILS.md` for the full prerequisite list (Cloudflare
account, Razorpay KYC for live keys, real confirmed prices, legal-page review). Everything has
been built and verified against **local** D1 + Razorpay test mode only.

## Phase history

- **Phase 1** (2026-08-14 → 2026-08-16): static Vite/React SPA, no backend, WhatsApp-enquiry
  only, deliberately no cart — "talk to a real person about your gift, not a checkout flow" was
  the stated differentiator (every competitor reference studied has a full cart). Still live at
  https://ganesh-0509.github.io/gifties-for-you/. Preserved unchanged at `phase1-demo/`.
- **Phase 2** (started 2026-08-17): Ganesh asked for "the whole end-to-end system... with a
  payment integration layer" — a deliberate pivot to full cart + checkout + Razorpay, confirmed
  via clarifying questions before any code was written. Full reasoning, architecture, and
  verification record in `DETAILS.md`.
- **Phase 4** (2026-08-17, same session): admin panel — login, dashboard, orders with a Razorpay
  refund button, product/category editing with photo uploads, settings. Includes the full record
  of a real bug found and fixed during verification (the catalog was silently running entirely
  off in-memory seed data instead of D1, for two separate root causes) — see `DETAILS.md`.

## Known gaps (tracked, not blocking further development)

- Prices, minimum-order-quantities, delivery fee, email, and exact address are all still
  placeholder — carried over unconfirmed from Phase 1. See `phase1-demo/app/DEMO-DATA-README.md`
  for the itemized real-vs-demo map.
- No live payment test yet against real Razorpay test-mode keys — needs Ganesh's own account.
- No email notifications, SEO/JSON-LD, or coupon system yet — Phase 5.
- Not deployed — no Cloudflare account created for this client yet.
