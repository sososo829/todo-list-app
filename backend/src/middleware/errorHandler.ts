import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err.isOperational) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};
