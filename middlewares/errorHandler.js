const logger = require("../config/logger")

const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  error.message = err.message

  // Log error
  logger.error(`Error ${err.message}`, {
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
  })

  // Sequelize validation error
  if (err.name === "SequelizeValidationError") {
    const message = err.errors.map((error) => error.message).join(", ")
    error = {
      statusCode: 400,
      message,
    }
  }

  // Sequelize unique constraint error
  if (err.name === "SequelizeUniqueConstraintError") {
    const message = "Duplicate field value entered"
    error = {
      statusCode: 400,
      message,
    }
  }

  // Sequelize foreign key constraint error
  if (err.name === "SequelizeForeignKeyConstraintError") {
    const message = "Invalid reference to related resource"
    error = {
      statusCode: 400,
      message,
    }
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token"
    error = {
      statusCode: 401,
      message,
    }
  }

  if (err.name === "TokenExpiredError") {
    const message = "Token expired"
    error = {
      statusCode: 401,
      message,
    }
  }

  // Default error
  const statusCode = error.statusCode || 500
  const message = error.message || "Internal Server Error"

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  })
}

module.exports = errorHandler
