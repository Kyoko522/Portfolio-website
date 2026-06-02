import rateLimit from 'express-rate-limit';

// Defense against brute-force and abuse. Limits are per-IP.

// Broad limit applied to the whole API.
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 600,
  standardHeaders: true,
  legacyHeaders: false,
});

// Tight limit on login to slow password guessing.
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'RATE_LIMITED', message: 'Too many login attempts. Try again later.' },
});

// Protect the Claude endpoint so a hijacked session can't burn API credits.
export const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'RATE_LIMITED', message: 'Cover-letter generation limit reached. Try again later.' },
});
