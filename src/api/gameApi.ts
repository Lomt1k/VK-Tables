import { apiClient } from '.';
import { paginatedGamesSchema, type PaginatedGames } from '@/types';

export const fetchGames = async (pageParam = 1): Promise<PaginatedGames> => {
  try {
    const response = await apiClient.get(`/games?_page=${pageParam}`);
    return paginatedGamesSchema.parse(response.data);
  } catch (error) {
    console.error('Ошибка при загрузке игр:', error);
    throw error;
  }
};