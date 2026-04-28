class GetClinicalHistoriesUseCase {
  constructor(clinicalHistoryRepository) {
    this.clinicalHistoryRepository = clinicalHistoryRepository;
  }

  execute() {
    return this.clinicalHistoryRepository.findAll();
  }
}

module.exports = GetClinicalHistoriesUseCase;
