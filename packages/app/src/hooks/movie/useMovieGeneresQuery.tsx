import { useQuery } from '@tanstack/react-query';
<<<<<<< HEAD:packages/app/src/hooks/movie/useMovieGeneresQuery.tsx
import { fetcher } from '@/api/fetcher';
import { TMovieResult } from '@/types/movie';
=======
import { fetcher } from '@api/fetcher';
import { TMovieResult } from '../../types/movie';
>>>>>>> 177604243b2fea86cf8ff9ef10753661f4c7b92d:apps/web/src/hooks/movie/useMovieGeneresQuery.tsx

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
