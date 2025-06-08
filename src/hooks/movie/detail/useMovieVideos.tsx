import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/api/fetcher';

type TVideo = {
  id: string;
  key: string;
  name: string;
  site: 'YouTube' | string;
  type: 'Trailer' | 'Teaser' | string;
};

type TVideoResponse = {
  id: number;
  results: TVideo[];
};

type TParams = {
  mid: string;
  language?: string;
};

export const useMovieVideos = ({ mid, language = 'ko-KR' }: TParams) => {
  return useQuery<TVideoResponse>({
    queryKey: ['movieVideos', mid, language],
    queryFn: () => fetcher(`movie/${mid}/videos?language=${language}`),
    enabled: !!mid,
  });
};
