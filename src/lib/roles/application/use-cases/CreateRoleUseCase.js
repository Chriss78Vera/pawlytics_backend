class CreateRoleUseCase {
  constructor(roleRepository) {
    this.roleRepository = roleRepository;
  }

  execute(data) {
    return this.roleRepository.create(data);
  }
}

module.exports = CreateRoleUseCase;
