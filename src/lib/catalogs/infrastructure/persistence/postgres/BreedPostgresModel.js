const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../../../infrastructure/database/postgres/sequelize");

const BreedPostgresModel = sequelize.define(
  "TB_RAZA",
  {
    RAZ_ID: {
      type: DataTypes.STRING(12),
      primaryKey: true,
      allowNull: false
    },

    RAZ_NOMBRE: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    TIP_ID: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: "TB_TIPO",
        key: "TIP_ID"
      }
    },

    RAZ_ORDEN: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    tableName: "TB_RAZA",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["RAZ_NOMBRE", "TIP_ID"]
      }
    ]
  }
);

module.exports = BreedPostgresModel;
