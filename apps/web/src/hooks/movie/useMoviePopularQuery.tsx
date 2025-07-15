import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@api/fetcher';
import { TMovieResult } from '../../types/movie';

type TPopularMiviePrameter = {
  language: string;
  page: number;
};

export const useMoviePopularQuery = ({ language = 'ko-KR', page }: TPopularMiviePrameter) => {
  return useQuery<TMovieResult>({
    queryKey: ['popularMovie', language, page],
    queryFn: () => fetcher(`movie/popular?language=${language}&page=${page}`),
  });
};
