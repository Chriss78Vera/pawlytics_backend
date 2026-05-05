const ClinicalHistory = require("../../domain/entities/ClinicalHistory");

class UpdateClinicalHistoryUseCase {
  constructor(clinicalHistoryRepository) {
    this.clinicalHistoryRepository = clinicalHistoryRepository;
  }

  execute(id, data) {
    const clinicalHistory = new ClinicalHistory(data, { partial: true });
    return this.clinicalHistoryRepository.update(id, clinicalHistory.toJSON({ partial: true }));
  }
}

module.exports = UpdateClinicalHistoryUseCase;
