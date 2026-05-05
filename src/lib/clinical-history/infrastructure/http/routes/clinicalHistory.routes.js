const express = require("express");
const ClinicalHistoryController = require("../controllers/ClinicalHistoryController");

const router = express.Router();

router.post("/", ClinicalHistoryController.create);
router.get("/", ClinicalHistoryController.findAll);
router.get("/pet/:petId", ClinicalHistoryController.findByPet);
router.get("/:id", ClinicalHistoryController.findById);
router.put("/:id", ClinicalHistoryController.update);
router.delete("/:id", ClinicalHistoryController.delete);

module.exports = router;
