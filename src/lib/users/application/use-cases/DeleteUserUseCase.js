class DeleteUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  execute(id) {
    return this.userRepository.delete(id);
  }
}

module.exports = DeleteUserUseCase;
