const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../../../infrastructure/database/postgres/sequelize");

const DewormingPostgresModel = sequelize.define(
  "TB_DESPARASITACIONES",
  {
    ID_DESPARASITACION: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    DE_TIPO: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    DE_FECHA: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  },
  {
    tableName: "TB_DESPARASITACIONES",
    timestamps: false
  }
);

module.exports = DewormingPostgresModel;
