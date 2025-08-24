import { useQuery } from '@tanstack/react-query';
<<<<<<< HEAD:packages/app/src/hooks/movie/useTopRatedQuery.tsx
import { fetcher } from '@/api/fetcher';
import { TMovieResult } from '@/types/movie';
=======
import { fetcher } from '@api/fetcher';
import { TMovieResult } from '../../types/movie';
>>>>>>> 177604243b2fea86cf8ff9ef10753661f4c7b92d:apps/web/src/hooks/movie/useTopRatedQuery.tsx

type TTopRatedPrameter = {
  language: string;
  page: number;
};

export const useTopRatedQuery = ({ language = 'ko-KR', page = 1 }: TTopRatedPrameter) => {
  return useQuery<TMovieResult>({
    queryKey: ['movieTopRated', language, page],
    queryFn: () => fetcher(`movie/top_rated?language=${language}&page=${page}`),
  });
};
