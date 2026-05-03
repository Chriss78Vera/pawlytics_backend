class GetUsersUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  execute() {
    return this.userRepository.findAll();
  }
}

module.exports = GetUsersUseCase;
