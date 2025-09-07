const { Employee, Department, Op } = require("../models")
const logger = require("../config/logger")
const reportService = require("../services/reportService")

class EmployeeController {
  // Create new employee
  async create(req, res, next) {
    try {
      const { name, email, salary, department_id } = req.body

      // Check if department exists
      const department = await Department.findByPk(department_id)
      if (!department) {
        return res.status(400).json({
          success: false,
          message: "Department not found",
        })
      }

      // Create a new employee record
      const employee = await Employee.create({
        name,
        email,
        salary,
        department_id,
      })

      // Fetch employee with department info
      const employeeWithDept = await Employee.findByPk(employee.id, {
        include: [{ model: Department, as: "department" }],
      })

      logger.info(`Employee created: ${employee.name} (ID: ${employee.id})`)

      res.status(201).json({
        success: true,
        message: "Employee created successfully",
        data: employeeWithDept,
      })
    } catch (error) {
      next(error)
    }
  }

  // Get all employees with pagination and filtering
  async getAll(req, res, next) {
    try {
      const { page = 1, limit = 10, department_id, search, sort_by = "name", sort_order = "ASC" } = req.query

      const offset = (page - 1) * limit
      const whereClause = {}

      // Filter by department
      if (department_id) {
        whereClause.department_id = department_id
      }

      // Search functionality
      if (search) {
        whereClause[Op.or] = [{ name: { [Op.like]: `%${search}%` } }, { email: { [Op.like]: `%${search}%` } }]
      }

      const { count, rows: employees } = await Employee.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: Department,
            as: "department",
            attributes: ["id", "name"],
          },
        ],
        limit: Number.parseInt(limit),
        offset: Number.parseInt(offset),
        order: [[sort_by, sort_order.toUpperCase()]],
      })

      const totalPages = Math.ceil(count / limit)

      res.json({
        success: true,
        data: employees,
        pagination: {
          current_page: Number.parseInt(page),
          total_pages: totalPages,
          total_records: count,
          per_page: Number.parseInt(limit),
          has_next: page < totalPages,
          has_prev: page > 1,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  // Get employee by ID
  async getById(req, res, next) {
    try {
      const { id } = req.params

      const employee = await Employee.findByPk(id, {
        include: [
          {
            model: Department,
            as: "department",
          },
        ],
      })

      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        })
      }

      res.json({
        success: true,
        data: employee,
      })
    } catch (error) {
      next(error)
    }
  }

  // Update employee
  async update(req, res, next) {
    try {
      const { id } = req.params
      const { name, email, salary, department_id } = req.body

      const employee = await Employee.findByPk(id)

      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        })
      }

      // Check if department exists (if provided)
      if (department_id) {
        const department = await Department.findByPk(department_id)
        if (!department) {
          return res.status(400).json({
            success: false,
            message: "Department not found",
          })
        }
      }

      await employee.update({
        name: name || employee.name,
        email: email || employee.email,
        salary: salary || employee.salary,
        department_id: department_id || employee.department_id,
      })

      // Fetch updated employee with department
      const updatedEmployee = await Employee.findByPk(id, {
        include: [{ model: Department, as: "department" }],
      })

      logger.info(`Employee updated: ${employee.name} (ID: ${employee.id})`)

      res.json({
        success: true,
        message: "Employee updated successfully",
        data: updatedEmployee,
      })
    } catch (error) {
      next(error)
    }
  }

  // Delete employee
  async delete(req, res, next) {
    try {
      const { id } = req.params

      const employee = await Employee.findByPk(id)

      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        })
      }

      await employee.destroy()

      logger.info(`Employee deleted: ${employee.name} (ID: ${employee.id})`)

      res.json({
        success: true,
        message: "Employee deleted successfully",
      })
    } catch (error) {
      next(error)
    }
  }

  // Export employees to CSV
  async exportCSV(req, res, next) {
    try {
      const { department_id } = req.query
      const csvBuffer = await reportService.generateCSV(department_id)

      res.setHeader("Content-Type", "text/csv")
      res.setHeader("Content-Disposition", "attachment; filename=employees.csv")
      res.send(csvBuffer)
    } catch (error) {
      next(error)
    }
  }

  // Export employees to PDF
  async exportPDF(req, res, next) {
    try {
      const { department_id } = req.query
      const pdfBuffer = await reportService.generatePDF(department_id)

      res.setHeader("Content-Type", "application/pdf")
      res.setHeader("Content-Disposition", "attachment; filename=employees.pdf")
      res.send(pdfBuffer)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new EmployeeController()
