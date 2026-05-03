const UserRepository = require("../../../domain/ports/UserRepository");
const UserPostgresModel = require("./UserPostgresModel");
const RolePostgresModel = require("./RolePostgresModel");
const UserDataPostgresModel = require("../../../../user-data/infrastructure/persistence/postgres/UserDataPostgresModel");
const { hashPassword } = require("../../security/passwordHasher");

class UserPostgresRepository extends UserRepository {
  async create(data) {
    const user = await UserPostgresModel.create({
      US_EMAIL: data.email,
      US_CONTRASENA: hashPassword(data.password),
      ROL_ID: data.roleId,
      ID_DATOS: data.userDataId
    });

    return this.findById(user.US_ID);
  }

  async findAll() {
    const users = await UserPostgresModel.findAll({
      include: [
        { model: RolePostgresModel, as: "rol" },
        { model: UserDataPostgresModel, as: "userData" }
      ],
      order: [["US_ID", "ASC"]]
    });

    return users.map((user) => this.toDomain(user));
  }

  async findById(id) {
    const user = await UserPostgresModel.findByPk(id, {
      include: [
        { model: RolePostgresModel, as: "rol" },
        { model: UserDataPostgresModel, as: "userData" }
      ]
    });

    return user ? this.toDomain(user) : null;
  }

  async update(id, data) {
    const user = await UserPostgresModel.findByPk(id);

    if (!user) {
      return null;
    }

    const updateData = {};

    if (data.roleId !== undefined) {
      updateData.ROL_ID = data.roleId;
    }

    if (data.userDataId !== undefined) {
      updateData.ID_DATOS = data.userDataId;
    }

    if (data.password !== undefined) {
      updateData.US_CONTRASENA = hashPassword(data.password);
    }

    await user.update(updateData);

    const updatedUser = await this.findById(id);
    return updatedUser;
  }

  async delete(id) {
    const deleted = await UserPostgresModel.destroy({
      where: { US_ID: id }
    });

    return deleted > 0;
  }

  toDomain(user) {
    const rawUser = user.toJSON();
    const rawRole = rawUser.rol;
    const rawUserData = rawUser.userData;

    return {
      id: rawUser.US_ID,
      email: rawUser.US_EMAIL,
      roleId: rawUser.ROL_ID,
      userDataId: rawUser.ID_DATOS,
      role: rawRole
        ? {
            id: rawRole.ROL_ID,
            name: rawRole.ROL_NOMBRE
          }
        : undefined,
      userData: rawUserData
        ? {
            id: rawUserData.ID_DATOS,
            firstName: rawUserData.DUS_NOMBRE,
            lastName: rawUserData.DUS_APELLIDO,
            address: rawUserData.DUS_DIRECCION,
            phone: rawUserData.DUS_TELEFONO,
            identification: rawUserData.DUS_CEDULA,
            birthDate: rawUserData.DUS_F_NACIMIENTO
          }
        : undefined
    };
  }
}

module.exports = UserPostgresRepository;
