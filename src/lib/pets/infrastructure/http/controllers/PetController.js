const PetPostgresRepository = require("../../persistence/postgres/PetPostgresRepository");
const CreatePetUseCase = require("../../../application/use-cases/CreatePetUseCase");
const GetPetsUseCase = require("../../../application/use-cases/GetPetsUseCase");
const GetPetByIdUseCase = require("../../../application/use-cases/GetPetByIdUseCase");
const GetPetsByUserDataUseCase = require("../../../application/use-cases/GetPetsByUserDataUseCase");
const UpdatePetUseCase = require("../../../application/use-cases/UpdatePetUseCase");
const DeletePetUseCase = require("../../../application/use-cases/DeletePetUseCase");

const petRepository = new PetPostgresRepository();

class PetController {
  static async create(req, res) {
    try {
      const pet = await new CreatePetUseCase(petRepository).execute(req.body);
      return res.status(201).json(pet);
    } catch (error) {
      if (error.name === "DomainValidationError") {
        return res.status(400).json({ message: error.message });
      }

      if (error.name === "SequelizeForeignKeyConstraintError") {
        return res.status(400).json({ message: "typeId, breedId o userDataId no existe" });
      }

      return res.status(500).json({ message: error.message });
    }
  }

  static async findAll(req, res) {
    try {
      const pets = await new GetPetsUseCase(petRepository).execute();
      return res.json(pets);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async findById(req, res) {
    try {
      const pet = await new GetPetByIdUseCase(petRepository).execute(req.params.id);

      if (!pet) {
        return res.status(404).json({ message: "Mascota no encontrada" });
      }

      return res.json(pet);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async findByUserData(req, res) {
    try {
      const pets = await new GetPetsByUserDataUseCase(petRepository).execute(req.params.userDataId);
      return res.json(pets);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const pet = await new UpdatePetUseCase(petRepository).execute(req.params.id, req.body);

      if (!pet) {
        return res.status(404).json({ message: "Mascota no encontrada" });
      }

      return res.json(pet);
    } catch (error) {
      if (error.name === "DomainValidationError") {
        return res.status(400).json({ message: error.message });
      }

      if (error.name === "SequelizeForeignKeyConstraintError") {
        return res.status(400).json({ message: "typeId, breedId o userDataId no existe" });
      }

      return res.status(500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const deleted = await new DeletePetUseCase(petRepository).execute(req.params.id);

      if (!deleted) {
        return res.status(404).json({ message: "Mascota no encontrada" });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = PetController;
