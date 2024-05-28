const { ValidationError } = require("sequelize");

function errorLogger(err, req, res, next) {
  console.error(err);
  next(err)
}

function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

function boomErrorHandler(err, req, res, next) {
  if(err.isBoom) {
    const { output } = err;
      res.status(output.statusCode).json(output.payload);
  } else {
    next(err)
  }
}

function ormErrorHandler(err, req, res, next) {
  if(err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    });
  }

  next(error)
}

module.exports = { errorHandler, errorLogger, boomErrorHandler, ormErrorHandler };
