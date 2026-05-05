const express = require("express");
const UserController = require("../controllers/UserController");
const {
  validateCreateUser,
  validateUpdateUser,
  validateLoginUser
} = require("../validators/user.validator");

const router = express.Router();

router.post("/login", validateLoginUser, UserController.login);
router.post("/", validateCreateUser, UserController.create);
router.get("/", UserController.findAll);
router.get("/:id", UserController.findById);
router.put("/:id", validateUpdateUser, UserController.update);
router.delete("/:id", UserController.delete);

module.exports = router;
