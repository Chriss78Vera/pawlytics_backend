class DeleteClinicalHistoryUseCase {
  constructor(clinicalHistoryRepository) {
    this.clinicalHistoryRepository = clinicalHistoryRepository;
  }

  execute(id) {
    return this.clinicalHistoryRepository.delete(id);
  }
}

module.exports = DeleteClinicalHistoryUseCase;
