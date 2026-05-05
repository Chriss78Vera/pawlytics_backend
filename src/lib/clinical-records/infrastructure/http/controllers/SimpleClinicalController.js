class SimpleClinicalController {
  constructor(repository, notFoundMessage) {
    this.repository = repository;
    this.notFoundMessage = notFoundMessage;
  }

  create = async (req, res) => {
    try {
      const record = await this.repository.create(req.body);
      return res.status(201).json(record);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  findAll = async (req, res) => {
    try {
      const records = await this.repository.findAll();
      return res.json(records);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  findById = async (req, res) => {
    try {
      const record = await this.repository.findById(req.params.id);

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
      const record = await this.repository.update(req.params.id, req.body);

      if (!record) {
        return res.status(404).json({ message: this.notFoundMessage });
      }

      return res.json(record);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      const deleted = await this.repository.delete(req.params.id);

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
