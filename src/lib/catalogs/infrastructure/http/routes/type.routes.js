const express = require("express");
const CatalogController = require("../controllers/CatalogController");

const router = express.Router();

router.get("/", CatalogController.findAllTypes);
router.get("/:tipoId/razas", CatalogController.findBreedsByType);
router.get("/:id", CatalogController.findTypeById);

module.exports = router;
