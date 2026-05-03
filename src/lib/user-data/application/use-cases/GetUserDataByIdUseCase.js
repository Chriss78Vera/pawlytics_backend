class GetUserDataByIdUseCase {
  constructor(userDataRepository) {
    this.userDataRepository = userDataRepository;
  }

  execute(id) {
    return this.userDataRepository.findById(id);
  }
}

module.exports = GetUserDataByIdUseCase;
