const ClinicalDetailPostgresRepository = require("../../persistence/postgres/ClinicalDetailPostgresRepository");

const clinicalDetailRepository = new ClinicalDetailPostgresRepository();

class ClinicalDetailController {
  static async create(req, res) {
    try {
      const detail = await clinicalDetailRepository.create(req.body);
      return res.status(201).json(detail);
    } catch (error) {
      if (error.name === "SequelizeForeignKeyConstraintError") {
        return res.status(400).json({ message: "petId, surgeryId, diseaseId, dewormingId o vaccineIds no existe" });
      }

      return res.status(500).json({ message: error.message });
    }
  }

  static async findAll(req, res) {
    try {
      const details = await clinicalDetailRepository.findAll();
      return res.json(details);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async findById(req, res) {
    try {
      const detail = await clinicalDetailRepository.findById(req.params.id);

      if (!detail) {
        return res.status(404).json({ message: "Detalle clinico no encontrado" });
      }

      return res.json(detail);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async findByPet(req, res) {
    try {
      const details = await clinicalDetailRepository.findByPet(req.params.petId);
      return res.json(details);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const detail = await clinicalDetailRepository.update(req.params.id, req.body);

      if (!detail) {
        return res.status(404).json({ message: "Detalle clinico no encontrado" });
      }

      return res.json(detail);
    } catch (error) {
      if (error.name === "SequelizeForeignKeyConstraintError") {
        return res.status(400).json({ message: "petId, surgeryId, diseaseId, dewormingId o vaccineIds no existe" });
      }

      return res.status(500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const deleted = await clinicalDetailRepository.delete(req.params.id);

      if (!deleted) {
        return res.status(404).json({ message: "Detalle clinico no encontrado" });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ClinicalDetailController;
