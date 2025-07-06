import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/api/fetcher';
import { TMovieResult } from '../../types/movie';

export const useMovieListQuery = () => {
  return useQuery<TMovieResult[]>({
    queryKey: ['movieList'],
    queryFn: () => fetcher('/movie/now_playing?language=en-US&page=1'),
    staleTime: 1000 * 60 * 5,
  });
};
