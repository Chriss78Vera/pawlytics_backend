class Breed {
  constructor({ id, nombre, tipo } = {}) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      tipo: this.tipo
    };
  }
}

module.exports = Breed;
