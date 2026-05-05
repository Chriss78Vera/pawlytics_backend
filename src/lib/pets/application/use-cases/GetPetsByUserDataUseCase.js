class GetPetsByUserDataUseCase {
  constructor(petRepository) {
    this.petRepository = petRepository;
  }

  execute(userDataId) {
    return this.petRepository.findByUserData(userDataId);
  }
}

module.exports = GetPetsByUserDataUseCase;
