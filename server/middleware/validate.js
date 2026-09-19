import { validationResult } from 'express-validator';
import { ApiError } from './errorHandler.js';

export function validate(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  const errors = {};
  for (const error of result.array()) {
    if (!errors[error.path]) errors[error.path] = error.msg;
  }
  const err = new ApiError(400, 'Some fields need attention.');
  err.fields = errors;
  res.status(400).json({ success: false, message: err.message, errors });
}
