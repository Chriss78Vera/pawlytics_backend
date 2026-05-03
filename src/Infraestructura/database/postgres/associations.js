const UserPostgresModel = require("../../../lib/users/Infraestructura/persistence/postgres/UserPostgresModel");
const RolPostgresModel = require("../../../lib/users/Infraestructura/persistence/postgres/RolPostgresModel");

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
