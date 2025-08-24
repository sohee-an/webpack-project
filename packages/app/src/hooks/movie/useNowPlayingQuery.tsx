import { useQuery } from '@tanstack/react-query';
<<<<<<< HEAD:packages/app/src/hooks/movie/useNowPlayingQuery.tsx
import { fetcher } from '@/api/fetcher';
import { TMovieResult } from '@/types/movie';
=======
import { fetcher } from '@api/fetcher';
import { TMovieResult } from '../../types/movie';
>>>>>>> 177604243b2fea86cf8ff9ef10753661f4c7b92d:apps/web/src/hooks/movie/useNowPlayingQuery.tsx

type TNowPlayingPrameter = {
  language: string;
  page: number;
};

export const useNowPlayingQuery = ({ language = 'ko-KR', page = 1 }: TNowPlayingPrameter) => {
  return useQuery<TMovieResult>({
    queryKey: ['movieList'],
    queryFn: () => fetcher(`movie/now_playing?language=${language}&page=${page}`),
  });
};
