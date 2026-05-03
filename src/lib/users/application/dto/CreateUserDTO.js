class CreateUserDTO {
  constructor({ email, password, roleId, userDataId }) {
    this.email = email;
    this.password = password;
    this.roleId = roleId;
    this.userDataId = userDataId;
  }
}

module.exports = CreateUserDTO;
