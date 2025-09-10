import winston from 'winston';
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
  ],
});
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import { UserSchema } from '../../../packages/shared-types/src/schemas';
import type { User } from '../../../packages/shared-types/src';


const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required in production');
}
const JWT_EXPIRES_IN = '1h';

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export function generateToken(user: User) {
  return jwt.sign({ id: user.id, email: user.email, role: (user as any).role || 'user' }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
