const mongoose = require("mongoose");

const validRecordTypes = ["sintomas", "consulta", "vacuna", "tratamiento", "control", "otro"];
const validStates = ["registrado", "revisado", "archivado"];

function validateCreateClinicalHistory(req, res, next) {
  const { id_mascota, tipo_registro, sintomas, datos_salud, estado } = req.body;

  if (!id_mascota || !mongoose.Types.ObjectId.isValid(id_mascota)) {
    return res.status(400).json({ message: "id_mascota es obligatorio y debe ser un ObjectId valido" });
  }

  if (!tipo_registro || !validRecordTypes.includes(tipo_registro)) {
    return res.status(400).json({ message: "tipo_registro es obligatorio o no es valido" });
  }

  if (sintomas !== undefined && !Array.isArray(sintomas)) {
    return res.status(400).json({ message: "sintomas debe ser un arreglo" });
  }

  if (!hasValidHealthData(datos_salud)) {
    return res.status(400).json({ message: "datos_salud contiene valores no numericos" });
  }

  if (estado !== undefined && !validStates.includes(estado)) {
    return res.status(400).json({ message: "estado no es valido" });
  }

  return next();
}

function validateUpdateClinicalHistory(req, res, next) {
  const { id_mascota, tipo_registro, sintomas, datos_salud, estado } = req.body;

  if (id_mascota !== undefined && !mongoose.Types.ObjectId.isValid(id_mascota)) {
    return res.status(400).json({ message: "id_mascota debe ser un ObjectId valido" });
  }

  if (tipo_registro !== undefined && !validRecordTypes.includes(tipo_registro)) {
    return res.status(400).json({ message: "tipo_registro no es valido" });
  }

  if (sintomas !== undefined && !Array.isArray(sintomas)) {
    return res.status(400).json({ message: "sintomas debe ser un arreglo" });
  }

  if (!hasValidHealthData(datos_salud)) {
    return res.status(400).json({ message: "datos_salud contiene valores no numericos" });
  }

  if (estado !== undefined && !validStates.includes(estado)) {
    return res.status(400).json({ message: "estado no es valido" });
  }

  return next();
}

function hasValidHealthData(datos_salud) {
  if (!datos_salud) {
    return true;
  }

  const numericFields = ["peso", "temperatura", "frecuencia_cardiaca", "frecuencia_respiratoria"];

  return numericFields.every((field) => {
    return datos_salud[field] === undefined || !Number.isNaN(Number(datos_salud[field]));
  });
}

module.exports = {
  validateCreateClinicalHistory,
  validateUpdateClinicalHistory
};
