const CreateRoleDTO = require("../../../application/dto/CreateRoleDTO");
const CreateRoleUseCase = require("../../../application/use-cases/CreateRoleUseCase");
const GetRolesUseCase = require("../../../application/use-cases/GetRolesUseCase");
const GetRoleByIdUseCase = require("../../../application/use-cases/GetRoleByIdUseCase");
const UpdateRoleUseCase = require("../../../application/use-cases/UpdateRoleUseCase");
const DeleteRoleUseCase = require("../../../application/use-cases/DeleteRoleUseCase");
const RolePostgresRepository = require("../../persistence/postgres/RolePostgresRepository");

const roleRepository = new RolePostgresRepository();

class RoleController {
  static async create(req, res) {
    try {
      const dto = new CreateRoleDTO(req.body);
      const role = await new CreateRoleUseCase(roleRepository).execute(dto);
      return res.status(201).json(role);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async findAll(req, res) {
    try {
      const roles = await new GetRolesUseCase(roleRepository).execute();
      return res.json(roles);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async findById(req, res) {
    try {
      const role = await new GetRoleByIdUseCase(roleRepository).execute(req.params.id);

      if (!role) {
        return res.status(404).json({ message: "Rol no encontrado" });
      }

      return res.json(role);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const role = await new UpdateRoleUseCase(roleRepository).execute(req.params.id, req.body);

      if (!role) {
        return res.status(404).json({ message: "Rol no encontrado" });
      }

      return res.json(role);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const deleted = await new DeleteRoleUseCase(roleRepository).execute(req.params.id);

      if (!deleted) {
        return res.status(404).json({ message: "Rol no encontrado" });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = RoleController;
