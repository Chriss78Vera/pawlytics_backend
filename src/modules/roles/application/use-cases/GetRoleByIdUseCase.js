class GetRoleByIdUseCase {
  constructor(roleRepository) {
    this.roleRepository = roleRepository;
  }

  execute(id) {
    return this.roleRepository.findById(id);
  }
}

module.exports = GetRoleByIdUseCase;
