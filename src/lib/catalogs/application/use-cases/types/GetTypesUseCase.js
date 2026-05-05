class GetTypesUseCase {
  constructor(catalogRepository) {
    this.catalogRepository = catalogRepository;
  }

  execute() {
    return this.catalogRepository.findAllTypes();
  }
}

module.exports = GetTypesUseCase;
