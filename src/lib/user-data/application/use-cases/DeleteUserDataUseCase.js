class DeleteUserDataUseCase {
  constructor(userDataRepository) {
    this.userDataRepository = userDataRepository;
  }

  execute(id) {
    return this.userDataRepository.delete(id);
  }
}

module.exports = DeleteUserDataUseCase;
