const Pet = require("../../domain/entities/Pet");

class UpdatePetUseCase {
  constructor(petRepository) {
    this.petRepository = petRepository;
  }

  execute(id, data) {
    const pet = new Pet(data, { partial: true });
    return this.petRepository.update(id, pet.toJSON());
  }
}

module.exports = UpdatePetUseCase;
