class GetBreedByIdUseCase {
  constructor(catalogRepository) {
    this.catalogRepository = catalogRepository;
  }

  execute(id) {
    return this.catalogRepository.findBreedById(id);
  }
}

module.exports = GetBreedByIdUseCase;
