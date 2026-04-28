class GetRolesUseCase {
  constructor(roleRepository) {
    this.roleRepository = roleRepository;
  }

  execute() {
    return this.roleRepository.findAll();
  }
}

module.exports = GetRolesUseCase;
