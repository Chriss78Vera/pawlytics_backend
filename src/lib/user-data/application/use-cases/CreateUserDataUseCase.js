class CreateUserDataUseCase {
  constructor(userDataRepository) {
    this.userDataRepository = userDataRepository;
  }

  execute(data) {
    return this.userDataRepository.create(data);
  }
}

module.exports = CreateUserDataUseCase;
