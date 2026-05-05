const CreateUserDataDTO = require("../../../application/dto/CreateUserDataDTO");
const CreateUserDataUseCase = require("../../../application/use-cases/CreateUserDataUseCase");
const GetUserDataUseCase = require("../../../application/use-cases/GetUserDataUseCase");
const GetUserDataByIdUseCase = require("../../../application/use-cases/GetUserDataByIdUseCase");
const UpdateUserDataUseCase = require("../../../application/use-cases/UpdateUserDataUseCase");
const DeleteUserDataUseCase = require("../../../application/use-cases/DeleteUserDataUseCase");
const UserDataPostgresRepository = require("../../persistence/postgres/UserDataPostgresRepository");

const userDataRepository = new UserDataPostgresRepository();

class UserDataController {
  static async create(req, res) {
    try {
      const dto = new CreateUserDataDTO(req.body);
      const userData = await new CreateUserDataUseCase(userDataRepository).execute(dto);
      return res.status(201).json(userData);
    } catch (error) {
      if (error.name === "DomainValidationError") {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: error.message });
    }
  }

  static async findAll(req, res) {
    try {
      const userData = await new GetUserDataUseCase(userDataRepository).execute();
      return res.json(userData);
    } catch (error) {
      if (error.name === "DomainValidationError") {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: error.message });
    }
  }

  static async findById(req, res) {
    try {
      const userData = await new GetUserDataByIdUseCase(userDataRepository).execute(req.params.id);

      if (!userData) {
        return res.status(404).json({ message: "Datos de usuario no encontrados" });
      }

      return res.json(userData);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const userData = await new UpdateUserDataUseCase(userDataRepository).execute(req.params.id, req.body);

      if (!userData) {
        return res.status(404).json({ message: "Datos de usuario no encontrados" });
      }

      return res.json(userData);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const deleted = await new DeleteUserDataUseCase(userDataRepository).execute(req.params.id);

      if (!deleted) {
        return res.status(404).json({ message: "Datos de usuario no encontrados" });
      }

      return res.status(204).send();
    } catch (error) {
      if (error.name === "SequelizeForeignKeyConstraintError") {
        return res.status(409).json({ message: "No se pueden eliminar datos asociados a un usuario" });
      }

      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UserDataController;
