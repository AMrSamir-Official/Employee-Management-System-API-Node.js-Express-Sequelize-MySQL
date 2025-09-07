const sequelize = require("../config/database")
const Employee = require("./employee")
const Department = require("./department")

// Define associations
Department.hasMany(Employee, {
  foreignKey: "department_id",
  as: "employees",
})

Employee.belongsTo(Department, {
  foreignKey: "department_id",
  as: "department",
})

// Sync models (only in development)
if (process.env.NODE_ENV === "development") {
  sequelize.sync({ alter: true }).then(() => {
    console.log("Database synced successfully")
  })
}

module.exports = {
  sequelize,
  Employee,
  Department,
}
