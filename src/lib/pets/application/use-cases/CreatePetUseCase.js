const Pet = require("../../domain/entities/Pet");

class CreatePetUseCase {
  constructor(petRepository) {
    this.petRepository = petRepository;
  }

  execute(data) {
    const pet = new Pet(data);
    return this.petRepository.create(pet.toJSON());
  }
}

module.exports = CreatePetUseCase;
