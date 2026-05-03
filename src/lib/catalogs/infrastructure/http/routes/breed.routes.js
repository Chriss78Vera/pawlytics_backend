const express = require("express");
const CatalogController = require("../controllers/CatalogController");

const router = express.Router();

router.get("/", CatalogController.findAllBreeds);
router.get("/tipo/:tipoId", CatalogController.findBreedsByType);
router.get("/:id", CatalogController.findBreedById);

module.exports = router;
