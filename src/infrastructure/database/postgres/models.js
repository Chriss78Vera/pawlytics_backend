const UserPostgresModel = require("../../../lib/users/infrastructure/persistence/postgres/UserPostgresModel");
const RolePostgresModel = require("../../../lib/users/infrastructure/persistence/postgres/RolePostgresModel");
const TypePostgresModel = require("../../../lib/catalogs/infrastructure/persistence/postgres/TypePostgresModel");
const BreedPostgresModel = require("../../../lib/catalogs/infrastructure/persistence/postgres/BreedPostgresModel");

module.exports = {
  UserPostgresModel,
  RolePostgresModel,
  TypePostgresModel,
  BreedPostgresModel
};
