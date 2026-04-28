const ClinicalHistoryRepository = require("../../../domain/repositories/ClinicalHistoryRepository");
const ClinicalHistoryMongoModel = require("./ClinicalHistoryMongoModel");

class ClinicalHistoryMongoRepository extends ClinicalHistoryRepository {
  async create(data) {
    const clinicalHistory = await ClinicalHistoryMongoModel.create(data);
    return this.toDomain(clinicalHistory);
  }

  async findAll() {
    const clinicalHistories = await ClinicalHistoryMongoModel.find().sort({ createdAt: -1 });
    return clinicalHistories.map((clinicalHistory) => this.toDomain(clinicalHistory));
  }

  async findById(id) {
    const clinicalHistory = await ClinicalHistoryMongoModel.findById(id);
    return clinicalHistory ? this.toDomain(clinicalHistory) : null;
  }

  async findByPetId(petId) {
    const clinicalHistories = await ClinicalHistoryMongoModel.find({ id_mascota: petId }).sort({
      fecha_registro: -1
    });

    return clinicalHistories.map((clinicalHistory) => this.toDomain(clinicalHistory));
  }

  async update(id, data) {
    const clinicalHistory = await ClinicalHistoryMongoModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });

    return clinicalHistory ? this.toDomain(clinicalHistory) : null;
  }

  async delete(id) {
    const clinicalHistory = await ClinicalHistoryMongoModel.findByIdAndDelete(id);
    return Boolean(clinicalHistory);
  }

  toDomain(clinicalHistory) {
    const rawClinicalHistory = clinicalHistory.toJSON();

    return {
      id: rawClinicalHistory._id,
      id_mascota: rawClinicalHistory.id_mascota,
      fecha_registro: rawClinicalHistory.fecha_registro,
      tipo_registro: rawClinicalHistory.tipo_registro,
      sintomas: rawClinicalHistory.sintomas,
      datos_salud: rawClinicalHistory.datos_salud,
      alimentacion: rawClinicalHistory.alimentacion,
      comportamiento: rawClinicalHistory.comportamiento,
      observaciones: rawClinicalHistory.observaciones,
      estado: rawClinicalHistory.estado,
      createdAt: rawClinicalHistory.createdAt,
      updatedAt: rawClinicalHistory.updatedAt
    };
  }
}

module.exports = ClinicalHistoryMongoRepository;
