function validateRequiredString(value, fieldName, res) {
  if (!value || String(value).trim().length === 0) {
    res.status(400).json({ message: `${fieldName} es obligatorio` });
    return false;
  }

  if (String(value).length > 45) {
    res.status(400).json({ message: `${fieldName} debe tener maximo 45 caracteres` });
    return false;
  }

  return true;
}

function validateOptionalString(value, fieldName, res, maxLength = 45) {
  if (value === undefined || value === null) {
    return true;
  }

  if (String(value).length > maxLength) {
    res.status(400).json({ message: `${fieldName} debe tener maximo ${maxLength} caracteres` });
    return false;
  }

  return true;
}

function validateDate(value, fieldName, res) {
  if (value === undefined || value === null || value === "") {
    return true;
  }

  if (Number.isNaN(Date.parse(value))) {
    res.status(400).json({ message: `${fieldName} debe ser una fecha valida` });
    return false;
  }

  return true;
}

function validateNumber(value, fieldName, res) {
  if (value === undefined || value === null || value === "") {
    return true;
  }

  if (Number.isNaN(Number(value))) {
    res.status(400).json({ message: `${fieldName} debe ser numerico` });
    return false;
  }

  return true;
}

function validateInteger(value, fieldName, res) {
  if (!Number.isInteger(Number(value))) {
    res.status(400).json({ message: `${fieldName} debe ser numerico` });
    return false;
  }

  return true;
}

function validateCreatePet(req, res, next) {
  const { typeId, breedId, name, birthDate, color, sex, weight, particularSigns, userDataId } = req.body;

  if (!validateRequiredString(typeId, "typeId", res)) return;
  if (!validateRequiredString(breedId, "breedId", res)) return;
  if (!validateRequiredString(name, "name", res)) return;
  if (!validateDate(birthDate, "birthDate", res)) return;
  if (!validateOptionalString(color, "color", res)) return;
  if (!validateOptionalString(sex, "sex", res)) return;
  if (!validateNumber(weight, "weight", res)) return;
  if (!validateOptionalString(particularSigns, "particularSigns", res, 255)) return;
  if (!validateInteger(userDataId, "userDataId", res)) return;

  return next();
}

function validateUpdatePet(req, res, next) {
  const { typeId, breedId, name, birthDate, color, sex, weight, particularSigns, userDataId } = req.body;

  if (typeId !== undefined && !validateRequiredString(typeId, "typeId", res)) return;
  if (breedId !== undefined && !validateRequiredString(breedId, "breedId", res)) return;
  if (name !== undefined && !validateRequiredString(name, "name", res)) return;
  if (!validateDate(birthDate, "birthDate", res)) return;
  if (!validateOptionalString(color, "color", res)) return;
  if (!validateOptionalString(sex, "sex", res)) return;
  if (!validateNumber(weight, "weight", res)) return;
  if (!validateOptionalString(particularSigns, "particularSigns", res, 255)) return;
  if (userDataId !== undefined && !validateInteger(userDataId, "userDataId", res)) return;

  return next();
}

module.exports = {
  validateCreatePet,
  validateUpdatePet
};
