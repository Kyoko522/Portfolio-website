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
  if (webhookUrl) {
    await fetch(webhookUrl, {
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
    }).catch(() => {})
  }

  return NextResponse.json({ ok: true })
}
