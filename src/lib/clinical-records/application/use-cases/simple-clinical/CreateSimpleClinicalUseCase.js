const SimpleClinicalRecord = require("../../../domain/entities/SimpleClinicalRecord");

class CreateSimpleClinicalUseCase {
  constructor(repository, kind) {
    this.repository = repository;
    this.kind = kind;
  }

  execute(data) {
    const record = new SimpleClinicalRecord(data, { kind: this.kind });
    return this.repository.create(record.toJSON());
  }
}

module.exports = CreateSimpleClinicalUseCase;
