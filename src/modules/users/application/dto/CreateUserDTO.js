class CreateUserDTO {
  constructor({ email, password, roleId }) {
    this.email = email;
    this.password = password;
    this.roleId = roleId;
  }
}

module.exports = CreateUserDTO;
