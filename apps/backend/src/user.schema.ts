// Zod schema for User
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1),
  email: z.string().email(),
});

export type User = z.infer<typeof UserSchema>;
