const Role = require("../../domain/entities/Role");

class UpdateRoleUseCase {
  constructor(roleRepository) {
    this.roleRepository = roleRepository;
  }

  execute(id, data) {
    const role = new Role(data, { partial: true });
    return this.roleRepository.update(id, role.toJSON({ partial: true }));
  }
}

module.exports = UpdateRoleUseCase;
