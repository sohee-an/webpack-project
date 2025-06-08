import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/api/fetcher';

type TNowPlayingPrameter = {
  language: string;
  page: number;
};
export type TMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  original_title: string;
};
type TNowPlaying = {
  results: TMovie[];
};

export const useNowPlaying = ({ language = 'ko-KR', page = 1 }: TNowPlayingPrameter) => {
  return useQuery<TNowPlaying>({
    queryKey: ['movieList'],
    queryFn: () => fetcher(`movie/now_playing?language=${language}&page=${page}`),
  });
};
