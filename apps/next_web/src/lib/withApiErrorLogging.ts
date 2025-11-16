import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { logError } from './logger';

type ApiHandler<T = any> = (req: NextApiRequest, res: NextApiResponse<T>) => Promise<void> | void;

export function withApiErrorLogging<T = any>(handler: ApiHandler<T>): NextApiHandler<T> {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      logError({
        layer: 'api',
        path: req.url ?? '',
        method: req.method,
        message: 'API handler failed',
        error,
      });

      if (!res.headersSent) {
        res
          .status(500)
          .json({ error: 'Internal Server Error', message: 'Something went wrong.' } as any);
      }
    }
  };
}
