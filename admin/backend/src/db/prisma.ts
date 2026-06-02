import { PrismaClient } from '@prisma/client';

// A single shared Prisma client for the whole process. Creating one per request
// would exhaust DB connections. Exported as a singleton other modules import.
export const prisma = new PrismaClient();
