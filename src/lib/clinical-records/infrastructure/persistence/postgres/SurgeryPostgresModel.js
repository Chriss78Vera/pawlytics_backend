const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../../../infrastructure/database/postgres/sequelize");

const SurgeryPostgresModel = sequelize.define(
  "TB_CIRUGIAS",
  {
    ID_CIRUGIA: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    CI_TIPO: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    CI_DESCRIPCION: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    CI_FECHA: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  },
  {
    tableName: "TB_CIRUGIAS",
    timestamps: false
  }
);

module.exports = SurgeryPostgresModel;
