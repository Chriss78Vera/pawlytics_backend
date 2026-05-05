const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../../../infrastructure/database/postgres/sequelize");

const DiseasePostgresModel = sequelize.define(
  "TB_ENFERMEDADES",
  {
    ID_ENFERMEDADES: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    EN_TRATAMIENTO: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    EN_NOMBRE: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  },
  {
    tableName: "TB_ENFERMEDADES",
    timestamps: false
  }
);

module.exports = DiseasePostgresModel;
