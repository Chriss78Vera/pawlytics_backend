class GetClinicalHistoryByPetUseCase {
  constructor(clinicalHistoryRepository) {
    this.clinicalHistoryRepository = clinicalHistoryRepository;
  }

  execute(petId) {
    return this.clinicalHistoryRepository.findByPetId(petId);
  }
}

module.exports = GetClinicalHistoryByPetUseCase;
