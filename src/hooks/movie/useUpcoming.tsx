import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/api/fetcher';

type TUpcomingPrameter = {
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
type TUpcoming = {
  results: TMovie[];
};

export const useUpcoming = ({ language = 'ko-KR', page = 1 }: TUpcomingPrameter) => {
  return useQuery<TUpcoming>({
    queryKey: ['movieUpcoming', language, page],
    queryFn: () => fetcher(`movie/upcoming?language=${language}&page=${page}`),
  });
};
