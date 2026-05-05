const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../../../infrastructure/database/postgres/sequelize");

const VaccinePostgresModel = sequelize.define(
  "TB_VACUNAS",
  {
    ID_VACUNA: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    VA_TIPO: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    VA_FECHA: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  },
  {
    tableName: "TB_VACUNAS",
    timestamps: false
  }
);

module.exports = VaccinePostgresModel;
