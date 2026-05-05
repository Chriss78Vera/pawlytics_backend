const SimpleClinicalRecord = require("../../../domain/entities/SimpleClinicalRecord");

class UpdateSimpleClinicalUseCase {
  constructor(repository, kind) {
    this.repository = repository;
    this.kind = kind;
  }

  execute(id, data) {
    const record = new SimpleClinicalRecord(data, { kind: this.kind, partial: true });
    return this.repository.update(id, record.toJSON({ partial: true }));
  }
}

module.exports = UpdateSimpleClinicalUseCase;
