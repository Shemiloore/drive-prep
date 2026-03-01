// Local dev API server — runs alongside Vite
import { createServer } from 'http'
import { google } from 'googleapis'
import { readFileSync } from 'fs'

// Same env reader as test-sheets.mjs (proven working)
const env = readFileSync('.env.local', 'utf8')
  .split('\n')
  .reduce((acc, line) => {
    const [key, ...val] = line.split('=')
    if (key?.trim()) acc[key.trim()] = val.join('=').trim().replace(/^"+|"+$/g, '')
    return acc
  }, {})

const SHEET_ID = '1wtJN1MGIIOBZO71GfB0vzg07UtCuP2DO2gsNWDLIagc'
const PORT = 3001

const server = createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.writeHead(200).end()
  if (req.url !== '/api/waitlist' || req.method !== 'POST') {
    res.writeHead(404).end()
    return
  }

  let body = ''
  req.on('data', chunk => body += chunk)
  req.on('end', async () => {
    try {
      const { name, email, device } = JSON.parse(body)

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
        requestBody: { values: [[timestamp, name || '', email, device || '']] },
      })

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true }))
      console.log(`✅ Waitlist entry added: ${email} (${device})`)
    } catch (err) {
      console.error('❌', err.message)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: err.message }))
    }
  })
})

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} busy — close old terminals and run npm run dev again.`)
    process.exit(1)
  }
})

server.listen(PORT, () => console.log(`✅ API server running on http://localhost:${PORT}`))
