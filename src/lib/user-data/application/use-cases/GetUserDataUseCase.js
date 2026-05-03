class GetUserDataUseCase {
  constructor(userDataRepository) {
    this.userDataRepository = userDataRepository;
  }

  execute() {
    return this.userDataRepository.findAll();
  }
}

module.exports = GetUserDataUseCase;
