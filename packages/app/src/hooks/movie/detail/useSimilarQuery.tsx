import { useQuery } from '@tanstack/react-query';
<<<<<<< HEAD:packages/app/src/hooks/movie/detail/useSimilarQuery.tsx
import { fetcher } from '@/api/fetcher';
import { TMovieResult } from '@/types/movie';
=======
import { fetcher } from '@api/fetcher';
import { TMovieResult } from '../../../../../../apps/web/src/types/movie';
>>>>>>> 177604243b2fea86cf8ff9ef10753661f4c7b92d:apps/web/src/hooks/movie/detail/useSimilarQuery.tsx

type TParmas = {
  language: string;
  mid: string;
};

export const useSimilarQuery = ({ language = 'ko-KR', mid }: TParmas) => {
  return useQuery<TMovieResult>({
    queryKey: ['movieSimilar', language, mid],
    queryFn: () => fetcher(`movie/${mid}/similar?language=${language}`),
    enabled: !!mid,
  });
};
