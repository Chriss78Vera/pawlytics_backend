const ClinicalDetail = require("../../../domain/entities/ClinicalDetail");

class UpdateClinicalDetailUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  execute(id, data) {
    const detail = new ClinicalDetail(data, { partial: true });
    return this.repository.update(id, detail.toJSON({ partial: true }));
  }
}

module.exports = UpdateClinicalDetailUseCase;
