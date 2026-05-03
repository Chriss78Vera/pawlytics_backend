const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../../../infrastructure/database/postgres/sequelize");

const UserPostgresModel = sequelize.define(
  "TB_USUARIO",
  {
    US_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    US_EMAIL: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },

    US_CONTRASENA: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "US_CONTRASEÑA"
    },

    ROL_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "TB_ROL",
        key: "ROL_ID"
      }
    }
  },
  {
    tableName: "TB_USUARIO",
    timestamps: false
  }
);

module.exports = UserPostgresModel;