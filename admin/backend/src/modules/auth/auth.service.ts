import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../db/prisma';
import { env } from '../../config/env';
import { UnauthorizedError } from '../../errors/AppError';

// Business logic for authentication, kept separate from HTTP concerns
// (the controller). This layer never touches req/res.
export const authService = {
  async verifyCredentials(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    // Same error whether the email is unknown or the password is wrong, so we
    // don't leak which accounts exist.
    if (!user) throw new UnauthorizedError('Invalid email or password');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedError('Invalid email or password');

    return user;
  },

  issueToken(userId: string): string {
    return jwt.sign({ sub: userId }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    } as jwt.SignOptions);
  },

  getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, createdAt: true },
    });
  },
};
