class GetUserByIdUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  execute(id) {
    return this.userRepository.findById(id);
  }
}

module.exports = GetUserByIdUseCase;
