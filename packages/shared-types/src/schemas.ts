import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1),
  email: z.string().email(),
});

export const MessageSchema = z.object({
  id: z.number().int().optional(),
  userId: z.number().int(),
  content: z.string().min(1),
  createdAt: z.string().datetime(),
});

export const TaskSchema = z.object({
  id: z.number().int().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  completed: z.boolean().default(false),
  userId: z.number().int(),
});

export const SummarySchema = z.object({
  id: z.number().int().optional(),
  userId: z.number().int(),
  summary: z.string(),
  createdAt: z.string().datetime(),
});
