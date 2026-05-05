const User = require("../../domain/entities/User");

class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  execute(data) {
    const user = new User(data);
    return this.userRepository.create(user.toJSON());
  }
}

module.exports = CreateUserUseCase;
