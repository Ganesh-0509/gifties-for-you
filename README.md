# Gifties For You

Marketing/catalogue website for **Gifties For You**, a small, independent gifting shop in
Chennai, India, built and maintained by [Fresh Frame](https://github.com/Ganesh-0509).

**Live demo:** https://ganesh-0509.github.io/gifties-for-you/
**Instagram:** [@gifties_for_you](https://www.instagram.com/gifties_for_you/)

> This is a **V1 demo build**, not the finished production site. Real business material
> (prices, contact details, some product photos) is still being confirmed by the client — see
> [Real vs. demo data](#real-vs-demo-data) below before treating anything on the live site as fact.

## What the business does

Gifties For You sells **return gifts, festive favors, and celebration hampers** — the small
gifts handed out or given at weddings, birthdays, housewarmings, festival poojas, and corporate
events. It's a small, personal, single-operator (or small-team) shop that currently runs its
sales through **Instagram DMs**, not a website — customers browse posts on Instagram, then
message to ask about a product and place an order. There is no existing storefront, online
catalogue, or e-commerce presence beyond that Instagram profile.

The shop's own real market — inferred from studying comparable Chennai/Tamil Nadu return-gift
businesses (Thambulaaa Return Gifts, Tanu Return Gifts, Pai by Lee Gifts, Wedtree, used for
pattern research only, never copied) — is dominated by **full e-commerce operations**: carts,
accounts, checkout flows. Gifties For You does not have that infrastructure, and this site
deliberately does not try to fake it.

## What this site is for

A standalone, browsable web catalogue that sits **outside Instagram**, organized the way a
gift-shopper actually thinks — by **occasion** (wedding, birthday, housewarming, festival/pooja,
corporate) and by **category** (pooja items, kids' favors, décor pieces, keepsakes, hampers) —
so a visitor can find something relevant in under a minute without scrolling an Instagram grid.
Every single path through the site — a product card, a category page, the bulk/event order
form, the footer, the sticky mobile bar — ends the same way: a **WhatsApp message pre-filled
with full context** (which product, what quantity, what customization) so the customer never has
to retype what they're asking about and the owner never has to guess.

**There is intentionally no cart, no checkout, no accounts, no payment integration.** That's not
a missing feature — it's the product's actual positioning: *"talk to a real person about your
gift, not a checkout flow."* Every comparable reference site in this market has a cart; this one
doesn't, on purpose, and that absence (reinforced visually by a recurring gift-tag / punch-hole
motif throughout the design) is the differentiator. The owner still manages every order,
payment, and fulfillment step manually over WhatsApp after an enquiry lands — this site's only
job is to get a well-formed enquiry into that conversation.

Full product rationale — target users, positioning, constraints, and the specific decisions
behind "no cart" — is in [`app/PRODUCT.md`](app/PRODUCT.md).

## Tech stack

- **React 19 + TypeScript**, built with **Vite**
- **React Router** (`HashRouter`, chosen specifically so deep links — e.g. a direct product page
  — always resolve correctly on GitHub Pages' static hosting, with no server-side rewrite rules)
- **Tailwind CSS v4** for styling — warm terracotta/brass/ivory palette (Fraunces + Manrope),
  an original identity, not copied from any reference site
- No backend, no database, no CMS — the entire catalogue is static TypeScript data
- Deployed as a static build to **GitHub Pages** (`gh-pages` branch)

## Project structure

```
app/                        The site itself (everything below is relative to app/)
  src/
    components/
      home/                 Hero, category/occasion grids, "how ordering works", trust strip
      product/              Product card, gallery (multi-photo thumbnail strip), filter bar,
                             bulk-order modal
      layout/                Header, footer, sticky mobile WhatsApp bar
      bulk/                  Bulk/event enquiry form
      ui/                    Shared primitives (chip, empty state, scroll-reveal, WhatsApp button)
    pages/                  One file per route: Home, Shop, ProductDetail, BulkOrders, About,
                             Contact, FAQ, NotFound
    data/
      products.ts           The entire product catalogue — 17 products, 5 categories,
                             5 occasions, prices, MOQs, photo lists. THE file to edit to add,
                             remove, or reprice products; no component changes needed.
      testimonials.ts       Empty by design — renders nothing until real customer quotes exist.
                             Never fill this with fabricated reviews.
      faq.ts                FAQ content
    config/
      business.ts           Every business fact used anywhere on the site — name, tagline,
                             WhatsApp number, phone, email, location, hours. THE one file to
                             edit when the client confirms real contact details.
    lib/
      whatsapp.ts            Builds the pre-filled wa.me deep links (product enquiry + bulk
                              order variants)
      format.ts               Price/number formatting helpers
  public/
    logo.png / favicon.png  Real client logo (background removed), in production use
    products/                Product photography (mix of real client photos and licensed stock —
                              see below)
    hero-bg.jpg               Blurred/graded real product photo used as the home hero background
frontend-design/            Stage 1 discovery docs (product understanding, user flows,
                             information architecture, visual direction, component requirements,
                             etc.) — the reasoning behind the structure and design of the site
```

## Real vs. demo data

This project has been built incrementally as real client material has arrived, and it is
**not fully real yet**. The authoritative, itemized breakdown — updated as of 2026-08-15 and
verified against the actual data files, not just asserted — lives in
[`app/DEMO-DATA-README.md`](app/DEMO-DATA-README.md), with a fuller audit trail in
[`app/QA-AUDIT.md`](app/QA-AUDIT.md). Summary:

| Confirmed real | Found, not yet explicitly confirmed | Still demo/placeholder |
|---|---|---|
| Business name "Gifties For You" | WhatsApp number `9042032327` (visible on the client's own product hang-tags in 2 supplied photos) | Every product **price** and **minimum order quantity** |
| Instagram handle `@gifties_for_you` | | Email address, exact street address, business hours |
| Logo (real file, background removed) | | 4 of 17 products still have no real photo |
| 10 real photos of the shop's own inventory | | Business age (deliberately not shown as a number anywhere) |
| 3 licensed-stock placeholder photos (Pexels, credited inline in `products.ts`) | | Testimonials (none exist — section is empty by design, not faked) |

Nothing on this site presents demo content as a confirmed fact. Placeholder values are written
in an obviously-fake style (e.g. round-number prices) and flagged in code comments so they can
never be mistaken for real business data by anyone reading the source.

One real client photo (a green potli-bag shot carrying a visible "Yamini Enterprises"
watermark — a wholesale supplier's photo, not the client's own) was deliberately excluded from
the site rather than used, since Gifties For You doesn't hold the rights to it.

## Local development

```bash
cd app
npm install
npm run dev       # starts Vite dev server with HMR
```

## Build & preview

```bash
npm run build      # type-checks (tsc -b) then builds to dist/
npm run preview    # serves the production build locally, at the /gifties-for-you/ base path
```

## Linting

```bash
npm run lint       # oxlint
```

## Deploying

The production build (`app/dist/`) is pushed to the `gh-pages` branch of this repo, which
GitHub Pages serves directly at https://ganesh-0509.github.io/gifties-for-you/. `vite.config.ts`
sets `base: '/gifties-for-you/'` to match that subpath, and the router uses `HashRouter` instead
of `BrowserRouter` specifically so every route (not just the home page) works correctly on
GitHub Pages' static file serving — no 404/redirect workaround needed for deep links.

```bash
cd app
npm run build
# then push dist/ to the gh-pages branch
```

## Known gaps (tracked, not blocking a client review)

- **Pricing and minimum order quantities are placeholder on every product**, including the 13
  that already have real photos — not yet confirmed by the client. The site currently carries a
  `noindex, nofollow` meta tag and a `robots.txt` disallow for exactly this reason, so it isn't
  indexed while showing invented prices.
- 4 of 17 products (Jute Potli Favor Bag, Personalized Photo Keychain, Customized Name Plate
  Magnet, Marble Coaster Set) have no real photo yet — a placeholder icon tile renders instead.
- No real testimonials yet.
- Email, exact address, and business hours are still placeholder.
- No custom domain — live on the default `github.io` URL for now.

The next step to move this from "V1 demo" to "real site" is getting the client to confirm the
items above — see `app/DEMO-DATA-README.md` §"Next steps to go from V1 → real site" for the
full checklist.

Full build history and every design/content decision made along the way (including things
explicitly declined, like reusing competitor product photos or fabricating testimonials) is
recorded in the project's working memory — ask Fresh Frame for context if you're picking this
project up fresh.
