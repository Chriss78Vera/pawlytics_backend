const PetPostgresRepository = require("../../persistence/postgres/PetPostgresRepository");

const petRepository = new PetPostgresRepository();

class PetController {
  static async create(req, res) {
    try {
      const pet = await petRepository.create(req.body);
      return res.status(201).json(pet);
    } catch (error) {
      if (error.name === "SequelizeForeignKeyConstraintError") {
        return res.status(400).json({ message: "typeId, breedId o userDataId no existe" });
      }

      return res.status(500).json({ message: error.message });
    }
  }

  static async findAll(req, res) {
    try {
      const pets = await petRepository.findAll();
      return res.json(pets);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async findById(req, res) {
    try {
      const pet = await petRepository.findById(req.params.id);

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
      const pets = await petRepository.findByUserData(req.params.userDataId);
      return res.json(pets);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const pet = await petRepository.update(req.params.id, req.body);

      if (!pet) {
        return res.status(404).json({ message: "Mascota no encontrada" });
      }

      return res.json(pet);
    } catch (error) {
      if (error.name === "SequelizeForeignKeyConstraintError") {
        return res.status(400).json({ message: "typeId, breedId o userDataId no existe" });
      }

      return res.status(500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const deleted = await petRepository.delete(req.params.id);

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
