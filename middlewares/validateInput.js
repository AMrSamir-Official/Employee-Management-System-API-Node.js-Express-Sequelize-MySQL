const Joi = require("joi")
const logger = require("../config/logger")

// Employee validation schema
const employeeSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name cannot exceed 100 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "string.empty": "Email is required",
  }),
  salary: Joi.number().positive().precision(2).required().messages({
    "number.base": "Salary must be a number",
    "number.positive": "Salary must be a positive number",
    "any.required": "Salary is required",
  }),
  department_id: Joi.number().integer().positive().required().messages({
    "number.base": "Department ID must be a number",
    "number.integer": "Department ID must be an integer",
    "number.positive": "Department ID must be positive",
    "any.required": "Department ID is required",
  }),
})

// Department validation schema
const departmentSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Department name is required",
    "string.min": "Department name must be at least 2 characters long",
    "string.max": "Department name cannot exceed 100 characters",
  }),
  description: Joi.string().max(500).allow("").optional().messages({
    "string.max": "Description cannot exceed 500 characters",
  }),
  is_active: Joi.boolean().optional(),
})

// Validation middleware factory
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false })

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(", ")
      logger.warn(`Validation error: ${errorMessage}`, {
        body: req.body,
        url: req.originalUrl,
      })

      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details.map((detail) => ({
          field: detail.path.join("."),
          message: detail.message,
        })),
      })
    }

    next()
  }
}

module.exports = {
  validateEmployee: validate(employeeSchema),
  validateDepartment: validate(departmentSchema),
}
