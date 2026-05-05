const mongoose = require("mongoose");

const validRecordTypes = ["sintomas", "consulta", "vacuna", "tratamiento", "control", "otro"];
const validStates = ["registrado", "revisado", "archivado"];

class ClinicalHistory {
  constructor({
    id,
    id_mascota,
    fecha_registro,
    tipo_registro,
    sintomas,
    datos_salud,
    alimentacion,
    comportamiento,
    observaciones,
    estado
  } = {}, { partial = false } = {}) {
    this.id = id;
    this.id_mascota = id_mascota;
    this.fecha_registro = fecha_registro;
    this.tipo_registro = tipo_registro;
    this.sintomas = sintomas;
    this.datos_salud = datos_salud;
    this.alimentacion = alimentacion;
    this.comportamiento = comportamiento;
    this.observaciones = observaciones;
    this.estado = estado;

    this.validate(partial);
  }

  validate(partial) {
    if (!partial && !this.id_mascota) {
      throw this.validationError("id_mascota es obligatorio y debe ser un ObjectId valido");
    }

    if (this.id_mascota !== undefined && !mongoose.Types.ObjectId.isValid(this.id_mascota)) {
      throw this.validationError("id_mascota debe ser un ObjectId valido");
    }

    if (!partial && !this.tipo_registro) {
      throw this.validationError("tipo_registro es obligatorio o no es valido");
    }

    if (this.tipo_registro !== undefined && !validRecordTypes.includes(this.tipo_registro)) {
      throw this.validationError("tipo_registro no es valido");
    }

    if (this.sintomas !== undefined && !Array.isArray(this.sintomas)) {
      throw this.validationError("sintomas debe ser un arreglo");
    }

    if (!this.hasValidHealthData()) {
      throw this.validationError("datos_salud contiene valores no numericos");
    }

    if (this.estado !== undefined && !validStates.includes(this.estado)) {
      throw this.validationError("estado no es valido");
    }
  }

  hasValidHealthData() {
    if (!this.datos_salud) {
      return true;
    }

    const numericFields = ["peso", "temperatura", "frecuencia_cardiaca", "frecuencia_respiratoria"];
    return numericFields.every((field) => {
      return this.datos_salud[field] === undefined || !Number.isNaN(Number(this.datos_salud[field]));
    });
  }

  validationError(message) {
    const error = new Error(message);
    error.name = "DomainValidationError";
    return error;
  }

  toJSON({ partial = false } = {}) {
    const data = {
      id: this.id,
      id_mascota: this.id_mascota,
      fecha_registro: this.fecha_registro,
      tipo_registro: this.tipo_registro,
      sintomas: this.sintomas,
      datos_salud: this.datos_salud,
      alimentacion: this.alimentacion,
      comportamiento: this.comportamiento,
      observaciones: this.observaciones,
      estado: this.estado
    };

    if (!partial) {
      return data;
    }

    return Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined));
  }
}

module.exports = ClinicalHistory;
