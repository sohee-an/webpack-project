import { useQuery } from '@tanstack/react-query';
<<<<<<< HEAD:packages/app/src/hooks/movie/useMovieListQuery.tsx
import { fetcher } from '@/api/fetcher';
import { TMovieResult } from '@/types/movie';
=======
import { fetcher } from '@api/fetcher';
import { TMovieResult } from '../../types/movie';
>>>>>>> 177604243b2fea86cf8ff9ef10753661f4c7b92d:apps/web/src/hooks/movie/useMovieListQuery.tsx

export const useMovieListQuery = () => {
  return useQuery<TMovieResult[]>({
    queryKey: ['movieList'],
    queryFn: () => fetcher('/movie/now_playing?language=en-US&page=1'),
    staleTime: 1000 * 60 * 5,
  });
};
