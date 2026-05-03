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

function validateOptionalString(value, fieldName, res) {
  if (value === undefined || value === null) {
    return true;
  }

  if (String(value).length > 45) {
    res.status(400).json({ message: `${fieldName} debe tener maximo 45 caracteres` });
    return false;
  }

  return true;
}

function validateDate(value, res) {
  if (value === undefined || value === null || value === "") {
    return true;
  }

  if (Number.isNaN(Date.parse(value))) {
    res.status(400).json({ message: "birthDate debe ser una fecha valida" });
    return false;
  }

  return true;
}

function validateCreateUserData(req, res, next) {
  const { firstName, lastName, address, phone, identification, birthDate } = req.body;

  if (!validateRequiredString(firstName, "firstName", res)) return;
  if (!validateRequiredString(lastName, "lastName", res)) return;
  if (!validateRequiredString(identification, "identification", res)) return;
  if (!validateOptionalString(address, "address", res)) return;
  if (!validateOptionalString(phone, "phone", res)) return;
  if (!validateDate(birthDate, res)) return;

  return next();
}

function validateUpdateUserData(req, res, next) {
  const { firstName, lastName, address, phone, identification, birthDate } = req.body;

  if (firstName !== undefined && !validateRequiredString(firstName, "firstName", res)) return;
  if (lastName !== undefined && !validateRequiredString(lastName, "lastName", res)) return;
  if (identification !== undefined && !validateRequiredString(identification, "identification", res)) return;
  if (!validateOptionalString(address, "address", res)) return;
  if (!validateOptionalString(phone, "phone", res)) return;
  if (!validateDate(birthDate, res)) return;

  return next();
}

module.exports = {
  validateCreateUserData,
  validateUpdateUserData
};
