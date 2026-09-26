// Google Apps Script bound to the "Nrhoot waitlist request" sheet.
// Deployed as a Web app (Execute as: Me, Who has access: Anyone); the /exec URL
// goes in waitlist.html's data-sheet-endpoint. After editing, redeploy via
// Deploy → Manage deployments → Edit → New version, or the site keeps the old code.

// Receives waitlist submissions from nrhoot website and appends a row.
// Help-page questions (form=help) are forwarded to Zoho Flow, which emails them.
const SHEET_NAME = 'Sheet1';
// Keep the real Zoho Flow URL only in Code.gs; this repo copy is on GitHub.
const ZOHO_HELP_WEBHOOK = 'PASTE_ZOHO_WEBHOOK_URL_HERE';

function doPost(e) {
  if ((e.parameter || {}).form === 'help') return forwardHelp(e.parameter);

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

// Sends the question to Zoho Flow with the same keys the old Framer form used
// (note the trailing space in "Question box "), so the flow's email mapping still works.
function forwardHelp(p) {
  const name = String(p.name || '').trim().slice(0, 200);
  const email = String(p.email || '').trim().slice(0, 200);
  const question = String(p.question || '').trim().slice(0, 5000);

  if (!name || !question || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'invalid' });
  }

  const res = UrlFetchApp.fetch(ZOHO_HELP_WEBHOOK, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ 'Name': name, 'Email': email, 'Question box ': question }),
    muteHttpExceptions: true
  });
  const code = res.getResponseCode();
  return json({ ok: code >= 200 && code < 300 });
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
