# Redesign Change Log

Tracks what gets changed or removed during the redesign, so anything cut now can be added back later.

**Baseline:** commit `6cbe1b7` ("Working version before redesign") on `main`.
To see or copy the original code for anything listed below:

```
git show 6cbe1b7:index.html
```

---

## Parked for later (removed, may come back)

Things taken out that you plan to re-add. Move an item to "Restored" once it's back.

| Date | What | Where it was (original `index.html`) | Notes / why removed |
|------|------|--------------------------------------|---------------------|
| 2026-09-26 | Stats bar (500+ / 200+ / 50+) | L395 | Homepage now mirrors the old Framer "App Link" page only. Numbers were placeholders. |
| 2026-09-26 | Features `#features` | L416 | Same reason. The `feat-card` styles are kept in `styles.css`. |
| 2026-09-26 | App preview `#screenshots` | L462 | Same reason. The `phone` frame styles are kept. |
| 2026-09-26 | How it works `#how-it-works` | L502 | Same reason. The `step-badge` styles are kept. |
| 2026-09-26 | Reviews `#reviews` | L555 | Same reason. The testimonials were made up. The `testi-card` styles are kept. |
| 2026-09-26 | Download CTA `#download` | L615 | Same reason. |
| 2026-09-26 | Nav "Download Free" button | L300 | The old site nav had no CTA. |
| 2026-09-26 | Google Play buttons | L359, L645 | The old site only linked to the App Store. |

## Changed

Things kept but reworked.

| Date | What | Before | After |
|------|------|--------|-------|
| 2026-09-26 | Page structure | One-page site, inline `<style>` + Tailwind config | Multi-page. Shared `styles.css`, `tailwind-config.js` and `site.js` |
| 2026-09-26 | Nav links | Features / Preview / How It Works / Reviews (anchors) | App Link / Waitlist / Help / Follow Us (pages, from the old Framer site), with a current-page state. The mobile menu is now wired up. |
| 2026-09-26 | Hero | "Your Neighborhood Produce Marketplace" + store badges + placeholder phone | Old App Link copy + "Click here to get the app" button + QR card + real Blueberries mockup |
| 2026-09-26 | Logo | `brand_assets/Nrhoot_logo no background.png` (heavy padding, and 404s on local `serve.mjs` because of the %20) | `assets/logo-trimmed.png` (same logo, padding trimmed) |
| 2026-09-26 | Footer | Section anchor links, mint background | Page links + Contact, white background (follows the hero wave) |

## Removed for good

Things cut with no plan to bring back.

| Date | What | Reason |
|------|------|--------|
| | | |

## Restored

| Date | What | Notes |
|------|------|-------|
| | | |

---

## Baseline inventory (what the site had before the redesign)

For reference, each piece and its line range in the original `index.html`:

- **Nav** (L287): logo, links to Features / Preview / How It Works / Reviews, "Download Free" button, mobile menu button (not wired up)
- **Hero** (L314): "Your Neighborhood Produce Marketplace" headline, intro copy, CTAs
- **Stats bar** (L395): 500+ Active Listings, 200+ Community Members, 50+ Neighborhoods
- **Features** `#features` (L416): Browse Local Produce, Post Your Listings, Build Community
- **App preview** `#screenshots` (L462): "See It in Action" screenshots
- **How it works** `#how-it-works` (L502): three steps (Set Up Profile, Browse or Post, Connect & Exchange)
- **Reviews** `#reviews` (L555): "Loved by the Community" testimonials
- **Download CTA** `#download` (L615): "Start Growing Your Community Today"
- **Footer** (L660): logo, tagline "Fresh produce. Real neighbors. True community.", nav links, Contact mailto link, copyright
- **Script:** scroll-reveal animation (`.reveal` elements fade in via IntersectionObserver)
