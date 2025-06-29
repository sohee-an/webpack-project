import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/api/fetcher';
import { TMovieResult } from '@/types/movie';

type TMovieGeneresPrameter = {
  language: string;
  page: number;
  generesId: number;
};

export const useMovieGeneresQuery = ({
  language = 'ko-KR',
  page,
  generesId,
}: TMovieGeneresPrameter) => {
  const queryString = new URLSearchParams({
    language,
    page: String(page),
  });

  if (generesId !== 0) {
    queryString.append('with_genres', String(generesId));
  }

  return useQuery<TMovieResult>({
    queryKey: ['movieGeneres', language, page, generesId],
    queryFn: () => fetcher(`discover/movie?${queryString.toString()}`),
  });
};
