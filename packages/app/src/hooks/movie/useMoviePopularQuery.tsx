import { useQuery } from '@tanstack/react-query';
<<<<<<< HEAD:packages/app/src/hooks/movie/useMoviePopularQuery.tsx
import { fetcher } from '@/api/fetcher';
import { TMovieResult } from '@/types/movie';
=======
import { fetcher } from '@api/fetcher';
import { TMovieResult } from '../../types/movie';
>>>>>>> 177604243b2fea86cf8ff9ef10753661f4c7b92d:apps/web/src/hooks/movie/useMoviePopularQuery.tsx

export type TPopularMiviePrameter = {
  language: string;
  page: number;
};

export const useMoviePopularQuery = ({ language = 'ko-KR', page }: TPopularMiviePrameter) => {
  return useQuery<TMovieResult>({
    queryKey: ['popularMovie', language, page],
    queryFn: () => fetcher(`movie/popular?language=${language}&page=${page}`),
  });
};
