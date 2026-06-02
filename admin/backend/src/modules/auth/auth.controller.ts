import type { Request, Response, CookieOptions } from 'express';
import { authService } from './auth.service';
import { env } from '../../config/env';
import { UnauthorizedError } from '../../errors/AppError';
import { notifyAuthEvent } from '../../services/notify/discord';
import type { LoginInput } from './auth.schemas';

// Best-effort client identity for the login notification.
function clientInfo(req: Request) {
  const ip =
    (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0].trim() ||
    req.socket.remoteAddress ||
    'unknown';
  return { ip, ua: req.get('user-agent') ?? 'unknown' };
}

const COOKIE_NAME = 'token';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

// httpOnly: JS in the browser can't read it (protects against XSS token theft).
// secure: only sent over HTTPS in production.
// sameSite=lax: not sent on cross-site requests (basic CSRF protection).
const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: SEVEN_DAYS_MS,
  path: '/',
};

// Controllers handle HTTP: read input, call the service, shape the response.
export const authController = {
  async login(req: Request, res: Response) {
    const { email, password } = req.body as LoginInput;
    const who = clientInfo(req);

    let user;
    try {
      user = await authService.verifyCredentials(email, password);
    } catch (err) {
      // Notify on failed logins so break-in attempts are visible, then rethrow
      // for the normal 401 response.
      notifyAuthEvent('login_failed', { email, ...who });
      throw err;
    }

    const token = authService.issueToken(user.id);
    res.cookie(COOKIE_NAME, token, cookieOptions);
    notifyAuthEvent('login_success', { email: user.email, ...who });
    res.json({ user: { id: user.id, email: user.email } });
  },

  async me(req: Request, res: Response) {
    const user = await authService.getUserById(req.userId!);
    if (!user) throw new UnauthorizedError('User no longer exists');
    res.json({ user });
  },

  logout(_req: Request, res: Response) {
    res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: undefined });
    res.json({ ok: true });
  },
};
