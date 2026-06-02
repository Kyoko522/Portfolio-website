import { env } from '../../config/env';

// Fire-and-forget Discord notifications for admin-portal auth events. Never
// throws into the request path — a failed/absent webhook must not block login.

type AuthEvent = 'login_success' | 'login_failed';

const PRESENTATION: Record<AuthEvent, { title: string; color: number }> = {
  login_success: { title: '🟢 Admin login — résumé portal', color: 0x00c9a7 },
  login_failed: { title: '🔴 Admin login FAILED — résumé portal', color: 0xff6b6b },
};

export function notifyAuthEvent(
  event: AuthEvent,
  details: { email?: string; ip?: string; ua?: string },
): void {
  const webhookUrl = env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const fields = [
    { name: 'Email', value: `\`${details.email ?? 'unknown'}\``, inline: true },
    { name: 'IP', value: `\`${details.ip ?? 'unknown'}\``, inline: true },
    { name: 'Time', value: `\`${new Date().toUTCString()}\``, inline: false },
    { name: 'Device', value: `\`${details.ua ?? 'unknown'}\``, inline: false },
  ];

  const meta = PRESENTATION[event];

  // Intentionally not awaited — the login response shouldn't wait on Discord.
  fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ embeds: [{ title: meta.title, color: meta.color, fields }] }),
  }).catch((err) => {
    console.error('[auth-notify] Discord webhook error:', err);
  });
}
