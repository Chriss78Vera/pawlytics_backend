const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../../../infrastructure/database/postgres/sequelize");

const PetPostgresModel = sequelize.define(
  "TB_MASCOTAS",
  {
    ID_MASCOTA: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    RAZ_ID: {
      type: DataTypes.STRING(12),
      allowNull: false,
      references: {
        model: "TB_RAZA",
        key: "RAZ_ID"
      }
    },
    MA_NOMBRE: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    MA_F_NACIMIENTO: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    MA_COLOR: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    MA_SEXO: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    MA_PESO: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    MA_S_PARTICULARES: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ID_DATOS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "TB_DATOS_USUARIO",
        key: "ID_DATOS"
      }
    }
  },
  {
    tableName: "TB_MASCOTAS",
    timestamps: false
  }
);

module.exports = PetPostgresModel;
