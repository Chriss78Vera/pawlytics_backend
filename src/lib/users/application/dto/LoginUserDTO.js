const validator = require("validator");

class LoginUserDTO {
  constructor({ email, password } = {}) {
    this.email = email;
    this.password = password;

    this.validate();
  }

  validate() {
    if (!this.email || !validator.isEmail(String(this.email))) {
      throw this.validationError("email es obligatorio y debe ser valido");
    }

    if (!this.password) {
      throw this.validationError("password es obligatorio");
    }
  }

  validationError(message) {
    const error = new Error(message);
    error.name = "ApplicationValidationError";
    return error;
  }
}

module.exports = LoginUserDTO;
