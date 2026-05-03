const UserPostgresModel = require("../../../lib/users/infrastructure/persistence/postgres/UserPostgresModel");
const RolePostgresModel = require("../../../lib/users/infrastructure/persistence/postgres/RolePostgresModel");
const UserDataPostgresModel = require("../../../lib/user-data/infrastructure/persistence/postgres/UserDataPostgresModel");
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

  UserDataPostgresModel.hasOne(UserPostgresModel, {
    foreignKey: "ID_DATOS",
    as: "user"
  });

  UserPostgresModel.belongsTo(UserDataPostgresModel, {
    foreignKey: "ID_DATOS",
    as: "userData"
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
