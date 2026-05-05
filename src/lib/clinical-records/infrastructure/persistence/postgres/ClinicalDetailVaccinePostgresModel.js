const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../../../infrastructure/database/postgres/sequelize");

const ClinicalDetailVaccinePostgresModel = sequelize.define(
  "TB_DETALLE_CLINICO_HAS_TB_VACUNAS",
  {
    ID_DETALLE: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "TB_DETALLE_CLINICO",
        key: "ID_DETALLE"
      }
    },
    ID_VACUNA: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "TB_VACUNAS",
        key: "ID_VACUNA"
      }
    }
  },
  {
    tableName: "TB_DETALLE_CLINICO_HAS_TB_VACUNAS",
    timestamps: false
  }
);

module.exports = ClinicalDetailVaccinePostgresModel;
