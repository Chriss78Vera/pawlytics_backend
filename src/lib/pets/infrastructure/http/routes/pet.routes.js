const express = require("express");
const PetController = require("../controllers/PetController");

const router = express.Router();

router.post("/", PetController.create);
router.get("/", PetController.findAll);
router.get("/user-data/:userDataId", PetController.findByUserData);
router.get("/:id", PetController.findById);
router.put("/:id", PetController.update);
router.delete("/:id", PetController.delete);

module.exports = router;
