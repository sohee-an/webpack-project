import { useQuery } from '@tanstack/react-query';
<<<<<<< HEAD:packages/app/src/hooks/movie/useUpcomingQuery.tsx
import { fetcher } from '@/api/fetcher';
import { TMovieResult } from '@/types/movie';
=======
import { fetcher } from '@api/fetcher';
import { TMovieResult } from '../../types/movie';
>>>>>>> 177604243b2fea86cf8ff9ef10753661f4c7b92d:apps/web/src/hooks/movie/useUpcomingQuery.tsx

type TUpcomingPrameter = {
  language: string;
  page: number;
};

export const useUpcomingQuery = ({ language = 'ko-KR', page = 1 }: TUpcomingPrameter) => {
  return useQuery<TMovieResult>({
    queryKey: ['movieUpcoming', language, page],
    queryFn: () => fetcher(`movie/upcoming?language=${language}&page=${page}`),
  });
};
