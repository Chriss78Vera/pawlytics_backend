const validator = require("validator");

class User {
  constructor({ id, email, password, roleId, userDataId, role } = {}, { partial = false } = {}) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.roleId = roleId;
    this.userDataId = userDataId;
    this.role = role;

    this.validate({ partial });
  }

  validate({ partial }) {
    if (this.email !== undefined && partial) {
      throw this.validationError("email no se puede modificar");
    }

    if (!partial) {
      this.validateEmail(this.email, true);
      this.validatePassword(this.password, true);
      this.validateInteger(this.roleId, "roleId", true);
      this.validateInteger(this.userDataId, "userDataId", true);
      return;
    }

    this.validatePassword(this.password, false);
    this.validateInteger(this.roleId, "roleId");
    this.validateInteger(this.userDataId, "userDataId");
  }

  validateEmail(value, required = false) {
    if (!value) {
      if (required) {
        throw this.validationError("email es obligatorio y debe ser valido");
      }

      return;
    }

    if (!validator.isEmail(String(value))) {
      throw this.validationError("email es obligatorio y debe ser valido");
    }
  }

  validatePassword(value, required = false) {
    if (!value) {
      if (required) {
        throw this.validationError("password es obligatorio");
      }

      return;
    }

    if (String(value).trim().length < 6) {
      throw this.validationError("password debe tener minimo 6 caracteres");
    }
  }

  validateInteger(value, fieldName, required = false) {
    if (value === undefined || value === null || value === "") {
      if (required) {
        throw this.validationError(`${fieldName} es obligatorio y debe ser numerico`);
      }

      return;
    }

    if (!Number.isInteger(Number(value))) {
      throw this.validationError(`${fieldName} debe ser numerico`);
    }
  }

  validationError(message) {
    const error = new Error(message);
    error.name = "DomainValidationError";
    return error;
  }

  toJSON({ partial = false } = {}) {
    const data = {
      id: this.id,
      email: this.email,
      password: this.password,
      roleId: this.roleId,
      userDataId: this.userDataId,
      role: this.role
    };

    if (!partial) {
      return data;
    }

    return Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined));
  }
}

module.exports = User;
