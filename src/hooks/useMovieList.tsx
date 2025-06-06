import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/api/fetcher';

type Post = {
  id: number;
  title: string;
  body: string;
};

export const useMovieList = () => {
  return useQuery<Post[]>({
    queryKey: ['movieList'],
    queryFn: () => fetcher('/movie/now_playing?language=en-US&page=1'),
    staleTime: 1000 * 60 * 5,
  });
};
