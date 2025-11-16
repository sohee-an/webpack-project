import { tmdbGetServer } from '@/lib/tmdb-server';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { TMovieDetail, TMovieResult, TCredits } from '@/types/movie';
import { withApiErrorLogging } from '@/lib/withApiErrorLogging';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { mid } = req.query;
    const base = { language: 'ko-KR' };

    const [detail, credits] = await Promise.all([
      tmdbGetServer<TMovieDetail>(`movie/${mid}`, base),
      tmdbGetServer<TCredits>(`movie/${mid}/credits`, base),
    ]);

    res.status(200).json({ detail, credits });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch aggregated detail' });
  }
}

export default withApiErrorLogging(handler);
