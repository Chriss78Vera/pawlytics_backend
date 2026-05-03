class UpdateRoleUseCase {
  constructor(roleRepository) {
    this.roleRepository = roleRepository;
  }

  execute(id, data) {
    return this.roleRepository.update(id, data);
  }
}

module.exports = UpdateRoleUseCase;
