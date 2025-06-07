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

export const useUpcoming = ({ language = 'ko-KR', page = 1 }: TPopularMiviePrameter) => {
  return useQuery<TPopularMovie>({
    queryKey: ['movieUpcoming', language, page],
    queryFn: () => fetcher(`movie/upcoming?language=${language}&page=${page}`),
  });
};
