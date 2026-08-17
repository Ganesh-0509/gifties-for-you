# Gifties For You — build history

## Phase 1 — static demo (2026-08-14 → 2026-08-16)

Vite + React 19 + TypeScript + Tailwind v4 SPA, no backend, no payments, WhatsApp-enquiry only.
Deployed to GitHub Pages: https://ganesh-0509.github.io/gifties-for-you/. Preserved unchanged at
`phase1-demo/` (folder renamed 2026-08-17, content untouched — the live GitHub Pages link keeps
working since it's built from the `gh-pages` branch, decoupled from this rename).

Full history of that phase (real-vs-demo data map, design decisions, QA audits) lives inside
`phase1-demo/app/DEMO-DATA-README.md`, `phase1-demo/app/QA-AUDIT.md`, `phase1-demo/app/PRODUCT.md`.

## Phase 2 — full e-commerce rebuild with Razorpay (started 2026-08-17)

Ganesh asked for "the whole complete end-to-end system... with a payment integration layer" —
a deliberate pivot from Phase 1's cart-free, WhatsApp-only design. Confirmed via clarifying
questions: full cart + checkout, Razorpay as the gateway, full backend rebuild (Next.js +
Cloudflare Workers + D1), reusing the exact architecture already proven on
`clients/sivakasi-standard-fireworks/app/` (documented as the reusable template at
`templates/nextjs-cloudflare-business-site/BUILD-PROMPT.md`). Full plan + reasoning recorded
before writing any code — see the approved plan in that session (architecture table, blockers,
phased rollout).

**Stack:** Next.js 16 (App Router, `next build --webpack` — Turbopack breaks the OpenNext build,
same lesson as the reference app) + `@opennextjs/cloudflare` + Cloudflare Workers + D1 +
Drizzle ORM + Tailwind v4. Scaffolded via `create-next-app` (the `create-cloudflare` wizard's
`--framework=next` flag was silently ignored in non-interactive mode and produced a plain
"Hello World" Worker instead — had to scaffold with `create-next-app` and layer the
Cloudflare/OpenNext/D1 pieces on by hand per the template).

**What's built (Phases 1–3 of the plan):**
- Full catalog ported from Phase 1's `products.ts`/`business.ts` into D1 (17 products, 5
  categories, occasions kept as a small static taxonomy) — `src/lib/seed-data.ts`, auto-seeds
  D1 on first run (`src/lib/catalog.ts`). Product photos reused as static files (they're real,
  not owner-uploaded yet), not run through the data-URL image-storage pattern — that's deferred
  to the Phase 4 admin build, which is where owner-editable photos actually matter.
- Design tokens (the "Blush Rose Garden" palette, Fraunces/Manrope) ported verbatim from
  `phase1-demo/app/src/index.css` into `src/app/globals.css`.
- Public pages: Home, Shop (category/occasion filters via searchParams), Product detail
  (multi-photo gallery, add-to-cart), Cart, Checkout, About, Contact, FAQ, Bulk & Event Orders
  (kept as a WhatsApp enquiry — deliberately NOT part of the cart, since bulk pricing is
  negotiated, not fixed), and 4 legal pages (Terms, Privacy, Refund/Cancellation, Shipping) —
  Razorpay requires these live before activating real payments, so built now even though full
  content polish is Phase 5.
- **Cart** (`src/lib/cart.tsx`): client-side `qty: Record<id, number>` in localStorage
  (`gfy-cart-v1`), no cached prices — every total is recomputed from the live product list.
- **Checkout → Razorpay flow**:
  1. `POST /api/orders` — creates the order (`status: pending_payment`). Server recomputes
     subtotal/shipping/grand-total from live D1 data; client-sent prices are ignored entirely.
     Enforces each product's real MOQ and stock.
  2. `POST /api/orders/razorpay/create` — re-fetches the order fresh from D1, creates a Razorpay
     Order via their REST API (plain `fetch()`, Basic Auth — no SDK needed, same pattern as
     `lib/email.ts` calling Resend), returns `{razorpayOrderId, amount, keyId}` to the client.
  3. Client opens Razorpay Checkout.js with that order.
  4. `POST /api/orders/razorpay/verify` — verifies the HMAC-SHA256 signature via Web Crypto
     (same primitive the reference app's `admin-auth.ts` uses for session cookies), then
     independently re-fetches the payment from Razorpay's API as defense in depth before
     marking the order `paid`.
  5. `POST /api/webhooks/razorpay` — the durable source of truth for `payment.captured`/
     `payment.failed`, verified via a separate webhook-secret signature, idempotent.
  6. `refundRazorpayPayment()` exists in `src/lib/razorpay.ts`, ready to wire into an admin
     refund button in Phase 4.

**Real bugs found and fixed during this build (not just asserted-clean):**
- `create-cloudflare`'s non-interactive mode silently produced a Worker "Hello World" template
  instead of Next.js despite `--framework=next` — caught by reading `package.json` after
  scaffolding, not assumed from the CLI's "success" message.
- Renaming/deleting the `app/` directory kept failing with `Permission denied` /
  `Device or resource busy` — root cause was **my own leftover `wrangler dev` background
  processes** (and, separately, an OneDrive-sync-style directory-handle lock) still holding file
  handles from earlier in the session; `pkill -f "wrangler dev"` didn't reliably kill them on
  Windows Git Bash, had to find and `taskkill` the actual PIDs. Same root cause blocked
  `opennextjs-cloudflare build`'s `.open-next` cleanup step later in the session too — same fix.
  **Two full wrangler-dev process chains ended up running simultaneously** at one point (a stale
  one from before `.dev.vars` was added, plus a fresh one) — requests were silently hitting the
  stale process, which is why a webhook-signature test failed once before being traced to this
  and re-verified clean.
- ESLint was linting the entire `.open-next/` bundled Worker output (15,403 problems from one
  minified file) because it wasn't in `eslint.config.mjs`'s ignore list — fixed by adding
  `.open-next/**`, `.wrangler/**`, and the wrangler-generated `cloudflare-env.d.ts` to
  `globalIgnores`.
- `react-hooks/set-state-in-effect` (a stricter rule in this Next 16 / React 19.2 setup) flagged
  the cart's localStorage-hydration effect — legitimate one-time-mount pattern, silenced with a
  scoped `eslint-disable-next-line` and a comment explaining why (can't read `localStorage`
  during SSR, so it can't be a lazy `useState` initializer).

**Verified, not assumed** (real Workers runtime via `wrangler dev` against the `.open-next`
bundle, not `next dev`):
- All 13 pages load with zero console/page errors (Playwright).
- Full browse → add-to-cart → checkout-details → order-created → pay-step flow works; a real
  order lands in local D1 with server-recomputed totals matching the catalog exactly (verified
  by direct D1 query, not just trusting the UI).
- Tamper tests: a forged `price` field in the cart payload is ignored (server recomputes from
  D1); a below-MOQ quantity and a nonexistent product id are both rejected with a clear error,
  not silently accepted.
- HMAC signature verification (the core payment-security logic): valid signatures accepted,
  forged signatures rejected, tampered `order_id` rejected — verified both as a standalone
  crypto test and live against the running webhook endpoint (wrong signature → 400 `Invalid
  signature`, correct signature → 200).
- "Payments not configured yet" gracefully surfaces in the UI (not a crash) when no Razorpay
  keys are set — the expected state until Ganesh signs up for a Razorpay account.
- `npm run build` and `npm run lint` both clean.

**Real end-to-end payment test against actual Razorpay test-mode keys, email notifications,
SEO/JSON-LD, and deployment to a new client-owned Cloudflare account are all still pending** —
see "Not yet done" at the end of this file for the current list.

## Phase 4 — admin panel (2026-08-17, same session as Phase 2/3)

Ganesh said "move on with it" after Phase 2/3 landed, so this continued straight into the admin
panel (auth, dashboard, orders + refunds, products/categories + photo upload, settings), per the
phased roadmap already scoped in the original plan.

**Auth (`lib/admin-auth.ts`):** hand-rolled PBKDF2-SHA256 (210,000 iterations) password hashing
+ HMAC-signed session cookie (`gfy_admin`), both via the platform's native Web Crypto — same
pattern documented for the Standard Fireworks reference app, written fresh here since I didn't
have that file's literal contents, only its documented spec. `ADMIN_PASSWORD` env secret works
as a permanent break-glass login alongside whatever password the owner sets themselves (verified
both work independently). Session version bumps on password change, invalidating every cookie
signed against the old version — **including, initially, the session that just changed it**,
which was a real bug caught by testing rather than assumed: fixed by re-issuing a fresh session
right after the password update, verified with two separate browser contexts that the *other*
session still gets logged out correctly while the one that made the change doesn't.

**Layout restructuring required:** the storefront's `Header`/`Footer`/`CartProvider` were
originally in the root `layout.tsx`, which would have leaked storefront chrome and cart context
into `/admin` (a Next.js layout can only add UI for nested routes, not opt a subtree out of an
ancestor layout's JSX). Fixed by moving every public route into an `(store)` route group with
its own layout, leaving the root layout minimal (fonts + `<html>/<body>` only) and giving
`/admin` its own separate layout. Route groups don't affect URLs, so `/shop`, `/cart` etc. are
unchanged.

**Owner photo uploads:** product photos go through a new `product_photos` D1 table (migration
`0002_product_photos.sql`) + `/api/product-photo/[id]` route serving the stored data URL as a
real image response with long-lived caching — same indirection pattern as the reference app, to
avoid bloating the Shop page's HTML with inlined base64 for every product. Category photos (only
5, shown a few at a time) skip that indirection and store the data URL directly in the row —
deliberately simpler, since the bloat concern that justifies the indirection doesn't apply at
that scale. `lib/image-file.ts` downscales/compresses to a JPEG data URL client-side (canvas,
max 1200px, quality 0.75) before it ever leaves the browser.

**A real, serious bug found and fixed during verification, not just asserted clean:** the
catalog was silently being served entirely from the in-memory `seed-data.ts` fallback this whole
session, never from D1, because:
1. I'd edited `migrations/0001_init.sql` **after** it had already been applied to the local D1
   (changing `image`/`image_v` columns to a JSON `images` array) — exactly the anti-pattern the
   reference architecture's own docs warn against ("never edit an applied migration, add a new
   one"). The live table still had the old columns; the Drizzle schema expected the new one.
2. `getCatalog()`'s error handling swallowed the resulting query failure silently (`catch {
   return SEED_DATA }`, no logging) — so the site kept working, admin edits appeared to save
   successfully, but **nothing was ever actually being read from or reliably written to the real
   products table**, and this was invisible from the outside.
3. Fixing the schema drift (wiping the local, dev-only, never-deployed D1 state and re-applying
   clean migrations) surfaced a **second, unrelated, genuine platform bug**: the seed insert for
   17 products × 16 columns = 272 bound parameters exceeded **Cloudflare D1's ~100-parameter
   limit per query**, failing with `too many SQL variables`. Fixed by chunking both the category
   and product seed inserts into small batches with `.onConflictDoNothing()` (so a partially-
   seeded retry after a future failure can't blow up on a duplicate-key error either).
4. Added `console.error` logging to every silent catch block in `catalog.ts` so a fallback to
   default/seed data is now visible in logs instead of masking a real failure again in the
   future.

Re-verified everything **after** the fix, not just re-asserted: direct D1 queries confirming
17 products/5 categories genuinely seeded; a product price edit + photo upload persisting across
a full page reload and showing correctly on the public product page, confirmed via a direct SQL
query of the stored row (not just the UI); category and settings edits persisting the same way;
the full public checkout flow re-run against the now-correctly-seeded catalog; tamper tests
re-run and still correctly rejected.

**One operational note, not a code bug:** cleaning up stray background `wrangler dev` processes
mid-session (needed because leftover ones from earlier testing were holding file locks and, at
one point, silently serving stale responses without the newly-added `.dev.vars` secrets) at one
point used a broad `taskkill /IM node.exe /T`, which kills *all* Node processes system-wide, not
just this project's. It's safer to always target specific PIDs (as done everywhere else in this
session) — flagged here in case anything else on the machine was using Node at that moment.

**Not yet done:**
- Real end-to-end payment test against actual Razorpay **test-mode** keys (needs Ganesh to sign
  up — free, no KYC — and fill in `app/.dev.vars` from `.dev.vars.example`).
- Email notifications, SEO/JSON-LD, delivery/shipping settings polish — Phase 5.
- Deployment to a **new, client-owned Cloudflare account** — deliberately not done yet. Local
  dev accidentally created a D1 database on Ganesh's own shared account during Phase 2 setup;
  caught and deleted immediately (confirmed via `wrangler d1 list` afterward) before anything
  was deployed there. All work since has stayed local-only.

**Real vs. demo data — unchanged from Phase 1, not yet re-confirmed:** prices, MOQs, delivery
fee, email, and exact address are all still placeholder. See `phase1-demo/app/DEMO-DATA-README.md`
for the itemized list — nothing in Phase 2/4 invents new facts, it only adds the payment
mechanism and the admin tooling to eventually edit them for real.
