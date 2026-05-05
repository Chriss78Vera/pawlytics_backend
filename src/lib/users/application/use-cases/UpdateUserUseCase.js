const User = require("../../domain/entities/User");

class UpdateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  execute(id, data) {
    const user = new User(data, { partial: true });
    return this.userRepository.update(id, user.toJSON({ partial: true }));
  }
}

module.exports = UpdateUserUseCase;
