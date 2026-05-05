class GetPetByIdUseCase {
  constructor(petRepository) {
    this.petRepository = petRepository;
  }

  execute(id) {
    return this.petRepository.findById(id);
  }
}

module.exports = GetPetByIdUseCase;
