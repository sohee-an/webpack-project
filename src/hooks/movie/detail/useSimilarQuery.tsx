import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/api/fetcher';
import { TMovieResult } from '@/types/movie';

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
