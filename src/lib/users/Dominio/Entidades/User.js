class User {
  constructor({ id, email, password, roleId, role } = {}) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.roleId = roleId;
    this.role = role;
  }
}

module.exports = User;
