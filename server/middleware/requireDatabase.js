import { isDbConnected } from '../config/db.js';

/**
 * Fails fast when MongoDB is unreachable. Without this, Mongoose buffers the
 * query and the request hangs until it times out, which looks like a broken
 * server rather than an offline database.
 */
export function requireDatabase(req, res, next) {
  if (isDbConnected()) return next();
  res.status(503).json({
    success: false,
    message: 'The database is unavailable right now. Try again shortly.',
  });
}
