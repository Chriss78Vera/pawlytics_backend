const CreateClinicalHistoryDTO = require("../../../application/dto/CreateClinicalHistoryDTO");
const CreateClinicalHistoryUseCase = require("../../../application/use-cases/CreateClinicalHistoryUseCase");
const GetClinicalHistoriesUseCase = require("../../../application/use-cases/GetClinicalHistoriesUseCase");
const GetClinicalHistoryByIdUseCase = require("../../../application/use-cases/GetClinicalHistoryByIdUseCase");
const GetClinicalHistoryByPetUseCase = require("../../../application/use-cases/GetClinicalHistoryByPetUseCase");
const UpdateClinicalHistoryUseCase = require("../../../application/use-cases/UpdateClinicalHistoryUseCase");
const DeleteClinicalHistoryUseCase = require("../../../application/use-cases/DeleteClinicalHistoryUseCase");
const ClinicalHistoryMongoRepository = require("../../persistence/mongoose/ClinicalHistoryMongoRepository");

const clinicalHistoryRepository = new ClinicalHistoryMongoRepository();

class ClinicalHistoryController {
  static async create(req, res) {
    try {
      const dto = new CreateClinicalHistoryDTO(req.body);
      const clinicalHistory = await new CreateClinicalHistoryUseCase(clinicalHistoryRepository).execute(dto);
      return res.status(201).json(clinicalHistory);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async findAll(req, res) {
    try {
      const clinicalHistories = await new GetClinicalHistoriesUseCase(clinicalHistoryRepository).execute();
      return res.json(clinicalHistories);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async findById(req, res) {
    try {
      const clinicalHistory = await new GetClinicalHistoryByIdUseCase(clinicalHistoryRepository).execute(req.params.id);

      if (!clinicalHistory) {
        return res.status(404).json({ message: "Historia clinica no encontrada" });
      }

      return res.json(clinicalHistory);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async findByPet(req, res) {
    try {
      const clinicalHistories = await new GetClinicalHistoryByPetUseCase(clinicalHistoryRepository).execute(req.params.petId);
      return res.json(clinicalHistories);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const clinicalHistory = await new UpdateClinicalHistoryUseCase(clinicalHistoryRepository).execute(req.params.id, req.body);

      if (!clinicalHistory) {
        return res.status(404).json({ message: "Historia clinica no encontrada" });
      }

      return res.json(clinicalHistory);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const deleted = await new DeleteClinicalHistoryUseCase(clinicalHistoryRepository).execute(req.params.id);

      if (!deleted) {
        return res.status(404).json({ message: "Historia clinica no encontrada" });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ClinicalHistoryController;
