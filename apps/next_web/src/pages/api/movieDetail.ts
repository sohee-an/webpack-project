import type { NextApiRequest, NextApiResponse } from 'next';
import { tmdbGetServer } from '@/lib/tmdb-server';
import type { TMovieResult } from '@/types/movie';

export type MovieDetailResponse = {
  popular: TMovieResult;
  topRated: TMovieResult;
  upcoming: TMovieResult;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MovieDetailResponse | { error: string }>,
) {
  try {
    const page = Number(req.query.page) || 1;
    const base = { language: 'ko-KR', page };

    const [popular, topRated, upcoming] = await Promise.all([
      tmdbGetServer<TMovieResult>('movie/popular', base),
      tmdbGetServer<TMovieResult>('movie/top_rated', base),
      tmdbGetServer<TMovieResult>('movie/upcoming', base),
    ]);

    res.status(200).json({ popular, topRated, upcoming });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch aggregated data' });
  }
}
