const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 400;
  const extraDetails = err.extraDetails;

  res.status(status).json({ message: extraDetails });
};

module.exports = errorMiddleware;
