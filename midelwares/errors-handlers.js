// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const isJoiError = err.error && err.error.isJoi;

  const errorStatus = res.statusCode === 200 ? 400 : res.statusCode;
  const errorMessage = isJoiError ? err.error.toString() : err.message;
  const errorStack = isJoiError ? err.error : err.stack;

  const isDev = req.app.get('env') === 'production';

  res.status(errorStatus);
  res.json({
    status: errorStatus,
    message: errorMessage,
    stack: isDev ? null : errorStack,
  });
};

const notFoundHandler = (req, res, next) => {
  const errorMessage = `${req.method}: ${req.originalUrl} is not found`;
  const error = new Error(errorMessage);
  res.status(404);
  next(error);
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
