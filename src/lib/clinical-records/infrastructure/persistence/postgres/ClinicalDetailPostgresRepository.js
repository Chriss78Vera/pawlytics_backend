const ClinicalDetailPostgresModel = require("./ClinicalDetailPostgresModel");
const ClinicalDetailRepository = require("../../../domain/ports/ClinicalDetailRepository");
const VaccinePostgresModel = require("./VaccinePostgresModel");
const DewormingPostgresModel = require("./DewormingPostgresModel");
const SurgeryPostgresModel = require("./SurgeryPostgresModel");
const DiseasePostgresModel = require("./DiseasePostgresModel");
const PetPostgresModel = require("../../../../pets/infrastructure/persistence/postgres/PetPostgresModel");

class ClinicalDetailPostgresRepository extends ClinicalDetailRepository {
  async create(data) {
    const detail = await ClinicalDetailPostgresModel.create(this.toPersistence(data));
    await this.setVaccines(detail, data.vaccineIds);
    return this.findById(detail.ID_DETALLE);
  }

  async findAll() {
    const details = await ClinicalDetailPostgresModel.findAll({
      include: this.includeRelations(),
      order: [["ID_DETALLE", "ASC"]]
    });

    return details.map((detail) => this.toDomain(detail));
  }

  async findById(id) {
    const detail = await ClinicalDetailPostgresModel.findByPk(id, {
      include: this.includeRelations()
    });

    return detail ? this.toDomain(detail) : null;
  }

  async findByPet(petId) {
    const details = await ClinicalDetailPostgresModel.findAll({
      where: { ID_MASCOTA: petId },
      include: this.includeRelations(),
      order: [["ID_DETALLE", "ASC"]]
    });

    return details.map((detail) => this.toDomain(detail));
  }

  async update(id, data) {
    const detail = await ClinicalDetailPostgresModel.findByPk(id);

    if (!detail) {
      return null;
    }

    await detail.update(this.toPersistence(data, true));

    if (data.vaccineIds !== undefined) {
      await this.setVaccines(detail, data.vaccineIds);
    }

    return this.findById(id);
  }

  async delete(id) {
    const deleted = await ClinicalDetailPostgresModel.destroy({
      where: { ID_DETALLE: id }
    });

    return deleted > 0;
  }

  async setVaccines(detail, vaccineIds) {
    if (vaccineIds === undefined) {
      return;
    }

    await detail.setVaccines(vaccineIds);
  }

  includeRelations() {
    return [
      { model: PetPostgresModel, as: "pet" },
      { model: DewormingPostgresModel, as: "deworming" },
      { model: SurgeryPostgresModel, as: "surgery" },
      { model: DiseasePostgresModel, as: "disease" },
      { model: VaccinePostgresModel, as: "vaccines", through: { attributes: [] } }
    ];
  }

  toPersistence(data, partial = false) {
    const fields = {
      ID_MASCOTA: data.petId,
      DC_DIETA: data.diet,
      DC_ESTERILIZACION: data.sterilization,
      DC_PARTOS: data.births,
      ID_CIRUGIA: data.surgeryId,
      ID_ENFERMEDADES: data.diseaseId,
      ID_DESPARASITACION: data.dewormingId,
      DC_ANIMALES: data.animals
    };

    if (!partial) {
      return fields;
    }

    return Object.fromEntries(Object.entries(fields).filter(([, value]) => value !== undefined));
  }

  toDomain(detail) {
    const rawDetail = detail.toJSON();

    return {
      id: rawDetail.ID_DETALLE,
      petId: rawDetail.ID_MASCOTA,
      diet: rawDetail.DC_DIETA,
      sterilization: rawDetail.DC_ESTERILIZACION,
      births: rawDetail.DC_PARTOS,
      surgeryId: rawDetail.ID_CIRUGIA,
      diseaseId: rawDetail.ID_ENFERMEDADES,
      dewormingId: rawDetail.ID_DESPARASITACION,
      animals: rawDetail.DC_ANIMALES,
      vaccines: (rawDetail.vaccines || []).map((vaccine) => ({
        id: vaccine.ID_VACUNA,
        type: vaccine.VA_TIPO,
        date: vaccine.VA_FECHA
      })),
      deworming: rawDetail.deworming
        ? {
            id: rawDetail.deworming.ID_DESPARASITACION,
            type: rawDetail.deworming.DE_TIPO,
            date: rawDetail.deworming.DE_FECHA
          }
        : undefined,
      surgery: rawDetail.surgery
        ? {
            id: rawDetail.surgery.ID_CIRUGIA,
            type: rawDetail.surgery.CI_TIPO,
            description: rawDetail.surgery.CI_DESCRIPCION,
            date: rawDetail.surgery.CI_FECHA
          }
        : undefined,
      disease: rawDetail.disease
        ? {
            id: rawDetail.disease.ID_ENFERMEDADES,
            name: rawDetail.disease.EN_NOMBRE,
            treatment: rawDetail.disease.EN_TRATAMIENTO
          }
        : undefined
    };
  }
}

module.exports = ClinicalDetailPostgresRepository;
