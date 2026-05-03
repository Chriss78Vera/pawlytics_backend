const roleRoutes = require("./routes/role.routes");

module.exports = function registerRolesModule(app) {
  app.use("/api/roles", roleRoutes);
};
