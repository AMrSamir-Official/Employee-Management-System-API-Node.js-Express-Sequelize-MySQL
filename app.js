const express = require("express")
const cors = require("cors")
const path = require("path")
require("dotenv").config()

const logger = require("./config/logger")
const errorHandler = require("./middlewares/errorHandler")
const employeeRoutes = require("./routes/employeeRoutes")
const departmentRoutes = require("./routes/departmentRoutes")

const app = express()

app.use(cors())

// Body parsing middleware
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// Static files
app.use(express.static(path.join(__dirname, "public")))

// View engine setup (for optional EJS views)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl} - ${req.ip}`)
  next()
})

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// API Routes
app.use("/api/employees", employeeRoutes)
app.use("/api/departments", departmentRoutes)

// Optional: Simple EJS views for employee list
app.get("/", async (req, res) => {
  try {
    const { Employee, Department } = require("./models")
    // Create a new employee record
    const employees = await Employee.findAll({
      include: [{ model: Department, as: "department" }],
      limit: 20,
    })
    res.render("index", { employees })
  } catch (error) {
    logger.error("Error rendering index page:", error)
    res.status(500).send("Internal Server Error")
  }
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  })
})

// Global error handler (must be last)
app.use(errorHandler)

module.exports = app
