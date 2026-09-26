// Captures the old Framer site as reference material.
// For each URL, saves a full-page screenshot and the rendered HTML to
// reference/old-site/<page-name>.png and reference/old-site/<page-name>.html.
//
// Usage:
//   npm i -D playwright && npx playwright install chromium
//   node scripts/capture-old-site.mjs

import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const URLS = [
  'https://nrhoot.framer.website/',
  'https://nrhoot.framer.website/old-home',
  'https://nrhoot.framer.website/help',
  'https://nrhoot.framer.website/social-media',
];

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(projectRoot, 'reference', 'old-site');

// "/" -> "home", "/social-media" -> "social-media"
function pageName(url) {
  const slug = new URL(url).pathname.replace(/^\/+|\/+$/g, '');
  return slug ? slug.replace(/\//g, '_') : 'home';
}

// Framer lazy-loads images and runs scroll-triggered "appear" animations,
// so scroll to the bottom in steps before taking the full-page shot.
async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = Math.floor(window.innerHeight * 0.75);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 250));
    }
    window.scrollTo(0, 0);
  });
}

async function main() {
  await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  let failures = 0;
  for (const url of URLS) {
    const name = pageName(url);
    try {
      console.log(`→ ${url}`);
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
      await scrollThrough(page);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      const pngPath = path.join(outDir, `${name}.png`);
      const htmlPath = path.join(outDir, `${name}.html`);
      await page.screenshot({ path: pngPath, fullPage: true });
      await writeFile(htmlPath, await page.content(), 'utf8');

      console.log(`  saved ${path.relative(projectRoot, pngPath)}, ${path.relative(projectRoot, htmlPath)}`);
    } catch (err) {
      failures++;
      console.error(`  failed: ${err.message}`);
    }
  }

  await browser.close();
  if (failures) process.exitCode = 1;
}

main();
