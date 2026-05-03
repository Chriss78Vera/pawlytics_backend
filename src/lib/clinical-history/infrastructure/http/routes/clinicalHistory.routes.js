const express = require("express");
const ClinicalHistoryController = require("../controllers/ClinicalHistoryController");
const {
  validateCreateClinicalHistory,
  validateUpdateClinicalHistory
} = require("../validators/clinicalHistory.validator");

const router = express.Router();

router.post("/", validateCreateClinicalHistory, ClinicalHistoryController.create);
router.get("/", ClinicalHistoryController.findAll);
router.get("/pet/:petId", ClinicalHistoryController.findByPet);
router.get("/:id", ClinicalHistoryController.findById);
router.put("/:id", validateUpdateClinicalHistory, ClinicalHistoryController.update);
router.delete("/:id", ClinicalHistoryController.delete);

module.exports = router;
