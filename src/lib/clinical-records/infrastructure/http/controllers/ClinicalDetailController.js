const ClinicalDetailPostgresRepository = require("../../persistence/postgres/ClinicalDetailPostgresRepository");
const CreateClinicalDetailUseCase = require("../../../application/use-cases/clinical-detail/CreateClinicalDetailUseCase");
const GetClinicalDetailsUseCase = require("../../../application/use-cases/clinical-detail/GetClinicalDetailsUseCase");
const GetClinicalDetailByIdUseCase = require("../../../application/use-cases/clinical-detail/GetClinicalDetailByIdUseCase");
const GetClinicalDetailsByPetUseCase = require("../../../application/use-cases/clinical-detail/GetClinicalDetailsByPetUseCase");
const UpdateClinicalDetailUseCase = require("../../../application/use-cases/clinical-detail/UpdateClinicalDetailUseCase");
const DeleteClinicalDetailUseCase = require("../../../application/use-cases/clinical-detail/DeleteClinicalDetailUseCase");

const clinicalDetailRepository = new ClinicalDetailPostgresRepository();

class ClinicalDetailController {
  static async create(req, res) {
    try {
      const detail = await new CreateClinicalDetailUseCase(clinicalDetailRepository).execute(req.body);
      return res.status(201).json(detail);
    } catch (error) {
      if (error.name === "DomainValidationError") {
        return res.status(400).json({ message: error.message });
      }

      if (error.name === "SequelizeForeignKeyConstraintError") {
        return res.status(400).json({ message: "petId, surgeryId, diseaseId, dewormingId o vaccineIds no existe" });
      }

      return res.status(500).json({ message: error.message });
    }
  }

  static async findAll(req, res) {
    try {
      const details = await new GetClinicalDetailsUseCase(clinicalDetailRepository).execute();
      return res.json(details);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async findById(req, res) {
    try {
      const detail = await new GetClinicalDetailByIdUseCase(clinicalDetailRepository).execute(req.params.id);

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
      const details = await new GetClinicalDetailsByPetUseCase(clinicalDetailRepository).execute(req.params.petId);
      return res.json(details);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const detail = await new UpdateClinicalDetailUseCase(clinicalDetailRepository).execute(req.params.id, req.body);

      if (!detail) {
        return res.status(404).json({ message: "Detalle clinico no encontrado" });
      }

      return res.json(detail);
    } catch (error) {
      if (error.name === "DomainValidationError") {
        return res.status(400).json({ message: error.message });
      }

      if (error.name === "SequelizeForeignKeyConstraintError") {
        return res.status(400).json({ message: "petId, surgeryId, diseaseId, dewormingId o vaccineIds no existe" });
      }

      return res.status(500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const deleted = await new DeleteClinicalDetailUseCase(clinicalDetailRepository).execute(req.params.id);

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
