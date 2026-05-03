const TypePostgresModel = require("../persistence/postgres/TypePostgresModel");
const BreedPostgresModel = require("../persistence/postgres/BreedPostgresModel");
const { TYPES, BREEDS } = require("./catalogData");

async function seedCatalogs() {
  await TypePostgresModel.bulkCreate(
    TYPES.map((type) => ({
      TIP_ID: type.id,
      TIP_NOMBRE: type.name,
      TIP_ORDEN: type.order
    })),
    {
      updateOnDuplicate: ["TIP_NOMBRE", "TIP_ORDEN"]
    }
  );

  await BreedPostgresModel.bulkCreate(
    BREEDS.map((breed) => ({
      RAZ_ID: breed.id,
      RAZ_NOMBRE: breed.name,
      TIP_ID: breed.typeId,
      RAZ_ORDEN: breed.order
    })),
    {
      updateOnDuplicate: ["RAZ_NOMBRE", "TIP_ID", "RAZ_ORDEN"]
    }
  );

  console.log("Catalogos PostgreSQL sincronizados correctamente");
}

module.exports = {
  seedCatalogs
};
