const { verifyPassword } = require("../../infrastructure/security/passwordHasher");

class LoginUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user || !verifyPassword(password, user.password)) {
      return null;
    }

    return {
      roleId: user.roleId,
      userId: user.id,
      userDataId: user.userDataId
    };
  }
}

module.exports = LoginUserUseCase;
