const SimpleClinicalRepository = require("../persistence/postgres/SimpleClinicalRepository");
const VaccinePostgresModel = require("../persistence/postgres/VaccinePostgresModel");
const DewormingPostgresModel = require("../persistence/postgres/DewormingPostgresModel");
const SurgeryPostgresModel = require("../persistence/postgres/SurgeryPostgresModel");
const DiseasePostgresModel = require("../persistence/postgres/DiseasePostgresModel");
const SimpleClinicalController = require("./controllers/SimpleClinicalController");
const buildSimpleClinicalRoutes = require("./routes/simpleClinical.routes");
const clinicalDetailRoutes = require("./routes/clinicalDetail.routes");
const {
  validateVaccine,
  validateDeworming,
  validateSurgery,
  validateDisease
} = require("./validators/clinicalRecord.validator");

module.exports = function registerClinicalRecordsModule(app) {
  const vaccineController = new SimpleClinicalController(
    new SimpleClinicalRepository(VaccinePostgresModel, "ID_VACUNA", {
      type: "VA_TIPO",
      date: "VA_FECHA"
    }),
    "Vacuna no encontrada"
  );

  const dewormingController = new SimpleClinicalController(
    new SimpleClinicalRepository(DewormingPostgresModel, "ID_DESPARASITACION", {
      type: "DE_TIPO",
      date: "DE_FECHA"
    }),
    "Desparasitacion no encontrada"
  );

  const surgeryController = new SimpleClinicalController(
    new SimpleClinicalRepository(SurgeryPostgresModel, "ID_CIRUGIA", {
      type: "CI_TIPO",
      description: "CI_DESCRIPCION",
      date: "CI_FECHA"
    }),
    "Cirugia no encontrada"
  );

  const diseaseController = new SimpleClinicalController(
    new SimpleClinicalRepository(DiseasePostgresModel, "ID_ENFERMEDADES", {
      treatment: "EN_TRATAMIENTO",
      name: "EN_NOMBRE"
    }),
    "Enfermedad no encontrada"
  );

  app.use("/api/vacunas", buildSimpleClinicalRoutes(vaccineController, validateVaccine));
  app.use("/api/desparasitaciones", buildSimpleClinicalRoutes(dewormingController, validateDeworming));
  app.use("/api/cirugias", buildSimpleClinicalRoutes(surgeryController, validateSurgery));
  app.use("/api/enfermedades", buildSimpleClinicalRoutes(diseaseController, validateDisease));
  app.use("/api/detalle-clinico", clinicalDetailRoutes);
};
