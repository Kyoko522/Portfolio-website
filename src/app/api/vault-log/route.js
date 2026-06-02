import { NextResponse } from 'next/server'

export async function POST(req) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'

  const ua = req.headers.get('user-agent') || 'unknown'
  const time = new Date().toUTCString()

  console.log(`[VAULT] ${time} | IP: ${ip} | UA: ${ua}`)

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  if (!webhookUrl) {
    console.warn('[VAULT] DISCORD_WEBHOOK_URL is not set — no notification sent.')
    return NextResponse.json({ ok: true, notified: false })
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: '🔐 Vault Visited',
          color: 0x845EC2,
          fields: [
            { name: 'IP',         value: `\`${ip}\``,   inline: true },
            { name: 'Time',       value: `\`${time}\``, inline: false },
            { name: 'User Agent', value: `\`${ua}\``,   inline: false },
          ],
        }],
      }),
    })

    if (!res.ok) {
      // Surface the failure instead of swallowing it. A 401 here almost always
      // means the webhook was deleted/regenerated in Discord and the URL needs
      // to be refreshed in DISCORD_WEBHOOK_URL.
      const body = await res.text().catch(() => '')
      console.error(`[VAULT] Discord webhook failed: ${res.status} ${res.statusText} ${body}`)
      return NextResponse.json({ ok: true, notified: false, status: res.status })
    }

    return NextResponse.json({ ok: true, notified: true })
  } catch (err) {
    console.error('[VAULT] Discord webhook request error:', err)
    return NextResponse.json({ ok: true, notified: false })
  }
}
