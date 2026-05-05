const express = require("express");
const ClinicalDetailController = require("../controllers/ClinicalDetailController");

const router = express.Router();

router.post("/", ClinicalDetailController.create);
router.get("/", ClinicalDetailController.findAll);
router.get("/pet/:petId", ClinicalDetailController.findByPet);
router.get("/:id", ClinicalDetailController.findById);
router.put("/:id", ClinicalDetailController.update);
router.delete("/:id", ClinicalDetailController.delete);

module.exports = router;
