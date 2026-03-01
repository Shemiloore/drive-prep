// Quick test — run with: node test-sheets.mjs
import { google } from 'googleapis'
import { readFileSync } from 'fs'

const env = readFileSync('.env.local', 'utf8')
  .split('\n')
  .reduce((acc, line) => {
    const [key, ...val] = line.split('=')
    if (key) acc[key.trim()] = val.join('=').trim().replace(/^"|"$/g, '')
    return acc
  }, {})

const SHEET_ID = '1wtJN1MGIIOBZO71GfB0vzg07UtCuP2DO2gsNWDLIagc'

async function test() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A:D',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [[timestamp, 'Test Name', 'test@driveprep.com', 'iPhone']] },
    })

    console.log('✅ SUCCESS — check your Google Sheet for the new row!')
  } catch (err) {
    console.error('❌ FAILED:', err.message)
  }
}

test()
