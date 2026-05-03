const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: process.env.POSTGRES_DIALECT,
    logging: false
  }
);

async function connectPostgres() {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL conectado correctamente");
  } catch (error) {
    console.error("Error conectando a PostgreSQL:", error.message);
    throw error;
  }
}

async function syncPostgres() {
  try {
    require("./models");

    const { setupPostgresAssociations } = require("./associations");
    setupPostgresAssociations();

    await sequelize.sync({ alter: true });

    const { seedCatalogs } = require("../../../lib/catalogs/infrastructure/database/seedCatalogs");
    await seedCatalogs();

    console.log("Tablas PostgreSQL sincronizadas correctamente");
  } catch (error) {
    console.error("Error sincronizando tablas PostgreSQL:", error.message);
    throw error;
  }
}

module.exports = {
  sequelize,
  connectPostgres,
  syncPostgres
};
