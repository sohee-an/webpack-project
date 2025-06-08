import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/api/fetcher';
import { TMovie } from './useMoviePopular';

type TMovieList = {
  results: TMovie[];
};
export const useMovieList = () => {
  return useQuery<TMovieList[]>({
    queryKey: ['movieList'],
    queryFn: () => fetcher('/movie/now_playing?language=en-US&page=1'),
    staleTime: 1000 * 60 * 5,
  });
};
