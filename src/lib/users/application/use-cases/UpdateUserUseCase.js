class UpdateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  execute(id, data) {
    return this.userRepository.update(id, data);
  }
}

module.exports = UpdateUserUseCase;
