class GetSimpleClinicalByIdUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  execute(id) {
    return this.repository.findById(id);
  }
}

module.exports = GetSimpleClinicalByIdUseCase;
