import { useQuery } from '@tanstack/react-query';
<<<<<<< HEAD:packages/app/src/hooks/movie/useMovieLatestQuery.tsx
import { fetcher } from '@/api/fetcher';
import { TMovieResult } from '@/types/movie';
=======
import { fetcher } from '@api/fetcher';
import { TMovieResult } from '../../types/movie';
>>>>>>> 177604243b2fea86cf8ff9ef10753661f4c7b92d:apps/web/src/hooks/movie/useMovieLatestQuery.tsx

type TMovieLatestPrameter = {
  language: string;
};

export const useMovieLatestQuery = ({ language = 'ko-KR' }: TMovieLatestPrameter) => {
  return useQuery<TMovieResult>({
    queryKey: ['movielatest', language],
    queryFn: () => fetcher(`movie/latest`),
  });
};
