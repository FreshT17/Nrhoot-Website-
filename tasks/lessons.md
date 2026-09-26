# Lessons learned

Update this file after user corrections or post-mortems so the same mistakes are not repeated.

## How to add an entry
- One short **pattern** (what went wrong or what to do instead).
- Optional: **trigger** (when this applies) and **fix** (the rule to follow).
- Newest entries go at the top of **Entries**. Use absolute dates (YYYY-MM-DD), never "yesterday".
- If a later finding proves an entry wrong, correct that entry in place and say what changed. Don't leave contradictory entries.

---

## Entries

### 2026-09-26 — Multi-page structure after the Framer migration
- **Pattern:** The site is now 4 pages sharing `styles.css`, `tailwind-config.js` and `site.js`. Each page repeats the nav and footer markup, so a nav or footer change has to be made in all 4 files. Each page sets `aria-current="page"` on its own nav link (desktop + mobile lists).
- **Trigger:** Editing the nav, the footer, or adding a page.
- **Fix:** New pages: copy an existing page, then move `aria-current` in both nav lists. New forms: add `data-ui-only` plus a `<p class="form-status" role="status">` until a backend exists. Check links with a curl loop over every `href`/`src` on the 4 pages.

### 2026-09-26 — Local preview gotchas (screenshots, serve.mjs, old assets)
- **Pattern:** `screenshot.mjs` used to hardcode `C:/Users/nateh/...` for Puppeteer and Chrome. Those paths came from the template author's machine, so the script failed here (user `15622`).
- **Fix (2026-09-26, user-approved; replaces the earlier scratchpad-Playwright workaround):** `screenshot.mjs` now imports `puppeteer-core` (a devDependency in `package.json`) and launches the Windows Edge at `C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe`. After a fresh clone, run `npm install`. Verified with `node screenshot.mjs http://localhost:3000 edge-test`. Never hardcode another user's home folder.
- **Pattern:** `serve.mjs` didn't `decodeURIComponent` the request path, so any asset with a space (`brand_assets/Nrhoot_logo%20no%20background.png`) returned 404 locally, though it works on real hosts.
- **Fix (2026-09-26):** `serve.mjs` now decodes the path, and the logo with spaces returns 200. If port 3000 is already taken, check whether it's an old `serve.mjs` process that started before a code change, and restart it. Pages still use `assets/logo-trimmed.png` (no spaces, padding trimmed). Avoid spaces in new asset paths anyway.
- **Pattern:** `npm init -y` read the UTF-16 README into a garbled `description` field. Write `package.json` by hand (minimal: name, private, scripts, devDependencies).
- **Pattern:** Full-page screenshots can show a blank gap where a `.reveal` element is still mid-fade (380ms + delay). A blank area isn’t proof of a layout bug. After forcing `.on`, wait ~800ms before capturing.
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
