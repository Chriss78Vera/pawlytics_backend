class CreateClinicalHistoryUseCase {
  constructor(clinicalHistoryRepository) {
    this.clinicalHistoryRepository = clinicalHistoryRepository;
  }

  execute(data) {
    return this.clinicalHistoryRepository.create(data);
  }
}

module.exports = CreateClinicalHistoryUseCase;
