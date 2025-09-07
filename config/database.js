const { Sequelize } = require("sequelize")
const logger = require("./logger")
require("dotenv").config()

// Configuration for Sequelize CLI (uses config.json)
const config = require("./config.json")
const env = process.env.NODE_ENV || "development"
const dbConfig = config[env]

// Create Sequelize instance based on environment
let sequelize
if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig)
} else {
  sequelize = new Sequelize(
    dbConfig.database || process.env.DB_NAME,
    dbConfig.username || process.env.DB_USER,
    dbConfig.password || process.env.DB_PASSWORD,
    {
      host: dbConfig.host || process.env.DB_HOST,
      port: dbConfig.port || process.env.DB_PORT || 3306,
      dialect: dbConfig.dialect,
      logging: dbConfig.logging ? (msg) => logger.debug(msg) : false,
      pool: dbConfig.pool || {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      define: {
        timestamps: true,
        underscored: true,
        freezeTableName: true,
      },
    },
  )
}

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate()
    logger.info("✅ Database connection established successfully")
  } catch (error) {
    logger.error("❌ Unable to connect to database:", error)
    process.exit(1)
  }
}

testConnection()

module.exports = sequelize
