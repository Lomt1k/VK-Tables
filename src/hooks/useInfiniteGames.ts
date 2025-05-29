import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchGames } from '@/api';
import type { PaginatedGames } from '@/types';
import { gameStore } from '@/stores';
import { useEffect } from 'react';

export const useInfiniteGames = () => {
  const query = useInfiniteQuery<PaginatedGames, Error>({
    queryKey: ['games'],
    queryFn: async ({ pageParam }) => {
      const page = (pageParam as number | undefined) ?? 1;
      const data = await fetchGames(page);
      return { ...data, nextPage: data.next };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.next,
    retry: 1
  });

  useEffect(() => {
    const newGames = query.data?.pages.flatMap(page => page.data) ?? [];
    const existingIds = new Set(gameStore.games.map(g => g.id));
    const filteredNewGames = newGames.filter(game => !existingIds.has(game.id));

    if (filteredNewGames.length > 0) gameStore.addGames(filteredNewGames);
    else gameStore.setGames(newGames);
  }, [query.data]);

  return query;
};