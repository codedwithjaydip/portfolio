import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { ApiError } from './errorHandler.js';

export function signToken(adminId) {
  return jwt.sign({ sub: adminId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '2h',
  });
}

export async function requireAdmin(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) throw new ApiError(401, 'Sign in to continue.');

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(payload.sub);
    if (!admin) throw new ApiError(401, 'This session is no longer valid. Sign in again.');

    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(new ApiError(401, 'Your session expired. Sign in again.'));
    }
    next(error);
  }
}
