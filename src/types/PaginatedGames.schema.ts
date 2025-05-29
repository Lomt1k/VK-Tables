import { z } from 'zod';
import { gameSchema } from '.';

export const paginatedGamesSchema = z.object({
  first: z.number(),
  prev: z.number().nullable(),
  next: z.number().nullable(),
  last: z.number(),
  pages: z.number(),
  items: z.number(),
  data: z.array(gameSchema),
});

export type PaginatedGames = z.infer<typeof paginatedGamesSchema>;