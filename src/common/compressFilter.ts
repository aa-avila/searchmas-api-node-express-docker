import compression from 'compression';
import { Request, Response } from 'express';

function compressFilter(req: Request, res: Response): boolean {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

export default compressFilter;
