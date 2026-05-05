class GetPetsUseCase {
  constructor(petRepository) {
    this.petRepository = petRepository;
  }

  execute() {
    return this.petRepository.findAll();
  }
}

module.exports = GetPetsUseCase;
