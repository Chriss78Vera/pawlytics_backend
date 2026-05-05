const UserData = require("../../domain/entities/UserData");

class CreateUserDataUseCase {
  constructor(userDataRepository) {
    this.userDataRepository = userDataRepository;
  }

  execute(data) {
    const userData = new UserData(data);
    return this.userDataRepository.create(userData.toJSON());
  }
}

module.exports = CreateUserDataUseCase;
