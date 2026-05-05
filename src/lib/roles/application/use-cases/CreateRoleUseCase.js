const Role = require("../../domain/entities/Role");

class CreateRoleUseCase {
  constructor(roleRepository) {
    this.roleRepository = roleRepository;
  }

  execute(data) {
    const role = new Role(data);
    return this.roleRepository.create(role.toJSON());
  }
}

module.exports = CreateRoleUseCase;
