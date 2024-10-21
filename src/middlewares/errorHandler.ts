import { Response, Request, NextFunction } from 'express';
import Boom from '@hapi/boom';
import { IApiErrorResponse } from '../interfaces/IApiErrorResponse';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
): Response | void {
  // is Syntax Error (body parser)
  if (err instanceof SyntaxError) {
    const errResponse: IApiErrorResponse = {
      statusCode: 400,
      error: 'Bad Request',
      message: err.message,
    };
    return res.status(400).json(errResponse);
  }

  // is Boom Error
  if (Boom.isBoom(err)) {
    const { output } = err;
    const errResponse: IApiErrorResponse = {
      statusCode: output.statusCode,
      error: output.payload.error,
      message: output.payload.message,
      details: err?.data ?? undefined,
    };
    return res.status(output.statusCode).json(errResponse);
  }

  // is Error
  if (err instanceof Error) {
    const errResponse: IApiErrorResponse = {
      statusCode: 500,
      error: 'Internal Server Error',
      message: err?.message ?? undefined,
      stack: err?.stack ?? undefined,
    };
    return res.status(500).json(errResponse);
  }

  next();
}
