class GetTypeByIdUseCase {
  constructor(catalogRepository) {
    this.catalogRepository = catalogRepository;
  }

  execute(id) {
    return this.catalogRepository.findTypeById(id);
  }
}

module.exports = GetTypeByIdUseCase;
