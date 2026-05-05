const express = require("express");
const RoleController = require("../controllers/RoleController");

const router = express.Router();

router.post("/", RoleController.create);
router.get("/", RoleController.findAll);
router.get("/:id", RoleController.findById);
router.put("/:id", RoleController.update);
router.delete("/:id", RoleController.delete);

module.exports = router;
