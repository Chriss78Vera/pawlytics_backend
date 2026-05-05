class SimpleClinicalRepository {
  constructor(model, idField, mapping) {
    this.model = model;
    this.idField = idField;
    this.mapping = mapping;
  }

  async create(data) {
    const record = await this.model.create(this.toPersistence(data));
    return this.toDomain(record);
  }

  async findAll() {
    const records = await this.model.findAll({
      order: [[this.idField, "ASC"]]
    });

    return records.map((record) => this.toDomain(record));
  }

  async findById(id) {
    const record = await this.model.findByPk(id);
    return record ? this.toDomain(record) : null;
  }

  async update(id, data) {
    const record = await this.model.findByPk(id);

    if (!record) {
      return null;
    }

    await record.update(this.toPersistence(data, true));
    return this.toDomain(record);
  }

  async delete(id) {
    const deleted = await this.model.destroy({
      where: { [this.idField]: id }
    });

    return deleted > 0;
  }

  toPersistence(data, partial = false) {
    const values = {};

    for (const [domainField, column] of Object.entries(this.mapping)) {
      values[column] = data[domainField];
    }

    if (!partial) {
      return values;
    }

    return Object.fromEntries(Object.entries(values).filter(([, value]) => value !== undefined));
  }

  toDomain(record) {
    const rawRecord = record.toJSON();
    const data = { id: rawRecord[this.idField] };

    for (const [domainField, column] of Object.entries(this.mapping)) {
      data[domainField] = rawRecord[column];
    }

    return data;
  }
}

module.exports = SimpleClinicalRepository;
