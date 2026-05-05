class UserData {
  constructor({ id, firstName, lastName, address, phone, identification, birthDate } = {}, { partial = false } = {}) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.phone = phone;
    this.identification = identification;
    this.birthDate = birthDate;

    this.validate(partial);
  }

  validate(partial) {
    this.validateString(this.firstName, "firstName", { required: !partial });
    this.validateString(this.lastName, "lastName", { required: !partial });
    this.validateString(this.identification, "identification", { required: !partial });
    this.validateString(this.address, "address");
    this.validateString(this.phone, "phone");
    this.validateDate(this.birthDate, "birthDate");
  }

  validateString(value, fieldName, { required = false, maxLength = 45 } = {}) {
    if (value === undefined || value === null || value === "") {
      if (required) {
        throw this.validationError(`${fieldName} es obligatorio`);
      }

      return;
    }

    if (String(value).trim().length === 0) {
      throw this.validationError(`${fieldName} es obligatorio`);
    }

    if (String(value).length > maxLength) {
      throw this.validationError(`${fieldName} debe tener maximo ${maxLength} caracteres`);
    }
  }

  validateDate(value, fieldName) {
    if (value === undefined || value === null || value === "") {
      return;
    }

    if (Number.isNaN(Date.parse(value))) {
      throw this.validationError(`${fieldName} debe ser una fecha valida`);
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
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      phone: this.phone,
      identification: this.identification,
      birthDate: this.birthDate
    };

    if (!partial) {
      return data;
    }

    return Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined));
  }
}

module.exports = UserData;
