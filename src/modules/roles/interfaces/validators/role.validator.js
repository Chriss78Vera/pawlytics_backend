function validateCreateRole(req, res, next) {
  const { name } = req.body;

  if (!name || String(name).trim().length < 2) {
    return res.status(400).json({ message: "name es obligatorio y debe tener minimo 2 caracteres" });
  }

  return next();
}

function validateUpdateRole(req, res, next) {
  const { name } = req.body;

  if (name !== undefined && String(name).trim().length < 2) {
    return res.status(400).json({ message: "name debe tener minimo 2 caracteres" });
  }

  return next();
}

module.exports = {
  validateCreateRole,
  validateUpdateRole
};
