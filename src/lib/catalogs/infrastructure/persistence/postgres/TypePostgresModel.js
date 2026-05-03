const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../../../infrastructure/database/postgres/sequelize");

const TypePostgresModel = sequelize.define(
  "TB_TIPO",
  {
    TIP_ID: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      allowNull: false
    },

    TIP_NOMBRE: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },

    TIP_ORDEN: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    tableName: "TB_TIPO",
    timestamps: false
  }
);

module.exports = TypePostgresModel;
