const express = require("express")
const employeeController = require("../controllers/employeeController")
const { validateEmployee } = require("../middlewares/validateInput")

const router = express.Router()

// Employee CRUD routes
router.post("/", validateEmployee, employeeController.create)
router.get("/", employeeController.getAll)
router.get("/:id", employeeController.getById)
router.put("/:id", validateEmployee, employeeController.update)
router.delete("/:id", employeeController.delete)

// Export routes
router.get("/export/csv", employeeController.exportCSV)
router.get("/export/pdf", employeeController.exportPDF)

module.exports = router
