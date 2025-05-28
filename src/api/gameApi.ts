import { apiClient } from '.';
import { gamesListSchema, type Game } from '@/types';

export const fetchGames = async (): Promise<Game[]> => {
  try {
    const response = await apiClient.get('/games');
    const validatedData = gamesListSchema.parse(response.data);
    return validatedData;
  } catch (error) {
    console.error('Ошибка при загрузке списка игр:', error);
    throw error;
  }
};