import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/api/fetcher';
import { TMovieResult } from '@/types/movie';

type TNowPlayingPrameter = {
  language: string;
  page: number;
};

export const useNowPlayingQuery = ({ language = 'ko-KR', page = 1 }: TNowPlayingPrameter) => {
  return useQuery<TMovieResult>({
    queryKey: ['movieList'],
    queryFn: () => fetcher(`movie/now_playing?language=${language}&page=${page}`),
  });
};
