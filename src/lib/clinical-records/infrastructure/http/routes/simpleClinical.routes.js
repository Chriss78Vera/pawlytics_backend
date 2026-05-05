const express = require("express");

function buildSimpleClinicalRoutes(controller, validator) {
  const router = express.Router();

  router.post("/", validator, controller.create);
  router.get("/", controller.findAll);
  router.get("/:id", controller.findById);
  router.put("/:id", validator, controller.update);
  router.delete("/:id", controller.delete);

  return router;
}

module.exports = buildSimpleClinicalRoutes;
