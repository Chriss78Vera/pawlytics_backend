class Type {
  constructor({ id, nombre, razas } = {}) {
    this.id = id;
    this.nombre = nombre;
    this.razas = razas;
  }

  toJSON() {
    const data = {
      id: this.id,
      nombre: this.nombre
    };

    if (this.razas !== undefined) {
      data.razas = this.razas;
    }

    return data;
  }
}

module.exports = Type;
