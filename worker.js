export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    }

    // Handle waitlist API
    if (url.pathname === '/api/waitlist' && request.method === 'POST') {
      try {
        const { name, email, device } = await request.json()

        if (!email) {
          return new Response(JSON.stringify({ error: 'Email is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          })
        }

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

        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        })
      }
    }

    // Serve static assets for everything else
    return env.ASSETS.fetch(request)
  },
}
