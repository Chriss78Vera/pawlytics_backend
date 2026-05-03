const express = require("express");
const UserDataController = require("../controllers/UserDataController");
const {
  validateCreateUserData,
  validateUpdateUserData
} = require("../validators/userData.validator");

const router = express.Router();

router.post("/", validateCreateUserData, UserDataController.create);
router.get("/", UserDataController.findAll);
router.get("/:id", UserDataController.findById);
router.put("/:id", validateUpdateUserData, UserDataController.update);
router.delete("/:id", UserDataController.delete);

module.exports = router;
