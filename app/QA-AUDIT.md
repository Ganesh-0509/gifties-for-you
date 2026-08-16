# QA Audit — Gifties For You V1

This is a follow-up pass done after the initial Stage 2 build, prompted by a direct
question about whether the `frontend-design-pipeline` skill's verification steps were
actually performed or just asserted. Short answer at the time: several were asserted,
not verified. This document is the record of actually doing them — tools run, real
output, real fixes — not a re-statement of confidence.

Verified against: `http://localhost:5183` (local dev server), Chromium via Playwright,
`axe-core` 4.13 for automated WCAG checks. Dates below are 2026-08-14.

## 2026-08-15 — code-review + `/impeccable audit` + `/impeccable harden`

Ganesh asked for a specialized-agent-style audit ("check if everything is OK or
something is pending"). Ran two independent passes:

**`code-review` skill (high effort, since `clients/` is git-ignored at the repo
root — reviewed the full `src/` tree directly, not a diff):** found 1 real bug,
1 dead-code item (immediately fixed), 1 already-fixed item.

**`/impeccable audit`:** mechanical detector (`detect.mjs`) returned zero
findings; manual scoring across 5 dimensions:

| Dimension | Score | Note |
|---|---|---|
| Accessibility | 4/4 | 0 WCAG AA violations, full keyboard nav verified |
| Performance | 3/4 | Images reasonably compressed but never lazy-loaded |
| Theming | 3/4 | 0 hardcoded colors outside tokens; no dark mode (out of scope, not a defect) |
| Responsive | 3/4 | 0 overflow at 768px; quantity stepper buttons 37×41px, under the 44×44 target-size guideline |
| Implementation Integrity | 3/4 | Coherent, product-specific system — docked only for the bug below |
| **Total** | **16/20** | **Good** |

**[P1] Fixed:** `ProductDetail.tsx` reused the same component instance across
`/product/:slug` navigations (no remount on param change), so quantity,
customization text, and the selected gallery photo from one product could
silently leak into the WhatsApp message for a *different* product when a
customer clicked a "You might also like" link. Fixed by forcing a remount
keyed on `slug` (`<ProductDetailView key={slug} .../>`). **Verified with the
exact failure scenario, not just re-reading the code**: set quantity=77 and a
distinctive customization string on one product, clicked into a related
product via a real in-app click, confirmed the new page showed its own
correct default quantity, no leaked customization field, and a clean
WhatsApp message.

**Still open (not yet fixed, by choice — user chose `harden` only this
round):**
- **[P2]** Quantity stepper touch targets under 44×44px on mobile (`/impeccable adapt`)
- **[P2]** No `loading="lazy"` on any of the 6 `<img>` usages — Shop page eagerly loads all 17 product photos (`/impeccable optimize`)
- **[P3]** `src/components/ui/Button.tsx`/`LinkButton` fully built but never imported anywhere — dead code (`/impeccable distill`)

**Already fixed before this audit ran:** `isDemoBusinessData` in
`business.ts` was an inert, zero-reference export (code-review caught it
independently) — removed.

**Doc-accuracy bug also caught and fixed in this pass:** `DEMO-DATA-README.md`
had drifted stale — it said "12 real photos / 5 fully demo" when the actual
verified count (via a script reading `products.ts`, not memory) was 10 real +
3 licensed-stock + 4 fully demo = 13 with an image, 4 without. This is the
second time this project's own status docs have drifted from actual code
state (see the 2026-08-14 entry above) — worth remembering that these docs
need periodic re-verification against the code, not just trusted at face
value.

Full re-verification after the harden fix: 0 axe violations × 8 routes,
keyboard nav clean, 0 tablet overflow, clean production build.

**Follow-up: ran the remaining 3 fixes (`/impeccable adapt`, `/impeccable optimize`,
`/impeccable distill`) same day.**

- **adapt**: quantity stepper −/+ buttons and the header hamburger button resized to
  `h-11 w-11` (44×44px). Verified directly (not assumed): measured every interactive
  element on the mobile product-detail page afterward — zero remaining targets under
  44×44px among the primary controls.
- **optimize**: added `loading="lazy" decoding="async"` to `ProductCard`, and to the
  gallery thumbnail strip in `ProductGallery` (the main hero image and Hero.tsx's
  above-the-fold collage stay eager, per the rule against lazy-loading above-fold
  content). Verified: 13 lazy `<img>` tags render on the Shop page — correctly 13,
  not 17, since 4 products still use the icon placeholder (`images: []`) and never
  render an `<img>` at all.
- **distill**: deleted `src/components/ui/Button.tsx`/`LinkButton` — confirmed zero
  importers before removing, build stays clean.

Full re-verification after all three: 0 axe violations × 8 routes, keyboard nav
clean, 0 tablet overflow, clean production build.

**Follow-up: `/impeccable polish` same day.** No prior stored critique existed
(checked via `critique-storage.mjs`, exit 2). Walked the full path fresh —
Home, Shop, Product Detail, Bulk Orders, About, Contact, FAQ, 404 — at both
desktop and mobile, since a lot had changed since the last visual review
(real photos, text-size bump, spacing pass, touch-target/lazy-load fixes).

Found and fixed 2 things a fresh look surfaced that automated checks
wouldn't catch:

- **[Optical alignment]** About page's "What we work with" grid has 5
  categories in a 2-column layout, leaving the last card orphaned with
  awkward empty space beside it on desktop (mobile stacks single-column and
  was already fine). Fixed by spanning the last item full-width whenever the
  list has an odd count — reads as a deliberate closing item now, and the
  fix is general (works if a category is ever added/removed, not hardcoded
  to "5").
- **[Temporary artifact]** `image.png` — the client's original raw logo
  file — had been sitting at the app root since it was processed into
  `public/logo.png` early in the session. Confirmed zero references
  anywhere, removed it.

Everything else inspected (Bulk Orders form, Contact rows, FAQ accordion,
404, mobile Shop grid, mobile product gallery) was already consistent —
no further changes made. Full re-verification: 0 axe violations × 8 routes,
keyboard nav clean, 0 tablet overflow, clean production build.

---

## 1. Accessibility — automated audit (axe-core)

**First run, before this pass:** 7 WCAG2AA color-contrast violations across every route.
Real bug, not a false positive — the initial palette (`#c1502f` terracotta, `#ab7f28`
brass, `#9c8c78` ink-faint, `#25d366` WhatsApp green) failed the 4.5:1 text-contrast
threshold against this site's warm light backgrounds. Worst offender: white text on the
WhatsApp button's brand green was **1.98:1** — the single most important CTA in the
product was hardest to read.

**Fix:** darkened the four tokens in `src/index.css`, calculated (not guessed) against
every background each color actually appears on:

| Token | Before | After | Worst-case ratio after |
|---|---|---|---|
| `--color-primary` | `#c1502f` (3.64–4.57:1) | `#9c3f24` | 5.14:1 |
| `--color-primary-dark` | `#9c3f24` | `#7a2f1a` | 7.21:1 |
| `--color-secondary` | `#ab7f28` (2.80–3.51:1) | `#7a5a17` | 4.91:1 |
| `--color-ink-faint` | `#9c8c78` (2.52–3.16:1) | `#655847` | 5.33:1 |
| `--color-whatsapp` | `#25d366` (1.98:1) | `#13793a` | 5.49:1 |
| `--color-whatsapp-dark` | `#1da851` | `#0f6230` | 7.47:1 |

**Second run, after the fix:** 0 violations on all 7 routes (home, shop, product detail,
bulk orders, about, contact, 404), `wcag2a`/`wcag2aa`/`wcag21a`/`wcag21aa` rule sets.

Re-screenshotted the whole site after the change — the darker palette reads as slightly
richer/more grounded, not washed out; no visual regression.

**Not covered:** `--color-success` / `--color-error` tokens are defined but currently
unused anywhere in the app (no form has validation states yet), so they were left
unverified. If a fallback contact form or bulk-form validation is ever added, check
those two against their backgrounds before using them for text.

## 2. Keyboard navigation — actually tested, not just built

Simulated real `Tab` key presses (Playwright `page.keyboard.press("Tab")`, not just
reading the DOM) across Home, Shop, Product Detail, and Bulk Orders — 12 stops each.

Result: every stop landed on a real interactive element in a sensible order (logo →
nav → header WhatsApp CTA → page content), and every stop had a visible focus
indicator (`outline` or `box-shadow` computed and non-zero at the moment of focus).
Zero silent-focus elements found.

## 3. Tablet viewport (768×1024) — found and fixed a real bug

Screenshotted all 7 routes at tablet width. Six were fine. **Home's header was not** —
at 768px the full desktop nav (logo + 5 links + WhatsApp button) didn't fit and the
"Gifties For You" wordmark wrapped to two lines, visibly cramped.

Root cause: the header's responsive breakpoint switched from the mobile hamburger menu
to the full nav row at Tailwind's `md` (768px) — exactly where it stopped fitting.

**Fix:** moved that breakpoint from `md:` to `lg:` (1024px) in `Header.tsx`, so
768–1023px now gets the same hamburger + WhatsApp-button pattern already built and
verified for mobile, instead of a cramped desktop nav. Re-screenshotted — clean at
768px, and confirmed the 1440px desktop nav still renders correctly above 1024px.

No horizontal overflow found on any other route at 768px. Zero console errors at
tablet width.

## 4. The Generic AI Test — done honestly, with a real finding

`design-director.md` §16 asks: *"Could this be mistaken for a random AI-generated
website? If yes, identify why, then redesign."* Doing this properly means finding
something, not rubber-stamping the build. One real finding:

**`TrustStrip.tsx` (the "Talk to a real person / Built for bulk / Customization on
request" row) was a plain 3-icon-column feature row** — icon, bold title, one line of
description, repeated three times in a grid. That is one of the most recognizable
generic-SaaS/AI-template patterns there is. The *content* was honest and
product-specific (no fabricated stats), but the *form* could have belonged to any
product — a genuine failure of the test as originally written, even though it passed a
casual look.

**Fix:** rebuilt it to use the site's own gift-tag "punch-hole" motif instead of a
neutral icon row — each point is now a tinted, slightly-rotated tag card (alternating
the site's actual accent tints, straightening on hover) rather than an interchangeable
feature block. It now visually belongs to this specific site's language instead of
being swappable into any template.

**What I judged as passing, and why (not just asserted):**
- Typography (Fraunces + Manrope) is not the Inter/Poppins-default combination that
  dominates AI-generated output.
- Palette is warm terracotta/brass/ivory — not purple/blue gradient, not
  glassmorphism, not stark white or neon-on-black.
- The core structural decision — no cart, WhatsApp-first enquiry everywhere — is a
  real product-shaped choice, not a template default (a generic AI build defaults to
  cart+checkout regardless of whether it was asked for).
- Placeholder product imagery is an intentional icon-on-tinted-tile treatment, not
  generic stock photography or gray boxes standing in as if they were real photos.

**What I'm not going to overclaim:** the Home page's macro rhythm (hero → info strip →
occasion grid → category grid → featured products → CTA banner → footer) is still a
familiar single-scroll marketing-site shape. I'm judging that acceptable rather than
generic *for this specific product* — it's a small catalogue business genuinely suited
to a single scrolling page, and it matches how the actual market references (Wedtree,
Thambulaaa) structure their own homepages — but that's a judgment call, not a provably
"passed" test the way the contrast numbers are provably fixed. Worth a second look if
this ever feels flat once real product photography replaces the placeholders.

## 5. Per-screen state matrix

State handling per `design-director.md` §7 and §21, checked against actual code —
not just described:

| Screen | Loading | Empty | Error / not-found | Success | Edge cases |
|---|---|---|---|---|---|
| Home | N/A — fully static, no async data | N/A — demo data always present | N/A | N/A (WhatsApp CTA hands off site-side) | `FeaturedProducts` returns `null` if no featured products exist, instead of rendering an empty section |
| Shop | N/A — synchronous client-side filter | **Verified live**: filtering to zero results renders `EmptyState` + an "Ask us directly" WhatsApp fallback, not a blank grid | N/A | N/A | Search + category + occasion + price filters all combine (AND logic); each is independently clearable |
| Product Detail | N/A | N/A | **Verified live**: an unknown slug (`/product/this-slug-does-not-exist`) redirects to `/shop` via `<Navigate replace>` rather than crashing or showing a blank page | N/A (WhatsApp hand-off) | Quantity input clamped to a minimum of 1 in both the stepper and manual entry; customization field only renders when `product.customizable` is true |
| Bulk Orders | N/A | All fields optional — no empty-state block needed since the page itself doesn't depend on data existing | **Not implemented**: there is no field validation, because nothing here can fail server-side — the "submission" is just building a WhatsApp draft. Worth knowing: it's possible to tap the button with every field blank | N/A (WhatsApp hand-off) | Button label changes from "Enquire on WhatsApp" to "Send this enquiry on WhatsApp" once any field has content |
| About | N/A | N/A | N/A | N/A | Fully static |
| Contact | N/A | N/A | N/A | N/A | Fully static; `tel:`/`mailto:` links use the same config value as the visible text |
| 404 (NotFound) | N/A | — | **This route IS the app's error state** for any unmatched path — verified live via `/this-does-not-exist`, zero console errors | N/A | — |

**Honest gap acknowledged, not fixed:** there are genuinely no loading states anywhere
in this build, because there is no asynchronous data fetching anywhere — every screen
reads from a bundled local array. That's correct for what this V1 is, not a missed
task. It stops being correct the moment this becomes a real backend-driven site
(catalogue from an API, form submissions to a server) — at that point loading/error
states will need to be designed for real, not inherited from this doc.

## 6. Two judgment calls made without checking back — documented, not silently kept

Two decisions during Stage 2 diverged from what the Stage 1 discovery docs actually
said, and were made unilaterally rather than flagged at the time.

**"Bulk Orders" as a top-level nav item.** `frontend-design/04-information-architecture.md`
explicitly recommended a *shallow* nav (Home / Shop / About / Contact only, with
occasion/price browsing folded into the Shop page) to keep the header lean given the
no-cart/no-account scope. The Stage 2 build prompt separately asked for a bulk/event
enquiry experience, and I added it as a fifth top-level nav item rather than nesting it
under Shop or Contact. Kept as-is: bulk/event orders are explicitly called out as a
core part of this business ("the business also handles bulk orders for
functions/events"), so surfacing it at the same level as Shop seems right — but this
was my call, not something confirmed with you.

**No fallback contact form.** `frontend-design/13-assets-and-content.md` left "does the
client want a non-WhatsApp enquiry form?" as an open question. I built the Contact page
without one — WhatsApp, phone (`tel:`), email (`mailto:`), and Instagram only. Reasoning:
a form with no backend to receive it would either silently do nothing or need its own
(currently nonexistent) submission handling, and the existing channels are all real,
functioning contact methods. But this was a decision, not a neutral default, and the
open question in the Stage 1 doc is still genuinely open if you want a form later.

---

## Summary of what changed in this pass

- `src/index.css` — 6 color tokens darkened to pass WCAG AA, documented inline
- `src/components/layout/Header.tsx` — responsive breakpoint moved from `md` to `lg` to fix a real tablet layout bug
- `src/components/home/TrustStrip.tsx` — redesigned from a generic icon-row into the site's own gift-tag visual language
- `package.json` — added `axe-core` as a dev dependency for this and future audits
- Full re-verification: `npm run build` clean, 0 axe violations × 7 routes, keyboard nav confirmed on 4 key pages, 0 horizontal overflow × 7 routes at 768px, 0 console errors at desktop/tablet/mobile

---

## 2026-08-15 — Theme finalized: "Blush Rose Garden", palette locked in as the permanent default

Client compared the original terracotta/brass system against two contrast-verified
candidate palettes (built from two real reference mood-board images) via a temporary
live in-app switcher, and chose **Blush Rose Garden**. That decision is now permanent:

- `src/index.css` — the Rose palette's values became the base `@theme` block itself
  (replacing the old terracotta/brass values in place, not layered on top); the
  `:root[data-theme="rose"]` / `:root[data-theme="jewel"]` override blocks and the
  now-unused Jewel palette were deleted.
- `src/components/layout/ThemeSwitcher.tsx` deleted, its import/usage removed from
  `App.tsx` — it was explicitly built as a temporary comparison tool, not a shipped
  feature.
- **Real regression caught during this cleanup, not before**: re-running the full
  axe-core sweep against the *locked-in* default (rather than the switcher's
  click-to-activate preview state) surfaced a WCAG AA failure the comparison pass
  missed — `--color-secondary` (#5c6449) on `--color-canvas-deep` (#e5bca9) scored
  3.58:1 against a 4.5:1 requirement on two small-caps eyebrow labels ("Shop by
  category", "How it works"). The original comparison sweep evidently didn't hit that
  exact node/background pairing. Computed a darker replacement (`#454a37`) and verified
  it against every background the token is actually used on — canvas 7.80, canvas-deep
  5.29, surface 8.98, secondary-soft 7.25, primary-soft 5.89 — all with real margin, not
  just barely over 4.5. **Lesson for future palette work on this project: verify the
  final locked-in default state itself, not only the preview/switcher state** — they
  are not guaranteed to hit identical DOM/background combinations depending on what
  the verification script happens to click through.

## 2026-08-15 — Floral warmth pass: botanical background + falling petals (Hero + closing CTA)

Client feedback after picking Blush Rose Garden: flat color swapping didn't carry the
warmth of the reference mood-board, which showed real rose/leaf photography behind the
palette swatches — asked for "petals or something" plus background imagery so the site
"feels much more like a warm thing." Explicitly asked to use the newly-installed
`emilkowalski/skill` `animate` skill's methodology rather than a freehand approach.

**Design decision:** rather than licensing/sourcing a stock floral photo (risk of the
same competitor-photo/copyright concerns already declined twice this project), built a
hand-drawn line-art rose + leaf SVG tile (`.bg-botanical` in `index.css`, embedded as a
CSS data-URI) in the palette's own soft tones — fully on-brand, recolorable, and zero
licensing exposure, while still delivering the "flowers/leaves behind it" feeling from
the reference image.

**Gate check (per the animate skill's own framework):** continuous ambient decoration
doesn't map cleanly onto the skill's interaction-tied purposes (feedback/spatial/
state/delight); justified instead under the skill's explicit marketing-surface carve-out
— the Home hero is a Persuade-mode surface where atmosphere is doing real persuasive
work, not a functional daily-use UI a detector-driven "why does this move" test would
flag.

**Implementation, following the skill's technical rules exactly:**
- CSS `@keyframes` animation (not JS/Framer Motion) — this is "predetermined motion that
  must stay smooth while the page is busy," which the skill directs to CSS since it runs
  off the main thread.
- `transform` + `opacity` only (`translate` + `rotate` for fall/drift, `opacity` for
  fade-in/out) — no layout-triggering properties animated.
- `linear` easing — the skill's table specifies `linear` for constant/ambient motion,
  not an eased curve.
- Mandatory `prefers-reduced-motion` gating — added a specific `.petal { display: none }`
  rule rather than relying on the site's blanket near-zero-duration override, since a
  frozen mid-fall petal under the blanket rule would've looked like a rendering bug
  rather than an intentional state. Verified directly (Playwright `reducedMotion:
  "reduce"` context): 0 visible `.petal` elements, confirmed via computed `display`.
- `pointer-events: none` + `aria-hidden="true"` on both decorative layers — purely
  atmospheric, carries no information, must never intercept clicks or reach a screen
  reader.
- Scope kept deliberately narrow — the animated petals appear **only** in the Home hero
  (the one "moment"); the botanical background texture alone (no motion) is echoed once
  more, subtly, behind the closing WhatsApp CTA banner. Not applied to Shop, Product,
  or any Operate-mode page, per the skill's explicit "marketing surfaces only" guidance
  for this class of effect.

**Verified, not asserted:**
- `npx tsc --noEmit` clean, `npm run build` clean.
- axe-core (wcag2a/2aa/21a/21aa) on `/` and `/shop`: 0 violations (after the secondary-
  color fix above).
- Reduced-motion Playwright context: 0 visible petal elements.
- Screenshots at desktop (1440px) and mobile (390px) confirm the botanical pattern and
  petals render behind text with full legibility preserved, and the WhatsApp banner
  echo doesn't reduce button/text contrast.

**Files touched:** `src/index.css` (`.bg-botanical`, `.petal`, `@keyframes petal-fall`,
reduced-motion rule), `src/components/home/FloatingPetals.tsx` (new),
`src/components/home/Hero.tsx`, `src/components/home/WhatsAppBanner.tsx`.

---

## 2026-08-15 — Real-photo hero background (replacing the flat line-art) + a genuine "background animation"

Follow-up feedback on the floral warmth pass above: the flat SVG line-art still read as
"just a color palette," not the real photography feel of the reference mood-board. Ganesh
explicitly said not to source new stock/Pinterest images this time — use the client's own
real product photos already in the project — and pointed at a background treatment on
another of his own sites (`bros-production-v2`) as the bar for "feels like a complete
project."

**Reference check, not guesswork:** loaded `ganesh-0509.github.io/bros-production-v2` in
a real Playwright browser (WebFetch can't render its client-rendered SPA — confirmed 0
canvases, 73 SVGs, 2 videos via `document.querySelectorAll`, then screenshotted). The
"background animation" there is a large, low-opacity brand-watermark illustration behind
the hero content plus a text-cycling headline — not a particle/canvas effect. Took the
underlying idea (one large, real, ambient background element with genuine depth) rather
than copying the specific execution.

**Sourcing decision:** considered searching Pexels again (as done earlier for the one
demo-only planter product) but Ganesh redirected to using photos already supplied by the
client instead — a stronger choice anyway, since it's the client's own real inventory, not
generic stock, and sidesteps any licensing question entirely. Reviewed 5 real product
photos already in `public/products/` as background candidates before picking one:
- `floral-jar-peacock.jpg` — good blush/cream/gold tones, but the peacock's dark neck
  silhouette survives heavy blur as an odd unexplained dark shape. Rejected.
- `silver-basket-favors-1.jpg`, `floral-jar-set-2.jpg` — both have the client's own
  "Gifties" hang-tag + phone number baked into the shot; a legible brand mark going soft
  and half-blurred in a decorative background reads as a mistake, not a choice. Rejected
  for this specific use (still fine as ordinary product photos elsewhere on the site).
- `ornate-kumkum-tin-pink.jpg` — nice pink/gold tins but shot on bright-green astroturf;
  clashes with the muted palette even desaturated. Rejected.
- `floral-jar-set-3.jpg` — cream/blush/gold/warm-brown, no harsh dark shapes, hang-tag only
  in one corner (cropped out before processing). **Used.**

**Processing:** a one-off `sharp` script (installed as a temporary devDependency, same
pattern as the earlier logo background-removal — not committed, `sharp` uninstalled again
after): cropped out the bottom strip with the hang-tag, resized to 1920×1200, reduced
saturation and lifted brightness slightly to sit inside the Rose palette, then a strong
Gaussian blur (radius 30) so it reads as an abstract warm backdrop rather than a
recognizable product photo competing with the actual product grid. Output is
`public/hero-bg.jpg`, **50KB** — heavy blur compresses extremely well, no page-weight cost.

**The actual "background animation":** a slow Ken-Burns drift on that background layer —
`transform: scale(1) → scale(1.09) translate(-1.5%, -1%)`, 34s, `ease-in-out`, alternating
infinitely. This is the same technique already validated on a past client
(Sri Arumugam's hero got "more visible motion... Ken-Burns hero drift" per that project's
history) — proven to read as premium rather than gimmicky. Per the `animate` skill: this
is "moving on screen" → `ease-in-out`; added `--ease-out`/`--ease-in-out` as real tokens in
`index.css` (`@theme`) rather than inlining a bezier value, since this is the first
"movement" curve on this project and future animation work should extend the same tokens
instead of forking new ones.

**Legibility:** two gradient overlay layers (left-to-right + top-to-bottom, both in
`--color-canvas` at varying opacity) sit between the photo and the content — verified with
axe-core, not assumed: 0 contrast violations on `/` after the change, same as before.

**Reduced motion:** no special override needed here (unlike the petals) — the site's
existing blanket `animation-duration: 0.01ms; animation-iteration-count: 1` rule makes the
Ken-Burns animation play forward once near-instantly and settle on its end frame, which
just looks like a normal, slightly-zoomed static photo. Confirmed visually via the
reduced-motion Playwright screenshot: photo present, petals absent, no broken/blank state.

**Files touched:** `src/index.css` (`--ease-out`/`--ease-in-out` tokens, `.hero-bg-photo`,
`@keyframes hero-drift`), `src/components/home/Hero.tsx`,
`public/hero-bg.jpg` (new, derived from the client's own `public/products/
floral-jar-set-3.jpg`). `.bg-botanical` line-art kept only on the WhatsApp banner.

**Same-day correction:** Ganesh reported the background as "basically not there" on his
own screen. Checked the actual reason rather than just re-asserting it worked: the
legibility overlay (added for worst-case safety) was a full-width gradient at up to 85%
canvas opacity, so on a wide viewport almost the entire hero — everything left of ~85%
width — was effectively solid canvas color again, with the photo only peeking through a
thin strip on the right edge. Fixed properly, not just nudged: reprocessed the source
photo with lighter blur/desaturation (`blur(20)` not `30`, `saturation 0.95` not `0.8`) so
it holds more real color once less covered, and replaced the full-width scrim with one
concentrated behind the text column only (`from-canvas via-canvas/55 via-38% to-transparent
to-58%` — fades out right around the `lg:grid-cols-2` split). Re-verified after the change,
not assumed fixed: 0 axe violations across all 7 routes, **and specifically re-checked at
390px mobile** (0 violations) since mobile is the real contrast stress case — the text
column is the entire viewport there, so the lightened scrim has the least room to hide
behind. Screenshotted at 1920/1440/390 to confirm the photo now reads clearly at every
width, not just in isolated dev-server testing.

**Second correction, same day:** Ganesh's next screenshot showed the photo now visible but
still read as an unrecognizable soft color wash — asked to "take out the blurry effect."
Reduced `sharp` processing from `blur(30)`→`blur(6)` and brought saturation/brightness
back to near-neutral (`1`/`1.02` instead of `0.8`/`1.1`), so the actual gold flower and
jar shapes read clearly instead of dissolving into an abstract gradient. Re-verified after
the change: 0 axe violations across all 7 routes and specifically at 390px mobile again
(detail increasing was the real risk to contrast, not a formality), clean build,
screenshots confirm the photo is now genuinely recognizable at 1920/1440/390 while text
stays fully legible.

**Third correction, same day:** Ganesh asked to remove the blur entirely. Dropped the
`sharp` `.blur()`/`.modulate()` calls altogether — `hero-bg.jpg` is now the real photo at
full sharpness (still cropped to drop the hang-tag corner), 138KB, still no performance
concern. This is the highest-risk version for text contrast since there's no blur
softening the image's own light/dark regions anymore, so re-verified carefully rather than
assuming the existing scrim would still hold: 0 axe violations across all 7 routes,
re-checked specifically at 390px mobile (0 violations), clean build. Screenshots confirm
the gold lotus flower, wood lid and jar are now clearly, sharply visible behind the hero
content, with the text-column scrim (unchanged from the previous pass) still doing the
full legibility job on its own.
