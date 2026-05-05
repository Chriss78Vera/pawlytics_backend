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

  UserDataPostgresModel.hasMany(PetPostgresModel, {
    foreignKey: "ID_DATOS",
    as: "pets"
  });

  PetPostgresModel.belongsTo(UserDataPostgresModel, {
    foreignKey: "ID_DATOS",
    as: "ownerData"
  });

  TypePostgresModel.hasMany(PetPostgresModel, {
    foreignKey: "TIP_ID",
    as: "mascotas"
  });

  PetPostgresModel.belongsTo(TypePostgresModel, {
    foreignKey: "TIP_ID",
    as: "tipo"
  });

  BreedPostgresModel.hasMany(PetPostgresModel, {
    foreignKey: "RAZ_ID",
    as: "mascotas"
  });

  PetPostgresModel.belongsTo(BreedPostgresModel, {
    foreignKey: "RAZ_ID",
    as: "raza"
  });

  PetPostgresModel.hasMany(ClinicalDetailPostgresModel, {
    foreignKey: "ID_MASCOTA",
    as: "clinicalDetails"
  });

  ClinicalDetailPostgresModel.belongsTo(PetPostgresModel, {
    foreignKey: "ID_MASCOTA",
    as: "pet"
  });

  DewormingPostgresModel.hasMany(ClinicalDetailPostgresModel, {
    foreignKey: "ID_DESPARASITACION",
    as: "clinicalDetails"
  });

  ClinicalDetailPostgresModel.belongsTo(DewormingPostgresModel, {
    foreignKey: "ID_DESPARASITACION",
    as: "deworming"
  });

  SurgeryPostgresModel.hasMany(ClinicalDetailPostgresModel, {
    foreignKey: "ID_CIRUGIA",
    as: "clinicalDetails"
  });

  ClinicalDetailPostgresModel.belongsTo(SurgeryPostgresModel, {
    foreignKey: "ID_CIRUGIA",
    as: "surgery"
  });

  DiseasePostgresModel.hasMany(ClinicalDetailPostgresModel, {
    foreignKey: "ID_ENFERMEDADES",
    as: "clinicalDetails"
  });

  ClinicalDetailPostgresModel.belongsTo(DiseasePostgresModel, {
    foreignKey: "ID_ENFERMEDADES",
    as: "disease"
  });

  ClinicalDetailPostgresModel.belongsToMany(VaccinePostgresModel, {
    through: ClinicalDetailVaccinePostgresModel,
    foreignKey: "ID_DETALLE",
    otherKey: "ID_VACUNA",
    as: "vaccines"
  });

  VaccinePostgresModel.belongsToMany(ClinicalDetailPostgresModel, {
    through: ClinicalDetailVaccinePostgresModel,
    foreignKey: "ID_VACUNA",
    otherKey: "ID_DETALLE",
    as: "clinicalDetails"
  });
}

module.exports = {
  setupPostgresAssociations
};
