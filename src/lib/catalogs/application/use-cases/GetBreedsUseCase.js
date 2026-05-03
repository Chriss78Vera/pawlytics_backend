class GetBreedsUseCase {
  constructor(catalogRepository) {
    this.catalogRepository = catalogRepository;
  }

  execute() {
    return this.catalogRepository.findAllBreeds();
  }
}

module.exports = GetBreedsUseCase;
