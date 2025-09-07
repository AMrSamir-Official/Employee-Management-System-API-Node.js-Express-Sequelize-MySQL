const express = require("express")
const departmentController = require("../controllers/departmentController")
const { validateDepartment } = require("../middlewares/validateInput")

const router = express.Router()

// Department routes
router.post("/", validateDepartment, departmentController.create)
router.get("/", departmentController.getAll)
router.get("/:id", departmentController.getById)
router.put("/:id", validateDepartment, departmentController.update)
router.delete("/:id", departmentController.delete)

module.exports = router
