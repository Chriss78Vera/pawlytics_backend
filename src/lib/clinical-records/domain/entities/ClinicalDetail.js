class ClinicalDetail {
  constructor(data = {}, { partial = false } = {}) {
    this.id = data.id;
    this.petId = data.petId;
    this.diet = data.diet;
    this.sterilization = data.sterilization;
    this.births = data.births;
    this.surgeryId = data.surgeryId;
    this.diseaseId = data.diseaseId;
    this.dewormingId = data.dewormingId;
    this.animals = data.animals;
    this.vaccineIds = data.vaccineIds;

    this.validate(partial);
  }

  validate(partial) {
    this.validateInteger(this.petId, "petId", { required: !partial });
    this.validateString(this.diet, "diet");
    this.validateBoolean(this.sterilization, "sterilization");
    this.validateInteger(this.births, "births");
    this.validateInteger(this.surgeryId, "surgeryId");
    this.validateInteger(this.diseaseId, "diseaseId");
    this.validateInteger(this.dewormingId, "dewormingId");
    this.validateString(this.animals, "animals");
    this.validateVaccineIds(this.vaccineIds);
  }

  validateString(value, fieldName, { maxLength = 45 } = {}) {
    if (value === undefined || value === null || value === "") {
      return;
    }

    if (String(value).length > maxLength) {
      throw this.validationError(`${fieldName} debe tener maximo ${maxLength} caracteres`);
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

  validateBoolean(value, fieldName) {
    if (value === undefined || value === null || value === "") {
      return;
    }

    if (typeof value !== "boolean") {
      throw this.validationError(`${fieldName} debe ser booleano`);
    }
  }

  validateVaccineIds(value) {
    if (value === undefined) {
      return;
    }

    if (!Array.isArray(value) || value.some((id) => !Number.isInteger(Number(id)))) {
      throw this.validationError("vaccineIds debe ser un arreglo de ids numericos");
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
      petId: this.petId,
      diet: this.diet,
      sterilization: this.sterilization,
      births: this.births,
      surgeryId: this.surgeryId,
      diseaseId: this.diseaseId,
      dewormingId: this.dewormingId,
      animals: this.animals,
      vaccineIds: this.vaccineIds
    };

    if (!partial) {
      return data;
    }

    return Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined));
  }
}

module.exports = ClinicalDetail;
