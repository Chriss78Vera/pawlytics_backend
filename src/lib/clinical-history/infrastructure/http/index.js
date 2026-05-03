const clinicalHistoryRoutes = require("./routes/clinicalHistory.routes");

module.exports = function registerClinicalHistoryModule(app) {
  app.use("/api/clinical-history", clinicalHistoryRoutes);
};
