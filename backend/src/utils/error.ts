import { AppError } from '../middleware/errorHandler';

// For 404 errors
export class NotFoundError extends AppError {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}

// For validation errors
export class ValidationError extends AppError {
  constructor(message = 'Invalid input') {
    super(message, 400);
  }
}

// For database errors
export class DatabaseError extends AppError {
  constructor(message = 'Database error') {
    super(message, 500, false);
  }
}
