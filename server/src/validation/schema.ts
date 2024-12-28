import { z } from 'zod';

export const userSchema = z.object({
  username: z.string().min(1),
});

export const updateSchema = z.object({
  location: z.string().optional(),
  blog: z.string().optional(),
  bio: z.string().optional(),
});