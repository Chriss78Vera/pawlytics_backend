const express = require("express");
const UserDataController = require("../controllers/UserDataController");

const router = express.Router();

router.post("/", UserDataController.create);
router.get("/", UserDataController.findAll);
router.get("/:id", UserDataController.findById);
router.put("/:id", UserDataController.update);
router.delete("/:id", UserDataController.delete);

module.exports = router;
