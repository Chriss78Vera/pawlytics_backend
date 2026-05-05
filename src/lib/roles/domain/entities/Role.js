class Role {
  constructor({ id, name } = {}, { partial = false } = {}) {
    this.id = id;
    this.name = name;

    this.validate(partial);
  }

  validate(partial) {
    if (this.name === undefined || this.name === null || this.name === "") {
      if (!partial) {
        throw this.validationError("name es obligatorio y debe tener minimo 2 caracteres");
      }

      return;
    }

    if (String(this.name).trim().length < 2) {
      throw this.validationError("name debe tener minimo 2 caracteres");
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
      name: this.name
    };

    if (!partial) {
      return data;
    }

    return Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined));
  }
}

module.exports = Role;
