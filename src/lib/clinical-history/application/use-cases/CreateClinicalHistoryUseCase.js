const ClinicalHistory = require("../../domain/entities/ClinicalHistory");

class CreateClinicalHistoryUseCase {
  constructor(clinicalHistoryRepository) {
    this.clinicalHistoryRepository = clinicalHistoryRepository;
  }

  execute(data) {
    const clinicalHistory = new ClinicalHistory(data);
    return this.clinicalHistoryRepository.create(clinicalHistory.toJSON());
  }
}

module.exports = CreateClinicalHistoryUseCase;
