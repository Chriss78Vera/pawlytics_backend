const userDataRoutes = require("./routes/userData.routes");

module.exports = function registerUserDataModule(app) {
  app.use("/api/user-data", userDataRoutes);
};
