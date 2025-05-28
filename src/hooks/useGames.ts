import { useQuery } from '@tanstack/react-query';
import { fetchGames } from '@/api';

export const useGames = () => {
  return useQuery({
    queryKey: ['games'],
    queryFn: fetchGames,
  });
};