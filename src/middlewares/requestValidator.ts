import { Request, Response, NextFunction } from 'express';
import { validationPipe } from '../common/validationPipe';
import Boom from '@hapi/boom';

type Sources = 'body' | 'params' | 'query';

const requestValidator =
  (validationSchema, sources: Sources[] = ['body', 'params', 'query']) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    let reqObject: Record<string, unknown> = {};
    for (const source of sources) {
      reqObject = { ...reqObject, ...req[source] };
    }

    const errors = await validationPipe(validationSchema, reqObject);
    if (errors) {
      const errMap = errors.map((e) => {
        return {
          value: e.value,
          property: e.property,
          constraints: e.constraints,
          children: e.children.map((c) => {
            return {
              value: c.value,
              property: c.property,
              constraints: c.constraints,
            };
          }),
        };
      });
      const error = Boom.badRequest('Input params validation error', errMap);
      next(error);
      return;
    }
    next();
  };

export default requestValidator;
