import { Response, Request, NextFunction } from 'express';
import logger from '../common/logger';
export function logErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (err) {
    const date = new Date();
    logger.error(err?.message || JSON.stringify(err), {
      timestamp: date.toISOString(),
      request: {
        path: req.path,
        method: req.method,
        headers: req.headers,
        body: req.body,
        params: req.params,
        query: req.query,
      },
    });
    next(err);
    return;
  }
  next();
}
