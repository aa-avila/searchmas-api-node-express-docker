import { Response, Request, NextFunction, Router } from 'express';
import Boom from '@hapi/boom';

const router = Router();

router.all('*', (_req: Request, _res: Response, next: NextFunction) => {
  next(Boom.notFound('Resource Not Found'));
  return;
});

export default router;
