const petRoutes = require("./routes/pet.routes");

module.exports = function registerPetsModule(app) {
  app.use("/api/mascotas", petRoutes);
};
