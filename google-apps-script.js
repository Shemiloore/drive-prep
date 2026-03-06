/**
 * Drive Prep — Google Apps Script
 * Extensions → Apps Script → paste this → Save → Deploy → New version
 */

const SHEET_ID = '1wtJN1MGIIOBZO71GfB0vzg07UtCuP2DO2gsNWDLIagc';

function doGet(e) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];

  const name      = e.parameter.name      || '';
  const email     = e.parameter.email     || '';
  const device    = e.parameter.device    || '';
  const timestamp = e.parameter.timestamp || new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' });

  if (email) {
    sheet.appendRow([timestamp, name, email, device]);
  }

  return ContentService
    .createTextOutput('OK')
    .setMimeType(ContentService.MimeType.TEXT);
}
