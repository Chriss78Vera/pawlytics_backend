const validator = require("validator");

function validateCreateUser(req, res, next) {
  const { email, password, roleId } = req.body;

  if (!email || !validator.isEmail(String(email))) {
    return res.status(400).json({ message: "email es obligatorio y debe ser valido" });
  }

  if (!password || String(password).trim().length < 6) {
    return res.status(400).json({ message: "password es obligatorio y debe tener minimo 6 caracteres" });
  }

  if (!Number.isInteger(Number(roleId))) {
    return res.status(400).json({ message: "roleId es obligatorio y debe ser numerico" });
  }

  return next();
}

function validateUpdateUser(req, res, next) {
  const { email, password, roleId } = req.body;

  if (email !== undefined && !validator.isEmail(String(email))) {
    return res.status(400).json({ message: "email debe ser valido" });
  }

  if (password !== undefined && String(password).trim().length < 6) {
    return res.status(400).json({ message: "password debe tener minimo 6 caracteres" });
  }

  if (roleId !== undefined && !Number.isInteger(Number(roleId))) {
    return res.status(400).json({ message: "roleId debe ser numerico" });
  }

  return next();
}

module.exports = {
  validateCreateUser,
  validateUpdateUser
};
