class UpdateClinicalHistoryUseCase {
  constructor(clinicalHistoryRepository) {
    this.clinicalHistoryRepository = clinicalHistoryRepository;
  }

  execute(id, data) {
    return this.clinicalHistoryRepository.update(id, data);
  }
}

module.exports = UpdateClinicalHistoryUseCase;
