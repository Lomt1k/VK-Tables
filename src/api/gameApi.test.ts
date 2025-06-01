import { describe, it, expect, vi, type Mock } from 'vitest'
import { fetchGames, fetchAddGame, fetchEditGame } from './gameApi'
import {
  apiClient
} from './apiClient'
import {
  type Game,
  type GameFormValues,
  type PaginatedGames,
  gameSchema,
  paginatedGamesSchema,
} from '@/types'

const mockPaginatedGames: PaginatedGames = {
  first: 1,
  prev: null,
  next: null,
  last: 1,
  pages: 1,
  items: 1,
  data: [
    {
      id: '1',
      createdAt: '2025-04-05T10:00:00Z',
      status: 'InProgress',
      title: 'The Witcher 3',
      genre: 'RPG',
      year: 2015,
      multiplayer: false,
      platform: 'PC',
      developer: 'CDPR',
      publisher: 'CDPR',
    },
  ],
};

const mockGame: Game = {
  id: '1',
  createdAt: '2025-04-05T10:00:00Z',
  status: 'Done',
  title: 'Half-Life 2',
  genre: 'Shooter',
  year: 2004,
  multiplayer: true,
  platform: 'PC',
  developer: 'Valve',
  publisher: 'Valve',
};

const mockGameFormValues: GameFormValues = {
  status: 'New',
  title: 'New Game',
  genre: 'Платформер',
  year: 2025,
  multiplayer: true,
  platform: 'PS5',
  developer: 'DevTeam',
  publisher: 'Publisher',
};

vi.mock('./apiClient', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}));

describe('fetchGames', () => {
  it('Корректно подгружает список игр', async () => {
    (apiClient.get as Mock).mockResolvedValueOnce({ data: mockPaginatedGames });
    
    const result = await fetchGames(1);

    expect(apiClient.get).toHaveBeenCalledWith('/games?_page=1&_per_page=20&_sort=-createdAt');
    expect(paginatedGamesSchema.parse(result)).toEqual(mockPaginatedGames);
  })

  it('Выбрасывает ошибку при неудачном запросе', async () => {
    const error = new Error('Network Error');
    (apiClient.get as Mock).mockRejectedValueOnce(error);

    await expect(fetchGames(1)).rejects.toThrowError();
  })

  it('Выбрасывает ошибку при невалидных данных от сервера', async () => {
    const invalidData = { ...mockPaginatedGames, data: 'не массив' };
    (apiClient.get as Mock).mockResolvedValueOnce({ data: invalidData });

    await expect(fetchGames(1)).rejects.toThrow();
  })
})

describe('fetchAddGame', () => {
  it('Корректно добавляет игру', async () => {
    const expectedPayload = {
      ...mockGameFormValues,
      createdAt: expect.any(String),
    };
    (apiClient.post as Mock).mockResolvedValueOnce({ data: mockGame });

    const result = await fetchAddGame(mockGameFormValues);

    expect(apiClient.post).toHaveBeenCalledWith('/games', expectedPayload);
    expect(gameSchema.parse(result)).toEqual(mockGame);
  })

  it('Выбрасывает ошибку при невалидном ответе от сервера', async () => {
    const invalidResponse = { data: { title: 123 } }; // Невалидный тип
    (apiClient.post as Mock).mockResolvedValueOnce(invalidResponse);

    await expect(fetchAddGame(mockGameFormValues)).rejects.toThrow();
  })

  it('Выбрасывает ошибку при неудачной попытке добавления', async () => {
    const error = new Error('Request failed');
    (apiClient.post as Mock).mockRejectedValueOnce(error);

    await expect(fetchAddGame(mockGameFormValues)).rejects.toThrowError();
  })
})

describe('fetchEditGame', () => {
  it('Корректно редактирует игру', async () => {
    (apiClient.patch as Mock).mockResolvedValueOnce({ data: mockGame });

    const result = await fetchEditGame(mockGame.id, mockGameFormValues);

    expect(apiClient.patch).toHaveBeenCalledWith(`/games/${mockGame.id}`, mockGameFormValues);
    expect(gameSchema.parse(result)).toEqual(mockGame);
  })

  it('Выбрасывает ошибку при невалидном ответе от сервера', async () => {
    const invalidResponse = { data: { id: 123 } };
    (apiClient.patch as Mock).mockResolvedValueOnce(invalidResponse);

    await expect(fetchEditGame(mockGame.id, mockGameFormValues)).rejects.toThrow();
  })

  it('Выбрасывает ошибку при неудачной попытке редактирования', async () => {
    const error = new Error('Patch failed');
    (apiClient.patch as Mock).mockRejectedValueOnce(error);

    await expect(fetchEditGame(mockGame.id, mockGameFormValues)).rejects.toThrowError();
  })
})
