const express = require("express");
const PetController = require("../controllers/PetController");
const {
  validateCreatePet,
  validateUpdatePet
} = require("../validators/pet.validator");

const router = express.Router();

router.post("/", validateCreatePet, PetController.create);
router.get("/", PetController.findAll);
router.get("/user-data/:userDataId", PetController.findByUserData);
router.get("/:id", PetController.findById);
router.put("/:id", validateUpdatePet, PetController.update);
router.delete("/:id", PetController.delete);

module.exports = router;
