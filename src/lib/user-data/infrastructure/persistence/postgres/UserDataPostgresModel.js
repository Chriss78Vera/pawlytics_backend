const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../../../infrastructure/database/postgres/sequelize");

const UserDataPostgresModel = sequelize.define(
  "TB_DATOS_USUARIO",
  {
    ID_DATOS: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    DUS_NOMBRE: {
      type: DataTypes.STRING(45),
      allowNull: false
    },

    DUS_APELLIDO: {
      type: DataTypes.STRING(45),
      allowNull: false
    },

    DUS_DIRECCION: {
      type: DataTypes.STRING(45),
      allowNull: true
    },

    DUS_TELEFONO: {
      type: DataTypes.STRING(45),
      allowNull: true
    },

    DUS_CEDULA: {
      type: DataTypes.STRING(45),
      allowNull: false
    },

    DUS_F_NACIMIENTO: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  },
  {
    tableName: "TB_DATOS_USUARIO",
    timestamps: false
  }
);

module.exports = UserDataPostgresModel;
