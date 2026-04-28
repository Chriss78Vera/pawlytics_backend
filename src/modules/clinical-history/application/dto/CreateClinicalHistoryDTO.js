class CreateClinicalHistoryDTO {
  constructor({
    id_mascota,
    fecha_registro,
    tipo_registro,
    sintomas,
    datos_salud,
    alimentacion,
    comportamiento,
    observaciones,
    estado
  }) {
    this.id_mascota = id_mascota;
    this.fecha_registro = fecha_registro;
    this.tipo_registro = tipo_registro;
    this.sintomas = sintomas;
    this.datos_salud = datos_salud;
    this.alimentacion = alimentacion;
    this.comportamiento = comportamiento;
    this.observaciones = observaciones;
    this.estado = estado;
  }
}

module.exports = CreateClinicalHistoryDTO;
