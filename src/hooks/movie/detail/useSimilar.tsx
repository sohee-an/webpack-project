import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/api/fetcher';

export type TMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  original_title: string;
};
type TSimilar = {
  results: TMovie[];
};

type TParmas = {
  language: string;
  mid: string;
};

export const useSimilar = ({ language = 'ko-KR', mid }: TParmas) => {
  return useQuery<TSimilar>({
    queryKey: ['movieSimilar', language, mid],
    queryFn: () => fetcher(`movie/${mid}/similar?language=${language}`),
    enabled: !!mid,
  });
};
