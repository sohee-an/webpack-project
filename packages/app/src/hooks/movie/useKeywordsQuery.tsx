import { useQuery } from '@tanstack/react-query';
<<<<<<< HEAD:packages/app/src/hooks/movie/useKeywordsQuery.tsx
import { fetcher } from '@/api/fetcher';
import { TMovieResult } from '@/types/movie';
=======
import { fetcher } from '@api/fetcher';
import { TMovieResult } from '../../types/movie';
>>>>>>> 177604243b2fea86cf8ff9ef10753661f4c7b92d:apps/web/src/hooks/movie/useKeywordsQuery.tsx

export const useSearchMoviesQuery = ({
  language = 'ko-KR',
  page,
  keywords,
}: {
  language: string;
  page: number;
  keywords: string;
}) => {
  return useQuery<TMovieResult>({
    queryKey: ['searchMovie', language, page, keywords],
    enabled: !!keywords,
    queryFn: () =>
      fetcher<TMovieResult>(
        `search/movie?query=${encodeURIComponent(keywords)}&language=${language}&page=${page}`,
      ),
  });
};
