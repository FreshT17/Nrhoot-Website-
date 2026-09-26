# Todo

Checkable plan for the current non-trivial task. Replace the contents when starting a new task.

## Task: Migrate the old Framer site (4 pages) into the new design system

Full plan: `C:\Users\15622\.claude\plans\pasted-content-id-8c5f-i-m-migrating-pure-platypus.md`

- [x] 0. Capture old-site screenshots (scratchpad) and download old images to `assets/old-site/`
- [x] 1. Homepage `index.html`: shared `styles.css` + `tailwind-config.js`, nav (4 pages), App Link hero, QR card, footer. **Stop for review.**
- [x] 2. `waitlist.html`: form components. **Stop for review.**
- [x] 3. `help.html`. **Stop for review.**
- [x] 4. `follow-us.html`: social button. **Stop for review.**
- [x] 5. Lessons + Review section

## Review

- **Result:** The 4 old Framer pages are rebuilt in the new design system: `index.html` (App Link), `waitlist.html`, `help.html` and `follow-us.html`. Shared `styles.css`, `tailwind-config.js` and `site.js`. New components: nav current-page state + mobile menu, `.qr-card`, `.or-divider`, `.mockup`, `.form-card`/`.field`/`.input`, `.social-btn`. Old images are in `assets/old-site/`, the trimmed logo in `assets/logo-trimmed.png`. The removed homepage sections are logged in `redesign-log/CHANGES.md`.
- **Verified by:** For each page, 2+ screenshot rounds at 1440 and 375px, compared against the old-site captures for structure and copy. Also checked: form `required` validation and the UI-only submit message, mobile menu toggle, focus/hover states, all local links and assets returning 200, and no console errors. The user approved each page before the next was started.
- **Follow-ups:**
  - Wire the Waitlist and Help forms to a backend (`form[data-ui-only]` handler in `site.js`).
  - Decide whether to delete the unused `assets/old-site/phone-blueberries-lg.png` and `phone-waitlist-a/b.png`.
