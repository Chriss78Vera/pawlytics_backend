function isEmpty(value) {
  return value === undefined || value === null || value === "";
}

function validateString(value, fieldName, res, required = false, maxLength = 45) {
  if (isEmpty(value)) {
    if (required) {
      res.status(400).json({ message: `${fieldName} es obligatorio` });
      return false;
    }

    return true;
  }

  if (String(value).length > maxLength) {
    res.status(400).json({ message: `${fieldName} debe tener maximo ${maxLength} caracteres` });
    return false;
  }

  return true;
}

function validateDate(value, fieldName, res) {
  if (isEmpty(value)) {
    return true;
  }

  if (Number.isNaN(Date.parse(value))) {
    res.status(400).json({ message: `${fieldName} debe ser una fecha valida` });
    return false;
  }

  return true;
}

function validateInteger(value, fieldName, res, required = false) {
  if (isEmpty(value)) {
    if (required) {
      res.status(400).json({ message: `${fieldName} es obligatorio` });
      return false;
    }

    return true;
  }

  if (!Number.isInteger(Number(value))) {
    res.status(400).json({ message: `${fieldName} debe ser numerico` });
    return false;
  }

  return true;
}

function validateBoolean(value, fieldName, res) {
  if (isEmpty(value)) {
    return true;
  }

  if (typeof value !== "boolean") {
    res.status(400).json({ message: `${fieldName} debe ser booleano` });
    return false;
  }

  return true;
}

function validateVaccineIds(value, res) {
  if (value === undefined) {
    return true;
  }

  if (!Array.isArray(value) || value.some((id) => !Number.isInteger(Number(id)))) {
    res.status(400).json({ message: "vaccineIds debe ser un arreglo de ids numericos" });
    return false;
  }

  return true;
}

function validateVaccine(req, res, next) {
  const { type, date } = req.body;

  if (!validateString(type, "type", res, true)) return;
  if (!validateDate(date, "date", res)) return;

  return next();
}

function validateDeworming(req, res, next) {
  const { type, date } = req.body;

  if (!validateString(type, "type", res, true)) return;
  if (!validateDate(date, "date", res)) return;

  return next();
}

function validateSurgery(req, res, next) {
  const { type, description, date } = req.body;

  if (!validateString(type, "type", res, true)) return;
  if (!validateString(description, "description", res, false, 255)) return;
  if (!validateDate(date, "date", res)) return;

  return next();
}

function validateDisease(req, res, next) {
  const { name, treatment } = req.body;

  if (!validateString(name, "name", res, true)) return;
  if (!validateString(treatment, "treatment", res)) return;

  return next();
}

function validateClinicalDetail(req, res, next) {
  const { petId, diet, sterilization, births, surgeryId, diseaseId, dewormingId, animals, vaccineIds } = req.body;

  if (!validateInteger(petId, "petId", res, req.method === "POST")) return;
  if (!validateString(diet, "diet", res)) return;
  if (!validateBoolean(sterilization, "sterilization", res)) return;
  if (!validateInteger(births, "births", res)) return;
  if (!validateInteger(surgeryId, "surgeryId", res)) return;
  if (!validateInteger(diseaseId, "diseaseId", res)) return;
  if (!validateInteger(dewormingId, "dewormingId", res)) return;
  if (!validateString(animals, "animals", res)) return;
  if (!validateVaccineIds(vaccineIds, res)) return;

  return next();
}

module.exports = {
  validateVaccine,
  validateDeworming,
  validateSurgery,
  validateDisease,
  validateClinicalDetail
};
