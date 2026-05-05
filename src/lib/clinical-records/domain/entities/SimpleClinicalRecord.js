class SimpleClinicalRecord {
  constructor(data = {}, { kind, partial = false } = {}) {
    this.id = data.id;
    this.type = data.type;
    this.date = data.date;
    this.description = data.description;
    this.name = data.name;
    this.treatment = data.treatment;
    this.kind = kind;

    this.validate(partial);
  }

  validate(partial) {
    if (this.kind === "disease") {
      this.validateString(this.name, "name", { required: !partial });
      this.validateString(this.treatment, "treatment");
      return;
    }

    this.validateString(this.type, "type", { required: !partial });
    this.validateDate(this.date, "date");

    if (this.kind === "surgery") {
      this.validateString(this.description, "description", { maxLength: 255 });
    }
  }

  validateString(value, fieldName, { required = false, maxLength = 45 } = {}) {
    if (value === undefined || value === null || value === "") {
      if (required) {
        throw this.validationError(`${fieldName} es obligatorio`);
      }

      return;
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
      type: this.type,
      date: this.date,
      description: this.description,
      name: this.name,
      treatment: this.treatment
    };

    if (!partial) {
      return data;
    }

    return Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined));
  }
}

module.exports = SimpleClinicalRecord;
