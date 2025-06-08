import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/api/fetcher';

type TMovieLatestPrameter = {
  language: string;
};
export type TMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  original_title: string;
};
type TMovieLatest = {
  results: TMovie[];
};

export const useMovieLatest = ({ language = 'ko-KR' }: TMovieLatestPrameter) => {
  return useQuery<TMovieLatest>({
    queryKey: ['movielatest', language],
    queryFn: () => fetcher(`movie/latest`),
  });
};
