const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../../../Infraestructura/database/postgres/sequelize");

const RolPostgresModel = sequelize.define(
  "TB_ROL",
  {
    ROL_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    ROL_NOMBRE: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }
  },
  {
    tableName: "TB_ROL",
    timestamps: false
  }
);

module.exports = RolPostgresModel;