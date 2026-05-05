const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../../../infrastructure/database/postgres/sequelize");

const ClinicalDetailPostgresModel = sequelize.define(
  "TB_DETALLE_CLINICO",
  {
    ID_DETALLE: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    ID_MASCOTA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "TB_MASCOTAS",
        key: "ID_MASCOTA"
      }
    },
    DC_DIETA: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    DC_ESTERILIZACION: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    DC_PARTOS: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ID_CIRUGIA: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "TB_CIRUGIAS",
        key: "ID_CIRUGIA"
      }
    },
    ID_ENFERMEDADES: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "TB_ENFERMEDADES",
        key: "ID_ENFERMEDADES"
      }
    },
    ID_DESPARASITACION: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "TB_DESPARASITACIONES",
        key: "ID_DESPARASITACION"
      }
    },
    DC_ANIMALES: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  },
  {
    tableName: "TB_DETALLE_CLINICO",
    timestamps: false
  }
);

module.exports = ClinicalDetailPostgresModel;
