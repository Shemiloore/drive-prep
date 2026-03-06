// Local dev API server — runs alongside Vite
import { createServer } from 'http'
import { readFileSync } from 'fs'

const env = readFileSync('.env.local', 'utf8')
  .split('\n')
  .reduce((acc, line) => {
    const [key, ...val] = line.split('=')
    if (key?.trim()) acc[key.trim()] = val.join('=').trim().replace(/^"+|"+$/g, '')
    return acc
  }, {})

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

      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          email,
          attributes: {
            FIRSTNAME: name || '',
            DEVICE: device || '',
          },
          updateEnabled: true,
        }),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.message || `Brevo error ${response.status}`)
      }

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
