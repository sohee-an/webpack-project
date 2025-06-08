import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/api/fetcher';

type TTopRatedPrameter = {
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
type TTopRated = {
  results: TMovie[];
};

export const useTopRated = ({ language = 'ko-KR', page = 1 }: TTopRatedPrameter) => {
  return useQuery<TTopRated>({
    queryKey: ['movieTopRated', language, page],
    queryFn: () => fetcher(`movie/top_rated?language=${language}&page=${page}`),
  });
};
