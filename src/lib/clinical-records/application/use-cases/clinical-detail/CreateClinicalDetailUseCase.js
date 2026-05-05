const ClinicalDetail = require("../../../domain/entities/ClinicalDetail");

class CreateClinicalDetailUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  execute(data) {
    const detail = new ClinicalDetail(data);
    return this.repository.create(detail.toJSON());
  }
}

module.exports = CreateClinicalDetailUseCase;
