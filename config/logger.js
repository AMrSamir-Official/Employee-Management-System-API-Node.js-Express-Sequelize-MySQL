const winston = require("winston")
const path = require("path")

// Create logs directory if it doesn't exist
const fs = require("fs")
const logsDir = path.join(__dirname, "../logs")
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir)
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  defaultMeta: { service: "employee-management-api" },
  transports: [
    // Write all logs to app.log
    new winston.transports.File({
      filename: path.join(logsDir, "app.log"),
    }),
  ],
})

// If not in production, also log to console
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  )
}

module.exports = logger
