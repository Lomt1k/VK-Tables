import { z } from 'zod';

export const gameBaseSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  status: z.enum(['New', 'InProgress', 'Done']),
});

export const optionalGameFields = {
  year: z.number().optional(),
  genre: z.string().optional(),
  developer: z.string().optional(),
  publisher: z.string().optional(),
  platform: z.string().optional(),
  multiplayer: z.boolean().optional(),
};

export const gameFormSchema = gameBaseSchema.extend(optionalGameFields);

export type GameFormValues = z.infer<typeof gameFormSchema>;