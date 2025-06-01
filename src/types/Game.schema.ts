import { z } from 'zod';

export const gameStatusSchema = z.union([
  z.literal('New'),
  z.literal('InProgress'),
  z.literal('Done'),
]);

export type GameStatus = z.infer<typeof gameStatusSchema>;

export const gameSchema = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  title: z.string(),
  status: gameStatusSchema,
  year: z.number().optional(),
  genre: z.string().optional(),
  developer: z.string().optional(),
  publisher: z.string().optional(),
  platform: z.string().optional(),
  multiplayer: z.boolean().optional(),
});

export type Game = z.infer<typeof gameSchema>;

export const gamesListSchema = z.array(gameSchema);