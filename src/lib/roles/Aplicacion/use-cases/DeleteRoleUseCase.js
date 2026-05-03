class DeleteRoleUseCase {
  constructor(roleRepository) {
    this.roleRepository = roleRepository;
  }

  execute(id) {
    return this.roleRepository.delete(id);
  }
}

module.exports = DeleteRoleUseCase;
