import { tmdbGetServer } from '@/lib/tmdb-server';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { TMovieDetail } from '@/types/movie';
import { withApiErrorLogging } from '@/lib/withApiErrorLogging';
async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const base = { language: 'ko-KR' };
    const movie = await tmdbGetServer<TMovieDetail>(`movie/${id}`, base);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movie detail' });
  }
}

export default withApiErrorLogging(handler);
