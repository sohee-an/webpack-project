import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/api/fetcher';

type TPopularMiviePrameter = {
  language: string;
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

export const useMovieLatest = ({ language = 'ko-KR' }: TPopularMiviePrameter) => {
  return useQuery<TPopularMovie>({
    queryKey: ['movielatest', language],
    queryFn: () => fetcher(`movie/latest`),
    staleTime: 1000 * 60 * 5,
  });
};
