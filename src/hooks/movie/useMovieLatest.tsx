import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/api/fetcher';
import { TMovieResult } from '@/types/movie';

type TMovieLatestPrameter = {
  language: string;
};

export const useMovieLatest = ({ language = 'ko-KR' }: TMovieLatestPrameter) => {
  return useQuery<TMovieResult>({
    queryKey: ['movielatest', language],
    queryFn: () => fetcher(`movie/latest`),
  });
};
