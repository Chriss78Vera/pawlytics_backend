const typeRoutes = require("./routes/type.routes");
const breedRoutes = require("./routes/breed.routes");

module.exports = function registerCatalogsModule(app) {
  app.use("/api/tipos", typeRoutes);
  app.use("/api/razas", breedRoutes);
};
