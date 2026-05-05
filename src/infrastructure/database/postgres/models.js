const UserPostgresModel = require("../../../lib/users/infrastructure/persistence/postgres/UserPostgresModel");
const RolePostgresModel = require("../../../lib/users/infrastructure/persistence/postgres/RolePostgresModel");
const UserDataPostgresModel = require("../../../lib/user-data/infrastructure/persistence/postgres/UserDataPostgresModel");
const TypePostgresModel = require("../../../lib/catalogs/infrastructure/persistence/postgres/TypePostgresModel");
const BreedPostgresModel = require("../../../lib/catalogs/infrastructure/persistence/postgres/BreedPostgresModel");
const PetPostgresModel = require("../../../lib/pets/infrastructure/persistence/postgres/PetPostgresModel");
const VaccinePostgresModel = require("../../../lib/clinical-records/infrastructure/persistence/postgres/VaccinePostgresModel");
const DewormingPostgresModel = require("../../../lib/clinical-records/infrastructure/persistence/postgres/DewormingPostgresModel");
const SurgeryPostgresModel = require("../../../lib/clinical-records/infrastructure/persistence/postgres/SurgeryPostgresModel");
const DiseasePostgresModel = require("../../../lib/clinical-records/infrastructure/persistence/postgres/DiseasePostgresModel");
const ClinicalDetailPostgresModel = require("../../../lib/clinical-records/infrastructure/persistence/postgres/ClinicalDetailPostgresModel");
const ClinicalDetailVaccinePostgresModel = require("../../../lib/clinical-records/infrastructure/persistence/postgres/ClinicalDetailVaccinePostgresModel");

module.exports = {
  UserPostgresModel,
  RolePostgresModel,
  UserDataPostgresModel,
  TypePostgresModel,
  BreedPostgresModel,
  PetPostgresModel,
  VaccinePostgresModel,
  DewormingPostgresModel,
  SurgeryPostgresModel,
  DiseasePostgresModel,
  ClinicalDetailPostgresModel,
  ClinicalDetailVaccinePostgresModel
};
