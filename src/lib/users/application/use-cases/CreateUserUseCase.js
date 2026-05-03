class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  execute(data) {
    return this.userRepository.create(data);
  }
}

module.exports = CreateUserUseCase;
