const express = require("express");
const RoleController = require("../controllers/RoleController");
const {
  validateCreateRole,
  validateUpdateRole
} = require("../validators/role.validator");

const router = express.Router();

router.post("/", validateCreateRole, RoleController.create);
router.get("/", RoleController.findAll);
router.get("/:id", RoleController.findById);
router.put("/:id", validateUpdateRole, RoleController.update);
router.delete("/:id", RoleController.delete);

module.exports = router;
