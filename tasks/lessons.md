# Lessons learned

Update this file after user corrections or post-mortems so the same mistakes are not repeated.

## How to add an entry
- One short **pattern** (what went wrong or what to do instead).
- Optional: **trigger** (when this applies) and **fix** (the rule to follow).
- Newest entries go at the top of **Entries**. Use absolute dates (YYYY-MM-DD), never "yesterday".
- If a later finding proves an entry wrong, correct that entry in place and say what changed. Don't leave contradictory entries.

---

## Entries

### 2026-09-26 — Local preview gotchas (screenshots, serve.mjs, old assets)
- **Pattern:** `screenshot.mjs` hardcodes `C:/Users/nateh/...` for Puppeteer and Chrome. Those paths don't exist on this machine (user `15622`), so it fails.
- **Fix:** Use Playwright from the session scratchpad (`npm i playwright`; browsers are already cached in `~/AppData/Local/ms-playwright`). Point `screenshot.mjs` at a local install only if the user approves editing it.
- **Pattern:** `serve.mjs` doesn't `decodeURIComponent` the request path. Any asset with a space (`brand_assets/Nrhoot_logo%20no%20background.png`) 404s locally, though it works on real hosts. This is why the logo never showed in local screenshots.
- **Fix:** Pages use `assets/logo-trimmed.png` (no spaces, padding trimmed). Avoid spaces in new asset paths.
- **Pattern:** The old Framer phone-mockup PNGs (`assets/old-site/phone-*.png`) include the phone frame, with white corners around it. Nesting them in the CSS `.phone` frame draws a second frame.
- **Fix:** Use `<div class="mockup"><img class="mockup-img"></div>`. The `clip-path` on `.mockup-img` removes the corners, and the wrapper carries the shadow so the clip doesn't cut it off.

### 2026-09-26 — Capturing the old Framer site
- **Pattern:** The project has no package.json, so Playwright isn't installed locally. Framer pages also lazy-load images and fade sections in as you scroll.
- **Trigger:** Running `scripts/capture-old-site.mjs`, or any Playwright script in this repo.
- **Fix:** Install with `npm i -D playwright && npx playwright install chromium` before running. The script scrolls through each page before its full-page screenshot so lazy content renders. It was verified from a scratchpad copy, and all 4 pages rendered fully.

<!--
### YYYY-MM-DD — <short title>
- **Pattern:** ...
- **Trigger:** ...
- **Fix:** ... (include exact commands, file paths, and how to verify)
-->
