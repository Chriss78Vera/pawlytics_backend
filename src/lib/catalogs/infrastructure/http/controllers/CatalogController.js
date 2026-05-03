const GetTypesUseCase = require("../../../application/use-cases/GetTypesUseCase");
const GetTypeByIdUseCase = require("../../../application/use-cases/GetTypeByIdUseCase");
const GetBreedsUseCase = require("../../../application/use-cases/GetBreedsUseCase");
const GetBreedByIdUseCase = require("../../../application/use-cases/GetBreedByIdUseCase");
const GetBreedsByTypeUseCase = require("../../../application/use-cases/GetBreedsByTypeUseCase");
const CatalogPostgresRepository = require("../../persistence/postgres/CatalogPostgresRepository");

const catalogRepository = new CatalogPostgresRepository();

class CatalogController {
  static async findAllTypes(req, res) {
    try {
      const types = await new GetTypesUseCase(catalogRepository).execute();
      return res.json(types);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async findTypeById(req, res) {
    try {
      const type = await new GetTypeByIdUseCase(catalogRepository).execute(req.params.id);

      if (!type) {
        return res.status(404).json({ message: "Tipo no encontrado" });
      }

      return res.json(type);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async findAllBreeds(req, res) {
    try {
      const breeds = await new GetBreedsUseCase(catalogRepository).execute();
      return res.json(breeds);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async findBreedById(req, res) {
    try {
      const breed = await new GetBreedByIdUseCase(catalogRepository).execute(req.params.id);

      if (!breed) {
        return res.status(404).json({ message: "Raza no encontrada" });
      }

      return res.json(breed);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async findBreedsByType(req, res) {
    try {
      const breeds = await new GetBreedsByTypeUseCase(catalogRepository).execute(req.params.tipoId);
      return res.json(breeds);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = CatalogController;
