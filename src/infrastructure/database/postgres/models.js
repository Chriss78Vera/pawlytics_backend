const UserPostgresModel = require("../../../lib/users/infrastructure/persistence/postgres/UserPostgresModel");
const RolePostgresModel = require("../../../lib/users/infrastructure/persistence/postgres/RolePostgresModel");
const UserDataPostgresModel = require("../../../lib/user-data/infrastructure/persistence/postgres/UserDataPostgresModel");
const TypePostgresModel = require("../../../lib/catalogs/infrastructure/persistence/postgres/TypePostgresModel");
const BreedPostgresModel = require("../../../lib/catalogs/infrastructure/persistence/postgres/BreedPostgresModel");

module.exports = {
  UserPostgresModel,
  RolePostgresModel,
  UserDataPostgresModel,
  TypePostgresModel,
  BreedPostgresModel
};
