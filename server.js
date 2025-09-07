const app = require("./app")
const logger = require("./config/logger")

const PORT = process.env.PORT || 3000

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`)
  logger.info(`📊 Environment: ${process.env.NODE_ENV}`)
  logger.info(`🔗 API Base URL: http://localhost:${PORT}/api`)
})

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Promise Rejection:", err)
  process.exit(1)
})

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err)
  process.exit(1)
})
