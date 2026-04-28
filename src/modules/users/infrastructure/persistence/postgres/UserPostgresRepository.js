const UserRepository = require("../../../domain/repositories/UserRepository");
const UserPostgresModel = require("./UserPostgresModel");
const RolPostgresModel = require("./RolPostgresModel");

class UserPostgresRepository extends UserRepository {
  async create(data) {
    const user = await UserPostgresModel.create({
      US_EMAIL: data.email,
      US_CONTRASENA: data.password,
      ROL_ID: data.roleId
    });

    return this.toDomain(user);
  }

  async findAll() {
    const users = await UserPostgresModel.findAll({
      include: [{ model: RolPostgresModel, as: "rol" }],
      order: [["US_ID", "ASC"]]
    });

    return users.map((user) => this.toDomain(user));
  }

  async findById(id) {
    const user = await UserPostgresModel.findByPk(id, {
      include: [{ model: RolPostgresModel, as: "rol" }]
    });

    return user ? this.toDomain(user) : null;
  }

  async update(id, data) {
    const user = await UserPostgresModel.findByPk(id);

    if (!user) {
      return null;
    }

    await user.update({
      US_EMAIL: data.email ?? user.US_EMAIL,
      US_CONTRASENA: data.password ?? user.US_CONTRASENA,
      ROL_ID: data.roleId ?? user.ROL_ID
    });

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

    return {
      id: rawUser.US_ID,
      email: rawUser.US_EMAIL,
      roleId: rawUser.ROL_ID,
      role: rawRole
        ? {
            id: rawRole.ROL_ID,
            name: rawRole.ROL_NOMBRE
          }
        : undefined
    };
  }
}

module.exports = UserPostgresRepository;
