const UserData = require("../../domain/entities/UserData");

class UpdateUserDataUseCase {
  constructor(userDataRepository) {
    this.userDataRepository = userDataRepository;
  }

  execute(id, data) {
    const userData = new UserData(data, { partial: true });
    return this.userDataRepository.update(id, userData.toJSON({ partial: true }));
  }
}

module.exports = UpdateUserDataUseCase;
