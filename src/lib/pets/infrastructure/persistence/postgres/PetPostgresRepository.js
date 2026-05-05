const PetPostgresModel = require("./PetPostgresModel");
const PetRepository = require("../../../domain/ports/PetRepository");
const TypePostgresModel = require("../../../../catalogs/infrastructure/persistence/postgres/TypePostgresModel");
const BreedPostgresModel = require("../../../../catalogs/infrastructure/persistence/postgres/BreedPostgresModel");
const UserDataPostgresModel = require("../../../../user-data/infrastructure/persistence/postgres/UserDataPostgresModel");

class PetPostgresRepository extends PetRepository {
  async create(data) {
    const pet = await PetPostgresModel.create(this.toPersistence(data));
    return this.findById(pet.ID_MASCOTA);
  }

  async findAll() {
    const pets = await PetPostgresModel.findAll({
      include: this.includeRelations(),
      order: [["ID_MASCOTA", "ASC"]]
    });

    return pets.map((pet) => this.toDomain(pet));
  }

  async findById(id) {
    const pet = await PetPostgresModel.findByPk(id, {
      include: this.includeRelations()
    });

    return pet ? this.toDomain(pet) : null;
  }

  async findByUserData(userDataId) {
    const pets = await PetPostgresModel.findAll({
      where: { ID_DATOS: userDataId },
      include: this.includeRelations(),
      order: [["ID_MASCOTA", "ASC"]]
    });

    return pets.map((pet) => this.toDomain(pet));
  }

  async update(id, data) {
    const pet = await PetPostgresModel.findByPk(id);

    if (!pet) {
      return null;
    }

    await pet.update(this.toPersistence(data, true));
    return this.findById(id);
  }

  async delete(id) {
    const deleted = await PetPostgresModel.destroy({
      where: { ID_MASCOTA: id }
    });

    return deleted > 0;
  }

  includeRelations() {
    return [
      { model: TypePostgresModel, as: "tipo" },
      { model: BreedPostgresModel, as: "raza" },
      { model: UserDataPostgresModel, as: "ownerData" }
    ];
  }

  toPersistence(data, partial = false) {
    const fields = {
      TIP_ID: data.typeId,
      RAZ_ID: data.breedId,
      MA_NOMBRE: data.name,
      MA_F_NACIMIENTO: data.birthDate,
      MA_COLOR: data.color,
      MA_SEXO: data.sex,
      MA_PESO: data.weight,
      MA_S_PARTICULARES: data.particularSigns,
      ID_DATOS: data.userDataId
    };

    if (!partial) {
      return fields;
    }

    return Object.fromEntries(Object.entries(fields).filter(([, value]) => value !== undefined));
  }

  toDomain(pet) {
    const rawPet = pet.toJSON();

    return {
      id: rawPet.ID_MASCOTA,
      typeId: rawPet.TIP_ID,
      breedId: rawPet.RAZ_ID,
      name: rawPet.MA_NOMBRE,
      birthDate: rawPet.MA_F_NACIMIENTO,
      color: rawPet.MA_COLOR,
      sex: rawPet.MA_SEXO,
      weight: rawPet.MA_PESO,
      particularSigns: rawPet.MA_S_PARTICULARES,
      userDataId: rawPet.ID_DATOS,
      type: rawPet.tipo
        ? {
            id: rawPet.tipo.TIP_ID,
            name: rawPet.tipo.TIP_NOMBRE
          }
        : undefined,
      breed: rawPet.raza
        ? {
            id: rawPet.raza.RAZ_ID,
            name: rawPet.raza.RAZ_NOMBRE
          }
        : undefined
    };
  }
}

module.exports = PetPostgresRepository;
