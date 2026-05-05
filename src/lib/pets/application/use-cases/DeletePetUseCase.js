class DeletePetUseCase {
  constructor(petRepository) {
    this.petRepository = petRepository;
  }

  execute(id) {
    return this.petRepository.delete(id);
  }
}

module.exports = DeletePetUseCase;
