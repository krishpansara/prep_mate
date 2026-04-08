import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '../utils/logger';
import { env } from '../config/env';

export interface AppError extends Error {
  status?: number;
  code?: string;
}

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  // Zod errors shouldn't normally reach here (caught by validate middleware)
  if (err instanceof ZodError) {
    res.status(400).json({ error: 'Validation failed', details: err.flatten().fieldErrors });
    return;
  }

  const status = err.status ?? 500;
  const message = status < 500 ? err.message : 'Internal server error';

  if (status >= 500) {
    logger.error({ err, method: req.method, url: req.url }, 'Unhandled error');
  }

  res.status(status).json({
    error: message,
    ...(env.NODE_ENV !== 'production' && status >= 500 ? { stack: err.stack } : {}),
  });
}

/** Factory to create typed HTTP errors */
export function createError(message: string, status: number, code?: string): AppError {
  const err: AppError = new Error(message);
  err.status = status;
  err.code = code;
  return err;
}
