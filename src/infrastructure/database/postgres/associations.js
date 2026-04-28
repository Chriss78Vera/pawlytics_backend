const UserPostgresModel = require("../../../modules/users/infrastructure/persistence/postgres/UserPostgresModel");
const RolPostgresModel = require("../../../modules/users/infrastructure/persistence/postgres/RolPostgresModel");

function setupPostgresAssociations() {
  RolPostgresModel.hasMany(UserPostgresModel, {
    foreignKey: "ROL_ID",
    as: "usuarios"
  });

  UserPostgresModel.belongsTo(RolPostgresModel, {
    foreignKey: "ROL_ID",
    as: "rol"
  });
}

module.exports = {
  setupPostgresAssociations
};