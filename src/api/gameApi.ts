import { apiClient } from '.';
import {
  gameSchema,
  paginatedGamesSchema,
  type Game,
  type GameFormValues,
  type PaginatedGames
} from '@/types';

export const fetchGames = async (pageParam = 1): Promise<PaginatedGames> => {
  try {
    const response = await apiClient.get(`/games?_page=${pageParam}&_per_page=20&_sort=-createdAt`);
    return paginatedGamesSchema.parse(response.data);
  } catch (error) {
    console.error('Ошибка при загрузке игр:', error);
    throw error;
  }
};

export const fetchAddGame = async (data: GameFormValues): Promise<Game> => {
  try {
    // На реальном проекте createdAt должен проставляться со стороны сервера
    const response = await apiClient.post('/games', { ...data, createdAt: new Date().toISOString() });
    return gameSchema.parse(response.data);
  } catch (error) {
    console.error('Ошибка при добавлении новой игры', error);
    throw error;
  }
}

export const fetchEditGame = async (id: string, data: GameFormValues): Promise<Game> => {
  try {
    const response = await apiClient.patch(`/games/${id}`, data);
    return gameSchema.parse(response.data);
  } catch (error) {
    console.error('Ошибка при редактировании игры', error);
    throw error;
  }
}