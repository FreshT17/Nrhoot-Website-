// Google Apps Script bound to the "Nrhoot waitlist request" sheet.
// Deployed as a Web app (Execute as: Me, Who has access: Anyone); the /exec URL
// goes in waitlist.html's data-sheet-endpoint. After editing, redeploy via
// Deploy → Manage deployments → Edit → New version, or the site keeps the old code.

// Receives waitlist submissions from nrhoot website and appends a row.
const SHEET_NAME = 'Sheet1';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const p = e.parameter || {};
    const name = clean(p.name);
    const email = clean(p.email);
    const city = clean(p.city);
    const early = p.early_access === 'yes' ? 'Yes' : p.early_access === 'no' ? 'No' : '';

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ ok: false, error: 'invalid' });
    }

    const date = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
      // Date, Name, Email, City, Test User?, Location(early access)
      .appendRow([date, name, email, city, '', early]);
    return json({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

// Trim, cap length, and stop values like "=HYPERLINK(...)" running as formulas.
function clean(v) {
  const s = String(v || '').trim().slice(0, 200);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
