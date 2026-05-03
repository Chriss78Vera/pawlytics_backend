const UserPostgresModel = require("../../../lib/users/infrastructure/persistence/postgres/UserPostgresModel");
const RolePostgresModel = require("../../../lib/users/infrastructure/persistence/postgres/RolePostgresModel");
const TypePostgresModel = require("../../../lib/catalogs/infrastructure/persistence/postgres/TypePostgresModel");
const BreedPostgresModel = require("../../../lib/catalogs/infrastructure/persistence/postgres/BreedPostgresModel");

function setupPostgresAssociations() {
  RolePostgresModel.hasMany(UserPostgresModel, {
    foreignKey: "ROL_ID",
    as: "usuarios"
  });

  UserPostgresModel.belongsTo(RolePostgresModel, {
    foreignKey: "ROL_ID",
    as: "rol"
  });

  TypePostgresModel.hasMany(BreedPostgresModel, {
    foreignKey: "TIP_ID",
    as: "razas"
  });

  BreedPostgresModel.belongsTo(TypePostgresModel, {
    foreignKey: "TIP_ID",
    as: "tipo"
  });
}

module.exports = {
  setupPostgresAssociations
};
