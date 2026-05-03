class UpdateUserDataUseCase {
  constructor(userDataRepository) {
    this.userDataRepository = userDataRepository;
  }

  execute(id, data) {
    return this.userDataRepository.update(id, data);
  }
}

module.exports = UpdateUserDataUseCase;
