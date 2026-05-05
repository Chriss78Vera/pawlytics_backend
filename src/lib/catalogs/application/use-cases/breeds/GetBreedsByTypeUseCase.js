class GetBreedsByTypeUseCase {
  constructor(catalogRepository) {
    this.catalogRepository = catalogRepository;
  }

  execute(typeId) {
    return this.catalogRepository.findBreedsByType(typeId);
  }
}

module.exports = GetBreedsByTypeUseCase;
