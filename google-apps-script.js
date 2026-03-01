/**
 * Drive Prep — Google Apps Script for Waitlist
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW TO SET UP:
 *
 * 1. Open Google Sheets and create a new spreadsheet named "Drive Prep Waitlist"
 *
 * 2. In the first row, add these headers in columns A–D:
 *    A1: Timestamp  |  B1: Name  |  C1: Email  |  D1: Device
 *
 * 3. In the spreadsheet, go to:
 *    Extensions → Apps Script
 *
 * 4. Delete any placeholder code and paste ALL of this file's contents in.
 *
 * 5. Click Save (Ctrl/Cmd + S)
 *
 * 6. Click "Deploy" → "New deployment"
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Click "Deploy" and authorise when prompted
 *
 * 7. Copy the "Web app URL" that appears.
 *
 * 8. In src/App.jsx, replace:
 *    const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'
 *    with:
 *    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ID/exec'
 *
 * That's it! Submissions from the waitlist form will appear in your sheet instantly.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// Replace this with your actual Google Sheet ID (found in the sheet URL)
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';
const SHEET_NAME = 'Sheet1'; // Change if your sheet tab has a different name

/**
 * Handles POST requests from the waitlist form.
 * Appends name, email, device, and timestamp to the sheet.
 */
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    const params = e.parameter;
    const name = params.name || '';
    const email = params.email || '';
    const device = params.device || '';
    const timestamp = params.timestamp || new Date().toISOString();

    // Append a new row
    sheet.appendRow([timestamp, name, email, device]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests (useful for testing the deployment is live).
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Drive Prep Waitlist API is live' }))
    .setMimeType(ContentService.MimeType.JSON);
}
