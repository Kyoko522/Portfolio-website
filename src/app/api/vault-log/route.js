import { NextResponse } from 'next/server'

// Event → embed presentation. The client tells us which event fired; IP and
// user-agent are always read server-side (more reliable + can't be spoofed by
// the page script).
const EVENTS = {
  visit:          { title: '👀 Vault page opened',                 color: 0x845EC2 },
  unlock_success: { title: '🔓 Vault UNLOCKED — correct passphrase', color: 0x00C9A7 },
  unlock_failed:  { title: '⛔ Vault failed attempt',               color: 0xFF6B6B },
}

export async function POST(req) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  const ua = req.headers.get('user-agent') || 'unknown'
  const time = new Date().toUTCString()

  // Body is optional; default to a plain visit.
  let event = 'visit'
  let attempt
  try {
    const body = await req.json()
    if (body?.event && EVENTS[body.event]) event = body.event
    if (typeof body?.attempt === 'number') attempt = body.attempt
  } catch {
    /* no/invalid body — treat as a visit */
  }

  const meta = EVENTS[event]
  console.log(`[VAULT] ${time} | ${event} | IP: ${ip} | UA: ${ua}${attempt ? ` | attempt ${attempt}` : ''}`)

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  if (!webhookUrl) {
    console.warn('[VAULT] DISCORD_WEBHOOK_URL is not set — no notification sent.')
    return NextResponse.json({ ok: true, notified: false })
  }

  const fields = [
    { name: 'IP', value: `\`${ip}\``, inline: true },
    { name: 'Time', value: `\`${time}\``, inline: false },
    { name: 'Device', value: `\`${ua}\``, inline: false },
  ]
  if (attempt) fields.splice(1, 0, { name: 'Attempt #', value: `\`${attempt}\``, inline: true })

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [{ title: meta.title, color: meta.color, fields }] }),
    })
    if (!res.ok) {
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
