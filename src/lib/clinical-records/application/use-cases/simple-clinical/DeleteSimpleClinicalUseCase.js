class DeleteSimpleClinicalUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  execute(id) {
    return this.repository.delete(id);
  }
}

module.exports = DeleteSimpleClinicalUseCase;
