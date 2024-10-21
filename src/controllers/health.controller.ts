import { Request, Response, NextFunction } from 'express';

const health = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ data: 'OK' });
  } catch (error) {
    next(error);
  }
};

export { health };
