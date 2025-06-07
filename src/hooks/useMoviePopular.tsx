import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/api/fetcher';

type TPopularMiviePrameter = {
  language: string;
  page: number;
};
export type TMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  original_title: string;
};
type TPopularMovie = {
  results: TMovie[];
};

export const useMoviePopular = ({ language = 'ko-KR', page }: TPopularMiviePrameter) => {
  return useQuery<TPopularMovie>({
    queryKey: ['popularMovie', language, page],
    queryFn: () => fetcher(`movie/popular?language=${language}&page=${page}`),
  });
};
