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
| | | | |

## Changed

Things kept but reworked.

| Date | What | Before | After |
|------|------|--------|-------|
| | | | |

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
