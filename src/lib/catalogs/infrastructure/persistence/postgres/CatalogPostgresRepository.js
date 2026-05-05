const CatalogRepository = require("../../../domain/ports/CatalogRepository");
const Type = require("../../../domain/entities/Type");
const Breed = require("../../../domain/entities/Breed");
const TypePostgresModel = require("./TypePostgresModel");
const BreedPostgresModel = require("./BreedPostgresModel");

class CatalogPostgresRepository extends CatalogRepository {
  async findAllTypes() {
    const types = await TypePostgresModel.findAll({
      order: [["TIP_ORDEN", "ASC"]]
    });

    return types.map((type) => this.toTypeResponse(type));
  }

  async findTypeById(id) {
    const type = await TypePostgresModel.findByPk(id, {
      include: [
        {
          model: BreedPostgresModel,
          as: "razas"
        }
      ],
      order: [[{ model: BreedPostgresModel, as: "razas" }, "RAZ_ORDEN", "ASC"]]
    });

    return type ? this.toTypeResponse(type, true) : null;
  }

  async findAllBreeds() {
    const breeds = await BreedPostgresModel.findAll({
      include: [
        {
          model: TypePostgresModel,
          as: "tipo"
        }
      ],
      order: [["RAZ_ORDEN", "ASC"]]
    });

    return breeds.map((breed) => this.toBreedResponse(breed));
  }

  async findBreedById(id) {
    const breed = await BreedPostgresModel.findByPk(id, {
      include: [
        {
          model: TypePostgresModel,
          as: "tipo"
        }
      ]
    });

    return breed ? this.toBreedResponse(breed) : null;
  }

  async findBreedsByType(typeId) {
    const breeds = await BreedPostgresModel.findAll({
      where: { TIP_ID: typeId },
      include: [
        {
          model: TypePostgresModel,
          as: "tipo"
        }
      ],
      order: [["RAZ_ORDEN", "ASC"]]
    });

    return breeds.map((breed) => this.toBreedResponse(breed));
  }

  toTypeResponse(type, includeBreeds = false) {
    const rawType = type.toJSON();
    const response = {
      id: rawType.TIP_ID,
      nombre: rawType.TIP_NOMBRE
    };

    if (includeBreeds) {
      response.razas = (rawType.razas || []).map((breed) => ({
        id: breed.RAZ_ID,
        nombre: breed.RAZ_NOMBRE
      }));
    }

    return new Type(response).toJSON();
  }

  toBreedResponse(breed) {
    const rawBreed = breed.toJSON();

    return new Breed({
      id: rawBreed.RAZ_ID,
      nombre: rawBreed.RAZ_NOMBRE,
      tipo: rawBreed.tipo
        ? {
            id: rawBreed.tipo.TIP_ID,
            nombre: rawBreed.tipo.TIP_NOMBRE
          }
        : rawBreed.TIP_ID
    }).toJSON();
  }
}

module.exports = CatalogPostgresRepository;
