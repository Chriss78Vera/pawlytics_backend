const UserDataRepository = require("../../../domain/ports/UserDataRepository");
const UserDataPostgresModel = require("./UserDataPostgresModel");

class UserDataPostgresRepository extends UserDataRepository {
  async create(data) {
    const userData = await UserDataPostgresModel.create({
      DUS_NOMBRE: data.firstName,
      DUS_APELLIDO: data.lastName,
      DUS_DIRECCION: data.address,
      DUS_TELEFONO: data.phone,
      DUS_CEDULA: data.identification,
      DUS_F_NACIMIENTO: data.birthDate
    });

    return this.toDomain(userData);
  }

  async findAll() {
    const userData = await UserDataPostgresModel.findAll({
      order: [["ID_DATOS", "ASC"]]
    });

    return userData.map((data) => this.toDomain(data));
  }

  async findById(id) {
    const userData = await UserDataPostgresModel.findByPk(id);
    return userData ? this.toDomain(userData) : null;
  }

  async update(id, data) {
    const userData = await UserDataPostgresModel.findByPk(id);

    if (!userData) {
      return null;
    }

    await userData.update({
      DUS_NOMBRE: data.firstName ?? userData.DUS_NOMBRE,
      DUS_APELLIDO: data.lastName ?? userData.DUS_APELLIDO,
      DUS_DIRECCION: data.address ?? userData.DUS_DIRECCION,
      DUS_TELEFONO: data.phone ?? userData.DUS_TELEFONO,
      DUS_CEDULA: data.identification ?? userData.DUS_CEDULA,
      DUS_F_NACIMIENTO: data.birthDate ?? userData.DUS_F_NACIMIENTO
    });

    return this.toDomain(userData);
  }

  async delete(id) {
    const deleted = await UserDataPostgresModel.destroy({
      where: { ID_DATOS: id }
    });

    return deleted > 0;
  }

  toDomain(userData) {
    const rawUserData = userData.toJSON();

    return {
      id: rawUserData.ID_DATOS,
      firstName: rawUserData.DUS_NOMBRE,
      lastName: rawUserData.DUS_APELLIDO,
      address: rawUserData.DUS_DIRECCION,
      phone: rawUserData.DUS_TELEFONO,
      identification: rawUserData.DUS_CEDULA,
      birthDate: rawUserData.DUS_F_NACIMIENTO
    };
  }
}

module.exports = UserDataPostgresRepository;
