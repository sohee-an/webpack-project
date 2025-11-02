import type { NextApiRequest, NextApiResponse } from 'next';
import { tmdbGetServer } from '@/lib/tmdb-server';
import type { TMovieResult } from '@/types/movie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TMovieResult | { error: string }>,
) {
  try {
    const page = Number(req.query.page) || 1;
    const base = { language: 'ko-KR', page };

    const popular = await tmdbGetServer<TMovieResult>('movie/popular', base);

    res.status(200).json(popular);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch aggregated data' });
  }
}
