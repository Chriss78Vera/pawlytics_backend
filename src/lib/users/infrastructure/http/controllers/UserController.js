const CreateUserDTO = require("../../../application/dto/CreateUserDTO");
const CreateUserUseCase = require("../../../application/use-cases/CreateUserUseCase");
const GetUsersUseCase = require("../../../application/use-cases/GetUsersUseCase");
const GetUserByIdUseCase = require("../../../application/use-cases/GetUserByIdUseCase");
const UpdateUserUseCase = require("../../../application/use-cases/UpdateUserUseCase");
const DeleteUserUseCase = require("../../../application/use-cases/DeleteUserUseCase");
const UserPostgresRepository = require("../../persistence/postgres/UserPostgresRepository");

const userRepository = new UserPostgresRepository();

class UserController {
  static async create(req, res) {
    try {
      const dto = new CreateUserDTO(req.body);
      const user = await new CreateUserUseCase(userRepository).execute(dto);
      return res.status(201).json(user);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ message: "El email ya esta registrado" });
      }

      return res.status(500).json({ message: error.message });
    }
  }

  static async findAll(req, res) {
    try {
      const users = await new GetUsersUseCase(userRepository).execute();
      return res.json(users);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ message: "El email ya esta registrado" });
      }

      return res.status(500).json({ message: error.message });
    }
  }

  static async findById(req, res) {
    try {
      const user = await new GetUserByIdUseCase(userRepository).execute(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const user = await new UpdateUserUseCase(userRepository).execute(req.params.id, req.body);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const deleted = await new DeleteUserUseCase(userRepository).execute(req.params.id);

      if (!deleted) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UserController;
