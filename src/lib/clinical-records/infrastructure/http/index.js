const SimpleClinicalRepository = require("../persistence/postgres/SimpleClinicalRepository");
const VaccinePostgresModel = require("../persistence/postgres/VaccinePostgresModel");
const DewormingPostgresModel = require("../persistence/postgres/DewormingPostgresModel");
const SurgeryPostgresModel = require("../persistence/postgres/SurgeryPostgresModel");
const DiseasePostgresModel = require("../persistence/postgres/DiseasePostgresModel");
const SimpleClinicalController = require("./controllers/SimpleClinicalController");
const buildSimpleClinicalRoutes = require("./routes/simpleClinical.routes");
const clinicalDetailRoutes = require("./routes/clinicalDetail.routes");

module.exports = function registerClinicalRecordsModule(app) {
  const vaccineController = new SimpleClinicalController(
    new SimpleClinicalRepository(VaccinePostgresModel, "ID_VACUNA", {
      type: "VA_TIPO",
      date: "VA_FECHA"
    }),
    "Vacuna no encontrada",
    "vaccine"
  );

  const dewormingController = new SimpleClinicalController(
    new SimpleClinicalRepository(DewormingPostgresModel, "ID_DESPARASITACION", {
      type: "DE_TIPO",
      date: "DE_FECHA"
    }),
    "Desparasitacion no encontrada",
    "deworming"
  );

  const surgeryController = new SimpleClinicalController(
    new SimpleClinicalRepository(SurgeryPostgresModel, "ID_CIRUGIA", {
      type: "CI_TIPO",
      description: "CI_DESCRIPCION",
      date: "CI_FECHA"
    }),
    "Cirugia no encontrada",
    "surgery"
  );

  const diseaseController = new SimpleClinicalController(
    new SimpleClinicalRepository(DiseasePostgresModel, "ID_ENFERMEDADES", {
      treatment: "EN_TRATAMIENTO",
      name: "EN_NOMBRE"
    }),
    "Enfermedad no encontrada",
    "disease"
  );

  app.use("/api/vacunas", buildSimpleClinicalRoutes(vaccineController));
  app.use("/api/desparasitaciones", buildSimpleClinicalRoutes(dewormingController));
  app.use("/api/cirugias", buildSimpleClinicalRoutes(surgeryController));
  app.use("/api/enfermedades", buildSimpleClinicalRoutes(diseaseController));
  app.use("/api/detalle-clinico", clinicalDetailRoutes);
};
