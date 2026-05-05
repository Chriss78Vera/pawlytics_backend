const express = require("express");
const ClinicalDetailController = require("../controllers/ClinicalDetailController");
const { validateClinicalDetail } = require("../validators/clinicalRecord.validator");

const router = express.Router();

router.post("/", validateClinicalDetail, ClinicalDetailController.create);
router.get("/", ClinicalDetailController.findAll);
router.get("/pet/:petId", ClinicalDetailController.findByPet);
router.get("/:id", ClinicalDetailController.findById);
router.put("/:id", validateClinicalDetail, ClinicalDetailController.update);
router.delete("/:id", ClinicalDetailController.delete);

module.exports = router;
