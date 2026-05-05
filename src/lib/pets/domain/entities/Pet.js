class Pet {
  constructor(data = {}, { partial = false } = {}) {
    this.id = data.id;
    this.typeId = data.typeId;
    this.breedId = data.breedId;
    this.name = data.name;
    this.birthDate = data.birthDate;
    this.color = data.color;
    this.sex = data.sex;
    this.weight = data.weight;
    this.particularSigns = data.particularSigns;
    this.userDataId = data.userDataId;

    this.validate(partial);
  }

  validate(partial) {
    this.validateString(this.typeId, "typeId", { required: !partial, maxLength: 45 });
    this.validateString(this.breedId, "breedId", { required: !partial, maxLength: 45 });
    this.validateString(this.name, "name", { required: !partial, maxLength: 45 });
    this.validateDate(this.birthDate, "birthDate");
    this.validateString(this.color, "color", { maxLength: 45 });
    this.validateString(this.sex, "sex", { maxLength: 45 });
    this.validateNumber(this.weight, "weight");
    this.validateString(this.particularSigns, "particularSigns", { maxLength: 255 });
    this.validateInteger(this.userDataId, "userDataId", { required: !partial });
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

  validateNumber(value, fieldName) {
    if (value === undefined || value === null || value === "") {
      return;
    }

    if (Number.isNaN(Number(value))) {
      throw this.validationError(`${fieldName} debe ser numerico`);
    }
  }

  validateInteger(value, fieldName, { required = false } = {}) {
    if (value === undefined || value === null || value === "") {
      if (required) {
        throw this.validationError(`${fieldName} es obligatorio`);
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

  toJSON() {
    return {
      id: this.id,
      typeId: this.typeId,
      breedId: this.breedId,
      name: this.name,
      birthDate: this.birthDate,
      color: this.color,
      sex: this.sex,
      weight: this.weight,
      particularSigns: this.particularSigns,
      userDataId: this.userDataId
    };
  }
}

module.exports = Pet;
