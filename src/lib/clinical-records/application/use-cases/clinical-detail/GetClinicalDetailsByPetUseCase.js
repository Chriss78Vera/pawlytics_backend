class GetClinicalDetailsByPetUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  execute(petId) {
    return this.repository.findByPet(petId);
  }
}

module.exports = GetClinicalDetailsByPetUseCase;
