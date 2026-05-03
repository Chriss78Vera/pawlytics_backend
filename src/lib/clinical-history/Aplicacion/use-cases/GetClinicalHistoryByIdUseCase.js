class GetClinicalHistoryByIdUseCase {
  constructor(clinicalHistoryRepository) {
    this.clinicalHistoryRepository = clinicalHistoryRepository;
  }

  execute(id) {
    return this.clinicalHistoryRepository.findById(id);
  }
}

module.exports = GetClinicalHistoryByIdUseCase;
