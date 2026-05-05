const CreateSimpleClinicalUseCase = require("../../../application/use-cases/simple-clinical/CreateSimpleClinicalUseCase");
const GetSimpleClinicalRecordsUseCase = require("../../../application/use-cases/simple-clinical/GetSimpleClinicalRecordsUseCase");
const GetSimpleClinicalByIdUseCase = require("../../../application/use-cases/simple-clinical/GetSimpleClinicalByIdUseCase");
const UpdateSimpleClinicalUseCase = require("../../../application/use-cases/simple-clinical/UpdateSimpleClinicalUseCase");
const DeleteSimpleClinicalUseCase = require("../../../application/use-cases/simple-clinical/DeleteSimpleClinicalUseCase");

class SimpleClinicalController {
  constructor(repository, notFoundMessage, recordKind) {
    this.repository = repository;
    this.notFoundMessage = notFoundMessage;
    this.recordKind = recordKind;
  }

  create = async (req, res) => {
    try {
      const record = await new CreateSimpleClinicalUseCase(this.repository, this.recordKind).execute(req.body);
      return res.status(201).json(record);
    } catch (error) {
      if (error.name === "DomainValidationError") {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: error.message });
    }
  };

  findAll = async (req, res) => {
    try {
      const records = await new GetSimpleClinicalRecordsUseCase(this.repository).execute();
      return res.json(records);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  findById = async (req, res) => {
    try {
      const record = await new GetSimpleClinicalByIdUseCase(this.repository).execute(req.params.id);

      if (!record) {
        return res.status(404).json({ message: this.notFoundMessage });
      }

      return res.json(record);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  update = async (req, res) => {
    try {
      const record = await new UpdateSimpleClinicalUseCase(this.repository, this.recordKind).execute(req.params.id, req.body);

      if (!record) {
        return res.status(404).json({ message: this.notFoundMessage });
      }

      return res.json(record);
    } catch (error) {
      if (error.name === "DomainValidationError") {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      const deleted = await new DeleteSimpleClinicalUseCase(this.repository).execute(req.params.id);

      if (!deleted) {
        return res.status(404).json({ message: this.notFoundMessage });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}

module.exports = SimpleClinicalController;
