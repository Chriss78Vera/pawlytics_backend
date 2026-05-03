const userRoutes = require("./routes/user.routes");

module.exports = function registerUsersModule(app) {
  app.use("/api/users", userRoutes);
};
