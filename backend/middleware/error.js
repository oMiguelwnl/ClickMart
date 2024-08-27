const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Erro interno do servidor";

  if (err.name === "CastError") {
    const message = `Recurso não encontrado com este ID.. ${err.path} inválido`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    const message = `Chave duplicada ${Object.keys(err.keyValue)} inserida`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = `Sua URL é inválida, por favor, tente novamente mais tarde`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = `Sua URL expirou, por favor, tente novamente mais tarde!`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
