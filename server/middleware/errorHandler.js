export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export function notFound(req, res) {
  res.status(404).json({ success: false, message: `No route matches ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const status = err.status || (err.name === 'ValidationError' ? 400 : 500);
  const payload = {
    success: false,
    message: status === 500 ? 'Something went wrong on the server.' : err.message,
  };
  if (process.env.NODE_ENV !== 'production' && status === 500) payload.detail = err.message;
  if (status === 500) console.error(err);
  res.status(status).json(payload);
}
