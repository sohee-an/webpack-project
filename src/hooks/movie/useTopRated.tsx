import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/api/fetcher';
import { TMovieResult } from '@/types/movie';

type TTopRatedPrameter = {
  language: string;
  page: number;
};

export const useTopRated = ({ language = 'ko-KR', page = 1 }: TTopRatedPrameter) => {
  return useQuery<TMovieResult>({
    queryKey: ['movieTopRated', language, page],
    queryFn: () => fetcher(`movie/top_rated?language=${language}&page=${page}`),
  });
};
