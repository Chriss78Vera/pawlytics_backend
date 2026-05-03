const RoleRepository = require("../../../domain/ports/RoleRepository");
const RolePostgresModel = require("../../../../users/infrastructure/persistence/postgres/RolePostgresModel");

class RolePostgresRepository extends RoleRepository {
  async create(data) {
    const role = await RolePostgresModel.create({
      ROL_NOMBRE: data.name
    });

    return this.toDomain(role);
  }

  async findAll() {
    const roles = await RolePostgresModel.findAll({
      order: [["ROL_ID", "ASC"]]
    });

    return roles.map((role) => this.toDomain(role));
  }

  async findById(id) {
    const role = await RolePostgresModel.findByPk(id);
    return role ? this.toDomain(role) : null;
  }

  async update(id, data) {
    const role = await RolePostgresModel.findByPk(id);

    if (!role) {
      return null;
    }

    await role.update({
      ROL_NOMBRE: data.name ?? role.ROL_NOMBRE
    });

    return this.toDomain(role);
  }

  async delete(id) {
    const deleted = await RolePostgresModel.destroy({
      where: { ROL_ID: id }
    });

    return deleted > 0;
  }

  toDomain(role) {
    const rawRole = role.toJSON();

    return {
      id: rawRole.ROL_ID,
      name: rawRole.ROL_NOMBRE
    };
  }
}

module.exports = RolePostgresRepository;
