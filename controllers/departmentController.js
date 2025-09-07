const { Department, Employee } = require("../models")
const logger = require("../config/logger")

class DepartmentController {
  // Create new department
  async create(req, res, next) {
    try {
      const { name } = req.body

      const department = await Department.create({
        name,
      })

      res.status(201).json({
        success: true,
        message: "Department created successfully",
        data: department,
      })
    } catch (error) {
      next(error)
    }
  }

  // Get all departments
  async getAll(req, res, next) {
    try {
      const { include_employees = false } = req.query

      const options = {
        order: [["name", "ASC"]],
      }

      if (include_employees === "true") {
        options.include = [
          {
            model: Employee,
            as: "employees",
            attributes: ["id", "name", "email"],
          },
        ]
      }

      const departments = await Department.findAll(options)

      res.json({
        success: true,
        count: departments.length,
        data: departments,
      })
    } catch (error) {
      next(error)
    }
  }

  // Get department by ID
  async getById(req, res, next) {
    try {
      const { id } = req.params

      const department = await Department.findByPk(id, {
        include: [
          {
            model: Employee,
            as: "employees",
            attributes: ["id", "name", "email", "salary"],
          },
        ],
      })

      if (!department) {
        return res.status(404).json({
          success: false,
          message: "Department not found",
        })
      }

      res.json({
        success: true,
        data: department,
      })
    } catch (error) {
      next(error)
    }
  }

  // Update department
  async update(req, res, next) {
    try {
      const { id } = req.params
      const { name } = req.body

      const department = await Department.findByPk(id)

      if (!department) {
        return res.status(404).json({
          success: false,
          message: "Department not found",
        })
      }

      await department.update({
        name: name || department.name,
      })

      res.json({
        success: true,
        message: "Department updated successfully",
        data: department,
      })
    } catch (error) {
      next(error)
    }
  }

  // Delete department
  async delete(req, res, next) {
    try {
      const { id } = req.params

      const department = await Department.findByPk(id)

      if (!department) {
        return res.status(404).json({
          success: false,
          message: "Department not found",
        })
      }

      // Check if department has employees
      const employeeCount = await Employee.count({
        where: { department_id: id },
      })

      if (employeeCount > 0) {
        return res.status(400).json({
          success: false,
          message: `Cannot delete department. It has ${employeeCount} employee(s) assigned.`,
        })
      }

      await department.destroy()

      res.json({
        success: true,
        message: "Department deleted successfully",
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new DepartmentController()
