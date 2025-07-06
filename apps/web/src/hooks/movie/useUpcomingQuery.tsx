import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/api/fetcher';
import { TMovieResult } from '../../types/movie';

type TUpcomingPrameter = {
  language: string;
  page: number;
};

export const useUpcomingQuery = ({ language = 'ko-KR', page = 1 }: TUpcomingPrameter) => {
  return useQuery<TMovieResult>({
    queryKey: ['movieUpcoming', language, page],
    queryFn: () => fetcher(`movie/upcoming?language=${language}&page=${page}`),
  });
};
