require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const registerUsersModule = require("./lib/users/Infraestructura/http");
const registerRolesModule = require("./lib/roles/Infraestructura/http");
const registerClinicalHistoryModule = require("./lib/clinical-history/Infraestructura/http");

function buildApp() {
  const app = express();

  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/api/health", (req, res) => {
    res.json({
      status: "OK",
      service: "Pawlytics Backend"
    });
  });

  registerUsersModule(app);
  registerRolesModule(app);
  registerClinicalHistoryModule(app);

  app.use((req, res) => {
    res.status(404).json({ message: "Ruta no encontrada" });
  });

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({
      message: err.message || "Error interno del servidor"
    });
  });

  return app;
}

module.exports = buildApp;
